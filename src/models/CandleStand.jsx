import { GoldMaterial } from './common.jsx'

// Three gold candle stands of different heights, grouped together.
const CANDLES = [
  { x: -0.18, z: 0.05, h: 0.55 },
  { x: 0.16, z: 0.08, h: 0.8 },
  { x: 0, z: -0.15, h: 1.05 },
]

export default function CandleStand({ color, evening }) {
  return (
    <group>
      {CANDLES.map(({ x, z, h }) => (
        <group key={x} position={[x, 0, z]}>
          <mesh position={[0, 0.02, 0]} castShadow>
            <cylinderGeometry args={[0.09, 0.1, 0.04, 20]} />
            <GoldMaterial color={color} />
          </mesh>
          <mesh position={[0, h / 2, 0]} castShadow>
            <cylinderGeometry args={[0.025, 0.04, h, 12]} />
            <GoldMaterial color={color} />
          </mesh>
          <mesh position={[0, h + 0.09, 0]} castShadow>
            <cylinderGeometry args={[0.05, 0.05, 0.18, 16]} />
            <meshStandardMaterial color="#fff6e8" roughness={0.6} />
          </mesh>
          {/* flame: toneMapped false lets it glow brighter than the scene */}
          <mesh position={[0, h + 0.22, 0]} scale={[1, 1.8, 1]}>
            <sphereGeometry args={[0.025, 10, 8]} />
            <meshBasicMaterial color={evening ? '#ffc070' : '#ffe2b0'} toneMapped={false} />
          </mesh>
        </group>
      ))}
    </group>
  )
}
