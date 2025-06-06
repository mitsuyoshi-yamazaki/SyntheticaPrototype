
import type { World as IWorld, WorldConfig, GameObject, Vector2D, GameObjectId } from "./types"
import { subtractVectors, multiplyVector, normalize } from "./utils/vector"

export class World implements IWorld {
  public readonly config: WorldConfig
  private _objects: GameObject[]
  private _tick: number

  public constructor(config: WorldConfig) {
    this.config = config
    this._objects = []
    this._tick = 0
  }

  public get objects(): readonly GameObject[] {
    return this._objects
  }

  public get tick(): number {
    return this._tick
  }

  public addObject(object: GameObject): void {
    this._objects.push(object)
  }

  public removeObject(id: GameObjectId): void {
    this._objects = this._objects.filter(obj => obj.id !== id)
  }

  public update(): void {
    this._tick++
    
    // Update all objects
    this._objects.forEach(object => {
      object.update(1, this.config) // deltaTime = 1 for discrete time steps

      // Wrap position around torus world - create new object with wrapped position
      const wrappedPosition = this.wrapPosition(object.position)
      if (wrappedPosition.x !== object.position.x || wrappedPosition.y !== object.position.y) {
        object.position = wrappedPosition
      }
    })
    
    // Check and resolve collisions
    this.checkCollisions()
  }

  private checkCollisions(): void {
    for (let i = 0; i < this._objects.length; i++) {
      for (let j = i + 1; j < this._objects.length; j++) {
        const objA = this._objects[i]
        const objB = this._objects[j]
        
        if (objA != null && objB != null) {
          this.resolveCollision(objA, objB)
        }
      }
    }
  }

  private resolveCollision(objA: GameObject, objB: GameObject): void {
    const distance = objA.getDistanceTo(objB)
    const minDistance = objA.radius + objB.radius
    
    if (distance < minDistance && distance > 0) {
      // Objects are overlapping, apply separation force
      const overlap = minDistance - distance
      const direction = normalize(subtractVectors(objB.position, objA.position))
      
      // Force magnitude proportional to overlap and masses
      const totalMass = objA.mass + objB.mass
      const forceA = multiplyVector(direction, -overlap * objB.mass / totalMass)
      const forceB = multiplyVector(direction, overlap * objA.mass / totalMass)
      
      objA.applyForce(forceA)
      objB.applyForce(forceB)
    }
  }

  public wrapPosition(position: Vector2D): Vector2D {
    const wrappedX = ((position.x % this.config.width) + this.config.width) % this.config.width
    const wrappedY = ((position.y % this.config.height) + this.config.height) % this.config.height
    
    return { x: wrappedX, y: wrappedY }
  }

  // Helper function to check if two objects are adjacent
  public areObjectsAdjacent(objA: GameObject, objB: GameObject): boolean {
    return objA.isAdjacentTo(objB, this.config.adjacencyBuffer)
  }
}
