'use client'

import { forwardRef } from 'react'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { servicesData } from '@/lib/data'
import { useThaiData } from '@/lib/thai-context'

interface ServiceCardProps {
  service: (typeof servicesData)[0]
  index: number
  isActive: boolean
  onCenter: () => void
  onOpen: () => void
}

export const ServiceCard = forwardRef<HTMLDivElement, ServiceCardProps>(
  ({ service, isActive, onCenter, onOpen }, ref) => {
    const { labels } = useThaiData()

    return (
      <div
        ref={ref}
        onClick={onCenter}
        className={cn(
          'relative w-full h-[400px] md:h-[550px] cursor-pointer group/card transition-all duration-500 overflow-visible',
          isActive ? 'scale-100 opacity-100 blur-0' : 'scale-90 opacity-40 blur-[1px]'
        )}
      >
        <div className="relative w-full h-full transition-all duration-700 ease-out group-hover/card:scale-105">
          <div
            className={cn(
              'absolute inset-0 -z-10 pointer-events-none transition-[filter] duration-500',
              'group-hover/card:delay-[700ms] group-hover/card:drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]'
            )}
          >
            <div className="w-full h-[85%] rounded-[32px] bg-black" />
          </div>

          <div
            className={cn(
              'absolute top-0 left-0 right-0 z-0',
              'w-full h-[85%]',
              'rounded-[32px] overflow-hidden shadow-2xl',
              isActive ? 'ring-1 ring-white/20' : ''
            )}
          >
            <Image
              src={service.image}
              alt={service.title}
              fill
              className={cn(
                'object-cover transition-transform duration-[1.5s] ease-out',
                isActive ? 'scale-105' : 'scale-100'
              )}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

            <div className="absolute top-6 right-6 z-10">
              <span className="px-4 py-2 text-[10px] font-bold tracking-[0.2em] uppercase bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-cyan-400 shadow-xl">
                {service.category}
              </span>
            </div>
          </div>

          <div
            className={cn(
              'absolute z-20 transition-all duration-500',
              'bottom-0 left-4 right-4',
              'md:bottom-0 md:left-[8%] md:right-[8%]',
              'group-hover/card:translate-y-[-8px]'
            )}
          >
            <div
              className={cn(
                'w-full p-6 md:p-8 rounded-[32px] backdrop-blur-xl border border-white/10 shadow-2xl transition-all duration-500 flex flex-col group/glass',
                'hover:scale-[1.02] hover:bg-white/10 hover:shadow-[inset_0_0_30px_rgba(255,255,255,0.15)]',
                isActive
                  ? 'bg-white/10 shadow-[inset_0_0_30px_rgba(255,255,255,0.1)]'
                  : 'bg-white/5'
              )}
              onClick={(e) => {
                if (isActive) {
                  e.stopPropagation()
                  onOpen()
                }
              }}
            >
              <div className="space-y-4">
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white transition-transform duration-500 group-hover/glass:scale-105 origin-left">
                  {service.title}
                </h3>
                <p className="text-sm md:text-base leading-relaxed text-gray-300 line-clamp-2 md:line-clamp-none transition-colors group-hover/glass:text-white">
                  {service.description}
                </p>

                <p className="hidden md:block text-sm leading-relaxed text-gray-400 border-t border-white/10 pt-4 mt-4 transition-colors group-hover/glass:text-gray-300">
                  {service.details.overview}
                </p>
              </div>

              <div className="flex items-center gap-3 mt-6 text-white font-bold tracking-[0.2em] transition-all duration-300 group-hover/glass:text-cyan-400 group-hover/glass:translate-x-2">
                <span className="uppercase text-xs">{labels.details}</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover/glass:translate-x-1" />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
)

ServiceCard.displayName = 'ServiceCard'
