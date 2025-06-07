import { GameObject } from "./GameObject"
import { createVector } from "../utils/vector"
import { createGameObjectId, type Vector2D, type WorldConfig } from "../types"

describe("GameObject", () => {
  const mockWorldConfig: WorldConfig = {
    width: 1000,
    height: 1000,
    friction: 0.1,
    maxSpeed: 10,
    adjacencyBuffer: 1,
  }

  test("力を正しく適用する", () => {
    const gameObject = new GameObject(
      createGameObjectId("1"),
      createVector(0, 0),
      1,
      1,
      "blue",
    )
    const force: Vector2D = createVector(10, 0)

    gameObject.applyForce(force)

    expect(
      (gameObject as unknown as { acceleration?: number }).acceleration,
    ).toEqual({ x: 10, y: 0 })
  })

  test("位置と速度を正しく更新する", () => {
    const gameObject = new GameObject(
      createGameObjectId("1"),
      createVector(0, 0),
      1,
      1,
      "blue",
    )
    const force: Vector2D = createVector(10, 0)

    gameObject.applyForce(force)
    gameObject.updatePosition(1, mockWorldConfig)

    expect(gameObject.velocity).toEqual({ x: 9, y: 0 }) // 摩擦適用後
    expect(gameObject.position).toEqual({ x: 9, y: 0 })
  })

  test("他のオブジェクトまでの距離を正しく計算する", () => {
    const gameObject1 = new GameObject(
      createGameObjectId("1"),
      createVector(0, 0),
      1,
      1,
      "blue",
    )
    const gameObject2 = new GameObject(
      createGameObjectId("2"),
      createVector(3, 4),
      1,
      1,
      "blue",
    )

    const distance = gameObject1.getDistanceTo(gameObject2)

    expect(distance).toBe(5) // 3-4-5の三角形
  })

  test("隣接しているかを正しく判定する", () => {
    const gameObject1 = new GameObject(
      createGameObjectId("1"),
      createVector(0, 0),
      1,
      1,
      "blue",
    )
    const gameObject2 = new GameObject(
      createGameObjectId("2"),
      createVector(2, 0),
      1,
      1,
      "blue",
    )

    expect(gameObject1.isAdjacentTo(gameObject2, 0)).toBe(true)
    expect(gameObject1.isAdjacentTo(gameObject2, -1)).toBe(false)
  })
})
