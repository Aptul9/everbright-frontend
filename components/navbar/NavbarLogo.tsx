'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export function NavbarLogo() {
  const [isTouched, setIsTouched] = useState(false)

  return (
    <div className="flex-1 flex justify-start items-center min-w-0 transition-all duration-300">
      <Link
        href="/"
        onClick={(e) => {
          e.preventDefault()
          setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }, 300)
        }}
        onTouchStart={() => setIsTouched(true)}
        onTouchEnd={() => setIsTouched(false)}
        className={`relative z-10 flex items-center gap-2 md:gap-3 transition-transform duration-300 hover:scale-105 ${isTouched ? 'scale-105' : ''}`}
      >
        <div className="relative w-14 h-14 md:w-16 lg:w-20 md:h-16 lg:h-20 shrink-0 flex items-center justify-center">
          <Image
            src="/logo-icon.png"
            alt="Everbright"
            fill
            className="object-contain mix-blend-screen brightness-125 scale-[2.4] md:scale-[2] lg:scale-[2.2] drop-shadow-[0_0_25px_rgba(34,211,238,0.6)]"
          />
        </div>
        <div className="flex flex-col -space-y-1 md:-space-y-1.5 font-inter pt-1 whitespace-nowrap">
          <div className="text-lg md:text-xl lg:text-[1.85rem] font-black tracking-tighter md:tracking-tight uppercase text-transparent bg-clip-text bg-linear-to-b from-white via-white to-cyan-100 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
            EVERBRIGHT
          </div>
          <div className="flex items-center gap-1 md:gap-2">
            <div className="h-px w-3 md:w-4 bg-linear-to-r from-transparent via-cyan-400/50 to-transparent" />
            <span className="text-[8px] md:text-[8px] lg:text-[9px] font-bold tracking-[0.3em] md:tracking-[0.45em] lg:tracking-[0.55em] text-cyan-300/80 uppercase">
              IT SERVICES
            </span>
            <div className="h-px w-3 md:w-4 bg-linear-to-r from-transparent via-cyan-400/50 to-transparent" />
          </div>
        </div>
      </Link>
    </div>
  )
}
