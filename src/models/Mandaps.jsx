import { useMemo } from 'react'
import * as THREE from 'three'
import {
  FlowerCluster, FlowerStrings, PampasBunch, SheerPanel, FabricSwag, GoldMaterial, BrassMaterial,
} from './common.jsx'

// Four wedding mandaps. Each is about 3.6 m square and 4 m tall,
// with its own raised platform, a havan kund (sacred fire) in the middle
// and two seats for the couple.

const HALF = 1.45 // distance from the centre to each pillar

const CORNERS = [[-HALF, -HALF], [HALF, -HALF], [-HALF, HALF], [HALF, HALF]]

function MandapBase({ color = '#f6efe4' }) {
  return (
    <group>
      <mesh position={[0, 0.12, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.7, 0.24, 3.7]} />
        <meshStandardMaterial color={color} roughness={0.5} />
      </mesh>
      {/* gold band around the sides of the platform */}
      <mesh position={[0, 0.12, 0]}>
        <boxGeometry args={[3.74, 0.04, 3.74]} />
        <GoldMaterial />
      </mesh>
      <HavanKund />
      {/* seats for the couple */}
      {[-0.5, 0.5].map((x) => (
        <mesh key={x} position={[x, 0.36, 0.75]} castShadow>
          <boxGeometry args={[0.6, 0.22, 0.6]} />
          <meshPhysicalMaterial color="#7a1e32" roughness={0.85} sheen={0.6} sheenColor="#ffb8c8" />
        </mesh>
      ))}
    </group>
  )
}

// The sacred fire: a small stepped brass pit with a flame.
function HavanKund() {
  return (
    <group position={[0, 0.25, 0]}>
      {[0.5, 0.4, 0.3].map((s, i) => (
        <mesh key={s} position={[0, 0.04 + i * 0.07, 0]} castShadow>
          <boxGeometry args={[s, 0.07, s]} />
          <BrassMaterial />
        </mesh>
      ))}
      <mesh position={[0, 0.32, 0]} scale={[1, 1.6, 1]}>
        <coneGeometry args={[0.07, 0.16, 12]} />
        <meshBasicMaterial color="#ffa040" toneMapped={false} />
      </mesh>
      <pointLight position={[0, 0.45, 0]} color="#ff9a40" intensity={1.5} distance={3} />
    </group>
  )
}

// ---------------------------------------------------------------
// 1. Floral canopy mandap: four pillars and a roof covered in flowers,
//    with jasmine and rose strings hanging on every side.
// ---------------------------------------------------------------
export function FloralCanopyMandap({ color, palette, seed }) {
  const roofY = 3.3
  return (
    <group>
      <MandapBase />
      {CORNERS.map(([x, z], i) => (
        <group key={i} position={[x, 0.25, z]}>
          <mesh position={[0, 1.5, 0]} castShadow>
            <cylinderGeometry args={[0.09, 0.11, 3, 20]} />
            <meshStandardMaterial color={color} roughness={0.4} />
          </mesh>
          <FlowerCluster position={[0, 0.25, 0]} spread={0.55} depth={0.55} count={22} colors={palette.blooms} seed={seed + i} kind="mixed" />
          <FlowerCluster position={[0, 1.6, 0]} spread={0.3} depth={0.3} count={8} colors={palette.blooms} seed={seed + i + 9} />
        </group>
      ))}
      {/* roof frame */}
      <mesh position={[0, roofY, 0]}>
        <boxGeometry args={[3.1, 0.08, 3.1]} />
        <GoldMaterial />
      </mesh>
      {/* flower canopy on the roof: a 3 x 3 grid of bunches */}
      {[-1, 0, 1].map((gx) => [-1, 0, 1].map((gz) => (
        <FlowerCluster
          key={`${gx}${gz}`}
          position={[gx * 1, roofY + 0.18, gz * 1]}
          spread={1.2}
          depth={1.1}
          count={30}
          colors={palette.blooms}
          seed={seed + gx * 3 + gz + 20}
          kind="mixed"
        />
      )))}
      {/* jasmine strings on the front and back, and on both sides */}
      <FlowerStrings width={2.8} top={roofY - 0.05} length={1.1} strands={22} kind="mixed" colors={palette.blooms} z={HALF} seed={seed} />
      <FlowerStrings width={2.8} top={roofY - 0.05} length={1.1} strands={22} kind="mixed" colors={palette.blooms} z={-HALF} seed={seed + 1} />
      <group rotation={[0, Math.PI / 2, 0]}>
        <FlowerStrings width={2.8} top={roofY - 0.05} length={1.1} strands={22} kind="mixed" colors={palette.blooms} z={HALF} seed={seed + 2} />
        <FlowerStrings width={2.8} top={roofY - 0.05} length={1.1} strands={22} kind="mixed" colors={palette.blooms} z={-HALF} seed={seed + 3} />
      </group>
      {/* sheer drapes tied back at the front pillars */}
      {[-HALF, HALF].map((x) => (
        <group key={x} position={[x * 0.92, 0.25, HALF + 0.05]}>
          <SheerPanel width={0.7} height={3} folds={4} color={palette.drape} tieback={0.6} />
        </group>
      ))}
    </group>
  )
}

