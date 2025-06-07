import { Physics } from "./Physics"
import { createVector } from "./utils/vector"
import type { Vector2D } from "./types"

describe("Physics", () => {
  test("摩擦を正しく適用する", () => {
    const velocity: Vector2D = createVector(10, 0)
    const friction = 0.1
    const deltaTime = 1

    const result = Physics.applyFriction(velocity, friction, deltaTime)

    // 摩擦力を適用した後の速度を計算
    expect(result).toEqual({ x: 9, y: 0 })
  })
})
