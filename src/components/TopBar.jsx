import { useState } from 'react'
import { PALETTES } from '../data/palettes.js'

export default function TopBar({ palette, setPalette, light, setLight, onPresent, onReset, saveError }) {
  const [confirmReset, setConfirmReset] = useState(false)

  function handleReset() {
    if (!confirmReset) {
      setConfirmReset(true)
      setTimeout(() => setConfirmReset(false), 3000)
      return
    }
    setConfirmReset(false)
    onReset()
  }

  return (
    <header className="topbar">
      <div className="brand">
        <h1>Vedika</h1>
        <span>{saveError ? 'Not saved: browser storage is full' : 'Saved on this device'}</span>
      </div>

      <div className="topbar-controls">
        <div className="chip-group" role="group" aria-label="Theme">
          {Object.entries(PALETTES).map(([key, p]) => (
            <button key={key} className="chip" aria-pressed={palette === key} onClick={() => setPalette(key)}>
              <span className="dot" style={{ background: p.swatch }} />
              {p.label}
            </button>
          ))}
        </div>
        <div className="chip-group" role="group" aria-label="Lighting">
          <button className="chip" aria-pressed={light === 'evening'} onClick={() => setLight('evening')}>Evening</button>
          <button className="chip" aria-pressed={light === 'day'} onClick={() => setLight('day')}>Day</button>
        </div>
        <button className="chip" onClick={handleReset}>{confirmReset ? 'Tap again to reset' : 'Reset design'}</button>
        <button className="chip primary" onClick={onPresent}>Present to client</button>
      </div>
    </header>
  )
}
