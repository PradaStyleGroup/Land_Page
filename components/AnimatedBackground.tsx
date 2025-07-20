"use client"

import { useState, useEffect, useRef, useCallback } from "react"

interface Particle {
  id: number
  x: number
  y: number
  vx: number
  vy: number
}

export function AnimatedBackground() {
  const [particles, setParticles] = useState<Particle[]>([])
  const animationRef = useRef<number>()
  const lastTimeRef = useRef<number>(0)
  const containerRef = useRef<HTMLDivElement>(null)

  // Função para criar partículas iniciais
  const createParticles = useCallback(() => {
    const particleCount = 50
    const width = typeof window !== "undefined" ? window.innerWidth : 1920
    const height = typeof window !== "undefined" ? window.innerHeight : 1080
    
    return Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 1.0,
      vy: (Math.random() - 0.5) * 1.0,
    }))
  }, [])

  // Função de animação otimizada
  const animate = useCallback((currentTime: number) => {
    if (!lastTimeRef.current) lastTimeRef.current = currentTime
    const deltaTime = currentTime - lastTimeRef.current
    
    // Limitar a taxa de atualização para melhor performance
    if (deltaTime < 16) { // ~60fps
      animationRef.current = requestAnimationFrame(animate)
      return
    }
    
    lastTimeRef.current = currentTime

    setParticles((prevParticles) => {
      const width = typeof window !== "undefined" ? window.innerWidth : 1920
      const height = typeof window !== "undefined" ? window.innerHeight : 1080
      
      return prevParticles.map((particle) => {
        let newX = particle.x + particle.vx
        let newY = particle.y + particle.vy
        let newVx = particle.vx
        let newVy = particle.vy

        // Bounce off walls
        if (newX <= 0 || newX >= width) {
          newVx = -newVx
          newX = Math.max(0, Math.min(width, newX))
        }
        if (newY <= 0 || newY >= height) {
          newVy = -newVy
          newY = Math.max(0, Math.min(height, newY))
        }

        return {
          ...particle,
          x: newX,
          y: newY,
          vx: newVx,
          vy: newVy,
        }
      })
    })

    animationRef.current = requestAnimationFrame(animate)
  }, [])

  // Inicializar partículas e animação
  useEffect(() => {
    setParticles(createParticles())
    
    // Garantir que a animação seja iniciada
    const startAnimation = () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      animationRef.current = requestAnimationFrame(animate)
    }
    
    startAnimation()

    // Cleanup function
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [createParticles, animate])

  // Verificar se a animação ainda está rodando e reiniciar se necessário
  useEffect(() => {
    const checkAnimation = () => {
      if (!animationRef.current) {
        animationRef.current = requestAnimationFrame(animate)
      }
    }
    
    const interval = setInterval(checkAnimation, 5000) // Verificar a cada 5 segundos
    
    return () => clearInterval(interval)
  }, [animate])

  // Reajustar partículas quando a janela for redimensionada
  useEffect(() => {
    const handleResize = () => {
      setParticles(createParticles())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [createParticles])

  return (
    <div ref={containerRef} className="fixed inset-0 overflow-hidden pointer-events-none z-0 animated-background">
      <svg className="w-full h-full particle-container" style={{ willChange: 'transform' }}>
        {particles.map((particle, index) => (
          <g key={particle.id}>
            <circle cx={particle.x} cy={particle.y} r="2" fill="rgba(255, 215, 0, 0.3)" />
            {particles.slice(index + 1).map((otherParticle) => {
              const distance = Math.sqrt(
                Math.pow(particle.x - otherParticle.x, 2) + Math.pow(particle.y - otherParticle.y, 2)
              )
              if (distance < 150) {
                return (
                  <line
                    key={`${particle.id}-${otherParticle.id}`}
                    x1={particle.x}
                    y1={particle.y}
                    x2={otherParticle.x}
                    y2={otherParticle.y}
                    stroke="rgba(255, 215, 0, 0.1)"
                    strokeWidth="1"
                  />
                )
              }
              return null
            })}
          </g>
        ))}
      </svg>
    </div>
  )
}
