import { useThree } from '@react-three/fiber'
import { MODELS } from '../models/index.js'
import { findLibraryItem } from '../data/library.js'
import { groundHeight } from '../data/stage.js'

// Turns an item id like "urn-l" into a number, so each item's
// flowers are arranged a little differently.
function seedFromId(id) {
  let h = 7
  for (const ch of String(id)) h = (h * 31 + ch.charCodeAt(0)) % 100000
  return h
}

// One placed item: positions it, draws its model, shows the gold ring
// when selected, and starts a drag when pressed.
export default function DecorItem({ item, palette, evening, selected, onPress }) {
  const controls = useThree((s) => s.controls)
  const Model = MODELS[item.type]
  if (!Model) return null

  const ringRadius = (findLibraryItem(item.type)?.ring ?? 0.6) * item.scale

  function handlePointerDown(e) {
    e.stopPropagation()
    // Stop the camera from rotating while an item is being dragged.
    if (controls) controls.enabled = false
    onPress(item.id)
  }

  return (
    <group
      position={[item.x, groundHeight(item.x, item.z), item.z]}
      rotation={[0, item.rotY, 0]}
      onPointerDown={handlePointerDown}
      onClick={(e) => e.stopPropagation()}
    >
      <group scale={item.scale}>
        <Model {...item} palette={palette} evening={evening} seed={seedFromId(item.id)} />
      </group>

      {selected && (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
          <ringGeometry args={[ringRadius * 0.92, ringRadius, 64]} />
          <meshBasicMaterial color="#d9b47a" toneMapped={false} />
        </mesh>
      )}
    </group>
  )
}
