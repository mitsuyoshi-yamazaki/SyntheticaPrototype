
// Nominal Types
declare const GameObjectIdBrand: unique symbol
export type GameObjectId = string & { [GameObjectIdBrand]: never }

export const createGameObjectId = (id: string): GameObjectId => id as GameObjectId

// Immutable Vector2D
export interface Vector2D {
  readonly x: number
  readonly y: number
}

export const createVector2D = (x: number, y: number): Vector2D => ({ x, y })

export type Material = "blue" | "red"

// Immutable GameObjectProperties
export interface GameObjectProperties {
  readonly id: GameObjectId
  readonly position: Vector2D
  readonly radius: number
  readonly velocity: Vector2D
  readonly mass: number
  readonly material: Material
}

// Immutable WorldConfig
export interface WorldConfig {
  readonly width: number
  readonly height: number
  readonly friction: number
  readonly maxSpeed: number
  readonly adjacencyBuffer: number
}

// GameObject interface
export interface GameObject {
  readonly id: GameObjectId
  position: Vector2D  // mutable for physics simulation
  readonly radius: number
  velocity: Vector2D  // mutable for physics simulation
  readonly mass: number
  readonly material: Material
  applyForce(force: Vector2D): void
  update(deltaTime: number, worldConfig: WorldConfig): void
  getDistanceTo(other: GameObject): number
  isAdjacentTo(other: GameObject, adjacencyBuffer: number): boolean
}

// World interface
export interface World {
  readonly config: WorldConfig
  readonly objects: readonly GameObject[]
  readonly tick: number
  addObject(object: GameObject): void
  removeObject(id: GameObjectId): void
  update(): void
}
