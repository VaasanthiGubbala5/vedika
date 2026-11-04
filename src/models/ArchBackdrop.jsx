import { useMemo } from 'react'
import * as THREE from 'three'
import { FlowerCluster, GoldMaterial } from './common.jsx'

// Big arched backdrop panel with a gold outline and flower corners.
// About 5 m wide and 4 m tall.
const W = 2.4 // half width
const H = 1.6 // straight part before the curve starts

export default function ArchBackdrop({ color, palette, seed }) {
  const { panel, outline } = useMemo(() => {
    const shape = new THREE.Shape()
    shape.moveTo(-W, 0)
    shape.lineTo(-W, H)
    shape.absarc(0, H, W, Math.PI, 0, true)
    shape.lineTo(W, 0)
    shape.lineTo(-W, 0)
    const panel = new THREE.ExtrudeGeometry(shape, {
      depth: 0.12, bevelEnabled: true, bevelSize: 0.03, bevelThickness: 0.03, bevelSegments: 2, curveSegments: 48,
    })

    const r = W + 0.06
    const points = [new THREE.Vector3(r, 0, 0), new THREE.Vector3(r, H, 0)]
    for (let i = 1; i < 64; i++) {
      const a = (Math.PI * i) / 64
      points.push(new THREE.Vector3(Math.cos(a) * r, H + Math.sin(a) * r, 0))
    }
    points.push(new THREE.Vector3(-r, H, 0), new THREE.Vector3(-r, 0, 0))
    const outline = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), 160, 0.035, 8, false)
    return { panel, outline }
  }, [])

  return (
    <group>
      <mesh geometry={panel} position={[0, 0, -0.15]} castShadow receiveShadow>
        <meshStandardMaterial color={color} roughness={0.6} />
      </mesh>
      <mesh geometry={outline} position={[0, 0, 0.02]}>
        <GoldMaterial />
      </mesh>
      {/* flowers: lower corners spill onto the floor, smaller bunches up the sides */}
      <FlowerCluster position={[-2.2, 0.5, 0.15]} spread={1.1} depth={0.5} count={60} colors={palette.blooms} seed={seed} />
      <FlowerCluster position={[2.2, 0.5, 0.15]} spread={1.1} depth={0.5} count={60} colors={palette.blooms} seed={seed + 1} />
      <FlowerCluster position={[-2.45, 1.6, 0.1]} spread={0.5} depth={0.3} count={20} colors={palette.blooms} seed={seed + 2} />
      <FlowerCluster position={[2.45, 1.6, 0.1]} spread={0.5} depth={0.3} count={20} colors={palette.blooms} seed={seed + 3} />
      <FlowerCluster position={[-1.75, 3.4, 0.1]} spread={0.55} depth={0.3} count={22} colors={palette.blooms} seed={seed + 4} />
      <FlowerCluster position={[1.75, 3.4, 0.1]} spread={0.55} depth={0.3} count={22} colors={palette.blooms} seed={seed + 5} />
    </group>
  )
}
