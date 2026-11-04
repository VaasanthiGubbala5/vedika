import { useRef, useState } from 'react'
import { loadImageFile, makeCutout, makeBackdropImage } from '../utils/removeBackground.js'

// A button that opens the photo picker and prepares the image.
// mode "backdrop" -> keeps the whole photo (to replace the backdrop)
// mode "cutout"   -> removes a plain background (to stand in the scene)
export default function PhotoUploadButton({ id, mode, label, onReady, className = 'lib-item upload' }) {
  const fileRef = useRef()
  const [message, setMessage] = useState('')

  async function handleFile(e) {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setMessage('That file is not an image. Choose a JPG or PNG.')
      return
    }
    try {
      setMessage(mode === 'cutout' ? 'Removing background…' : 'Building the backdrop…')
      const img = await loadImageFile(file)
      const result = mode === 'cutout' ? makeCutout(img) : makeBackdropImage(img)
      onReady({ ...result, name: file.name.replace(/\.[^.]+$/, '') })
      setMessage('')
    } catch (err) {
      setMessage(err.message)
    }
  }

  return (
    <>
      <button className={className} onClick={() => fileRef.current.click()}>
        {label}
        <span className="plus" aria-hidden="true">+</span>
      </button>
      <input id={id} ref={fileRef} type="file" accept="image/*" hidden onChange={handleFile} />
      {message && <p className="hint" role="status">{message}</p>}
    </>
  )
}
