// Turns a photo of one decor object into a real 3D model (.glb) using
// Hunyuan3D-2.1, a free AI model by Tencent hosted on Hugging Face.
// It runs on Hugging Face's free GPUs ("ZeroGPU"): each free account gets
// a small daily allowance, which is why a personal access token is needed.

export const AI_SPACE = 'tencent/Hunyuan3D-2.1'
const TOKEN_KEY = 'vedika-hf-token'

export function getToken() {
  try {
    return localStorage.getItem(TOKEN_KEY) || ''
  } catch {
    return ''
  }
}

export function setToken(token) {
  try {
    if (token) localStorage.setItem(TOKEN_KEY, token)
    else localStorage.removeItem(TOKEN_KEY)
  } catch {
    /* storage blocked: the token is only kept for this visit */
  }
}

// Look through the AI's answer for a file ending in .glb (or any 3D file).
function findFiles(value, found = []) {
  if (!value) return found
  if (Array.isArray(value)) value.forEach((v) => findFiles(v, found))
  else if (typeof value === 'object') {
    const name = value.url || value.path || ''
    if (typeof name === 'string' && /\.(glb|gltf|obj|ply|stl)(\?|$)/i.test(name)) found.push(value)
    else Object.values(value).forEach((v) => findFiles(v, found))
  }
  return found
}

// Friendly messages for the most common problems.
function explain(err) {
  const msg = String(err?.message || err?.title || err || '')
  if (/quota|exceeded|GPU.*(limit|time)/i.test(msg)) {
    return 'Your free AI allowance for today is used up. It refills every day, so try again later or tomorrow.'
  }
  if (/401|403|unauthori[sz]ed|invalid.*token|credentials/i.test(msg)) {
    return 'Hugging Face did not accept the access token. Check that you copied the whole token (it starts with hf_) and save it again.'
  }
  if (/sleep|paused|building|not found|404|space.*(error|stopped)/i.test(msg)) {
    return 'The free AI service is not available right now (it may be restarting). Please try again in a few minutes.'
  }
  if (/fetch|network|Failed to/i.test(msg)) {
    return 'Could not reach the AI service. Check your internet connection and try again.'
  }
  return `The AI could not make a model from this photo. Details: ${msg || 'unknown error'}`
}

// photo: the image File. Returns a Blob with the .glb model.
// onStatus: called with short progress messages for the screen.
export async function photoTo3D(photo, token, onStatus) {
  try {
    onStatus('Connecting to the free AI…')
    const { Client, handle_file } = await import('@gradio/client')
    const client = await Client.connect(AI_SPACE, {
      token,
      record_history: false,
      status_callback: (s) => {
        if (s?.status === 'sleeping' || s?.status === 'building') onStatus('Waking up the AI service (can take a minute)…')
      },
    })

    onStatus('Making the 3D model. This takes about 1–3 minutes…')
    const result = await client.predict('/generation_all', {
      image: handle_file(photo),
      mv_image_front: null,
      mv_image_back: null,
      mv_image_left: null,
      mv_image_right: null,
      steps: 30,
      guidance_scale: 5,
      seed: 1234,
      octree_resolution: 256,
      check_box_rembg: true, // let the AI remove the photo background
      num_chunks: 8000,
      randomize_seed: true,
    })

    // The answer usually has a plain shape (first) and a textured one (second).
    let files = findFiles(result.data)
    let glb = files.slice().reverse().find((f) => /\.glb(\?|$)/i.test(f.url || f.path))

    // If it did not come back as .glb, ask for an export in .glb with colours.
    if (!glb && files.length) {
      onStatus('Adding colours and textures…')
      const exported = await client.predict('/on_export_click', {
        file_out: files[0],
        file_out2: files[1] ?? files[0],
        file_type: 'glb',
        reduce_face: true,
        export_texture: true,
        target_face_num: 20000,
      })
      files = findFiles(exported.data)
      glb = files.find((f) => /\.glb(\?|$)/i.test(f.url || f.path))
    }
    if (!glb) throw new Error('No 3D file came back from the AI.')

    onStatus('Downloading the 3D model…')
    const response = await fetch(glb.url, { headers: { Authorization: `Bearer ${token}` } })
    if (!response.ok) throw new Error(`Download failed (${response.status})`)
    return await response.blob()
  } catch (err) {
    throw new Error(explain(err))
  }
}
