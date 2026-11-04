import { useMemo } from 'react'
import * as THREE from 'three'
import { Instances, Instance } from '@react-three/drei'
import { seededRandom } from '../utils/random.js'
import {
  makeRoseGeometry, makeMarigoldGeometry, makeHydrangeaGeometry, makeJasmineGeometry,
  makeBabyBreathGeometry, makePampasGeometry, makeLeafGeometry,
} from '../utils/flowerGeometry.js'

// Polished gold used for trims, legs and stands.
export function GoldMaterial({ color = '#d4af6a' }) {
  return <meshStandardMaterial color={color} metalness={1} roughness={0.28} />
}

// Brass: warmer and a little rougher than gold.
export function BrassMaterial() {
  return <meshStandardMaterial color="#c08a3e" metalness={1} roughness={0.35} />
}

// ---------- Shared flower shapes (built once) ----------
export const SHAPES = {
  rose: makeRoseGeometry(),
  marigold: makeMarigoldGeometry(),
  hydrangea: makeHydrangeaGeometry(),
  jasmine: makeJasmineGeometry(),
  babyBreath: makeBabyBreathGeometry(),
  pampas: makePampasGeometry(),
  leaf: makeLeafGeometry(),
}

export const MARIGOLD_COLORS = ['#f0a12c', '#f7b733', '#e5731f', '#f39a1d']
export const JASMINE_COLORS = ['#fffdf6', '#f9f6e8']
export const PAMPAS_COLORS = ['#e8dcc4', '#efe4cf', '#d9c7a6']

const UP = new THREE.Vector3(0, 1, 0)

// One kind of flower drawn many times in a single draw call.
export function FlowerInstances({ shape, items, side = THREE.DoubleSide, roughness = 0.55, sheen = 0.8, castShadow = true }) {
  if (!items.length) return null
  return (
    <Instances limit={items.length} geometry={SHAPES[shape]} castShadow={castShadow}>
      <meshPhysicalMaterial roughness={roughness} sheen={sheen} sheenRoughness={0.5} sheenColor="#ffffff" side={side} />
      {items.map((b, i) => (
        <Instance key={i} position={b.position} rotation={b.rotation} scale={b.scale} color={b.color} />
      ))}
    </Instances>
  )
}

// A bunch of flowers with leaves.
// kind: 'rose' | 'marigold' | 'hydrangea' | 'mixed' (roses + hydrangea + baby's breath)
// Each flower turns to face outwards from the middle of the bunch.
export function FlowerCluster({ position = [0, 0, 0], spread = 0.6, depth = 0.4, count = 40, colors, seed = 1, kind = 'rose' }) {
  const groups = useMemo(() => {
    const r = seededRandom(seed)
    const q = new THREE.Quaternion()
    const spin = new THREE.Quaternion()
    const euler = new THREE.Euler()
    const out = { rose: [], marigold: [], hydrangea: [], babyBreath: [], leaf: [] }
    const palette = kind === 'marigold' ? MARIGOLD_COLORS : colors

    const total = Math.round(count * (kind === 'marigold' ? 1.8 : 1.3))
    for (let i = 0; i < total; i++) {
      const p = new THREE.Vector3((r() - 0.5) * spread, (r() - 0.5) * spread * 0.9, (r() - 0.5) * depth)
      const dir = p.clone().divideScalar(spread).add(new THREE.Vector3(0, 0.3, 0.45)).normalize()
      q.setFromUnitVectors(UP, dir)
      spin.setFromAxisAngle(dir, r() * Math.PI * 2)
      euler.setFromQuaternion(spin.multiply(q))
      const flower = {
        position: p.toArray(),
        rotation: [euler.x, euler.y, euler.z],
        scale: 0.75 + r() * 0.6,
        color: palette[Math.floor(r() * 100) % palette.length],
      }
      let shape = kind
      if (kind === 'mixed') shape = r() < 0.7 ? 'rose' : 'hydrangea'
      out[shape].push(flower)
      if (kind === 'mixed' && r() < 0.5) {
        out.babyBreath.push({ ...flower, position: p.clone().multiplyScalar(1.12).toArray(), scale: 1, color: '#ffffff' })
      }
      if (i % 3 === 0) {
        out.leaf.push({
          position: [p.x * 1.12, p.y * 1.08, p.z - 0.05],
          rotation: [euler.x + 0.4, euler.y, euler.z],
          scale: 1,
          color: '#3d5a36',
        })
      }
    }
    return out
  }, [count, spread, depth, seed, kind, colors])

  return (
    <group position={position}>
      <FlowerInstances shape="rose" items={groups.rose} />
      <FlowerInstances shape="marigold" items={groups.marigold} side={THREE.FrontSide} sheen={0.3} roughness={0.75} />
      <FlowerInstances shape="hydrangea" items={groups.hydrangea} />
      <FlowerInstances shape="babyBreath" items={groups.babyBreath} castShadow={false} />
      <FlowerInstances shape="leaf" items={groups.leaf} side={THREE.FrontSide} sheen={0} roughness={0.7} castShadow={false} />
    </group>
  )
}

