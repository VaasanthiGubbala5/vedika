import { findLibraryItem } from '../data/library.js'
import { QUICK_COLORS } from '../data/palettes.js'
import { BACKDROP_TYPES } from '../models/index.js'
import PhotoUploadButton from './PhotoUploadButton.jsx'

// Items whose colour can't be changed (photos and glass items).
const NO_COLOR = ['photo', 'photoBackdrop', 'hurricane', 'vase']

// Edit the selected item: colour, size, rotation, duplicate, delete.
export default function Inspector({ item, onChange, onDuplicate, onDelete, onClose, onReplaceBackdrop }) {
  const isPhoto = item.type === 'photo'
  const isBackdrop = BACKDROP_TYPES.includes(item.type)
  const name = isPhoto ? item.name || 'Photo' : findLibraryItem(item.type)?.name
  const rotate = (deg) => onChange({ rotY: item.rotY + (deg * Math.PI) / 180 })

  return (
    <aside className="panel inspector" aria-label="Selected item">
      <div className="inspector-head">
        <h2>{name}</h2>
        <button className="chip" onClick={onClose}>Done</button>
      </div>

      {isBackdrop && (
        <div className="field">
          <PhotoUploadButton id="replace-backdrop" mode="backdrop" label="Replace with a photo" onReady={onReplaceBackdrop} />
        </div>
      )}

      {!NO_COLOR.includes(item.type) && (
        <div className="field">
          <label htmlFor="item-color">Colour</label>
          <div className="swatches">
            {QUICK_COLORS.map((c) => (
              <button
                key={c}
                className="swatch"
                style={{ background: c }}
                aria-label={`Colour ${c}`}
                aria-pressed={item.color === c}
                onClick={() => onChange({ color: c })}
              />
            ))}
            <input id="item-color" type="color" value={item.color} onChange={(e) => onChange({ color: e.target.value })} />
          </div>
        </div>
      )}

      <div className="field">
        <label htmlFor="item-size">
          Size <output>{isPhoto ? `${(1.5 * item.scale).toFixed(2)} m tall` : `×${item.scale.toFixed(2)}`}</output>
        </label>
        <input
          id="item-size"
          type="range"
          min="0.3"
          max="2.5"
          step="0.05"
          value={item.scale}
          onChange={(e) => onChange({ scale: parseFloat(e.target.value) })}
        />
      </div>

      {!isPhoto && (
        <div className="field">
          <span className="label">Rotate</span>
          <div className="row">
            <button className="chip" onClick={() => rotate(-15)}>↺ 15°</button>
            <button className="chip" onClick={() => rotate(15)}>↻ 15°</button>
            <button className="chip" onClick={() => rotate(90)}>90°</button>
          </div>
        </div>
      )}

      <div className="row">
        <button className="chip" onClick={onDuplicate}>Duplicate</button>
        <button className="chip danger" onClick={onDelete}>Remove</button>
      </div>
    </aside>
  )
}
