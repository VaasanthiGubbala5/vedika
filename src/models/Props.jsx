import { useMemo } from 'react'
import * as THREE from 'three'
import { seededRandom } from '../utils/random.js'
import { makeTextTexture } from '../utils/textTexture.js'
import {
  FlowerCluster, FlowerStrings, FlowerInstances, GoldMaterial, BrassMaterial, MARIGOLD_COLORS,
} from './common.jsx'

// Trending wedding props.

const SCRIPT_FONT = (s) => `italic 600 ${s}px "Brush Script MT", "Segoe Script", "Snell Roundhand", cursive`
const SERIF_FONT = (s) => `500 ${s}px "Italiana", Georgia, "Times New Roman", serif`

// A flame that glows brighter than the scene.
function Flame({ position, size = 0.02 }) {
  return (
    <mesh position={position} scale={[1, 1.8, 1]}>
      <sphereGeometry args={[size, 8, 6]} />
      <meshBasicMaterial color="#ffb85c" toneMapped={false} />
    </mesh>
  )
}

// ---------- Neon sign on a greenery wall ----------
// Text and colour are editable (colour = neon colour).
export function NeonSign({ color, text }) {
  const texture = useMemo(
    () => makeTextTexture({ text: text || 'Forever begins', font: SCRIPT_FONT, color, glow: 28, width: 1024, height: 512 }),
    [text, color]
  )
  const leaves = useMemo(() => {
    const r = seededRandom(4)
    return Array.from({ length: 900 }, () => ({
      position: [(r() - 0.5) * 2.1, 0.2 + r() * 1.7, 0.03 + r() * 0.04],
      rotation: [r() * 6, r() * 6, r() * 6],
      scale: 0.5 + r() * 0.4,
      color: ['#2f5a2a', '#3d6e33', '#26492a', '#4a7d3a'][Math.floor(r() * 4)],
    }))
  }, [])
  return (
    <group>
      <mesh position={[0, 1.05, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.2, 1.9, 0.05]} />
        <meshStandardMaterial color="#26442a" roughness={0.9} />
      </mesh>
      <FlowerInstances shape="leaf" items={leaves} side={THREE.FrontSide} sheen={0} roughness={0.7} castShadow={false} />
      <mesh position={[0, 1.15, 0.1]}>
        <planeGeometry args={[2, 1]} />
        <meshBasicMaterial map={texture} transparent toneMapped={false} depthWrite={false} />
      </mesh>
      <pointLight position={[0, 1.15, 0.5]} color={color} intensity={1.2} distance={2.5} />
      {/* small stand feet */}
      {[-0.9, 0.9].map((x) => (
        <mesh key={x} position={[x, 0.05, 0]}>
          <boxGeometry args={[0.1, 0.1, 0.4]} />
          <meshStandardMaterial color="#1f1f1f" />
        </mesh>
      ))}
    </group>
  )
}

// ---------- Welcome board on an easel ----------
// Text is editable; colour = the board colour.
export function WelcomeBoard({ color, text, palette, seed }) {
  const texture = useMemo(
    () => makeTextTexture({
      text: text || 'Welcome to the wedding of\nRavi & Sita',
      font: SERIF_FONT,
      color: '#5a4630',
      background: color,
      width: 768,
      height: 1024,
      lineHeight: 1.3,
    }),
    [text, color]
  )
  return (
    <group>
      {/* easel legs */}
      {[[-0.28, 0.12, 0.25], [0.28, 0.12, -0.25], [0, -0.42, 0]].map(([x, z, tilt], i) => (
        <mesh key={i} position={[x, 0.85, z]} rotation={[tilt, 0, x * -0.15]} castShadow>
          <boxGeometry args={[0.035, 1.75, 0.035]} />
          <GoldMaterial />
        </mesh>
      ))}
      <mesh position={[0, 1.2, 0.2]} rotation={[-0.12, 0, 0]} castShadow>
        <boxGeometry args={[0.66, 0.86, 0.025]} />
        <GoldMaterial />
      </mesh>
      <mesh position={[0, 1.2, 0.215]} rotation={[-0.12, 0, 0]}>
        <planeGeometry args={[0.6, 0.8]} />
        <meshStandardMaterial map={texture} roughness={0.7} />
      </mesh>
      <FlowerCluster position={[-0.3, 1.58, 0.25]} spread={0.35} depth={0.2} count={9} colors={palette.blooms} seed={seed} kind="mixed" />
      <FlowerCluster position={[0.3, 0.82, 0.3]} spread={0.3} depth={0.2} count={7} colors={palette.blooms} seed={seed + 1} kind="mixed" />
    </group>
  )
}

