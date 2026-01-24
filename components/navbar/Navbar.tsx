'use client'

import { useState } from 'react'
import { ContactModal } from '@/components/contact/ContactModal'
import { NavbarLogo } from './NavbarLogo'
import { DesktopNav } from './DesktopNav'
import { MobileMenu } from './MobileMenu'
import { NavContactButton } from './NavContactButton'

export function Navbar() {
  const [isContactOpen, setIsContactOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isTouched, setIsTouched] = useState(false)

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()

    if (href === '#contatti') {
      if (window.scrollY < 50) {
        setIsContactOpen(true)
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        setTimeout(() => {
          setIsContactOpen(true)
        }, 700)
      }
      return
    }

    const targetId = href.replace('#', '')
    const elem = document.getElementById(targetId)
    elem?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <header className="fixed top-0 w-full z-50 px-6 py-6 pointer-events-none">
        <div
          onTouchStart={() => setIsTouched(true)}
          onTouchEnd={() => setIsTouched(false)}
          className={`max-w-7xl mx-auto h-16 pointer-events-auto flex justify-between items-center px-4 md:px-8 bg-[#121212]/98 backdrop-blur-2xl border border-white/20 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.3)] transition-all duration-500 hover:border-cyan-400/30 hover:scale-[1.02] group/nav relative overflow-hidden ${isTouched ? 'scale-[1.02] border-cyan-400/30' : ''}`}
        >
          <div className="absolute inset-0 -translate-x-full group-hover/nav:translate-x-full duration-[1.5s] ease-in-out bg-linear-to-r from-transparent via-white/10 to-transparent z-0 pointer-events-none" />

          <NavbarLogo />
          <DesktopNav onScroll={handleScroll} />

          <div className="flex justify-end items-center transition-all duration-300 md:w-[280px]">
            <div className="hidden md:block">
              <NavContactButton onClick={() => setIsContactOpen(true)} />
            </div>

            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="w-6 h-4 flex flex-col justify-between cursor-pointer group/mobile focus:outline-none"
              >
                <span
                  className={`w-full h-0.5 bg-white rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : 'group-hover/mobile:bg-cyan-400'}`}
                />
                <span
                  className={`w-2/3 h-0.5 bg-white rounded-full self-end transition-all duration-300 ${isMobileMenuOpen ? 'w-full -rotate-45 -translate-y-2 bg-cyan-400' : 'group-hover/mobile:bg-cyan-400 group-hover/mobile:w-full'}`}
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onContactClick={() => setIsContactOpen(true)}
        onScroll={handleScroll}
      />

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  )
}
