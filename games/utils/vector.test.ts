import {
  createVector,
  addVectors,
  subtractVectors,
  multiplyVector,
  divideVector,
  getMagnitude,
  normalize,
  limitMagnitude,
  getDistance,
  getDirection,
} from "./vector"
import type { Vector2D } from "../types"

describe("ベクトル操作", () => {
  describe("createVector", () => {
    test("指定されたxとyの値でベクトルを作成する", () => {
      const vec = createVector(3, 4)
      expect(vec.x).toBe(3)
      expect(vec.y).toBe(4)
    })

    test("ゼロ値のベクトルを作成する", () => {
      const vec = createVector(0, 0)
      expect(vec.x).toBe(0)
      expect(vec.y).toBe(0)
    })

    test("負の値を持つベクトルを作成する", () => {
      const vec = createVector(-5, -12)
      expect(vec.x).toBe(-5)
      expect(vec.y).toBe(-12)
    })
  })

  describe("addVectors", () => {
    test("2つのベクトルを正しく加算する", () => {
      const a: Vector2D = { x: 3, y: 4 }
      const b: Vector2D = { x: 1, y: 2 }
      const result = addVectors(a, b)
      expect(result.x).toBe(4)
      expect(result.y).toBe(6)
    })

    test("負の値を処理する", () => {
      const a: Vector2D = { x: 3, y: 5 }
      const b: Vector2D = { x: -1, y: -2 }
      const result = addVectors(a, b)
      expect(result.x).toBe(2)
      expect(result.y).toBe(3)
    })

    test("ゼロ値を処理する", () => {
      const a: Vector2D = { x: 3, y: 4 }
      const b: Vector2D = { x: 0, y: 0 }
      const result = addVectors(a, b)
      expect(result.x).toBe(3)
      expect(result.y).toBe(4)
    })
  })

  describe("subtractVectors", () => {
    test("あるベクトルから別のベクトルを正しく減算する", () => {
      const a: Vector2D = { x: 3, y: 5 }
      const b: Vector2D = { x: 1, y: 2 }
      const result = subtractVectors(a, b)
      expect(result.x).toBe(2)
      expect(result.y).toBe(3)
    })

    test("負の値を処理する", () => {
      const a: Vector2D = { x: 3, y: 4 }
      const b: Vector2D = { x: -1, y: -2 }
      const result = subtractVectors(a, b)
      expect(result.x).toBe(4)
      expect(result.y).toBe(6)
    })

    test("ゼロ値を処理する", () => {
      const a: Vector2D = { x: 3, y: 4 }
      const b: Vector2D = { x: 0, y: 0 }
      const result = subtractVectors(a, b)
      expect(result.x).toBe(3)
      expect(result.y).toBe(4)
    })
  })

  describe("multiplyVector", () => {
    test("ベクトルを正のスカラーで乗算する", () => {
      const vec: Vector2D = { x: 3, y: 4 }
      const result = multiplyVector(vec, 2)
      expect(result.x).toBe(6)
      expect(result.y).toBe(8)
    })

    test("ベクトルを負のスカラーで乗算する", () => {
      const vec: Vector2D = { x: 3, y: 4 }
      const result = multiplyVector(vec, -2)
      expect(result.x).toBe(-6)
      expect(result.y).toBe(-8)
    })

    test("ベクトルをゼロで乗算する", () => {
      const vec: Vector2D = { x: 3, y: 4 }
      const result = multiplyVector(vec, 0)
      expect(result.x).toBe(0)
      expect(result.y).toBe(0)
    })
  })

  describe("divideVector", () => {
    test("ベクトルを正のスカラーで除算する", () => {
      const vec: Vector2D = { x: 6, y: 8 }
      const result = divideVector(vec, 2)
      expect(result.x).toBe(3)
      expect(result.y).toBe(4)
    })

    test("ベクトルを負のスカラーで除算する", () => {
      const vec: Vector2D = { x: 6, y: 8 }
      const result = divideVector(vec, -2)
      expect(result.x).toBe(-3)
      expect(result.y).toBe(-4)
    })

    test("ゼロベクトルの除算を処理する", () => {
      const vec: Vector2D = { x: 0, y: 0 }
      const result = divideVector(vec, 2)
      expect(result.x).toBe(0)
      expect(result.y).toBe(0)
    })
  })

  describe("getMagnitude", () => {
    test("ベクトルの大きさを正しく計算する", () => {
      const vec: Vector2D = { x: 3, y: 4 }
      const magnitude = getMagnitude(vec)
      expect(magnitude).toBe(5)
    })

    test("ゼロベクトルの大きさを計算する", () => {
      const vec: Vector2D = { x: 0, y: 0 }
      const magnitude = getMagnitude(vec)
      expect(magnitude).toBe(0)
    })

    test("負の成分を持つベクトルの大きさを計算する", () => {
      const vec: Vector2D = { x: -3, y: -4 }
      const magnitude = getMagnitude(vec)
      expect(magnitude).toBe(5)
    })
  })

  describe("normalize", () => {
    test("非ゼロベクトルを単位長さに正規化する", () => {
      const vec: Vector2D = { x: 3, y: 4 }
      const normalized = normalize(vec)
      expect(normalized.x).toBeCloseTo(0.6)
      expect(normalized.y).toBeCloseTo(0.8)
      const magnitude = getMagnitude(normalized)
      expect(magnitude).toBeCloseTo(1)
    })

    test("ゼロベクトルの正規化を処理する", () => {
      const vec: Vector2D = { x: 0, y: 0 }
      const normalized = normalize(vec)
      expect(normalized.x).toBe(0)
      expect(normalized.y).toBe(0)
    })
  })

  describe("limitMagnitude", () => {
    test("制限値より小さい大きさのベクトルは変更しない", () => {
      const vec: Vector2D = { x: 3, y: 4 } // magnitude 5
      const limited = limitMagnitude(vec, 10)
      expect(limited.x).toBe(3)
      expect(limited.y).toBe(4)
    })

    test("制限値より大きい大きさのベクトルを制限する", () => {
      const vec: Vector2D = { x: 6, y: 8 } // magnitude 10
      const limited = limitMagnitude(vec, 5)
      expect(limited.x).toBeCloseTo(3)
      expect(limited.y).toBeCloseTo(4)
      expect(getMagnitude(limited)).toBeCloseTo(5)
    })

    test("ゼロベクトルを処理する", () => {
      const vec: Vector2D = { x: 0, y: 0 }
      const limited = limitMagnitude(vec, 5)
      expect(limited.x).toBe(0)
      expect(limited.y).toBe(0)
    })
  })

  describe("getDistance", () => {
    test("2つのベクトル間の距離を正しく計算する", () => {
      const a: Vector2D = { x: 0, y: 0 }
      const b: Vector2D = { x: 3, y: 4 }
      const distance = getDistance(a, b)
      expect(distance).toBe(5)
    })

    test("同じベクトル間のゼロ距離を計算する", () => {
      const a: Vector2D = { x: 3, y: 4 }
      const b: Vector2D = { x: 3, y: 4 }
      const distance = getDistance(a, b)
      expect(distance).toBe(0)
    })

    test("負の座標を処理する", () => {
      const a: Vector2D = { x: -1, y: -2 }
      const b: Vector2D = { x: 2, y: 2 }
      const distance = getDistance(a, b)
      expect(distance).toBeCloseTo(5)
    })
  })

  describe("getDirection", () => {
    test("ある点から別の点への方向ベクトルを取得する", () => {
      const from: Vector2D = { x: 0, y: 0 }
      const to: Vector2D = { x: 3, y: 4 }
      const direction = getDirection(from, to)
      expect(direction.x).toBeCloseTo(0.6)
      expect(direction.y).toBeCloseTo(0.8)
      expect(getMagnitude(direction)).toBeCloseTo(1)
    })

    test("正規化された方向ベクトルを返す", () => {
      const from: Vector2D = { x: -1, y: -1 }
      const to: Vector2D = { x: 2, y: 3 }
      const direction = getDirection(from, to)
      expect(getMagnitude(direction)).toBeCloseTo(1)
    })

    test("ゼロ距離の場合を処理する", () => {
      const from: Vector2D = { x: 3, y: 4 }
      const to: Vector2D = { x: 3, y: 4 }
      const direction = getDirection(from, to)
      // 点が同一の場合、normalizeはゼロベクトルを返す
      expect(direction.x).toBe(0)
      expect(direction.y).toBe(0)
    })
  })
})
