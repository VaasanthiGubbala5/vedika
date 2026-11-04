import { FlowerCluster } from './common.jsx'
import Chair from './Chair.jsx'

// Round guest table with a floor-length cloth, a centrepiece and 6 chairs.
export default function GuestTable({ color, palette, seed }) {
  const chairs = Array.from({ length: 6 }, (_, i) => (i / 6) * Math.PI * 2)
  return (
    <group>
      {/* table cloth falls to the floor, a little wider at the bottom */}
      <mesh position={[0, 0.38, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.78, 0.86, 0.76, 48, 1, true]} />
        <meshPhysicalMaterial color={color} roughness={0.8} sheen={0.6} sheenColor="#ffffff" side={2} />
      </mesh>
      <mesh position={[0, 0.765, 0]} receiveShadow>
        <cylinderGeometry args={[0.78, 0.78, 0.01, 48]} />
        <meshPhysicalMaterial color={color} roughness={0.8} sheen={0.6} />
      </mesh>
      {/* centrepiece */}
      <mesh position={[0, 0.9, 0]} castShadow>
        <cylinderGeometry args={[0.06, 0.08, 0.26, 16]} />
        <meshPhysicalMaterial color="#ffffff" transmission={0.9} roughness={0.1} thickness={0.1} />
      </mesh>
      <FlowerCluster position={[0, 1.1, 0]} spread={0.35} depth={0.35} count={18} colors={palette.blooms} seed={seed} />
      {/* chairs around the table, facing the centre */}
      {chairs.map((angle) => (
        <group key={angle} position={[Math.sin(angle) * 1.15, 0, Math.cos(angle) * 1.15]} rotation={[0, angle + Math.PI, 0]}>
          <Chair color="#d4af6a" />
        </group>
      ))}
    </group>
  )
}