// ---------- Brass urli with floating flowers and candles ----------
export function BrassUrli({ palette, seed }) {
  const bowl = useMemo(
    () => [[0, 0.05], [0.18, 0.05], [0.32, 0.1], [0.42, 0.2], [0.45, 0.24], [0.43, 0.25]].map(([x, y]) => new THREE.Vector2(x, y)),
    []
  )
  const floating = useMemo(() => {
    const r = seededRandom(seed)
    return Array.from({ length: 14 }, () => {
      const a = r() * Math.PI * 2
      const d = 0.1 + r() * 0.26
      return {
        position: [Math.cos(a) * d, 0.2, Math.sin(a) * d],
        rotation: [-Math.PI / 2 + 0.3, 0, r() * 6],
        scale: 0.9,
        color: r() < 0.5 ? MARIGOLD_COLORS[0] : palette.blooms[Math.floor(r() * palette.blooms.length)],
      }
    })
  }, [palette, seed])
  return (
    <group>
      <mesh position={[0, 0.03, 0]}>
        <cylinderGeometry args={[0.16, 0.2, 0.06, 24]} />
        <BrassMaterial />
      </mesh>
      <mesh castShadow receiveShadow>
        <latheGeometry args={[bowl, 48]} />
        <meshStandardMaterial color="#c08a3e" metalness={1} roughness={0.3} side={THREE.DoubleSide} />
      </mesh>
      {/* water */}
      <mesh position={[0, 0.19, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.4, 40]} />
        <meshPhysicalMaterial color="#7fa7b0" roughness={0.05} transmission={0.5} transparent opacity={0.85} />
      </mesh>
      <FlowerInstances shape="rose" items={floating.slice(0, 8)} />
      <FlowerInstances shape="marigold" items={floating.slice(8)} side={THREE.FrontSide} sheen={0.3} />
      {[[0.22, 0.1], [-0.2, -0.15], [0, 0.25], [-0.1, 0.12]].map(([x, z], i) => (
        <group key={i} position={[x, 0.2, z]}>
          <mesh>
            <cylinderGeometry args={[0.035, 0.035, 0.04, 14]} />
            <meshStandardMaterial color="#fff6e8" />
          </mesh>
          <Flame position={[0, 0.05, 0]} size={0.012} />
        </group>
      ))}
    </group>
  )
}

// ---------- Kuthu vilakku: tall South Indian brass lamp ----------
export function KuthuVilakku() {
  const body = useMemo(
    () => [
      [0, 0], [0.22, 0], [0.22, 0.04], [0.12, 0.1], [0.05, 0.16], [0.04, 0.3], [0.07, 0.34], [0.04, 0.38],
      [0.035, 0.75], [0.07, 0.8], [0.035, 0.85], [0.03, 1.05], [0.16, 1.1], [0.18, 1.14], [0.04, 1.16],
      [0.03, 1.3], [0.06, 1.34], [0.02, 1.45], [0, 1.5],
    ].map(([x, y]) => new THREE.Vector2(x, y)),
    []
  )
  const wicks = Array.from({ length: 5 }, (_, i) => (i / 5) * Math.PI * 2)
  return (
    <group>
      <mesh castShadow>
        <latheGeometry args={[body, 40]} />
        <meshStandardMaterial color="#c99a45" metalness={1} roughness={0.3} />
      </mesh>
      {wicks.map((a, i) => (
        <Flame key={i} position={[Math.cos(a) * 0.17, 1.2, Math.sin(a) * 0.17]} />
      ))}
      <pointLight position={[0, 1.3, 0]} color="#ffae5c" intensity={1.2} distance={3} />
      {/* jasmine garland around the stem */}
      <FlowerStrings width={0.01} top={1.0} length={0.4} strands={1} kind="jasmine" z={0.05} />
    </group>
  )
}

