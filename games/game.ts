import type { Material, WorldConfig } from "./types"
import { createGameObjectId } from "./types"
import { World } from "./World"
import { GameObject } from "./objects/GameObject"

export class GameEngine {
  private world: World
  private isRunning: boolean
  private tickInterval: number | null
  private onUpdate?: (() => void) | undefined

  public constructor(worldConfig: WorldConfig) {
    this.world = new World(worldConfig)
    this.isRunning = false
    this.tickInterval = null
  }

  public start(tickRate = 60, onUpdate?: () => void): void {
    if (this.isRunning) {
      return
    }

    this.isRunning = true
    this.onUpdate = onUpdate

    this.tickInterval = window.setInterval(() => {
      this.world.update()
      this.onUpdate?.()
    }, 1000 / tickRate)
  }

  public stop(): void {
    if (!this.isRunning) {
      return
    }

    this.isRunning = false
    if (this.tickInterval !== null) {
      clearInterval(this.tickInterval)
      this.tickInterval = null
    }
  }

  public addObject(
    id: string,
    x: number,
    y: number,
    radius: number,
    mass: number,
    material: Material,
  ): GameObject {
    const gameObjectId = createGameObjectId(id)
    const object = new GameObject(
      gameObjectId,
      { x, y },
      radius,
      mass,
      material,
    )
    this.world.addObject(object)
    return object
  }

  public removeObject(id: string): void {
    const gameObjectId = createGameObjectId(id)
    this.world.removeObject(gameObjectId)
  }

  public getWorld(): World {
    return this.world
  }

  public getCurrentTick(): number {
    return this.world.tick
  }

  public getObjects(): GameObject[] {
    return this.world.objects as GameObject[]
  }
}

export const createDefaultWorldConfig = (): WorldConfig => ({
  width: 1000,
  height: 1000,
  friction: 0.1,
  maxSpeed: 1000,
  adjacencyBuffer: 1,
})
