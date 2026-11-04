import { GoldMaterial } from './common.jsx'

// Chiavari chair: the thin gold chair used at most Indian receptions.
export default function Chair({ color }) {
  const legs = [[-0.19, 0.19], [0.19, 0.19], [-0.19, -0.19], [0.19, -0.19]]
  return (
    <group>
      {legs.map(([x, z]) => (
        <mesh key={`${x}${z}`} position={[x, 0.23, z]} castShadow>
          <cylinderGeometry args={[0.018, 0.015, 0.46, 8]} />
          <GoldMaterial color={color} />
        </mesh>
      ))}
      {/* seat frame and cushion */}
      <mesh position={[0, 0.46, 0]} castShadow>
        <boxGeometry args={[0.42, 0.04, 0.42]} />
        <GoldMaterial color={color} />
      </mesh>
      <mesh position={[0, 0.5, 0.01]} castShadow>
        <boxGeometry args={[0.38, 0.05, 0.38]} />
        <meshStandardMaterial color="#f8f2e8" roughness={0.9} />
      </mesh>
      {/* back posts, rails and spindles */}
      {[-0.19, 0.19].map((x) => (
        <mesh key={x} position={[x, 0.72, -0.19]} castShadow>
          <cylinderGeometry args={[0.018, 0.018, 0.5, 8]} />
          <GoldMaterial color={color} />
        </mesh>
      ))}
      {[0.62, 0.8, 0.96].map((y) => (
        <mesh key={y} position={[0, y, -0.19]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.012, 0.012, 0.38, 6]} />
          <GoldMaterial color={color} />
        </mesh>
      ))}
      {[-0.1, 0, 0.1].map((x) => (
        <mesh key={x} position={[x, 0.79, -0.19]}>
          <cylinderGeometry args={[0.009, 0.009, 0.34, 6]} />
          <GoldMaterial color={color} />
        </mesh>
      ))}
    </group>
  )
}
