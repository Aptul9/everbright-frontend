'use client'

import { forwardRef } from 'react'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { projectsData } from '@/lib/data'

interface ProjectCardProps {
    project: (typeof projectsData)[0]
    index: number
    isVisible: boolean
    isHovered: boolean
    onHoverChange: (index: number, isHovered: boolean) => void
    onContactOpen: () => void
}

export const ProjectCard = forwardRef<HTMLDivElement, ProjectCardProps>(
    ({ project, index, isVisible, isHovered, onHoverChange, onContactOpen }, ref) => {
        // Determine layout: alternate based on index for the 2-column grid
        // index 0: image-left, glass-right
        // index 1: image-right, glass-left
        // index 2: image-left, glass-right
        // index 3: image-right, glass-left
        const isImageLeft = index % 2 === 0

        return (
            <div
                ref={ref}
                data-project-index={index}
                onMouseEnter={() => onHoverChange(index, true)}
                onMouseLeave={() => onHoverChange(index, false)}
                onTouchStart={() => onHoverChange(index, true)}
                onTouchEnd={() => onHoverChange(index, false)}
                className={cn(
                    'relative flex w-full items-center group transition-all duration-700',
                    isImageLeft ? 'justify-start' : 'justify-end',
                    isVisible || isHovered ? 'opacity-100 translate-y-0' : 'opacity-20 translate-y-20'
                )}
            >
                {/* Shadow/Glow Background Effect */}
                <div
                    className={cn(
                        'absolute inset-0 flex w-full items-center -z-10 pointer-events-none transition-[filter] duration-500',
                        isHovered
                            ? 'delay-[1500ms] drop-shadow-[0_0_20px_rgba(255,255,255,0.4)] md:drop-shadow-none'
                            : '',
                        'md:group-hover:delay-[1500ms] md:group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]',
                        isImageLeft ? 'justify-start' : 'justify-end'
                    )}
                >
                    {/* Black background spacer behind the image to create layers */}
                    <div
                        className={cn(
                            'relative w-[85%] md:w-[75%] h-80 md:h-[280px] rounded-[32px] bg-black transition-transform duration-[1.5s] z-10',
                            isHovered ? 'scale-105 md:scale-100' : '',
                            'md:group-hover:scale-105',
                            isImageLeft ? 'order-1' : 'order-2'
                        )}
                    />

                    {/* Hidden text div for correct layout flow in absolute world */}
                    <div
                        className={cn(
                            'absolute w-[70%] md:w-[320px] p-6 lg:p-8 rounded-[32px] bg-black transition-all duration-500 z-0',
                            isHovered ? 'scale-105 md:scale-100' : '',
                            'md:group-hover:scale-105',
                            isImageLeft
                                ? 'right-0 md:-right-10 lg:right-0 top-[63%] md:top-1/2 md:-translate-y-1/2'
                                : 'left-0 md:-left-10 lg:left-0 top-[63%] md:top-1/2 md:-translate-y-1/2'
                        )}
                    >
                        <div className="space-y-3 opacity-0">
                            <h3 className="text-xl md:text-2xl font-bold tracking-tight">{project.title}</h3>
                            <p className="text-sm md:text-base leading-relaxed">{project.description}</p>
                        </div>
                    </div>
                </div>

                {/* Image Container */}
                <div
                    className={cn(
                        'relative w-[85%] md:w-[75%] h-80 md:h-[280px] overflow-hidden rounded-[32px] transition-transform duration-[1.5s]',
                        isHovered ? 'scale-105 md:scale-100' : '',
                        'md:group-hover:scale-105',
                        isImageLeft ? 'order-1' : 'order-2'
                    )}
                >
                    <Image src={project.image} alt={project.title} fill className="object-cover" />
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute top-4 left-4 z-10">
                        <span className="px-3 py-1 text-[10px] font-bold tracking-[0.2em] uppercase bg-black/50 backdrop-blur-md border border-white/10 rounded-full text-cyan-400">
                            {project.category}
                        </span>
                    </div>
                </div>

                {/* Foreground Glass Information Card */}
                <div
                    onClick={onContactOpen}
                    className={cn(
                        'absolute z-20 w-[70%] md:w-[320px] p-6 lg:p-8 rounded-[32px] backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl transition-all duration-500 cursor-pointer group/glass',
                        isHovered
                            ? 'scale-105 bg-white/10 shadow-[inset_0_0_30px_rgba(255,255,255,0.1)]'
                            : '',
                        'hover:scale-105 hover:bg-white/10 hover:shadow-[inset_0_0_30px_rgba(255,255,255,0.1)]',
                        isImageLeft
                            ? 'right-0 md:-right-10 lg:right-0 top-[63%] md:top-1/2 md:-translate-y-1/2'
                            : 'left-0 md:-left-10 lg:left-0 top-[63%] md:top-1/2 md:-translate-y-1/2'
                    )}
                >
                    <div className="space-y-3">
                        <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white">
                            {project.title}
                        </h3>
                        <p className="text-sm md:text-base leading-relaxed text-gray-300 group-hover/glass:text-white transition-colors duration-300">
                            {project.description}
                        </p>
                    </div>

                    <div className="flex items-center gap-2 mt-4 text-white font-bold tracking-[0.2em] transition-all duration-300 group-hover/glass:text-cyan-400 group-hover/glass:scale-110 origin-left">
                        <span className="uppercase text-[10px]">Dettagli</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover/glass:translate-x-2" />
                    </div>
                </div>
            </div >
        )
    }
)

ProjectCard.displayName = 'ProjectCard'
