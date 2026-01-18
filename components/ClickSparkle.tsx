'use client'

import { useEffect, useState } from 'react'

interface Sparkle {
  id: number
  x: number
  y: number
  rotation: number
}

export function ClickSparkle() {
  const [sparkles, setSparkles] = useState<Sparkle[]>([])

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const newSparkle = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
        rotation: Math.random() * 90,
      }

      setSparkles((prev) => [...prev, newSparkle])

      setTimeout(() => {
        setSparkles((prev) => prev.filter((s) => s.id !== newSparkle.id))
      }, 600)
    }

    window.addEventListener('click', handleClick)
    return () => window.removeEventListener('click', handleClick)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-9999 overflow-hidden">
      {sparkles.map((s) => (
        <div
          key={s.id}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{
            left: s.x,
            top: s.y,
            transform: `translate(-50%, -50%) rotate(${s.rotation}deg)`,
          }}
        >
          <div className="absolute inset-0 w-1.5 h-1.5 bg-white rounded-full blur-[1px] animate-star-pop" />

          <div className="absolute h-10 w-[1.5px] bg-linear-to-t from-transparent via-cyan-300 to-transparent -translate-y-1/2 animate-star-rays" />
          <div className="absolute w-10 h-[1.5px] bg-linear-to-r from-transparent via-cyan-300 to-transparent -translate-x-1/2 animate-star-rays" />

          <div className="absolute inset-0 w-8 h-8 bg-cyan-400/20 rounded-full blur-xl animate-star-glow" />
        </div>
      ))}

      <style jsx global>{`
        @keyframes star-pop {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          20% {
            transform: scale(1.4);
            opacity: 1;
          }
          100% {
            transform: scale(0);
            opacity: 0;
          }
        }
        @keyframes star-rays {
          0% {
            transform: scaleY(0) scaleX(0);
            opacity: 0;
          }
          30% {
            transform: scaleY(1.2) scaleX(1);
            opacity: 1;
          }
          100% {
            transform: scaleY(0) scaleX(0);
            opacity: 0;
          }
        }
        @keyframes star-glow {
          0% {
            opacity: 0;
          }
          30% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }
        .animate-star-pop {
          animation: star-pop 0.5s ease-out forwards;
        }
        .animate-star-rays {
          animation: star-rays 0.4s ease-out forwards;
        }
        .animate-star-glow {
          animation: star-glow 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  )
}
