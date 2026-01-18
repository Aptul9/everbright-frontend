'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

export function SpaceSunrise() {
  const [active, setActive] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setActive(true)
    }, 2200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none mask-[linear-gradient(to_bottom,transparent_0%,black_20%)]">
      <div
        className={cn(
          'absolute left-1/2 -translate-x-1/2 rounded-[100%] bg-black transition-all duration-4000 ease-out will-change-transform',
          active
            ? 'w-[400%] h-[200%] md:w-[200%] -bottom-[90%] opacity-100 shadow-[0_-60px_160px_20px_rgba(0,100,255,0.7),0_-20px_60px_10px_rgba(180,220,255,0.5)] border-t border-blue-400/40'
            : 'w-[240%] h-[120%] md:w-[120%] -bottom-full opacity-0 shadow-none border-transparent'
        )}
      />

      <div
        className={cn(
          'absolute left-1/2 -translate-x-1/2 transition-all duration-5000 ease-out flex items-center justify-center',
          active ? 'bottom-[10%] opacity-100 scale-100' : 'bottom-[-10%] opacity-0 scale-50'
        )}
      >
        <div className="w-16 h-16 bg-white rounded-full blur-sm shadow-[0_0_60px_20px_rgba(255,255,255,0.6)]" />

        <div className="absolute w-[400vw] md:w-[180vw] h-0.5 bg-blue-400/30 blur-[3px]" />
        <div className="absolute w-[200vw] md:w-[90vw] h-0.75 bg-white/40 blur-xs" />

        <div className="absolute w-1 h-[60vw] bg-linear-to-t from-transparent via-white/20 to-transparent blur-[0px] rotate-45" />
        <div className="absolute w-1 h-[60vw] bg-linear-to-t from-transparent via-white/20 to-transparent blur-[0px] -rotate-45" />
      </div>

      <div
        className={cn(
          'absolute inset-0 bg-white mix-blend-overlay transition-opacity duration-3000 ease-out',
          active ? 'opacity-0' : 'opacity-0'
        )}
      />

      <div
        className={cn(
          'absolute bottom-0 left-0 w-full h-75 bg-linear-to-t from-blue-950/20 to-transparent transition-opacity duration-1000',
          active ? 'opacity-100' : 'opacity-0'
        )}
      />
    </div>
  )
}
