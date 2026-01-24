'use client'

import { StarField } from '@/components/effects/StarField'
import { NavContactButton } from './NavContactButton'
import { useState } from 'react'

import { useThaiData } from '@/lib/thai-context'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  onContactClick: () => void
  onScroll: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void
}

export function MobileMenu({ isOpen, onClose, onContactClick, onScroll }: MobileMenuProps) {
  const { labels, isThai } = useThaiData()
  const [touchedLink, setTouchedLink] = useState<string | null>(null)

  return (
    <div
      className={`fixed inset-0 z-40 md:hidden bg-black transition-all duration-500 flex flex-col justify-center items-center gap-8 cursor-pointer ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      onClick={onClose}
    >
      <div className="absolute inset-0 z-0">
        <StarField />
      </div>

      <div
        className="relative z-10 flex flex-col items-center gap-8 cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        {[
          { name: labels.services, id: '#servizi' },
          { name: labels.projects, id: '#progetti' },
          { name: isThai ? 'บริษัท' : 'AZIENDA', id: '#azienda' },
        ].map((link) => (
          <a
            key={link.id}
            href={link.id}
            onClick={(e) => {
              e.preventDefault()
              setTimeout(() => {
                onScroll(e, link.id)
                onClose()
              }, 300)
            }}
            onTouchStart={() => setTouchedLink(link.id)}
            onTouchEnd={() => setTouchedLink(null)}
            className={`text-2xl font-bold tracking-[0.2em] text-gray-300 hover:text-cyan-400 transition-all duration-300 uppercase ${touchedLink === link.id ? 'text-cyan-400 scale-110' : ''}`}
          >
            {link.name}
          </a>
        ))}
        <NavContactButton
          isMobile
          onClick={() => {
            onContactClick()
            onClose()
          }}
        />
      </div>
    </div>
  )
}