// ---------------------------------------------------------------
// 2. South Indian temple mandap: carved pillars, a stepped tower roof
//    with a brass kalasam on top, marigold strings, mango-leaf thoranam
//    and banana plants at the front.
// ---------------------------------------------------------------
function CarvedPillar({ color }) {
  // stacked blocks and rings, like a carved temple pillar
  const bands = [0.1, 0.55, 1.1, 1.65, 2.2, 2.75]
  return (
    <group>
      <mesh position={[0, 1.5, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.12, 3, 8]} />
        <meshStandardMaterial color={color} roughness={0.55} />
      </mesh>
      {bands.map((y) => (
        <mesh key={y} position={[0, y, 0]} castShadow>
          <boxGeometry args={[0.32, 0.14, 0.32]} />
          <meshStandardMaterial color={color} roughness={0.5} />
        </mesh>
      ))}
      {bands.map((y) => (
        <mesh key={`g${y}`} position={[0, y + 0.08, 0]}>
          <boxGeometry args={[0.34, 0.025, 0.34]} />
          <GoldMaterial />
        </mesh>
      ))}
      <mesh position={[0, 3.02, 0]} castShadow>
        <boxGeometry args={[0.44, 0.12, 0.44]} />
        <meshStandardMaterial color={color} roughness={0.5} />
      </mesh>
    </group>
  )
}

