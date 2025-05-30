import { useEffect, useRef } from 'react'
import p5 from 'p5'

export default function Canvas() {
  const canvasRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const sketch = (p: p5) => {
      let angle = 0

      p.setup = () => {
        p.createCanvas(800, 600)
        p.background(220)
      }

      p.draw = () => {
        p.background(220, 20) // 半透明の背景でトレイル効果
        
        // 中心点
        const centerX = p.width / 2
        const centerY = p.height / 2
        
        // 回転する円
        p.push()
        p.translate(centerX, centerY)
        p.rotate(angle)
        
        p.fill(100, 150, 255)
        p.noStroke()
        p.ellipse(100, 0, 20, 20)
        
        p.fill(255, 100, 150)
        p.ellipse(-100, 0, 15, 15)
        
        p.pop()
        
        // テキスト表示
        p.fill(50)
        p.textAlign(p.CENTER, p.CENTER)
        p.textSize(16)
        p.text('Synthetica Prototype - Canvas Test', centerX, 50)
        
        p.textSize(12)
        p.text('p5.jsが正常に動作しています', centerX, 70)
        
        angle += 0.02
      }

      p.windowResized = () => {
        const container = canvasRef.current
        if (container) {
          p.resizeCanvas(container.offsetWidth, container.offsetHeight)
        }
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
