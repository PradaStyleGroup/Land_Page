"use client"

import { useState, useEffect } from "react"

interface TypewriterTextProps {
  text: string
  speed?: number
  delay?: number
  infinite?: boolean
}

export function TypewriterText({ text, speed = 100, delay = 0, infinite = false }: TypewriterTextProps) {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [isFinished, setIsFinished] = useState(false)

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setIsTyping(true)
    }, delay)

    return () => clearTimeout(startTimeout)
  }, [delay])

  useEffect(() => {
    if (!isTyping || isFinished) return

    let timeout: NodeJS.Timeout

    if (!isDeleting && currentIndex < text.length) {
      // Digitando
      timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, speed)
    } else if (!isDeleting && currentIndex === text.length) {
      // Pausa antes de começar a apagar (só se for infinito)
      if (infinite) {
        timeout = setTimeout(() => {
          setIsDeleting(true)
        }, 2000)
      } else {
        // Se não for infinito, para aqui
        setIsFinished(true)
      }
    } else if (isDeleting && currentIndex > 0) {
      // Apagando
      timeout = setTimeout(() => {
        setDisplayText((prev) => prev.slice(0, -1))
        setCurrentIndex((prev) => prev - 1)
      }, speed / 2)
    } else if (isDeleting && currentIndex === 0) {
      // Pausa antes de começar a digitar novamente (só se for infinito)
      if (infinite) {
        timeout = setTimeout(() => {
          setIsDeleting(false)
        }, 1000)
      } else {
        // Se não for infinito, para aqui
        setIsFinished(true)
      }
    }

    return () => clearTimeout(timeout)
  }, [currentIndex, text, speed, isTyping, isDeleting, infinite, isFinished])

  return (
    <span className="relative">
      {displayText}
      {!isFinished && <span className="animate-pulse text-yellow-500">|</span>}
    </span>
  )
}
