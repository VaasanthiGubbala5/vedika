import { GoldMaterial } from './common.jsx'

// Two-seater velvet sofa with gold legs. Width about 2.5 m.
export default function Sofa({ color }) {
  const velvet = <meshPhysicalMaterial color={color} roughness={0.85} sheen={0.45} sheenColor="#ffd2dc" />
  return (
    <group>
      {/* seat */}
      <mesh position={[0, 0.42, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.2, 0.22, 0.85]} />
        {velvet}
      </mesh>
      {/* back rest */}
      <mesh position={[0, 0.85, -0.36]} castShadow receiveShadow>
        <boxGeometry args={[2.2, 0.8, 0.2]} />
        {velvet}
      </mesh>
      {/* rolled arms */}
      {[-1.15, 1.15].map((x) => (
        <mesh key={x} position={[x, 0.6, 0.02]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.17, 0.17, 0.85, 24]} />
          {velvet}
        </mesh>
      ))}
      {/* cushions */}
      {[-0.52, 0.52].map((x) => (
        <mesh key={x} position={[x, 0.62, 0.05]} scale={[1.6, 0.35, 1.2]} castShadow>
          <sphereGeometry args={[0.3, 24, 16]} />
          {velvet}
        </mesh>
      ))}
      {/* gold legs */}
      {[[-1, 0.3], [1, 0.3], [-1, -0.3], [1, -0.3]].map(([x, z]) => (
        <mesh key={`${x}${z}`} position={[x, 0.16, z]} castShadow>
          <cylinderGeometry args={[0.03, 0.02, 0.32, 10]} />
          <GoldMaterial />
        </mesh>
      ))}
      {/* gold rail on top of the back */}
      <mesh position={[0, 1.27, -0.36]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.035, 0.035, 2.3, 12]} />
        <GoldMaterial />
      </mesh>
    </group>
  )
}
