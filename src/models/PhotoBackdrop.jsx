import { useMemo } from 'react'
import * as THREE from 'three'
import { GoldMaterial } from './common.jsx'

// A backdrop made from an uploaded photo (for example from Pinterest).
// The photo is wrapped onto a gently curved panel, and its light and dark
// areas push the surface in and out a little (a "displacement map"),
// so flowers and frames in the photo stand out and catch the stage lights.
const MAX_W = 7
const MAX_H = 4.6

export default function PhotoBackdrop({ src, aspect }) {
  let w = MAX_W
  let h = w / aspect
  if (h > MAX_H) {
    h = MAX_H
    w = h * aspect
  }

  const texture = useMemo(() => {
    const t = new THREE.TextureLoader().load(src)
    t.colorSpace = THREE.SRGBColorSpace
    t.anisotropy = 8
    return t
  }, [src])

  // a slightly curved panel with many points so it can be pushed in and out
  const geometry = useMemo(() => {
    const g = new THREE.PlaneGeometry(w, h, 200, Math.round(200 / aspect))
    const p = g.attributes.position
    for (let i = 0; i < p.count; i++) {
      const across = p.getX(i) / (w / 2)
      p.setZ(i, -0.35 * across * across)
    }
    g.computeVertexNormals()
    g.translate(0, h / 2, 0)
    return g
  }, [w, h, aspect])

  return (
    <group>
      <mesh geometry={geometry} castShadow receiveShadow>
        <meshStandardMaterial
          map={texture}
          displacementMap={texture}
          displacementScale={0.12}
          displacementBias={-0.06}
          roughness={0.7}
        />
      </mesh>
      {/* thin gold base so the panel looks like it stands on the stage */}
      <mesh position={[0, 0.03, -0.05]}>
        <boxGeometry args={[w * 0.98, 0.06, 0.25]} />
        <GoldMaterial />
      </mesh>
    </group>
  )
}
