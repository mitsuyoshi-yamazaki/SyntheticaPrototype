import { Vector2D } from "./types"
import { addVectors, multiplyVector } from "./utils/vector"
import { getDistance, normalize, subtractVectors } from "./utils/vector"

export const Physics = {
  applyFriction: (
    velocity: Vector2D,
    friction: number,
    deltaTime: number,
  ): Vector2D => {
    const frictionForce = multiplyVector(velocity, -friction)
    return addVectors(velocity, multiplyVector(frictionForce, deltaTime))
  },

  calculateSeparationForce: (
    objA: { position: Vector2D; radius: number; mass: number },
    objB: { position: Vector2D; radius: number; mass: number },
  ): { forceA: Vector2D; forceB: Vector2D } | null => {
    const distance = getDistance(objA.position, objB.position)
    const minDistance = objA.radius + objB.radius

    if (distance < minDistance && distance > 0) {
      const overlap = minDistance - distance
      const direction = normalize(subtractVectors(objB.position, objA.position))

      const totalMass = objA.mass + objB.mass
      const forceA = multiplyVector(
        direction,
        (-overlap * objB.mass) / totalMass,
      )
      const forceB = multiplyVector(
        direction,
        (overlap * objA.mass) / totalMass,
      )

      return { forceA, forceB }
    }

    return null
  },
}
