'use client'

import { forwardRef } from 'react'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { servicesData } from '@/lib/data'

interface ServiceCardProps {
  service: (typeof servicesData)[0]
  index: number
  isVisible: boolean
  isHovered: boolean
  onHoverChange: (index: number, isHovered: boolean) => void
  onContactOpen: () => void
}

export const ServiceCard = forwardRef<HTMLDivElement, ServiceCardProps>(
  ({ service, index, isVisible, isHovered, onHoverChange, onContactOpen }, ref) => {
    return (
      <div
        ref={ref}
        data-service-index={index}
        onMouseEnter={() => onHoverChange(index, true)}
        onMouseLeave={() => onHoverChange(index, false)}
        onTouchStart={() => onHoverChange(index, true)}
        onTouchEnd={() => onHoverChange(index, false)}
        className={cn(
          'relative flex w-full items-center group transition-all duration-700 md:scale-90',
          service.align === 'left' ? 'justify-end' : 'justify-start',
          isVisible || isHovered ? 'opacity-100 translate-y-0' : 'opacity-20 translate-y-20'
        )}
      >
        <div
          className={cn(
            'absolute inset-0 flex w-full items-center -z-10 pointer-events-none transition-[filter] duration-500',
            isHovered
              ? 'delay-[1500ms] drop-shadow-[0_0_20px_rgba(255,255,255,0.4)] md:drop-shadow-none'
              : '',
            'md:group-hover:delay-[1500ms] md:group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]',
            service.align === 'left' ? 'justify-end' : 'justify-start'
          )}
        >
          <div
            className={cn(
              'relative w-[85%] md:w-[70%] h-100 md:h-150 rounded-[32px] bg-black transition-transform duration-[1.5s] z-10',
              isHovered ? 'scale-105 md:scale-100' : '',
              'md:group-hover:scale-105',
              service.align === 'left' ? 'order-2' : 'order-1'
            )}
          />

          <div
            className={cn(
              'absolute w-[90%] md:w-125 p-6 md:p-12 rounded-[32px] bg-black transition-all duration-500 z-0',
              isHovered ? 'scale-105 md:scale-100' : '',
              'md:group-hover:scale-105',
              service.align === 'left'
                ? 'left-0 md:left-20 top-[63%] md:top-1/2 md:-translate-y-1/2'
                : 'right-0 md:right-20 top-[63%] md:top-1/2 md:-translate-y-1/2'
            )}
          >
            <div className="space-y-4 md:space-y-6 mb-0 md:mb-8 opacity-0">
              <h3 className="text-2xl md:text-4xl font-bold tracking-tight">{service.title}</h3>
              <p className="text-base md:text-lg leading-relaxed">{service.description}</p>
            </div>
            <div className="hidden md:flex items-center gap-2 opacity-0">
              <span className="uppercase text-sm">Scopri di più</span>
              <ArrowRight className="w-5 h-5" />
            </div>
          </div>
        </div>

        <div
          className={cn(
            'relative w-[85%] md:w-[70%] h-100 md:h-150 overflow-hidden rounded-[32px] transition-transform duration-[1.5s]',
            isHovered ? 'scale-105 md:scale-100' : '',
            'md:group-hover:scale-105',
            service.align === 'left' ? 'order-2' : 'order-1'
          )}
        >
          <Image src={service.image} alt={service.title} fill className="object-cover" />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        <div
          onClick={onContactOpen}
          className={cn(
            'absolute z-20 w-[90%] md:w-125 p-6 md:p-12 rounded-[32px] backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl transition-all duration-500 cursor-pointer group/glass',
            isHovered
              ? 'scale-105 bg-white/10 shadow-[inset_0_0_30px_rgba(255,255,255,0.1)]'
              : '',
            'hover:scale-105 hover:bg-white/10 hover:shadow-[inset_0_0_30px_rgba(255,255,255,0.1)]',
            service.align === 'left'
              ? 'left-0 md:left-20 top-[63%] md:top-1/2 md:-translate-y-1/2'
              : 'right-0 md:right-20 top-[63%] md:top-1/2 md:-translate-y-1/2'
          )}
        >
          <div className="space-y-4 md:space-y-6 mb-4 md:mb-8">
            <h3 className="text-2xl md:text-4xl font-bold tracking-tight text-white">
              {service.title}
            </h3>
            <p className="text-base md:text-lg leading-relaxed text-gray-300 group-hover/glass:text-white transition-colors duration-300">
              {service.description}
            </p>
          </div>

          <div className="flex items-center gap-2 text-white font-bold tracking-[0.2em] transition-all duration-300 group-hover/glass:text-cyan-400 group-hover/glass:scale-110 origin-left">
            <span className="uppercase text-sm">Scopri di più</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover/glass:translate-x-2" />
          </div>
        </div>
      </div>
    )
  }
)

ServiceCard.displayName = 'ServiceCard'
