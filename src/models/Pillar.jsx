import { FlowerCluster, GoldMaterial } from './common.jsx'

// Tall decor pillar with a flower bunch on top. Height about 2.4 m.
export default function Pillar({ color, palette, seed }) {
  return (
    <group>
      <mesh position={[0, 0.06, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.3, 0.32, 0.12, 32]} />
        <GoldMaterial />
      </mesh>
      <mesh position={[0, 1.12, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.16, 0.2, 2.0, 32]} />
        <meshStandardMaterial color={color} roughness={0.4} />
      </mesh>
      <mesh position={[0, 2.16, 0]} castShadow>
        <cylinderGeometry args={[0.28, 0.22, 0.08, 32]} />
        <GoldMaterial />
      </mesh>
      <FlowerCluster position={[0, 2.42, 0]} spread={0.6} depth={0.5} count={34} colors={palette.blooms} seed={seed} />
    </group>
  )
}
