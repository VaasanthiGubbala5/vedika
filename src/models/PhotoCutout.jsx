import { useMemo } from 'react'
import * as THREE from 'three'
import { Billboard } from '@react-three/drei'

// An uploaded photo shown as a standing cut-out.
// "Billboard" keeps it turned towards the camera so it looks solid.
// Base height is 1.5 m; the Size slider scales it.
export default function PhotoCutout({ src, aspect }) {
  const texture = useMemo(() => {
    const t = new THREE.TextureLoader().load(src)
    t.colorSpace = THREE.SRGBColorSpace
    return t
  }, [src])

  const h = 1.5
  return (
    <Billboard lockX lockZ position={[0, h / 2, 0]}>
      <mesh>
        <planeGeometry args={[h * aspect, h]} />
        <meshStandardMaterial map={texture} alphaTest={0.4} side={THREE.DoubleSide} roughness={0.8} />
      </mesh>
    </Billboard>
  )
}
