import { useMemo } from 'react'
import * as THREE from 'three'
import { seededRandom } from '../utils/random.js'
import { FlowerCluster, FlowerStrings, FlowerInstances, PampasBunch, GoldMaterial } from './common.jsx'

// Floral decor beyond simple bunches.

function TopBar({ width, y }) {
  return (
    <group>
      <mesh position={[0, y, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.03, 0.03, width + 0.2, 10]} />
        <GoldMaterial />
      </mesh>
      {[-width / 2 - 0.1, width / 2 + 0.1].map((x) => (
        <mesh key={x} position={[x, y / 2, 0]} castShadow>
          <cylinderGeometry args={[0.03, 0.035, y, 10]} />
          <GoldMaterial />
        </mesh>
      ))}
    </group>
  )
}

// Genda phool (marigold) string curtain: a classic haldi/mehendi backdrop.
export function MarigoldCurtain({ seed }) {
  return (
    <group>
      <TopBar width={3} y={2.9} />
      <FlowerStrings width={3} top={2.85} length={2.75} strands={28} kind="marigold" seed={seed} />
    </group>
  )
}

// Jasmine (mogra) string curtain with roses woven in.
export function JasmineCurtain({ palette, seed }) {
  return (
    <group>
      <TopBar width={3} y={2.9} />
      <FlowerStrings width={3} top={2.85} length={2.75} strands={30} kind="mixed" colors={palette.blooms} seed={seed} curve={0.2} />
    </group>
  )
}

// Flower wall: a 2.4 m square wall packed with roses, facing forward.
export function FlowerWall({ palette, seed }) {
  const roses = useMemo(() => {
    const r = seededRandom(seed)
    const list = []
    for (let y = 0.15; y < 2.45; y += 0.085) {
      for (let x = -1.15; x < 1.2; x += 0.085) {
        list.push({
          position: [x + (r() - 0.5) * 0.04, y + (r() - 0.5) * 0.04, 0.05 + r() * 0.03],
          rotation: [Math.PI / 2 + (r() - 0.5) * 0.5, (r() - 0.5) * 0.5, r() * 6],
          scale: 0.75 + r() * 0.35,
          color: palette.blooms[Math.floor(r() * 100) % palette.blooms.length],
        })
      }
    }
    return list
  }, [palette, seed])
  return (
    <group>
      <mesh position={[0, 1.3, -0.02]} castShadow receiveShadow>
        <boxGeometry args={[2.5, 2.6, 0.06]} />
        <meshStandardMaterial color="#3d5a36" roughness={0.9} />
      </mesh>
      <FlowerInstances shape="rose" items={roses} />
    </group>
  )
}

// Floral hoop: a large gold ring on a stand with flowers and pampas on one side.
export function FloralHoop({ color, palette, seed }) {
  const R = 0.95
  const arc = Array.from({ length: 7 }, (_, i) => Math.PI * 0.9 + (i / 6) * Math.PI * 0.75)
  return (
    <group>
      <mesh position={[0, 0.03, 0]}>
        <boxGeometry args={[0.9, 0.06, 0.4]} />
        <GoldMaterial />
      </mesh>
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.15, 8]} />
        <GoldMaterial />
      </mesh>
      <mesh position={[0, R + 0.15, 0]} castShadow>
        <torusGeometry args={[R, 0.025, 12, 80]} />
        <meshStandardMaterial color={color} metalness={1} roughness={0.3} />
      </mesh>
      {arc.map((a, i) => (
        <FlowerCluster key={i} position={[Math.cos(a) * R, R + 0.15 + Math.sin(a) * R, 0.05]} spread={0.35} depth={0.25} count={9} colors={palette.blooms} seed={seed + i} kind="mixed" />
      ))}
      <group position={[-R * 0.75, R + 0.15 - R * 0.62, 0]} rotation={[0, 0, 0.6]}>
        <PampasBunch count={5} height={0.6} seed={seed} />
      </group>
    </group>
  )
}

// Low gold box planter with hydrangeas and roses (aisle or table).
export function HydrangeaBox({ palette, seed }) {
  return (
    <group>
      <mesh position={[0, 0.15, 0]} castShadow>
        <boxGeometry args={[0.5, 0.3, 0.5]} />
        <GoldMaterial />
      </mesh>
      <FlowerCluster position={[0, 0.42, 0]} spread={0.6} depth={0.55} count={14} colors={palette.blooms} seed={seed} kind="hydrangea" />
      <FlowerCluster position={[0, 0.48, 0]} spread={0.45} depth={0.4} count={10} colors={palette.blooms} seed={seed + 2} kind="mixed" />
    </group>
  )
}

// Tall ceramic vase with pampas grass. Colour = the vase colour.
export function PampasVase({ color, seed }) {
  const shape = useMemo(
    () => [[0, 0], [0.14, 0], [0.18, 0.15], [0.17, 0.45], [0.09, 0.62], [0.08, 0.7], [0.1, 0.72], [0, 0.72]].map(([x, y]) => new THREE.Vector2(x, y)),
    []
  )
  return (
    <group>
      <mesh castShadow receiveShadow>
        <latheGeometry args={[shape, 40]} />
        <meshStandardMaterial color={color} roughness={0.6} />
      </mesh>
      <PampasBunch position={[0, 0.65, 0]} count={11} height={1.1} seed={seed} />
    </group>
  )
}

// Low flower arrangement for the aisle edge, with a glass candle.
export function AisleFlowers({ palette, seed }) {
  return (
    <group>
      <FlowerCluster position={[0, 0.15, 0]} spread={0.7} depth={0.5} count={20} colors={palette.blooms} seed={seed} kind="mixed" />
      <mesh position={[0.3, 0.12, 0.25]}>
        <cylinderGeometry args={[0.06, 0.06, 0.24, 16]} />
        <meshPhysicalMaterial color="#ffffff" transmission={0.9} roughness={0.05} thickness={0.05} />
      </mesh>
      <mesh position={[0.3, 0.26, 0.25]} scale={[1, 1.8, 1]}>
        <sphereGeometry args={[0.018, 8, 6]} />
        <meshBasicMaterial color="#ffc070" toneMapped={false} />
      </mesh>
    </group>
  )
}
