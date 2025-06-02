import { useEffect, useRef } from 'react'
import p5 from 'p5'

export default function Canvas() {
  const canvasRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const sketch = (p: p5) => {
      p.setup = () => {
        p.createCanvas(800, 600)
        p.background(0xFF)
      }

      p.draw = () => {
        p.fill(0x22)
        p.rect(100, 100, 100, 100)
      }

      p.windowResized = () => {
        // const container = canvasRef.current
        // if (container) {
        //   p.resizeCanvas(container.offsetWidth, container.offsetHeight)
        // }
      }
    }

    const p5Instance = new p5(sketch, canvasRef.current)

    return () => {
      p5Instance.remove()
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
