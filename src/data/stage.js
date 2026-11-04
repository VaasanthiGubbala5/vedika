// Size of the fixed reception stage (in metres).
// The platform is 9 m wide, 3.6 m deep and 0.6 m high.
export const STAGE = {
  width: 9,
  depth: 3.6,
  height: 0.6,
  front: 0, // z position of the front edge
}

// True when a floor position (x, z) is on top of the stage platform.
export function isOnStage(x, z) {
  return Math.abs(x) < STAGE.width / 2 && z < STAGE.front && z > -STAGE.depth
}

// The height an item should stand at: on the stage or on the floor.
export function groundHeight(x, z) {
  return isOnStage(x, z) ? STAGE.height : 0
}
