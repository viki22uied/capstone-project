"use client"

import { useEffect, useRef } from "react"

interface ParticleEffectProps {
  type: string
}

export default function ParticleEffect({ type }: ParticleEffectProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const containerWidth = container.offsetWidth
    const containerHeight = container.offsetHeight

    // Clear any existing particles
    container.innerHTML = ""

    // Create particles based on type
    const particleCount = type === "lights" ? 15 : 25

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div")

      // Set base styles for all particles
      particle.style.position = "absolute"
      particle.style.pointerEvents = "none"

      // Random position
      const x = Math.random() * containerWidth
      const y = Math.random() * containerHeight
      particle.style.left = `${x}px`
      particle.style.top = `${y}px`

      // Random animation duration
      const duration = 2 + Math.random() * 4
      particle.style.animation = `float ${duration}s infinite ease-in-out`

      // Type-specific styles
      if (type === "bubbles") {
        const size = 5 + Math.random() * 15
        particle.style.width = `${size}px`
        particle.style.height = `${size}px`
        particle.style.borderRadius = "50%"
        particle.style.backgroundColor = "rgba(255, 255, 255, 0.3)"
        particle.style.boxShadow = "0 0 5px rgba(255, 255, 255, 0.5)"
      } else if (type === "leaves") {
        const size = 8 + Math.random() * 12
        particle.style.width = `${size}px`
        particle.style.height = `${size}px`
        particle.style.backgroundColor = "rgba(76, 175, 80, 0.5)"
        particle.style.borderRadius = "30% 70% 70% 30% / 30% 30% 70% 70%"
        particle.style.transform = `rotate(${Math.random() * 360}deg)`
      } else if (type === "lights") {
        const size = 3 + Math.random() * 8
        particle.style.width = `${size}px`
        particle.style.height = `${size}px`
        particle.style.borderRadius = "50%"

        // Random neon color
        const colors = ["rgba(255, 0, 128, 0.7)", "rgba(0, 255, 255, 0.7)", "rgba(255, 255, 0, 0.7)"]
        const color = colors[Math.floor(Math.random() * colors.length)]
        particle.style.backgroundColor = color
        particle.style.boxShadow = `0 0 10px ${color}`
      }

      // Add particle to container
      container.appendChild(particle)

      // Animate particle
      const animateParticle = () => {
        const newX = x + (Math.random() * 40 - 20)
        const newY = y + (Math.random() * 40 - 20)

        particle.animate(
          [
            { transform: `translate(0, 0)` },
            { transform: `translate(${newX - x}px, ${newY - y}px)` },
            { transform: `translate(0, 0)` },
          ],
          {
            duration: duration * 1000,
            iterations: Number.POSITIVE_INFINITY,
          },
        )
      }

      animateParticle()
    }

    // Add keyframes for floating animation
    const style = document.createElement("style")
    style.textContent = `
      @keyframes float {
        0%, 100% { transform: translateY(0) rotate(0); }
        50% { transform: translateY(-20px) rotate(5deg); }
      }
    `
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style)
    }
  }, [type])

  return <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none" />
}
