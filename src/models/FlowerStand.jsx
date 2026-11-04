import { FlowerCluster, GoldMaterial } from './common.jsx'

// Slim gold stand with a round flower ball on top, used along the aisle.
export default function FlowerStand({ color, palette, seed }) {
  return (
    <group>
      <mesh position={[0, 0.03, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.24, 0.26, 0.06, 32]} />
        <GoldMaterial color={color} />
      </mesh>
      <mesh position={[0, 0.75, 0]} castShadow>
        <cylinderGeometry args={[0.025, 0.04, 1.45, 12]} />
        <GoldMaterial color={color} />
      </mesh>
      <mesh position={[0, 1.48, 0]} castShadow>
        <cylinderGeometry args={[0.18, 0.08, 0.1, 24]} />
        <GoldMaterial color={color} />
      </mesh>
      <FlowerCluster position={[0, 1.78, 0]} spread={0.6} depth={0.6} count={42} colors={palette.blooms} seed={seed} />
      {/* a few flowers falling down the side */}
      <FlowerCluster position={[0.12, 1.35, 0.1]} spread={0.25} depth={0.2} count={8} colors={palette.blooms} seed={seed + 7} />
    </group>
  )
}
