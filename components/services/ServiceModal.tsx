'use client'

import { useEffect, useState } from 'react'
import { X, Zap, Layers, Rocket, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { useThaiData } from '@/lib/thai-context'
import { servicesData } from '@/lib/data'

interface ServiceModalProps {
    isOpen: boolean
    onClose: () => void
    onContact: () => void
    service: (typeof servicesData)[0] | null
}

export function ServiceModal({ isOpen, onClose, onContact, service }: ServiceModalProps) {
    const { isThai, labels } = useThaiData()
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => setIsVisible(true), 10)
            document.body.style.overflow = 'hidden'
            return () => clearTimeout(timer)
        } else {
            const timer = setTimeout(() => setIsVisible(false), 300)
            document.body.style.overflow = 'unset'
            return () => clearTimeout(timer)
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
                    'relative w-full max-w-5xl max-h-[85vh] md:h-[600px] md:max-h-none flex flex-col md:flex-row bg-[#0a0a0a] border border-white/10 rounded-[30px] shadow-2xl transition-all duration-500 shadow-cyan-900/20 overflow-hidden',
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
                <div className="relative w-full md:w-[40%] h-48 md:h-full shrink-0">
                    <Image
                        src={service?.image || ''}
                        alt={service?.title || ''}
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black via-black/50 to-transparent opacity-90" />
                    <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end items-start space-y-4">
                        <div className="group/title cursor-default space-y-4 transition-transform duration-300 hover:scale-105 origin-bottom-left">
                            <span className="px-2.5 py-1 text-[10px] font-bold tracking-[0.2em] uppercase bg-cyan-500 text-black rounded-full transition-all duration-300 group-hover/title:bg-white">
                                {service?.category}
                            </span>
                            <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-white uppercase leading-tight transition-colors duration-300 group-hover/title:text-cyan-400">
                                {service?.title}
                            </h2>
                        </div>
                    </div>
                </div>

                {/* Right Side: Content */}
                <div className="flex-1 p-6 md:p-10 flex flex-col justify-between bg-black/40 backdrop-blur-sm overflow-y-auto md:overflow-hidden">
                    <div className="space-y-8">
                        {/* Overview */}
                        <div className="space-y-3 group/item cursor-default">
                            <div className="flex items-center gap-2 text-cyan-400 transition-all duration-300 group-hover/item:text-cyan-300 group-hover/item:scale-110 origin-left">
                                <Zap className="w-4 h-4" />
                                <h3 className="text-[11px] font-bold tracking-[0.2em] uppercase">
                                    {isThai ? 'ภาพรวม' : 'Overview'}
                                </h3>
                            </div>
                            <p className="text-gray-200 text-sm md:text-base leading-relaxed font-normal transition-all duration-500 group-hover/item:text-white group-hover/item:scale-[1.02] origin-left">
                                {service?.details.overview}
                            </p>
                        </div>

                        {/* Features (Combined list) */}
                        <div className="space-y-3 group/item cursor-default">
                            <div className="flex items-center gap-2 text-purple-400 transition-all duration-300 group-hover/item:text-purple-300 group-hover/item:scale-110 origin-left">
                                <Layers className="w-4 h-4" />
                                <h3 className="text-[11px] font-bold tracking-[0.2em] uppercase">
                                    {isThai ? 'สิ่งที่เรานำเสนอ' : 'Cosa Offriamo'}
                                </h3>
                            </div>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 transition-all duration-300 group-hover/item:scale-[1.02] origin-left">
                                {service?.details.features.slice(0, 4).map((feature, i) => (
                                    <li key={i} className="flex items-center gap-2 text-sm text-gray-400 transition-colors duration-500 group-hover/item:text-gray-200">
                                        <div className="w-1 h-1 rounded-full bg-purple-400" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Tech Stack */}
                        <div className="space-y-4 pt-4 border-t border-white/5 group/stack cursor-default">
                            <div className="flex items-center gap-2 text-white transition-all duration-300 group-hover/stack:text-cyan-400 group-hover/stack:scale-110 origin-left">
                                <Rocket className="w-4 h-4 text-cyan-400" />
                                <h3 className="text-[11px] font-bold tracking-[0.2em] uppercase">
                                    {isThai ? 'เทคโนโลยี' : 'Tecnologie'}
                                </h3>
                            </div>
                            <div className="flex flex-wrap gap-2 transition-transform duration-300 group-hover/stack:scale-[1.02] origin-left">
                                {service?.details.techStack.map((tech, i) => (
                                    <span
                                        key={i}
                                        className="px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase bg-white/5 border border-white/10 rounded-md text-gray-400 transition-all duration-300 hover:bg-cyan-500 hover:text-black hover:border-cyan-500 hover:scale-110"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Contact Button */}
                    <button
                        onClick={onContact}
                        className="w-full mt-6 flex items-center justify-center gap-2 bg-white text-black py-4 rounded-xl font-bold tracking-wider uppercase hover:bg-cyan-400 transition-all duration-300 hover:scale-105 active:scale-95 group/btn"
                    >
                        <span>{labels.contact}</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                    </button>
                </div>
            </div>
        </div>
    )
}
