import { useMemo } from 'react'
import * as THREE from 'three'
import { FlowerCluster } from './common.jsx'

// Metal urn (vase) overflowing with flowers. Height about 1.6 m.
export default function Urn({ color, palette, seed }) {
  // The vase shape: points of its outline, spun around the centre ("lathe").
  const shape = useMemo(() => {
    const outline = [
      [0.0, 0], [0.22, 0], [0.22, 0.05], [0.1, 0.1], [0.08, 0.3],
      [0.12, 0.45], [0.26, 0.62], [0.3, 0.8], [0.32, 0.86], [0.0, 0.86],
    ]
    return outline.map(([x, y]) => new THREE.Vector2(x, y))
  }, [])

  return (
    <group>
      <mesh castShadow receiveShadow>
        <latheGeometry args={[shape, 40]} />
        <meshStandardMaterial color={color} metalness={0.9} roughness={0.3} side={THREE.DoubleSide} />
      </mesh>
      <FlowerCluster position={[0, 1.08, 0]} spread={0.75} depth={0.6} count={46} colors={palette.blooms} seed={seed} />
      <FlowerCluster position={[0.3, 0.8, 0.12]} spread={0.3} depth={0.25} count={10} colors={palette.blooms} seed={seed + 3} />
      <FlowerCluster position={[-0.28, 0.85, -0.05]} spread={0.28} depth={0.25} count={9} colors={palette.blooms} seed={seed + 5} />
    </group>
  )
}
