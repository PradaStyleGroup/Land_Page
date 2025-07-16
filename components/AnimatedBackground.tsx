"use client"

import { useState, useEffect } from "react"

interface Particle {
  id: number
  x: number
  y: number
  vx: number
  vy: number
}

export function AnimatedBackground() {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    const particleCount = 50
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1920),
      y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 1080),
      vx: (Math.random() - 0.5) * 1.0,
      vy: (Math.random() - 0.5) * 1.0,
    }))
    setParticles(newParticles)

    const animate = () => {
      setParticles((prev) =>
        prev.map((particle) => ({
          ...particle,
          x: particle.x + particle.vx,
          y: particle.y + particle.vy,
          vx:
            particle.x <= 0 || particle.x >= (typeof window !== "undefined" ? window.innerWidth : 1920)
              ? -particle.vx
              : particle.vx,
          vy:
            particle.y <= 0 || particle.y >= (typeof window !== "undefined" ? window.innerHeight : 1080)
              ? -particle.vy
              : particle.vy,
        })),
      )
    }

    const interval = setInterval(animate, 30)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <svg className="w-full h-full">
        {particles.map((particle, index) => (
          <g key={particle.id}>
            <circle cx={particle.x} cy={particle.y} r="2" fill="rgba(255, 215, 0, 0.3)" />
            {particles.slice(index + 1).map((otherParticle) => {
              const distance = Math.sqrt(
                Math.pow(particle.x - otherParticle.x, 2) + Math.pow(particle.y - otherParticle.y, 2),
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
