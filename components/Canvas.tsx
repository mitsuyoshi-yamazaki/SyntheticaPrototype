import { useEffect, useRef, useState } from "react"
import type p5 from "p5"
import { GameEngine, createDefaultWorldConfig } from "../games/game"

function CanvasComponent() {
  const canvasRef = useRef<HTMLDivElement>(null)
  const [gameEngine, setGameEngine] = useState<GameEngine | null>(null)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    if (canvasRef.current == null) {
      return
    }

    let p5Instance: p5 | null = null

    const loadP5AndCreateSketch = async () => {
      try {
        const p5Constructor = (await import("p5")).default

        // Initialize game engine
        const config = createDefaultWorldConfig()
        const engine = new GameEngine(config)
        setGameEngine(engine)

        // Add some sample objects
        engine.addObject("obj1", 200, 200, 20, 10, "blue")
        engine.addObject("obj2", 300, 300, 15, 8, "blue")
        engine.addObject("obj3", 400, 250, 25, 15, "red")

        const sketch = (p: p5) => {
          const viewScale = 0.8
          const viewOffsetX = 0
          const viewOffsetY = 0

          p.setup = () => {
            p.createCanvas(800, 600)
            p.background(30)
          }

          p.draw = () => {
            p.background(30)

            // Transform to world coordinates
            p.push()
            p.translate(viewOffsetX, viewOffsetY)
            p.scale(viewScale)

            // Draw world bounds
            p.stroke(100)
            p.strokeWeight(2 / viewScale)
            p.noFill()
            p.rect(0, 0, config.width, config.height)

            // Draw objects
            const objects = engine.getObjects()
            for (const obj of objects) {
              // Set color based on material
              if (obj.material === "blue") {
                p.fill(100, 200, 100)
              } else if (obj.material === "red") {
                p.fill(200, 100, 100)
              } else {
                p.fill(150, 150, 150)
              }

              p.stroke(255)
              p.strokeWeight(1 / viewScale)

              // Draw circle
              p.circle(obj.position.x, obj.position.y, obj.radius * 2)

              // Draw velocity vector
              if (obj.velocity.x !== 0 || obj.velocity.y !== 0) {
                p.stroke(255, 255, 0)
                p.strokeWeight(2 / viewScale)
                const endX = obj.position.x + obj.velocity.x * 10
                const endY = obj.position.y + obj.velocity.y * 10
                p.line(obj.position.x, obj.position.y, endX, endY)
              }
            }

            p.pop()

            // Draw UI
            p.fill(255)
            p.textSize(16)
            p.text(`Tick: ${engine.getCurrentTick()}`, 10, 20)
            p.text(`Objects: ${objects.length}`, 10, 40)
            p.text(`Running: ${isRunning ? "Yes" : "No"}`, 10, 60)
            p.text("Click to add random force to objects", 10, 580)
          }

          p.mousePressed = () => {
            if (
              p.mouseX < 0 ||
              p.mouseX > p.width ||
              p.mouseY < 0 ||
              p.mouseY > p.height
            ) {
              return
            }

            // Convert screen coordinates to world coordinates
            const worldX = (p.mouseX - viewOffsetX) / viewScale
            const worldY = (p.mouseY - viewOffsetY) / viewScale

            // Apply random forces to nearby objects
            const objects = engine.getObjects()
            for (const obj of objects) {
              const distance = Math.sqrt(
                Math.pow(obj.position.x - worldX, 2) +
                  Math.pow(obj.position.y - worldY, 2),
              )

              if (distance < 100) {
                const forceX = (Math.random() - 0.5) * 200
                const forceY = (Math.random() - 0.5) * 200
                obj.applyForce({ x: forceX, y: forceY })
              }
            }
          }

          p.windowResized = () => {
            const container = canvasRef.current
            if (container != null) {
              p.resizeCanvas(container.offsetWidth, container.offsetHeight)
            }
          }
        }

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        p5Instance = new p5Constructor(sketch, canvasRef.current!)
      } catch (error) {
        console.error("Failed to load p5.js:", error)
      }
    }

    // FixMe
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    loadP5AndCreateSketch()

    return () => {
      if (p5Instance != null) {
        p5Instance.remove()
      }
    }
  }, [])

  const toggleSimulation = () => {
    if (gameEngine == null) {
      return
    }

    if (isRunning) {
      gameEngine.stop()
      setIsRunning(false)
    } else {
      gameEngine.start(60)
      setIsRunning(true)
    }
  }

  const addRandomObject = () => {
    if (gameEngine == null) {
      return
    }

    const x = Math.random() * 1000
    const y = Math.random() * 1000
    const radius = 10 + Math.random() * 20
    const mass = radius / 2
    const material = Math.random() > 0.5 ? "blue" : "red"
    const id = `obj_${Date.now()}_${Math.random()}`

    gameEngine.addObject(id, x, y, radius, mass, material)
  }

  return (
    <div className="w-full h-full relative">
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
        <button
          onClick={toggleSimulation}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {isRunning ? "Stop" : "Start"} Simulation
        </button>
        <button
          onClick={addRandomObject}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Add Object
        </button>
      </div>
      <div
        ref={canvasRef}
        className="w-full h-full"
        style={{ minHeight: "400px" }}
      />
    </div>
  )
}

export default CanvasComponent
