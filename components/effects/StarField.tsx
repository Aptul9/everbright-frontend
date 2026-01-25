'use client'

import React, { useEffect, useRef } from 'react'

interface Star {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  alpha: number
  baseAlpha: number
}

interface StaticStar {
  x: number
  y: number
  radius: number
  alpha: number
}

interface Comet {
  x: number
  y: number
  vx: number
  vy: number
  length: number
  alpha: number
  thickness: number
}

export function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const starsRef = useRef<Star[]>([])
  const staticStarsRef = useRef<StaticStar[]>([])
  const scrollStarsRef = useRef<Star[]>([])
  const cometsRef = useRef<Comet[]>([])
  const mouseRef = useRef<{ x: number; y: number } | null>(null)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = container.clientWidth
      canvas.height = container.clientHeight
      initStars()
    }

    const initStars = () => {
      const { width, height } = canvas

      const count = Math.floor((width * height) / 4000)
      const stars: Star[] = []

      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          radius: Math.random() * 1.5 + 0.5,
          alpha: Math.random() * 0.5 + 0.3,
          baseAlpha: Math.random() * 0.5 + 0.3,
        })
      }
      starsRef.current = stars

      const staticCount = Math.floor(count / 3)
      const staticStars: StaticStar[] = []
      for (let i = 0; i < staticCount; i++) {
        staticStars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 2.0 + 0.5,
          alpha: Math.random() * 0.5 + 0.4,
        })
      }
      staticStarsRef.current = staticStars

      const scrollCount = Math.floor(count / 2)
      const scrollStars: Star[] = []
      for (let i = 0; i < scrollCount; i++) {
        scrollStars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: 0,
          vy: 0,
          radius: Math.random() * 1.5 + 0.5,
          alpha: Math.random() * 0.5 + 0.3,
          baseAlpha: Math.random() * 0.5 + 0.3,
        })
      }
      scrollStarsRef.current = scrollStars
    }

    const render = () => {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const mouse = mouseRef.current

      staticStarsRef.current.forEach((star) => {
        ctx.beginPath()
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        ctx.fill()
        ctx.fill()
      })

      const currentScrollY = window.scrollY
      const scrollDelta = currentScrollY - lastScrollY.current
      lastScrollY.current = currentScrollY

      scrollStarsRef.current.forEach((star) => {
        if (Math.abs(scrollDelta) > 0) {
          const depth = star.alpha * 2
          star.vy = -scrollDelta * 0.8 * depth
        }

        star.vy *= 0.95

        star.y += star.vy

        if (star.y < 0) star.y = canvas.height
        if (star.y > canvas.height) star.y = 0

        ctx.beginPath()
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        ctx.fill()
      })

      starsRef.current.forEach((star) => {
        if (mouse) {
          const dx = mouse.x - star.x
          const dy = mouse.y - star.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          const threshold = 400

          if (dist < threshold) {
            const force = (threshold - dist) / threshold

            star.vx += (dx / dist) * force * 0.15
            star.vy += (dy / dist) * force * 0.15
          }
        }

        star.vx *= 0.98
        star.vy *= 0.98

        star.x += star.vx
        star.y += star.vy

        if (star.x < 0) star.x = canvas.width
        if (star.x > canvas.width) star.x = 0
        if (star.y < 0) star.y = canvas.height
        if (star.y > canvas.height) star.y = 0

        ctx.beginPath()
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        ctx.fill()
      })

      if (cometsRef.current.length < 2 && Math.random() < 0.005) {
        const side = Math.random() > 0.5 ? 'left' : 'top'
        const length = Math.random() * 80 + 40
        const angle = (Math.random() * 30 + 15) * (Math.PI / 180)
        const speed = Math.random() * 4 + 3

        cometsRef.current.push({
          x: side === 'left' ? -length : Math.random() * canvas.width,
          y: side === 'top' ? -length : Math.random() * canvas.height * 0.5,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          length: length,
          alpha: 1.0,
          thickness: Math.random() * 1.5 + 1.0,
        })
      }

      for (let i = cometsRef.current.length - 1; i >= 0; i--) {
        const comet = cometsRef.current[i]
        comet.x += comet.vx
        comet.y += comet.vy
        comet.alpha -= 0.002

        if (
          comet.alpha <= 0 ||
          comet.x > canvas.width + comet.length ||
          comet.y > canvas.height + comet.length
        ) {
          cometsRef.current.splice(i, 1)
          continue
        }

        const gradient = ctx.createLinearGradient(
          comet.x,
          comet.y,
          comet.x - comet.vx * (comet.length / 5),
          comet.y - comet.vy * (comet.length / 5)
        )
        gradient.addColorStop(0, `rgba(200, 230, 255, ${comet.alpha * 0.8})`)
        gradient.addColorStop(1, `rgba(100, 150, 255, 0)`)

        ctx.beginPath()
        ctx.strokeStyle = gradient
        ctx.lineWidth = comet.thickness
        ctx.lineCap = 'round'
        ctx.moveTo(comet.x, comet.y)
        ctx.lineTo(comet.x - comet.vx * (comet.length / 5), comet.y - comet.vy * (comet.length / 5))
        ctx.stroke()

        ctx.beginPath()
        ctx.fillStyle = `rgba(255, 255, 255, ${comet.alpha})`
        ctx.arc(comet.x, comet.y, comet.thickness * 1.2, 0, Math.PI * 2)
        ctx.fill()

        ctx.shadowBlur = 10
        ctx.shadowColor = 'rgba(100, 150, 255, 0.5)'
        ctx.stroke()
        ctx.shadowBlur = 0
      }

      requestAnimationFrame(render)
    }

    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!container) return
      const rect = container.getBoundingClientRect()

      if (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      ) {
        mouseRef.current = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        }
      } else {
        mouseRef.current = null
      }
    }

    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', handleGlobalMouseMove)

    resize()
    const raf = requestAnimationFrame(render)

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleGlobalMouseMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div ref={containerRef} className="absolute inset-0 z-2 overflow-hidden pointer-events-none">
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  )
}
