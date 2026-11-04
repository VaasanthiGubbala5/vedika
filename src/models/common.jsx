import { useMemo } from 'react'
import { Instances, Instance } from '@react-three/drei'
import { seededRandom } from '../utils/random.js'

// Polished gold used for trims, legs and stands.
export function GoldMaterial({ color = '#d4af6a' }) {
  return <meshStandardMaterial color={color} metalness={1} roughness={0.28} />
}

// A bunch of flowers with a few leaves.
// Each flower is one small sphere; "Instances" draws them all in one go,
// which keeps phones fast even with hundreds of flowers.
export function FlowerCluster({ position = [0, 0, 0], spread = 0.6, depth = 0.4, count = 40, colors, seed = 1 }) {
  const blooms = useMemo(() => {
    const r = seededRandom(seed)
    // 1.6x more, smaller flowers look softer and more real
    return Array.from({ length: Math.round(count * 1.6) }, () => ({
      position: [(r() - 0.5) * spread, (r() - 0.5) * spread * 0.9, (r() - 0.5) * depth],
      scale: 0.7 + r() * 0.7,
      rotation: [r() * 3, r() * 3, 0],
      colorIndex: Math.floor(r() * 100),
    }))
  }, [count, spread, depth, seed])

  const leaves = blooms.filter((_, i) => i % 3 === 0)

  return (
    <group position={position}>
      <Instances limit={blooms.length} castShadow>
        <icosahedronGeometry args={[0.078, 1]} />
        <meshPhysicalMaterial roughness={0.65} sheen={0.5} sheenColor="#ffffff" />
        {blooms.map((b, i) => (
          <Instance
            key={i}
            position={b.position}
            scale={b.scale}
            rotation={b.rotation}
            color={colors[b.colorIndex % colors.length]}
          />
        ))}
      </Instances>
      <Instances limit={leaves.length}>
        <sphereGeometry args={[0.08, 8, 6]} />
        <meshStandardMaterial color="#3f5d3a" roughness={0.8} />
        {leaves.map((b, i) => (
          <Instance
            key={i}
            position={[b.position[0] * 1.15, b.position[1] * 1.1, b.position[2] - 0.04]}
            scale={[1.6, 0.35, 0.8]}
            rotation={[0.3, b.rotation[0], 0.4]}
          />
        ))}
      </Instances>
    </group>
  )
}
