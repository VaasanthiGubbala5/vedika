import GlbModel, { MODEL_FILES } from './GlbModel.jsx'

// Library items that use real 3D model files.

export function VelvetSofa({ color }) {
  return <GlbModel url={MODEL_FILES.sofa} tint={color} />
}

export function RoyalChair({ color }) {
  return <GlbModel url={MODEL_FILES.royalChair} tint={color} />
}

export function LoungeChair({ color }) {
  return <GlbModel url={MODEL_FILES.loungeChair} tint={color} />
}

// Three glass candle holders of different sizes.
export function HurricaneTrio() {
  return (
    <group>
      <group position={[-0.22, 0, 0.1]} scale={1.4}><GlbModel url={MODEL_FILES.hurricane} /></group>
      <group position={[0.2, 0, 0.06]} scale={1.9}><GlbModel url={MODEL_FILES.hurricane} /></group>
      <group position={[0, 0, -0.2]} scale={2.4}><GlbModel url={MODEL_FILES.hurricane} /></group>
    </group>
  )
}

export function VaseCentrepiece() {
  return (
    <group scale={2}>
      <GlbModel url={MODEL_FILES.vase} />
    </group>
  )
}
