import { useEffect, useMemo } from 'react'
import { useGLTF } from '@react-three/drei'

// Shows a real 3D model file (.glb) from the public/models folder.
// Each placed copy gets its own materials, so changing the colour of
// one sofa does not change the others.
// tint     -> colour applied to materials whose name matches "match"
// match    -> which materials to tint (for example /fabric/i)
export default function GlbModel({ url, tint, match = /fabric/i }) {
  const { scene } = useGLTF(url)

  const copy = useMemo(() => {
    const c = scene.clone(true)
    c.traverse((o) => {
      if (o.isMesh) {
        o.material = o.material.clone()
        o.castShadow = true
        o.receiveShadow = true
      }
    })
    return c
  }, [scene])

  useEffect(() => {
    copy.traverse((o) => {
      if (o.isMesh && tint && match.test(o.material.name)) o.material.color.set(tint)
    })
  }, [copy, tint, match])

  return <primitive object={copy} />
}

// Start downloading the model files early.
export const MODEL_FILES = {
  sofa: '/models/velvet-sofa.glb',
  royalChair: '/models/royal-chair.glb',
  loungeChair: '/models/lounge-chair.glb',
  hurricane: '/models/hurricane-candle.glb',
  vase: '/models/vase-flowers.glb',
}
Object.values(MODEL_FILES).forEach((url) => useGLTF.preload(url))