// Hanging flower strings ("ladi"): marigold, jasmine, or both.
// Strands hang from the top (y = top) down by "length", spread across "width".
// kind: 'marigold' | 'jasmine' | 'mixed' (jasmine with a rose every few buds)
export function FlowerStrings({ width = 2, top = 2.5, length = 2, strands = 12, kind = 'marigold', colors, z = 0, seed = 3, curve = 0 }) {
  const groups = useMemo(() => {
    const r = seededRandom(seed)
    const out = { marigold: [], jasmine: [], rose: [] }
    for (let s = 0; s < strands; s++) {
      const x = strands === 1 ? 0 : -width / 2 + (s / (strands - 1)) * width
      // strands can follow an arc (curve > 0 pushes the middle back)
      const zz = z - curve * (1 - Math.pow((2 * x) / width, 2))
      const len = length * (0.85 + r() * 0.15)
      const step = kind === 'marigold' ? 0.075 : 0.03
      const n = Math.floor(len / step)
      for (let k = 0; k < n; k++) {
        const y = top - k * step
        const sway = Math.sin(k * 0.3 + s) * 0.01
        const base = { position: [x + sway, y, zz], rotation: [r() * 3, r() * 3, 0], scale: 0.9 + r() * 0.2 }
        if (kind === 'marigold') {
          out.marigold.push({ ...base, color: MARIGOLD_COLORS[(k + s) % MARIGOLD_COLORS.length] })
        } else if (kind === 'mixed' && k % 9 === 4) {
          out.rose.push({ ...base, scale: 0.6, color: colors?.[k % colors.length] ?? '#c9566f' })
        } else {
          out.jasmine.push({ ...base, rotation: [0, r() * 3, 0], color: JASMINE_COLORS[k % 2] })
        }
      }
    }
    return out
  }, [width, top, length, strands, kind, colors, z, seed, curve])

  return (
    <group>
      <FlowerInstances shape="marigold" items={groups.marigold} side={THREE.FrontSide} sheen={0.3} roughness={0.75} castShadow={false} />
      <FlowerInstances shape="jasmine" items={groups.jasmine} side={THREE.FrontSide} sheen={0.6} castShadow={false} />
      <FlowerInstances shape="rose" items={groups.rose} castShadow={false} />
    </group>
  )
}

