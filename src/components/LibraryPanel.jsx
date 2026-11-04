import { useRef, useState } from 'react'
import { LIBRARY, CATEGORIES } from '../data/library.js'
import { loadImageFile, makeCutout } from '../utils/removeBackground.js'

// The list of decor items a designer can add, plus photo upload.
export default function LibraryPanel({ onAdd, onAddPhoto }) {
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
      setMessage('Removing background…')
      const img = await loadImageFile(file)
      const cut = makeCutout(img)
      onAddPhoto({ ...cut, name: file.name.replace(/\.[^.]+$/, '') })
      setMessage('Added. Drag it into place.')
    } catch (err) {
      setMessage(err.message)
    }
  }

  return (
    <aside className="panel library" aria-label="Decor library">
      <h2>Decor library</h2>
      <p className="hint">Tap an item to add it. Drag items to move them.</p>

      <div className="library-groups">
        {CATEGORIES.map((cat) => (
          <section key={cat} className="library-group">
            <h3>{cat}</h3>
            {LIBRARY.filter((i) => i.category === cat).map((i) => (
              <button key={i.type} className="lib-item" onClick={() => onAdd(i.type)}>
                <span className="dot" style={{ background: i.color }} />
                {i.name}
                <span className="plus" aria-hidden="true">+</span>
              </button>
            ))}
          </section>
        ))}

        <section className="library-group">
          <h3>Your photos</h3>
          <button className="lib-item upload" onClick={() => fileRef.current.click()}>
            Upload a decor photo
            <span className="plus" aria-hidden="true">+</span>
          </button>
          <input id="photo-upload" ref={fileRef} type="file" accept="image/*" hidden onChange={handleFile} />
          {message && <p className="hint" role="status">{message}</p>}
        </section>
      </div>
    </aside>
  )
}
