import { useMemo } from 'react'
import * as THREE from 'three'
import { Instances, Instance } from '@react-three/drei'
import { seededRandom } from '../utils/random.js'
import { makeRoseGeometry } from '../utils/roseGeometry.js'

// Polished gold used for trims, legs and stands.
export function GoldMaterial({ color = '#d4af6a' }) {
  return <meshStandardMaterial color={color} metalness={1} roughness={0.28} />
}

// One rose shape and one leaf shape, shared by every flower cluster.
const ROSE = makeRoseGeometry()
const LEAF = (() => {
  const g = new THREE.SphereGeometry(0.06, 8, 6)
  g.scale(1.7, 0.25, 0.8)
  return g
})()

const UP = new THREE.Vector3(0, 1, 0)

// A bunch of roses with leaves.
// "Instances" draws them all in one go, which keeps phones fast.
// Each rose is turned to face outwards from the middle of the bunch.
export function FlowerCluster({ position = [0, 0, 0], spread = 0.6, depth = 0.4, count = 40, colors, seed = 1 }) {
  const blooms = useMemo(() => {
    const r = seededRandom(seed)
    const q = new THREE.Quaternion()
    const spin = new THREE.Quaternion()
    const euler = new THREE.Euler()
    return Array.from({ length: Math.round(count * 1.3) }, () => {
      const p = new THREE.Vector3((r() - 0.5) * spread, (r() - 0.5) * spread * 0.9, (r() - 0.5) * depth)
      // face away from the centre, a little upwards and towards the guests
      const dir = p.clone().divideScalar(spread).add(new THREE.Vector3(0, 0.3, 0.45)).normalize()
      q.setFromUnitVectors(UP, dir)
      spin.setFromAxisAngle(dir, r() * Math.PI * 2)
      euler.setFromQuaternion(spin.multiply(q))
      return {
        position: p.toArray(),
        rotation: [euler.x, euler.y, euler.z],
        scale: 0.75 + r() * 0.6,
        colorIndex: Math.floor(r() * 100),
      }
    })
  }, [count, spread, depth, seed])

  const leaves = blooms.filter((_, i) => i % 3 === 0)

  return (
    <group position={position}>
      <Instances limit={blooms.length} geometry={ROSE} castShadow>
        <meshPhysicalMaterial roughness={0.55} sheen={0.8} sheenRoughness={0.5} sheenColor="#ffffff" side={THREE.DoubleSide} />
        {blooms.map((b, i) => (
          <Instance key={i} position={b.position} rotation={b.rotation} scale={b.scale} color={colors[b.colorIndex % colors.length]} />
        ))}
      </Instances>
      <Instances limit={leaves.length} geometry={LEAF}>
        <meshStandardMaterial color="#3d5a36" roughness={0.7} />
        {leaves.map((b, i) => (
          <Instance
            key={i}
            position={[b.position[0] * 1.12, b.position[1] * 1.08, b.position[2] - 0.05]}
            rotation={[b.rotation[0] + 0.4, b.rotation[1], b.rotation[2]]}
          />
        ))}
      </Instances>
    </group>
  )
}
