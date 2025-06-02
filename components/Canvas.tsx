import { useEffect, useRef } from 'react'
import type p5 from 'p5'

function CanvasComponent() {
  const canvasRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    let p5Instance: p5 | null = null

    const loadP5AndCreateSketch = async () => {
      try {
        const p5Constructor = (await import('p5')).default
        
        const sketch = (p: p5) => {
          p.setup = () => {
            p.createCanvas(800, 600)
            p.background(255)
          }

          p.draw = () => {
            p.fill(34)
            p.rect(100, 100, 100, 100)
          }

          p.windowResized = () => {
            const container = canvasRef.current
            if (container) {
              p.resizeCanvas(container.offsetWidth, container.offsetHeight)
            }
          }
        }

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        p5Instance = new p5Constructor(sketch, canvasRef.current!)
      } catch (error) {
        console.error('Failed to load p5.js:', error)
      }
    }

    // FixMe
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    loadP5AndCreateSketch()

    return () => {
      if (p5Instance) {
        p5Instance.remove()
      }
    }
  }, [])

  return (
    <div 
      ref={canvasRef} 
      className="w-full h-full"
      style={{ minHeight: '400px' }}
    />
  )
}

export default CanvasComponent
