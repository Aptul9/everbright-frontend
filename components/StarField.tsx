"use client"

import React, { useEffect, useRef } from "react"


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

export function StarField() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const starsRef = useRef<Star[]>([])
    const staticStarsRef = useRef<StaticStar[]>([])
    const scrollStarsRef = useRef<Star[]>([])
    const mouseRef = useRef<{ x: number, y: number } | null>(null)
    const lastScrollY = useRef(0)

    useEffect(() => {
        const canvas = canvasRef.current
        const container = containerRef.current
        if (!canvas || !container) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        const resize = () => {
            canvas.width = container.clientWidth
            canvas.height = container.clientHeight
            initStars()
        }

        const initStars = () => {
            const { width, height } = canvas
            // Density for moving stars: ~1 star per 4000px^2
            const count = Math.floor((width * height) / 4000)
            const stars: Star[] = []

            for (let i = 0; i < count; i++) {
                stars.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: (Math.random() - 0.5) * 0.2, // Small initial drift
                    vy: (Math.random() - 0.5) * 0.2,
                    radius: Math.random() * 1.5 + 0.5,
                    alpha: Math.random() * 0.5 + 0.3,
                    baseAlpha: Math.random() * 0.5 + 0.3
                })
            }
            starsRef.current = stars

            // Static stars (fewer, but visible)
            const staticCount = Math.floor(count / 3)
            const staticStars: StaticStar[] = []
            for (let i = 0; i < staticCount; i++) {
                staticStars.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    radius: Math.random() * 2.0 + 0.5, // Visible size
                    alpha: Math.random() * 0.5 + 0.4 // Visible brightness
                })
            }
            staticStarsRef.current = staticStars;

            // Scroll Reactive Stars (for Mobile)
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
                    baseAlpha: Math.random() * 0.5 + 0.3
                })
            }
            scrollStarsRef.current = scrollStars
        }

        const render = () => {
            if (!ctx || !canvas) return
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            const mouse = mouseRef.current

            // Draw Static Stars
            staticStarsRef.current.forEach(star => {
                ctx.beginPath()
                ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
                ctx.fill()
                ctx.fill()
            })

            const currentScrollY = window.scrollY
            const scrollDelta = currentScrollY - lastScrollY.current
            lastScrollY.current = currentScrollY

            // Draw and Update Scroll Reactive Stars
            scrollStarsRef.current.forEach(star => {
                // React to scroll
                if (Math.abs(scrollDelta) > 0) {
                    // React to scroll with variable speed (parallax effect)
                    const depth = star.alpha * 2;
                    star.vy = -scrollDelta * 0.8 * depth
                }

                // Friction
                star.vy *= 0.95

                // Move
                star.y += star.vy

                // Screen Wrap
                if (star.y < 0) star.y = canvas.height
                if (star.y > canvas.height) star.y = 0

                // Draw
                ctx.beginPath()
                ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
                ctx.fill()
            })

            // Draw and Update Moving Stars
            starsRef.current.forEach(star => {
                // Physics update

                // 1. Mouse Attraction (Magnetic Effect)
                if (mouse) {
                    const dx = mouse.x - star.x
                    const dy = mouse.y - star.y
                    const dist = Math.sqrt(dx * dx + dy * dy)
                    const threshold = 400

                    if (dist < threshold) {
                        const force = (threshold - dist) / threshold
                        // Accel towards mouse
                        star.vx += (dx / dist) * force * 0.15
                        star.vy += (dy / dist) * force * 0.15
                    }
                }

                // 2. Friction (Damping) - prevents infinite acceleration
                star.vx *= 0.98
                star.vy *= 0.98

                // 3. Move
                star.x += star.vx
                star.y += star.vy

                // 4. Screen Wrap
                if (star.x < 0) star.x = canvas.width
                if (star.x > canvas.width) star.x = 0
                if (star.y < 0) star.y = canvas.height
                if (star.y > canvas.height) star.y = 0

                // 5. Draw
                ctx.beginPath()
                ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
                ctx.fill()
            })

            requestAnimationFrame(render)
        }

        // Handle mouse move globally to catch events even when hovering over content
        const handleGlobalMouseMove = (e: MouseEvent) => {
            if (!container) return
            const rect = container.getBoundingClientRect()

            // Check if mouse is inside the container
            if (
                e.clientX >= rect.left &&
                e.clientX <= rect.right &&
                e.clientY >= rect.top &&
                e.clientY <= rect.bottom
            ) {
                mouseRef.current = {
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top
                }
            } else {
                mouseRef.current = null
            }
        }

        window.addEventListener("resize", resize)
        window.addEventListener("mousemove", handleGlobalMouseMove)

        resize()
        const raf = requestAnimationFrame(render)

        return () => {
            window.removeEventListener("resize", resize)
            window.removeEventListener("mousemove", handleGlobalMouseMove)
            cancelAnimationFrame(raf)
        }
    }, [])

    return (
        <div ref={containerRef} className="absolute inset-0 z-[2] overflow-hidden pointer-events-none">
            <canvas ref={canvasRef} className="block w-full h-full" />
        </div>
    )
}
