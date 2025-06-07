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

  test("分離力を正しく計算する", () => {
    const objA = {
      position: createVector(0, 0),
      radius: 1,
      mass: 2,
    }
    const objB = {
      position: createVector(1.5, 0),
      radius: 1,
      mass: 2,
    }

    const result = Physics.calculateSeparationForce(objA, objB)

    expect(result).not.toBeNull()
    if (result !== null) {
      expect(result.forceA.x).toBeCloseTo(-0.25)
      expect(result.forceA.y).toBeCloseTo(-0)
      expect(result.forceB.x).toBeCloseTo(0.25)
      expect(result.forceB.y).toBeCloseTo(0)
    }
  })

  test("分離力が不要な場合はnullを返す", () => {
    const objA = {
      position: createVector(0, 0),
      radius: 1,
      mass: 2,
    }
    const objB = {
      position: createVector(3, 0),
      radius: 1,
      mass: 2,
    }

    const result = Physics.calculateSeparationForce(objA, objB)

    expect(result).toBeNull()
  })
})
