import { useEffect } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls, Environment, Lightformer } from '@react-three/drei'
import Stage from './Stage.jsx'
import DecorItem from './DecorItem.jsx'

// Everything inside the 3D view.
export default function Scene({ items, selectedId, draggingId, onPress, onMove, onDragEnd, onDeselect, palette, light, presenting }) {
  const evening = light === 'evening'
  const bg = evening ? '#120d14' : '#d9cfc8'

  return (
    <Canvas shadows dpr={[1, 2]} camera={{ position: [6, 3.8, 12.5], fov: 50 }}>
      <color attach="background" args={[bg]} />
      <fog attach="fog" args={[bg, 18, 38]} />
      <Exposure value={evening ? 0.9 : 1.0} />
      <ResponsiveCamera />

      <Lights evening={evening} />

      {/* Soft studio reflections. Remounted (key) when the light mode changes. */}
      <Environment key={light} resolution={256}>
        <Lightformer form="rect" intensity={evening ? 0.5 : 1.6} position={[0, 6, 6]} scale={[12, 4, 1]} color="#fff1e0" />
        <Lightformer form="rect" intensity={evening ? 0.25 : 0.9} position={[-7, 3, 0]} scale={[8, 3, 1]} color="#ffd9c0" />
        <Lightformer form="rect" intensity={evening ? 0.25 : 0.9} position={[7, 3, 0]} scale={[8, 3, 1]} color="#ffe6ee" />
      </Environment>

      <Stage palette={palette} evening={evening} />

      {items.map((item) => (
        <DecorItem
          key={item.id}
          item={item}
          palette={palette}
          evening={evening}
          selected={item.id === selectedId}
          onPress={onPress}
        />
      ))}

      <DragCatcher draggingId={draggingId} onMove={onMove} onDragEnd={onDragEnd} onDeselect={onDeselect} />

      <OrbitControls
        makeDefault
        target={[0, 1.4, -1.5]}
        enablePan={false}
        enableDamping
        minDistance={4}
        maxDistance={20}
        maxPolarAngle={Math.PI * 0.48}
        autoRotate={presenting}
        autoRotateSpeed={0.6}
      />
    </Canvas>
  )
}

// Phones held upright see less from side to side, so widen the view.
function ResponsiveCamera() {
  const camera = useThree((s) => s.camera)
  const width = useThree((s) => s.size.width)
  const height = useThree((s) => s.size.height)
  useEffect(() => {
    camera.fov = width < height ? 68 : 50
    camera.updateProjectionMatrix()
  }, [camera, width, height])
  return null
}

function Exposure({ value }) {
  const gl = useThree((s) => s.gl)
  useEffect(() => {
    gl.toneMappingExposure = value
  }, [gl, value])
  return null
}

function Lights({ evening }) {
  return (
    <>
      <hemisphereLight args={[evening ? '#ffe9d6' : '#ffffff', '#2a2026', evening ? 0.35 : 1.1]} />
      <directionalLight
        position={[5, 9, 7]}
        intensity={evening ? 1.4 : 2.4}
        color={evening ? '#ffd9b0' : '#fff6ea'}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0004}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      {/* warm glow behind the backdrop, strongest in the evening */}
      <pointLight position={[-2.5, 2, -3.2]} color="#ffb870" intensity={evening ? 5 : 1} distance={7} />
      <pointLight position={[2.5, 2, -3.2]} color="#ffb870" intensity={evening ? 5 : 1} distance={7} />
      <pointLight position={[0, 4.5, -3.2]} color="#ffc890" intensity={evening ? 4 : 0.5} distance={8} />
    </>
  )
}

// An invisible floor that follows the finger or mouse while dragging,
// and deselects when the empty floor is tapped.
function DragCatcher({ draggingId, onMove, onDragEnd, onDeselect }) {
  const controls = useThree((s) => s.controls)

  useEffect(() => {
    function up() {
      if (controls) controls.enabled = true
      onDragEnd()
    }
    window.addEventListener('pointerup', up)
    window.addEventListener('pointercancel', up)
    return () => {
      window.removeEventListener('pointerup', up)
      window.removeEventListener('pointercancel', up)
    }
  }, [controls, onDragEnd])

  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, 0.001, 0]}
      onPointerMove={(e) => draggingId && onMove(draggingId, e.point.x, e.point.z)}
      onClick={(e) => e.delta < 6 && onDeselect()}
    >
      <planeGeometry args={[80, 80]} />
      <meshBasicMaterial transparent opacity={0} depthWrite={false} />
    </mesh>
  )
}
