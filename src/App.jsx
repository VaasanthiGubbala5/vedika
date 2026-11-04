import { useCallback, useEffect, useState } from 'react'
import Scene from './components/Scene.jsx'
import TopBar from './components/TopBar.jsx'
import LibraryPanel from './components/LibraryPanel.jsx'
import Inspector from './components/Inspector.jsx'
import { findLibraryItem } from './data/library.js'
import { PALETTES } from './data/palettes.js'
import { BACKDROP_TYPES } from './models/index.js'
import { loadDesign, saveDesign, STARTER_DESIGN } from './utils/storage.js'

const newId = () => Math.random().toString(36).slice(2, 9)

// Keep dragged items inside the venue.
const clamp = (v, min, max) => Math.min(max, Math.max(min, v))

export default function App() {
  // Load the saved design once, or start with the sample stage.
  const [initial] = useState(() => loadDesign() ?? STARTER_DESIGN)

  const [items, setItems] = useState(initial.items)
  const [palette, setPalette] = useState(initial.palette)
  const [light, setLight] = useState(initial.light)
  const [selectedId, setSelectedId] = useState(null)
  const [draggingId, setDraggingId] = useState(null)
  const [presenting, setPresenting] = useState(false)
  const [libraryOpen, setLibraryOpen] = useState(false) // used on phones
  const [saveError, setSaveError] = useState(false)

  // Auto-save whenever the design changes.
  useEffect(() => {
    setSaveError(!saveDesign({ items, palette, light }))
  }, [items, palette, light])

  const selected = items.find((i) => i.id === selectedId)

  // ----- actions -----
  function addItem(type) {
    const lib = findLibraryItem(type)
    const count = items.length
    const item = {
      id: newId(),
      type,
      x: ((count % 5) - 2) * 1.2,
      z: 2.5 + Math.floor(count / 5) % 3,
      rotY: 0,
      scale: 1,
      color: lib.color,
    }
    setItems((prev) => [...prev, item])
    setSelectedId(item.id)
    setLibraryOpen(false)
  }

  function addPhoto({ src, aspect, name }) {
    const item = { id: newId(), type: 'photo', src, aspect, name, x: 0, z: 2.5, rotY: 0, scale: 1, color: '#ffffff' }
    setItems((prev) => [...prev, item])
    setSelectedId(item.id)
    setLibraryOpen(false)
  }

  // Swap the current backdrop for one made from a photo.
  // It keeps the old backdrop's place, or goes to the back of the stage.
  function replaceBackdrop({ src, aspect, name }) {
    const old = items.find((i) => BACKDROP_TYPES.includes(i.type))
    const backdrop = {
      id: newId(), type: 'photoBackdrop', src, aspect, name,
      x: old?.x ?? 0, z: old?.z ?? -3.15, rotY: old?.rotY ?? 0, scale: 1, color: '#ffffff',
    }
    setItems((prev) => [...prev.filter((i) => !BACKDROP_TYPES.includes(i.type)), backdrop])
    setSelectedId(backdrop.id)
    setLibraryOpen(false)
  }

  function updateItem(id, patch) {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, ...patch } : i)))
  }

  const moveItem = useCallback((id, x, z) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, x: clamp(x, -10, 10), z: clamp(z, -3.3, 11) } : i)))
  }, [])

  const handlePress = useCallback((id) => {
    setSelectedId(id)
    setDraggingId(id)
  }, [])

  const handleDragEnd = useCallback(() => setDraggingId(null), [])
  const handleDeselect = useCallback(() => setSelectedId(null), [])

  function duplicateSelected() {
    const copy = { ...selected, id: newId(), x: selected.x + 0.8, z: selected.z + 0.4 }
    setItems((prev) => [...prev, copy])
    setSelectedId(copy.id)
  }

  function deleteSelected() {
    setItems((prev) => prev.filter((i) => i.id !== selectedId))
    setSelectedId(null)
  }

  function resetDesign() {
    setItems(STARTER_DESIGN.items)
    setPalette(STARTER_DESIGN.palette)
    setLight(STARTER_DESIGN.light)
    setSelectedId(null)
  }

  function startPresenting() {
    setSelectedId(null)
    setPresenting(true)
  }

  return (
    <div className={`app ${presenting ? 'presenting' : ''}`}>
      <div className="canvas-wrap">
        <Scene
          items={items}
          selectedId={presenting ? null : selectedId}
          draggingId={presenting ? null : draggingId}
          onPress={presenting ? () => {} : handlePress}
          onMove={moveItem}
          onDragEnd={handleDragEnd}
          onDeselect={handleDeselect}
          palette={PALETTES[palette]}
          light={light}
          presenting={presenting}
        />
      </div>

      {presenting ? (
        <div className="present-bar">
          <div className="brand">
            <h1>Vedika</h1>
            <span>Reception stage design</span>
          </div>
          <button className="chip" onClick={() => setPresenting(false)}>Exit presentation</button>
        </div>
      ) : (
        <>
          <TopBar
            palette={palette}
            setPalette={setPalette}
            light={light}
            setLight={setLight}
            onPresent={startPresenting}
            onReset={resetDesign}
            saveError={saveError}
          />

          <div className={`side ${libraryOpen ? 'open' : ''}`}>
            {selected ? (
              <Inspector
                item={selected}
                onChange={(patch) => updateItem(selected.id, patch)}
                onDuplicate={duplicateSelected}
                onDelete={deleteSelected}
                onClose={() => setSelectedId(null)}
                onReplaceBackdrop={replaceBackdrop}
              />
            ) : (
              <LibraryPanel onAdd={addItem} onAddPhoto={addPhoto} onReplaceBackdrop={replaceBackdrop} />
            )}
          </div>

          {!selected && (
            <button className="chip primary fab" onClick={() => setLibraryOpen((o) => !o)}>
              {libraryOpen ? 'Close library' : '+ Add decor'}
            </button>
          )}
        </>
      )}
    </div>
  )
}