// A bunch of pampas grass plumes on thin stems, fanning out from one point.
export function PampasBunch({ position = [0, 0, 0], count = 9, height = 1, seed = 2 }) {
  const plumes = useMemo(() => {
    const r = seededRandom(seed)
    return Array.from({ length: count }, (_, i) => {
      const a = (i / count) * Math.PI * 2 + r()
      const lean = 0.15 + r() * 0.35
      return { a, lean, h: height * (0.8 + r() * 0.4), color: PAMPAS_COLORS[i % 3] }
    })
  }, [count, height, seed])

  return (
    <group position={position}>
      {plumes.map((p, i) => (
        <group key={i} rotation={[Math.sin(p.a) * p.lean, 0, Math.cos(p.a) * p.lean]}>
          <mesh position={[0, p.h / 2, 0]}>
            <cylinderGeometry args={[0.004, 0.006, p.h, 5]} />
            <meshStandardMaterial color="#b49c74" roughness={0.9} />
          </mesh>
          <mesh geometry={SHAPES.pampas} position={[0, p.h - 0.1, 0]} castShadow>
            <meshPhysicalMaterial color={p.color} roughness={0.95} sheen={1} sheenColor="#fff8ea" />
          </mesh>
        </group>
      ))}
    </group>
  )
}

// A soft fabric swag: cloth hanging in a curve between two points.
// The top edge dips a little, the bottom edge dips more, and soft folds
// run along the cloth, the way draped fabric really hangs.
export function FabricSwag({ from, to, sag = 0.5, width = 0.35, color = '#f8f2e8', opacity = 0.9 }) {
  const geometry = useMemo(() => {
    const a = new THREE.Vector3(...from)
    const b = new THREE.Vector3(...to)
    const across = b.clone().sub(a).normalize().cross(new THREE.Vector3(0, 1, 0)).normalize()
    const U = 40
    const V = 8
    const g = new THREE.PlaneGeometry(1, 1, U, V)
    const p = g.attributes.position
    const top = new THREE.Vector3()
    for (let i = 0; i < p.count; i++) {
      const u = p.getX(i) + 0.5 // 0..1 along the swag
      const v = 0.5 - p.getY(i) // 0 top edge .. 1 bottom edge
      const bell = Math.sin(Math.PI * u) // 0 at the ends, 1 in the middle
      top.copy(a).lerp(b, u)
      top.y -= sag * 0.35 * bell
      // the cloth is narrow at the gathered ends and widest in the middle
      const drop = width * (0.25 + 0.75 * bell) * v + sag * 0.65 * bell * v
      const fold = Math.sin(v * Math.PI * 3 + u * 2) * 0.04 * bell
      p.setXYZ(i, top.x + across.x * fold, top.y - drop, top.z + across.z * fold + 0.02 * bell * v)
    }
    g.computeVertexNormals()
    return g
  }, [from, to, sag, width])

  return (
    <mesh geometry={geometry} castShadow>
      <meshPhysicalMaterial color={color} roughness={0.8} sheen={1} sheenColor="#ffffff" transparent={opacity < 1} opacity={opacity} side={THREE.DoubleSide} />
    </mesh>
  )
}

// Pleated sheer fabric hanging straight down (curtains, mandap drapes).
export function SheerPanel({ width = 1.5, height = 3, folds = 8, color = '#fbf6ee', opacity = 0.75, tieback = 0 }) {
  const geometry = useMemo(() => {
    const g = new THREE.PlaneGeometry(width, height, 60, 20)
    const p = g.attributes.position
    for (let i = 0; i < p.count; i++) {
      const x = p.getX(i)
      const t = (p.getY(i) + height / 2) / height // 0 bottom, 1 top
      // pull the lower part in towards the tieback point
      const pinch = tieback > 0 ? 1 - tieback * Math.max(0, Math.sin(Math.PI * (1 - t) * 0.9)) * 0.7 : 1
      p.setX(i, x * pinch)
      p.setZ(i, Math.sin((x / width) * Math.PI * folds * 2) * 0.05 * (0.6 + t))
    }
    g.computeVertexNormals()
    g.translate(0, height / 2, 0)
    return g
  }, [width, height, folds, tieback])

  return (
    <mesh geometry={geometry} castShadow>
      <meshPhysicalMaterial color={color} roughness={0.85} sheen={1} sheenColor="#ffffff" transparent opacity={opacity} side={THREE.DoubleSide} depthWrite={false} />
    </mesh>
  )
}
