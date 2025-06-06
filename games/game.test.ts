
import { GameEngine, createDefaultWorldConfig } from "./game"
import { GameObject } from "./objects/GameObject"
import { World } from "./World"
import { createGameObjectId } from "./types"

describe("GameEngine", () => {
  let gameEngine: GameEngine

  beforeEach(() => {
    const config = createDefaultWorldConfig()
    gameEngine = new GameEngine(config)
  })

  test("should create a game engine with default config", () => {
    expect(gameEngine).toBeDefined()
    expect(gameEngine.getCurrentTick()).toBe(0)
    expect(gameEngine.getObjects()).toHaveLength(0)
  })

  test("should add and remove objects", () => {
    const object = gameEngine.addObject("test1", 100, 100, 10, 5, "blue")
    expect(gameEngine.getObjects()).toHaveLength(1)
    expect(object.id).toBe("test1")
    expect(object.position.x).toBe(100)
    expect(object.position.y).toBe(100)

    gameEngine.removeObject("test1")
    expect(gameEngine.getObjects()).toHaveLength(0)
  })
})

describe("GameObject", () => {
  test("should create a game object with correct properties", () => {
    const obj = new GameObject(createGameObjectId("test"), { x: 50, y: 75 }, 10, 5, "blue")
    
    expect(obj.id).toBe("test")
    expect(obj.position.x).toBe(50)
    expect(obj.position.y).toBe(75)
    expect(obj.radius).toBe(10)
    expect(obj.mass).toBe(5)
    expect(obj.material).toBe("blue")
  })

  test("should apply force and update velocity", () => {
    const obj = new GameObject(createGameObjectId("test"), { x: 0, y: 0 }, 10, 1, "blue")
    const config = createDefaultWorldConfig()
    
    // Apply force
    obj.applyForce({ x: 10, y: 0 })
    obj.update(1, config)
    
    // Velocity should be increased by force/mass, reduced by friction
    // Expected: 10 * (1 - friction) = 10 * 0.9 = 9
    expect(obj.velocity.x).toBe(9)
    expect(obj.position.x).toBe(9)
  })

  test("should detect adjacency correctly", () => {
    const obj1 = new GameObject(createGameObjectId("test1"), { x: 0, y: 0 }, 10, 1, "blue")
    const obj2 = new GameObject(createGameObjectId("test2"), { x: 20, y: 0 }, 10, 1, "blue")
    const obj3 = new GameObject(createGameObjectId("test3"), { x: 50, y: 0 }, 10, 1, "blue")
    
    // obj1 and obj2 should be adjacent (distance 20, radii sum 20, buffer 1 = 21)
    expect(obj1.isAdjacentTo(obj2, 1)).toBe(true)
    
    // obj1 and obj3 should not be adjacent
    expect(obj1.isAdjacentTo(obj3, 1)).toBe(false)
  })

  test("should calculate distance correctly", () => {
    const obj1 = new GameObject(createGameObjectId("test1"), { x: 0, y: 0 }, 10, 1, "blue")
    const obj2 = new GameObject(createGameObjectId("test2"), { x: 3, y: 4 }, 10, 1, "blue")
    
    expect(obj1.getDistanceTo(obj2)).toBe(5) // 3-4-5 triangle
  })
})

describe("World", () => {
  test("should wrap position correctly for torus world", () => {
    const config = createDefaultWorldConfig()
    const world = new World(config)
    
    // Test wrapping beyond positive boundary
    const wrapped1 = world.wrapPosition({ x: 1100, y: 1200 })
    expect(wrapped1.x).toBe(100)
    expect(wrapped1.y).toBe(200)
    
    // Test wrapping beyond negative boundary
    const wrapped2 = world.wrapPosition({ x: -50, y: -25 })
    expect(wrapped2.x).toBe(950)
    expect(wrapped2.y).toBe(975)
  })

  test("should check adjacency between objects", () => {
    const config = createDefaultWorldConfig()
    const world = new World(config)
    
    const obj1 = new GameObject(createGameObjectId("test1"), { x: 0, y: 0 }, 10, 1, "blue")
    const obj2 = new GameObject(createGameObjectId("test2"), { x: 20, y: 0 }, 10, 1, "blue")
    
    world.addObject(obj1)
    world.addObject(obj2)
    
    expect(world.areObjectsAdjacent(obj1, obj2)).toBe(true)
  })
})
