
import type { GameObject as IGameObject, Vector2D, WorldConfig, GameObjectId, Material } from "../types"
import { 
  addVectors, 
  multiplyVector, 
  limitMagnitude, 
  getDistance,
  createVector
} from "../utils/vector"

export class GameObject implements IGameObject {
  public readonly id: GameObjectId
  public readonly radius: number
  public readonly mass: number
  public readonly material: Material
  
  // Mutable properties for physics simulation
  public position: Vector2D
  public velocity: Vector2D
  private acceleration: Vector2D

  public constructor(
    id: GameObjectId,
    position: Vector2D,
    radius: number,
    mass: number,
    material: Material,
  ) {
    this.id = id
    this.position = { ...position }
    this.radius = radius
    this.velocity = createVector(0, 0)
    this.mass = mass
    this.material = material
    this.acceleration = createVector(0, 0)
  }

  public applyForce(force: Vector2D): void {
    // F = ma, so a = F/m
    const acceleration = {
      x: force.x / this.mass,
      y: force.y / this.mass,
    }
    this.acceleration = addVectors(this.acceleration, acceleration)
  }

  public update(deltaTime: number, worldConfig: WorldConfig): void {
    // Update velocity based on acceleration
    this.velocity = addVectors(this.velocity, multiplyVector(this.acceleration, deltaTime))
    
    // Apply friction
    const frictionForce = multiplyVector(this.velocity, -worldConfig.friction)
    this.velocity = addVectors(this.velocity, multiplyVector(frictionForce, deltaTime))
    
    // Limit velocity to maximum speed
    this.velocity = limitMagnitude(this.velocity, worldConfig.maxSpeed)
    
    // Update position based on velocity
    this.position = addVectors(this.position, multiplyVector(this.velocity, deltaTime))
    
    // Reset acceleration for next frame
    this.acceleration = createVector(0, 0)
  }

  public getDistanceTo(other: GameObject): number {
    return getDistance(this.position, other.position)
  }

  public isAdjacentTo(other: GameObject, adjacencyBuffer: number): boolean {
    const distance = this.getDistanceTo(other)
    const requiredDistance = this.radius + other.radius + adjacencyBuffer
    return distance <= requiredDistance
  }
}
