import { useMemo } from 'react'
import * as THREE from 'three'
import { FabricSwag, SheerPanel, FlowerCluster, GoldMaterial } from './common.jsx'

// Fabric decor. Colour = the fabric colour.

// Ceiling drape: fabric swags radiating from a centre ring overhead.
// About 8 m across; place it over the dance floor or the guest area.
export function CeilingDrape({ color, palette, seed }) {
  const top = 4.8
  const R = 4
  const swags = Array.from({ length: 10 }, (_, i) => (i / 10) * Math.PI * 2)
  return (
    <group>
      <mesh position={[0, top, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.45, 0.05, 10, 40]} />
        <GoldMaterial />
      </mesh>
      <FlowerCluster position={[0, top - 0.25, 0]} spread={0.7} depth={0.7} count={26} colors={palette.blooms} seed={seed} kind="mixed" />
      {swags.map((a, i) => (
        <FabricSwag
          key={i}
          from={[Math.sin(a) * 0.45, top, Math.cos(a) * 0.45]}
          to={[Math.sin(a) * R, top - 0.3, Math.cos(a) * R]}
          sag={0.6}
          width={0.9}
          color={color}
          opacity={0.85}
        />
      ))}
    </group>
  )
}

// Swag arch: two gold posts with fabric draped across and falling down
// both sides. Good for an entrance or behind a sweetheart table.
export function SwagArch({ color, palette, seed }) {
  const w = 1.4
  const h = 2.6
  return (
    <group>
      {[-w, w].map((x) => (
        <group key={x} position={[x, 0, 0]}>
          <mesh position={[0, h / 2, 0]} castShadow>
            <cylinderGeometry args={[0.04, 0.05, h, 12]} />
            <GoldMaterial />
          </mesh>
          <mesh position={[0, 0.03, 0]}>
            <cylinderGeometry args={[0.2, 0.22, 0.06, 20]} />
            <GoldMaterial />
          </mesh>
          <group position={[0, 0, 0.05]}>
            <SheerPanel width={0.5} height={h} folds={3} color={color} opacity={0.85} />
          </group>
          <FlowerCluster position={[0, h, 0.05]} spread={0.5} depth={0.35} count={16} colors={palette.blooms} seed={seed + (x > 0 ? 1 : 0)} kind="mixed" />
        </group>
      ))}
      <FabricSwag from={[-w, h, 0.05]} to={[w, h, 0.05]} sag={0.55} width={0.6} color={color} opacity={0.9} />
    </group>
  )
}

// Sheer entrance curtains: a gold rod with two panels tied back.
export function SheerCurtains({ color }) {
  const w = 3
  const h = 3
  return (
    <group>
      {[-w / 2, w / 2].map((x) => (
        <mesh key={x} position={[x, h / 2, 0]} castShadow>
          <cylinderGeometry args={[0.035, 0.04, h, 12]} />
          <GoldMaterial />
        </mesh>
      ))}
      <mesh position={[0, h, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.03, 0.03, w + 0.2, 12]} />
        <GoldMaterial />
      </mesh>
      {[-w / 4 - 0.2, w / 4 + 0.2].map((x) => (
        <group key={x} position={[x, 0, 0.05]}>
          <SheerPanel width={1.3} height={h} folds={7} color={color} opacity={0.6} tieback={0.7} />
        </group>
      ))}
    </group>
  )
}

// Pleated fabric wall (backdrop) with a swag valance on top.
export function PleatedBackdrop({ color, palette, seed }) {
  const w = 5.2
  const h = 3.6
  const geometry = useMemo(() => {
    const g = new THREE.PlaneGeometry(w, h, 160, 4)
    const p = g.attributes.position
    for (let i = 0; i < p.count; i++) p.setZ(i, Math.sin((p.getX(i) / w) * Math.PI * 60) * 0.035)
    g.computeVertexNormals()
    g.translate(0, h / 2, 0)
    return g
  }, [])
  return (
    <group>
      <mesh geometry={geometry} castShadow receiveShadow>
        <meshPhysicalMaterial color={color} roughness={0.8} sheen={1} sheenColor="#ffffff" side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, h, 0.02]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.035, 0.035, w + 0.1, 12]} />
        <GoldMaterial />
      </mesh>
      {[-w / 4, w / 4].map((x, i) => (
        <FabricSwag key={x} from={[x - w / 4, h, 0.1]} to={[x + w / 4, h, 0.1]} sag={0.45} width={0.5} color={palette.drape} />
      ))}
      <FlowerCluster position={[0, h - 0.05, 0.15]} spread={0.6} depth={0.3} count={18} colors={palette.blooms} seed={seed} kind="mixed" />
    </group>
  )
}
