import { Vector2D } from "./types"
import { addVectors, multiplyVector } from "./utils/vector"

export const Physics = {
  applyFriction: (
    velocity: Vector2D,
    friction: number,
    deltaTime: number,
  ): Vector2D => {
    const frictionForce = multiplyVector(velocity, -friction)
    return addVectors(velocity, multiplyVector(frictionForce, deltaTime))
  },
}
