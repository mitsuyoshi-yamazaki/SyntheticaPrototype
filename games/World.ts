import type {
  World as IWorld,
  WorldConfig,
  GameObject,
  Vector2D,
  GameObjectId,
} from "./types"
import { Physics } from "./Physics"

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
    this._objects = this._objects.filter((obj) => obj.id !== id)
  }

  public update(): void {
    this._tick++

    // Update all objects
    this._objects.forEach((object) => {
      object.updatePosition(1, this.config) // deltaTime = 1 for discrete time steps

      // Wrap position around torus world - create new object with wrapped position
      const wrappedPosition = this.wrapPosition(object.position)
      if (
        wrappedPosition.x !== object.position.x ||
        wrappedPosition.y !== object.position.y
      ) {
        object.position = wrappedPosition
      }
    })

    // Check and resolve collisions
    this.checkCollisions()
  }

  private checkCollisions(): void {
    this._objects.forEach((objA, i) => {
      for (let j = i + 1; j < this._objects.length; j++) {
        const objB = this._objects[j]
        if (objB == null) {
          continue
        }

        this.resolveCollision(objA, objB)
      }
    })
  }

  private resolveCollision(objA: GameObject, objB: GameObject): void {
    const forces = Physics.calculateSeparationForce(objA, objB)

    if (forces !== null) {
      objA.applyForce(forces.forceA)
      objB.applyForce(forces.forceB)
    }
  }

  public wrapPosition(position: Vector2D): Vector2D {
    const wrappedX =
      ((position.x % this.config.width) + this.config.width) % this.config.width
    const wrappedY =
      ((position.y % this.config.height) + this.config.height) %
      this.config.height

    return { x: wrappedX, y: wrappedY }
  }

  // Helper function to check if two objects are adjacent
  public areObjectsAdjacent(objA: GameObject, objB: GameObject): boolean {
    return objA.isAdjacentTo(objB, this.config.adjacencyBuffer)
  }
}
