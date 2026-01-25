'use client'

import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import { useThaiData } from '@/lib/thai-context'

interface NavContactButtonProps {
  onClick: () => void
  isMobile?: boolean
  className?: string
}

export function NavContactButton({ onClick, isMobile = false, className }: NavContactButtonProps) {
  const { labels } = useThaiData()
  const [shouldPulse, setShouldPulse] = useState(false)
  const [isTouched, setIsTouched] = useState(false)

  useEffect(() => {
    const initialTimeout = setTimeout(() => {
      setShouldPulse(true)
      setTimeout(() => setShouldPulse(false), 2000)
    }, 3000)

    const interval = setInterval(() => {
      setShouldPulse(true)
      setTimeout(() => setShouldPulse(false), 2000)
    }, 30000)

    return () => {
      clearTimeout(initialTimeout)
      clearInterval(interval)
    }
  }, [])

  if (isMobile) {
    return (
      <Button
        className={`relative overflow-hidden font-bold rounded-full px-12 h-14 text-sm tracking-[0.2em] uppercase transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)]
                    ${
                      isTouched
                        ? 'bg-cyan-400 text-black scale-105 shadow-[0_0_30px_rgba(34,211,238,0.4)]'
                        : 'bg-white text-black hover:bg-cyan-400 hover:text-black hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] hover:scale-105'
                    } ${className}`}
        onClick={() => {
          setTimeout(onClick, 300)
        }}
        onTouchStart={() => setIsTouched(true)}
        onTouchEnd={() => setIsTouched(false)}
      >
        <span className="relative z-10">{labels.contact}</span>
        <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/40 to-transparent z-0 pointer-events-none animate-shine" />
      </Button>
    )
  }

  return (
    <Button
      className={`relative overflow-hidden font-bold rounded-full px-6 lg:px-10 h-10 lg:h-11 text-sm tracking-[0.2em] uppercase active:scale-95 transition-all duration-300
                ${
                  shouldPulse
                    ? 'bg-white text-black animate-pulse shadow-[0_0_80px_rgba(255,255,255,0.9),0_0_40px_rgba(255,255,255,0.6)] scale-110'
                    : 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:bg-cyan-400 hover:text-black hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] hover:scale-105'
                } ${className}`}
      onClick={onClick}
    >
      <span className="relative z-10">{labels.contact}</span>
      <div
        className={`absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/40 to-transparent z-0 pointer-events-none ${shouldPulse ? 'animate-shine' : 'group-hover/nav:translate-x-full transition-transform duration-1000'}`}
      />
    </Button>
  )
}