function BananaPlant() {
  const leaves = Array.from({ length: 7 }, (_, i) => i)
  const leafGeo = useMemo(() => {
    const g = new THREE.PlaneGeometry(0.35, 1.3, 2, 8)
    const p = g.attributes.position
    for (let i = 0; i < p.count; i++) {
      const t = (p.getY(i) + 0.65) / 1.3
      p.setZ(i, -0.4 * t * t) // leaf arches outwards
      p.setX(i, p.getX(i) * Math.sin(Math.PI * Math.min(0.98, t * 0.9 + 0.08)))
    }
    g.translate(0, 0.65, 0)
    g.computeVertexNormals()
    return g
  }, [])
  return (
    <group>
      <mesh position={[0, 0.9, 0]} castShadow>
        <cylinderGeometry args={[0.07, 0.1, 1.8, 10]} />
        <meshStandardMaterial color="#8a9a52" roughness={0.8} />
      </mesh>
      {leaves.map((i) => (
        <mesh key={i} geometry={leafGeo} position={[0, 1.7, 0]} rotation={[0.5, (i / leaves.length) * Math.PI * 2, 0]} castShadow>
          <meshStandardMaterial color="#4f8a35" roughness={0.6} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  )
}

// A string of mango leaves (thoranam) hung across the front.
function Thoranam({ width = 3, y = 3, z = 0 }) {
  const leaves = Array.from({ length: 26 }, (_, i) => -width / 2 + (i / 25) * width)
  return (
    <group position={[0, y, z]}>
      {leaves.map((x, i) => (
        <mesh key={i} position={[x, -0.12 - 0.04 * Math.sin((i / 25) * Math.PI), 0]} rotation={[0, 0, (i % 2 ? 0.15 : -0.15)]} scale={[0.6, 2.2, 0.15]}>
          <sphereGeometry args={[0.06, 8, 6]} />
          <meshStandardMaterial color={i % 2 ? '#3f7a2a' : '#5b9a38'} roughness={0.6} />
        </mesh>
      ))}
    </group>
  )
}

export function TempleMandap({ color, palette, seed }) {
  // stepped tower roof, smaller at each level, like a gopuram
  const tiers = [3.4, 2.8, 2.2, 1.6, 1.0]
  return (
    <group>
      <MandapBase color="#efe2cc" />
      {CORNERS.map(([x, z], i) => (
        <group key={i} position={[x, 0.25, z]}>
          <CarvedPillar color={color} />
        </group>
      ))}
      <group position={[0, 3.35, 0]}>
        {tiers.map((w, i) => (
          <group key={w} position={[0, i * 0.32, 0]}>
            <mesh castShadow>
              <boxGeometry args={[w, 0.26, w]} />
              <meshStandardMaterial color={color} roughness={0.5} />
            </mesh>
            <mesh position={[0, 0.14, 0]}>
              <boxGeometry args={[w + 0.04, 0.03, w + 0.04]} />
              <GoldMaterial />
            </mesh>
          </group>
        ))}
        {/* brass kalasam on top */}
        <group position={[0, tiers.length * 0.32, 0]}>
          <mesh position={[0, 0.12, 0]} castShadow>
            <sphereGeometry args={[0.16, 20, 14]} />
            <BrassMaterial />
          </mesh>
          <mesh position={[0, 0.36, 0]}>
            <coneGeometry args={[0.07, 0.3, 16]} />
            <BrassMaterial />
          </mesh>
        </group>
      </group>
      {/* marigold strings on all four sides */}
      {[0, 1, 2, 3].map((side) => (
        <group key={side} rotation={[0, (side * Math.PI) / 2, 0]}>
          <FlowerStrings width={2.6} top={3.25} length={0.9} strands={16} kind="marigold" z={HALF + 0.05} seed={seed + side} />
        </group>
      ))}
      <Thoranam width={2.8} y={3.3} z={HALF + 0.12} />
      {/* banana plants and marigold bunches at the front pillars */}
      {[-HALF - 0.4, HALF + 0.4].map((x) => (
        <group key={x} position={[x, 0, HALF + 0.3]}>
          <BananaPlant />
        </group>
      ))}
      {[-HALF, HALF].map((x, i) => (
        <FlowerCluster key={x} position={[x, 0.45, HALF]} spread={0.5} depth={0.4} count={20} colors={palette.blooms} seed={seed + 30 + i} kind="marigold" />
      ))}
    </group>
  )
}

// ---------------------------------------------------------------
// 3. Modern minimal mandap: a slim gold frame, sheer drapes,
//    pampas grass and soft roses.
// ---------------------------------------------------------------
export function ModernMandap({ color, palette, seed }) {
  const h = 3.2
  const bar = (len, pos, rot = [0, 0, 0]) => (
    <mesh position={pos} rotation={rot} castShadow>
      <boxGeometry args={[0.06, len, 0.06]} />
      <meshStandardMaterial color={color} metalness={0.7} roughness={0.35} />
    </mesh>
  )
  return (
    <group>
      <MandapBase color="#f8f4ee" />
      <group position={[0, 0.25, 0]}>
        {CORNERS.map(([x, z], i) => <group key={i}>{bar(h, [x, h / 2, z])}</group>)}
        {[-HALF, HALF].map((z) => <group key={`x${z}`}>{bar(HALF * 2, [0, h, z], [0, 0, Math.PI / 2])}</group>)}
        {[-HALF, HALF].map((x) => <group key={`z${x}`}>{bar(HALF * 2, [x, h, 0], [Math.PI / 2, 0, 0])}</group>)}
        {/* sheer drapes down the back corners and across the back */}
        {[-HALF, HALF].map((x) => (
          <group key={x} position={[x * 0.85, 0, -HALF]}>
            <SheerPanel width={0.8} height={h} folds={5} color={palette.drape} opacity={0.6} />
          </group>
        ))}
        <FabricSwag from={[-HALF, h, -HALF]} to={[HALF, h, -HALF]} sag={0.45} width={0.45} color={palette.drape} opacity={0.75} />
        <FabricSwag from={[-HALF, h, HALF]} to={[HALF, h, HALF]} sag={0.3} width={0.35} color={palette.drape} opacity={0.75} />
        {/* pampas and roses on two top corners and two front feet */}
        <FlowerCluster position={[-HALF + 0.1, h, HALF]} spread={0.7} depth={0.4} count={20} colors={palette.blooms} seed={seed} kind="mixed" />
        <PampasBunch position={[-HALF + 0.1, h - 0.1, HALF]} count={7} height={0.7} seed={seed} />
        <FlowerCluster position={[HALF - 0.1, h, -HALF]} spread={0.7} depth={0.4} count={20} colors={palette.blooms} seed={seed + 1} kind="mixed" />
        <PampasBunch position={[HALF - 0.1, h - 0.1, -HALF]} count={7} height={0.7} seed={seed + 1} />
        {[-HALF, HALF].map((x, i) => (
          <group key={`f${x}`}>
            <FlowerCluster position={[x, 0.25, HALF]} spread={0.7} depth={0.5} count={20} colors={palette.blooms} seed={seed + 5 + i} kind="mixed" />
            <PampasBunch position={[x, 0.05, HALF - 0.1]} count={6} height={1} seed={seed + 5 + i} />
          </group>
        ))}
      </group>
    </group>
  )
}

// ---------------------------------------------------------------
// 4. Dome pavilion mandap: six slim pillars in a circle holding a
//    ribbed dome, with fabric falling between the pillars and a
//    flower garland around the base of the dome.
// ---------------------------------------------------------------
export function DomeMandap({ color, palette, seed }) {
  const R = 1.6
  const h = 2.9
  const pillars = Array.from({ length: 6 }, (_, i) => (i / 6) * Math.PI * 2 + Math.PI / 6)
  return (
    <group>
      <mesh position={[0, 0.12, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[2.05, 2.1, 0.24, 48]} />
        <meshStandardMaterial color="#f6efe4" roughness={0.5} />
      </mesh>
      <HavanKund />
      {[-0.5, 0.5].map((x) => (
        <mesh key={x} position={[x, 0.36, 0.75]} castShadow>
          <boxGeometry args={[0.6, 0.22, 0.6]} />
          <meshPhysicalMaterial color="#7a1e32" roughness={0.85} sheen={0.6} sheenColor="#ffb8c8" />
        </mesh>
      ))}
      <group position={[0, 0.25, 0]}>
        {pillars.map((a, i) => (
          <group key={i} position={[Math.sin(a) * R, 0, Math.cos(a) * R]}>
            <mesh position={[0, h / 2, 0]} castShadow>
              <cylinderGeometry args={[0.07, 0.09, h, 16]} />
              <meshStandardMaterial color={color} roughness={0.35} />
            </mesh>
            <FlowerCluster position={[0, 0.2, 0]} spread={0.4} depth={0.4} count={12} colors={palette.blooms} seed={seed + i} kind="mixed" />
          </group>
        ))}
        {/* ring beam and dome */}
        <mesh position={[0, h, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[R, 0.06, 10, 64]} />
          <GoldMaterial />
        </mesh>
        <mesh position={[0, h, 0]} castShadow>
          <sphereGeometry args={[R + 0.05, 48, 24, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshPhysicalMaterial color={palette.drape} roughness={0.8} sheen={1} sheenColor="#ffffff" side={THREE.DoubleSide} />
        </mesh>
        {/* gold ribs over the dome */}
        {pillars.map((a, i) => (
          <mesh key={`r${i}`} position={[0, h, 0]} rotation={[0, a, 0]}>
            <torusGeometry args={[R + 0.07, 0.025, 6, 40, Math.PI / 2]} />
            <GoldMaterial />
          </mesh>
        ))}
        <mesh position={[0, h + R + 0.2, 0]}>
          <coneGeometry args={[0.08, 0.4, 16]} />
          <GoldMaterial />
        </mesh>
        {/* sheer fabric between the back pillars */}
        {pillars.slice(2, 5).map((a, i) => {
          const mid = a + Math.PI / 6
          return (
            <group key={`d${i}`} position={[Math.sin(mid) * R * 0.95, 0, Math.cos(mid) * R * 0.95]} rotation={[0, mid, 0]}>
              <SheerPanel width={1.5} height={h} folds={6} color={palette.drape} opacity={0.55} />
            </group>
          )
        })}
        {/* flower garland around the base of the dome */}
        {Array.from({ length: 12 }, (_, i) => (i / 12) * Math.PI * 2).map((a, i) => (
          <FlowerCluster key={`g${i}`} position={[Math.sin(a) * R, h + 0.05, Math.cos(a) * R]} spread={0.45} depth={0.3} count={9} colors={palette.blooms} seed={seed + 40 + i} />
        ))}
      </group>
    </group>
  )
}
