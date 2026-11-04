import { useRef, useState } from 'react'
import { getToken, setToken, photoTo3D } from '../utils/aiTo3d.js'
import { saveModelFile } from '../utils/modelStore.js'

// "Make a real 3D object from a photo" — uses the free Hugging Face AI.
export default function AiPanel({ onModelReady }) {
  const fileRef = useRef()
  const [token, setTokenState] = useState(getToken)
  const [draft, setDraft] = useState('')
  const [busy, setBusy] = useState(false)
  const [status, setStatus] = useState('')
  const [error, setError] = useState('')

  function saveToken() {
    const t = draft.trim()
    if (!t.startsWith('hf_')) {
      setError('That does not look like a Hugging Face token. It should start with hf_')
      return
    }
    setToken(t)
    setTokenState(t)
    setDraft('')
    setError('')
  }

  async function handleFile(e) {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setError('That file is not an image. Choose a JPG or PNG.')
      return
    }
    setBusy(true)
    setError('')
    try {
      const blob = await photoTo3D(file, token, setStatus)
      const key = `ai-${Date.now()}`
      await saveModelFile(key, blob)
      onModelReady({ modelKey: key, name: file.name.replace(/\.[^.]+$/, '') })
      setStatus('Done. Your 3D object is in the scene.')
    } catch (err) {
      setError(err.message)
      setStatus('')
    } finally {
      setBusy(false)
    }
  }

  if (!token) {
    return (
      <details className="ai-box">
        <summary>Set up: photo to real 3D (free AI)</summary>
        <p className="hint">
          One-time setup: create a free account at huggingface.co, then open Settings → Access Tokens, create a token
          with the "Read" type, and paste it here. It is saved only on this device.
        </p>
        <div className="field">
          <label htmlFor="hf-token">Hugging Face token</label>
          <input id="hf-token" type="password" placeholder="hf_…" value={draft} onChange={(e) => setDraft(e.target.value)} autoComplete="off" />
        </div>
        <button className="chip primary" onClick={saveToken}>Save token</button>
        {error && <p className="hint error" role="alert">{error}</p>}
      </details>
    )
  }

  return (
    <div className="ai-box">
      <button className="lib-item upload ai" disabled={busy} onClick={() => fileRef.current.click()}>
        <span className="name">{busy ? 'Working…' : 'Photo to real 3D object (AI)'}</span>
        <span className="plus" aria-hidden="true">+</span>
      </button>
      <input id="ai-upload" ref={fileRef} type="file" accept="image/*" hidden onChange={handleFile} />
      <p className="hint">Best with one object: a chair, urn, stand or prop, fully in the photo.</p>
      {status && <p className="hint" role="status">{status}</p>}
      {error && <p className="hint error" role="alert">{error}</p>}
      {!busy && (
        <button className="link" onClick={() => { setToken(''); setTokenState('') }}>Change token</button>
      )}
    </div>
  )
}
