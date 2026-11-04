import { LIBRARY, CATEGORIES } from '../data/library.js'
import PhotoUploadButton from './PhotoUploadButton.jsx'

// The list of decor items a designer can add, plus photo uploads.
export default function LibraryPanel({ onAdd, onAddPhoto, onReplaceBackdrop }) {
  return (
    <aside className="panel library" aria-label="Decor library">
      <h2>Decor library</h2>
      <p className="hint">Tap an item to add it. Drag items to move them.</p>

      <div className="library-groups">
        <section className="library-group">
          <h3>From your photos</h3>
          <PhotoUploadButton id="upload-backdrop" mode="backdrop" label="Replace backdrop with a photo" onReady={onReplaceBackdrop} />
          <PhotoUploadButton id="upload-cutout" mode="cutout" label="Add a decor photo (cut-out)" onReady={onAddPhoto} />
          <p className="hint">Backdrop: use a straight, front-facing photo. Cut-out: use a photo with a plain background.</p>
        </section>

        {CATEGORIES.map((cat) => (
          <section key={cat} className="library-group">
            <h3>{cat}</h3>
            {LIBRARY.filter((i) => i.category === cat).map((i) => (
              <button key={i.type} className="lib-item" onClick={() => onAdd(i.type)}>
                <span className="dot" style={{ background: i.color }} />
                <span className="name">{i.name}</span>
                {i.real && <span className="tag">3D model</span>}
                <span className="plus" aria-hidden="true">+</span>
              </button>
            ))}
          </section>
        ))}
      </div>
    </aside>
  )
}