// ---------- Crystal chandelier (hangs from above) ----------
export function Chandelier({ color }) {
  const crystals = useMemo(() => {
    const list = []
    ;[0.6, 0.42, 0.25].forEach((R, tier) => {
      const n = Math.round(R * 40)
      for (let i = 0; i < n; i++) {
        const a = (i / n) * Math.PI * 2
        list.push({ position: [Math.cos(a) * R, -tier * 0.28 - 0.1 - (i % 2) * 0.06, Math.sin(a) * R] })
      }
    })
    return list
  }, [])
  const y = 3.9
  return (
    <group position={[0, y, 0]}>
      <mesh position={[0, 0.6, 0]}>
        <cylinderGeometry args={[0.01, 0.01, 1.2, 6]} />
        <GoldMaterial color={color} />
      </mesh>
      {[0.6, 0.42, 0.25].map((R, i) => (
        <mesh key={R} position={[0, -i * 0.28, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[R, 0.015, 8, 48]} />
          <GoldMaterial color={color} />
        </mesh>
      ))}
      {crystals.map((c, i) => (
        <mesh key={i} position={c.position}>
          <octahedronGeometry args={[0.025]} />
          <meshPhysicalMaterial color="#ffffff" roughness={0} metalness={0} ior={2} transmission={0.6} thickness={0.05} />
        </mesh>
      ))}
      {Array.from({ length: 8 }, (_, i) => (i / 8) * Math.PI * 2).map((a, i) => (
        <Flame key={i} position={[Math.cos(a) * 0.42, -0.2, Math.sin(a) * 0.42]} size={0.025} />
      ))}
      <pointLight position={[0, -0.4, 0]} color="#ffd9a0" intensity={3} distance={6} />
    </group>
  )
}

// ---------- Moroccan floor lanterns (set of three) ----------
function Lantern({ height, color }) {
  const bars = Array.from({ length: 8 }, (_, i) => (i / 8) * Math.PI * 2)
  const r = height * 0.22
  return (
    <group>
      {bars.map((a, i) => (
        <mesh key={i} position={[Math.cos(a) * r, height / 2, Math.sin(a) * r]}>
          <boxGeometry args={[0.012, height * 0.8, 0.012]} />
          <meshStandardMaterial color={color} metalness={1} roughness={0.35} />
        </mesh>
      ))}
      <mesh position={[0, 0.03, 0]}>
        <cylinderGeometry args={[r * 1.05, r * 1.1, 0.06, 8]} />
        <meshStandardMaterial color={color} metalness={1} roughness={0.35} />
      </mesh>
      <mesh position={[0, height * 0.92, 0]}>
        <coneGeometry args={[r * 1.1, height * 0.25, 8]} />
        <meshStandardMaterial color={color} metalness={1} roughness={0.35} />
      </mesh>
      <mesh position={[0, height * 0.42, 0]}>
        <cylinderGeometry args={[r * 0.75, r * 0.75, height * 0.55, 16]} />
        <meshStandardMaterial color="#ffcf8a" emissive="#ffb050" emissiveIntensity={1.4} transparent opacity={0.55} />
      </mesh>
    </group>
  )
}

export function FloorLanterns({ color }) {
  return (
    <group>
      <group position={[-0.3, 0, 0.1]}><Lantern height={0.6} color={color} /></group>
      <group position={[0.25, 0, 0.15]}><Lantern height={0.85} color={color} /></group>
      <group position={[0, 0, -0.25]}><Lantern height={1.15} color={color} /></group>
      <pointLight position={[0, 0.5, 0.3]} color="#ffb060" intensity={1} distance={2.5} />
    </group>
  )
}

// ---------- Jhoola (swing) wrapped in marigolds: haldi & mehendi ----------
export function Jhoola({ color, palette, seed }) {
  const w = 2.2
  const h = 2.5
  return (
    <group>
      {/* A-frame legs and top beam */}
      {[-w / 2, w / 2].map((x) => (
        <group key={x} position={[x, 0, 0]}>
          {[-0.35, 0.35].map((z) => (
            <mesh key={z} position={[0, h / 2, z / 2]} rotation={[z > 0 ? -0.14 : 0.14, 0, 0]} castShadow>
              <cylinderGeometry args={[0.05, 0.06, h + 0.05, 10]} />
              <meshStandardMaterial color={color} roughness={0.6} />
            </mesh>
          ))}
        </group>
      ))}
      <mesh position={[0, h, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.055, 0.055, w + 0.2, 12]} />
        <meshStandardMaterial color={color} roughness={0.6} />
      </mesh>
      <FlowerStrings width={w} top={h - 0.05} length={0.6} strands={22} kind="marigold" seed={seed} />
      {/* ropes covered with flowers, and the seat */}
      {[-0.6, 0.6].map((x, i) => (
        <group key={x} position={[x, 0, 0]}>
          <FlowerStrings width={0.01} top={h - 0.05} length={1.9} strands={1} kind="marigold" z={0} seed={seed + i} />
        </group>
      ))}
      <mesh position={[0, 0.55, 0]} castShadow>
        <boxGeometry args={[1.4, 0.08, 0.6]} />
        <meshStandardMaterial color={color} roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.64, 0]} castShadow>
        <boxGeometry args={[1.3, 0.1, 0.55]} />
        <meshPhysicalMaterial color="#f7c33d" roughness={0.85} sheen={0.6} />
      </mesh>
      <FlowerCluster position={[0, 0.5, 0.3]} spread={1.3} depth={0.2} count={14} colors={palette.blooms} seed={seed + 5} kind="marigold" />
    </group>
  )
}

