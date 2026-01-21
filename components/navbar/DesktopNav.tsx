'use client'

interface DesktopNavProps {
  onScroll: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void
}

export function DesktopNav({ onScroll }: DesktopNavProps) {
  return (
    <nav className="relative z-10 hidden md:flex items-center justify-center px-4">
      <div className="flex items-center gap-12 lg:gap-16 xl:gap-24">
        {[
          { name: 'SERVIZI', id: '#servizi' },
          { name: 'PROGETTI', id: '#progetti' },
          { name: 'AZIENDA', id: '#azienda' },
        ].map((link) => (
          <a
            key={link.name}
            href={link.id}
            onClick={(e) => onScroll(e, link.id)}
            className="relative text-sm font-bold tracking-[0.2em] text-gray-300 hover:text-cyan-400 hover:scale-110 transition-all duration-300 cursor-pointer whitespace-nowrap"
          >
            {link.name}
          </a>
        ))}
      </div>
    </nav>
  )
}
