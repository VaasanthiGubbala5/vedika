import { useState } from 'react'
import { LIBRARY, CATEGORIES } from '../data/library.js'
import PhotoUploadButton from './PhotoUploadButton.jsx'

// The list of decor items a designer can add, plus photo uploads.
export default function LibraryPanel({ onAdd, onAddPhoto, onReplaceBackdrop, aiSlot }) {
  const [query, setQuery] = useState('')
  const q = query.trim().toLowerCase()
  const matches = (i) => !q || `${i.name} ${i.category} ${i.tags ?? ''}`.toLowerCase().includes(q)

  return (
    <aside className="panel library" aria-label="Decor library">
      <h2>Decor library</h2>
      <p className="hint">Tap an item to add it. Drag items to move them.</p>
      <input
        id="library-search"
        className="search"
        type="search"
        placeholder="Search: mandap, marigold, neon…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className="library-groups">
        {!q && (
        <section className="library-group">
          <h3>From your photos</h3>
          {aiSlot}
          <PhotoUploadButton id="upload-backdrop" mode="backdrop" label="Replace backdrop with a photo" onReady={onReplaceBackdrop} />
          <PhotoUploadButton id="upload-cutout" mode="cutout" label="Add a decor photo (cut-out)" onReady={onAddPhoto} />
          <p className="hint">Backdrop: use a straight, front-facing photo. Cut-out: use a photo with a plain background.</p>
        </section>
        )}

        {CATEGORIES.filter((cat) => LIBRARY.some((i) => i.category === cat && matches(i))).map((cat) => (
          <section key={cat} className="library-group">
            <h3>{cat}</h3>
            {LIBRARY.filter((i) => i.category === cat && matches(i)).map((i) => (
              <button key={i.type} className="lib-item" onClick={() => onAdd(i.type)}>
                <span className="dot" style={{ background: i.color }} />
                <span className="name">{i.name}</span>
                {i.real && <span className="tag">3D model</span>}
                <span className="plus" aria-hidden="true">+</span>
              </button>
            ))}
          </section>
        ))}
        {q && !LIBRARY.some(matches) && <p className="hint">No items match "{query}".</p>}
      </div>
    </aside>
  )
}