// ---------- Decorative umbrellas (chhatri): haldi & mehendi ----------
function Umbrella({ color, height }) {
  const tassels = Array.from({ length: 16 }, (_, i) => (i / 16) * Math.PI * 2)
  return (
    <group>
      <mesh position={[0, height / 2, 0]}>
        <cylinderGeometry args={[0.015, 0.015, height, 8]} />
        <GoldMaterial />
      </mesh>
      <mesh position={[0, height, 0]} castShadow>
        <coneGeometry args={[0.55, 0.3, 16, 1, true]} />
        <meshPhysicalMaterial color={color} roughness={0.7} sheen={0.8} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, height - 0.15, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.55, 0.012, 6, 48]} />
        <GoldMaterial />
      </mesh>
      {tassels.map((a, i) => (
        <mesh key={i} position={[Math.cos(a) * 0.55, height - 0.24, Math.sin(a) * 0.55]}>
          <cylinderGeometry args={[0.008, 0.015, 0.16, 5]} />
          <meshStandardMaterial color={i % 2 ? '#d4af6a' : '#e0408a'} />
        </mesh>
      ))}
    </group>
  )
}

export function Chhatris({ color }) {
  return (
    <group>
      <group position={[-0.5, 0, 0]} rotation={[0, 0, 0.12]}><Umbrella color={color} height={2.1} /></group>
      <group position={[0.5, 0, 0.1]} rotation={[0, 0, -0.1]}><Umbrella color="#e0408a" height={2.4} /></group>
      <group position={[0, 0, -0.4]}><Umbrella color="#f0a12c" height={2.7} /></group>
    </group>
  )
}
