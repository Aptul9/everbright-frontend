'use client'

import { useEffect, useState } from 'react'
import { X, Zap, Layers, Rocket } from 'lucide-react'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { servicesData } from '@/lib/data'

interface ServiceModalProps {
    isOpen: boolean
    onClose: () => void
    service: (typeof servicesData)[0] | null
}

export function ServiceModal({ isOpen, onClose, service }: ServiceModalProps) {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true)
            document.body.style.overflow = 'hidden'
        } else {
            setTimeout(() => setIsVisible(false), 300)
            document.body.style.overflow = 'unset'
        }
    }, [isOpen])

    if (!isOpen && !isVisible) return null

    return (
        <div
            className={cn(
                'fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 transition-all duration-500',
                isOpen ? 'bg-black/80 backdrop-blur-sm opacity-100' : 'bg-black/0 backdrop-blur-0 opacity-0'
            )}
            onClick={onClose}
        >
            <div
                className={cn(
                    'relative w-full max-w-5xl h-auto md:h-[600px] overflow-hidden bg-[#0a0a0a] border border-white/10 rounded-[30px] shadow-2xl transition-all duration-500 flex flex-col md:flex-row shadow-cyan-900/20',
                    isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-8'
                )}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-50 p-2 text-white/50 hover:text-white transition-all hover:scale-110 active:scale-95 bg-black/20 hover:bg-white/10 rounded-full backdrop-blur-md"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Left Side: Visual & Title */}
                <div className="relative w-full md:w-[40%] h-48 md:h-full group/image">
                    <Image
                        src={service?.image || ''}
                        alt={service?.title || ''}
                        fill
                        className="object-cover transition-transform duration-700 group-hover/image:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black via-black/50 to-transparent opacity-90" />
                    <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end items-start space-y-4">
                        <span className="px-2.5 py-1 text-[10px] font-bold tracking-[0.2em] uppercase bg-cyan-500 text-black rounded-full">
                            {service?.category}
                        </span>
                        <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-white uppercase leading-tight">
                            {service?.title}
                        </h2>
                    </div>
                </div>

                {/* Right Side: Content */}
                <div className="flex-1 p-6 md:p-10 flex flex-col justify-center space-y-8 bg-black/40 backdrop-blur-sm">
                    {/* Overview */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 text-cyan-400">
                            <Zap className="w-4 h-4" />
                            <h3 className="text-[11px] font-bold tracking-[0.2em] uppercase">Overview</h3>
                        </div>
                        <p className="text-gray-300 text-sm md:text-base leading-relaxed font-light">
                            {service?.details.overview}
                        </p>
                    </div>

                    {/* Features (Combined list) */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 text-purple-400">
                            <Layers className="w-4 h-4" />
                            <h3 className="text-[11px] font-bold tracking-[0.2em] uppercase">Cosa Offriamo</h3>
                        </div>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                            {service?.details.features.slice(0, 4).map((feature, i) => (
                                <li key={i} className="flex items-center gap-2 text-sm text-gray-400">
                                    <div className="w-1 h-1 rounded-full bg-purple-400" />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Tech Stack */}
                    <div className="space-y-4 pt-4 border-t border-white/5">
                        <div className="flex items-center gap-2 text-white">
                            <Rocket className="w-4 h-4 text-cyan-400" />
                            <h3 className="text-[11px] font-bold tracking-[0.2em] uppercase">Tecnologie</h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {service?.details.techStack.map((tech, i) => (
                                <span
                                    key={i}
                                    className="px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase bg-white/5 border border-white/10 rounded-md text-gray-400 hover:text-white hover:border-cyan-500/50 transition-colors cursor-default"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
