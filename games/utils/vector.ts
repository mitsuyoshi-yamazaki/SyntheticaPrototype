import type { Vector2D } from "../types"

export const createVector = (x: number, y: number): Vector2D => ({ x, y })

export const addVectors = (a: Vector2D, b: Vector2D): Vector2D => ({
  x: a.x + b.x,
  y: a.y + b.y,
})

export const subtractVectors = (a: Vector2D, b: Vector2D): Vector2D => ({
  x: a.x - b.x,
  y: a.y - b.y,
})

export const multiplyVector = (vector: Vector2D, scalar: number): Vector2D => ({
  x: vector.x * scalar,
  y: vector.y * scalar,
})

export const divideVector = (vector: Vector2D, scalar: number): Vector2D => ({
  x: vector.x / scalar,
  y: vector.y / scalar,
})

export const getMagnitude = (vector: Vector2D): number => {
  return Math.sqrt(vector.x * vector.x + vector.y * vector.y)
}

export const normalize = (vector: Vector2D): Vector2D => {
  const magnitude = getMagnitude(vector)
  if (magnitude === 0) {
    return { x: 0, y: 0 }
  }
  return divideVector(vector, magnitude)
}

export const limitMagnitude = (
  vector: Vector2D,
  maxMagnitude: number,
): Vector2D => {
  const magnitude = getMagnitude(vector)
  if (magnitude <= maxMagnitude) {
    return vector
  }
  return multiplyVector(normalize(vector), maxMagnitude)
}

export const getDistance = (a: Vector2D, b: Vector2D): number => {
  const diff = subtractVectors(a, b)
  return getMagnitude(diff)
}

export const getDirection = (from: Vector2D, to: Vector2D): Vector2D => {
  return normalize(subtractVectors(to, from))
}
