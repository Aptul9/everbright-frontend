"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { ContactModal } from "@/components/ContactModal";

const services = [
    {
        title: "Sviluppo Software",
        description: "Ingegneria del software su misura. Realizziamo piattaforme scalabili, applicazioni enterprise e soluzioni digitali che supportano la crescita del tuo business con codice pulito ed efficiente.",
        image: "/services/software.png",
        align: "right",
    },
    {
        title: "Cloud & Infrastruttura",
        description: "Architetture cloud-native resilienti e sicure. Migrazione, gestione e ottimizzazione su AWS, Azure e Google Cloud per garantire continuità operativa e performance elevate.",
        image: "/services/cloud.png",
        align: "left",
    },
    {
        title: "Cyber Security",
        description: "Difesa attiva e proattiva. Proteggiamo i tuoi asset critici con strategie di sicurezza avanzate, penetration testing e monitoraggio continuo contro le minacce informatiche.",
        image: "/services/security.png",
        align: "right",
    },
    {
        title: "IT Help Desk & Supporto",
        description: "Supporto tecnico proattivo e multicanale. Forniamo assistenza remota e on-site per risolvere ogni criticità IT, garantendo efficienza operativa e minimizzando i tempi di inattività del tuo team.",
        image: "/services/helpdesk.png",
        align: "left",
    }
];

export function Services() {
    const [isContactOpen, setIsContactOpen] = useState(false);
    const [visibleServices, setVisibleServices] = useState<boolean[]>(new Array(services.length).fill(false));
    const [hoveredServices, setHoveredServices] = useState<boolean[]>(new Array(services.length).fill(false));
    const serviceRefs = useRef<(HTMLDivElement | null)[]>([]);
    const timeoutsRef = useRef<(NodeJS.Timeout | null)[]>([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const index = parseInt(entry.target.getAttribute('data-service-index') || '0');

                    if (entry.isIntersecting) {
                        // Clear any existing timeout for this service
                        if (timeoutsRef.current[index]) {
                            clearTimeout(timeoutsRef.current[index]!);
                        }
                        // Set 400ms delay before showing
                        timeoutsRef.current[index] = setTimeout(() => {
                            setVisibleServices(prev => {
                                const next = [...prev];
                                next[index] = true;
                                return next;
                            });
                        }, 400);
                    } else {
                        // Clear timeout and immediately hide when scrolling away
                        if (timeoutsRef.current[index]) {
                            clearTimeout(timeoutsRef.current[index]!);
                            timeoutsRef.current[index] = null;
                        }
                        setVisibleServices(prev => {
                            const next = [...prev];
                            next[index] = false;
                            return next;
                        });
                    }
                });
            },
            {
                threshold: 0.2, // Trigger when 20% of the element is visible
                rootMargin: '0px'
            }
        );

        // Observe all service cards
        serviceRefs.current.forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        // Cleanup - capture timeouts
        const currentTimeouts = timeoutsRef.current;
        return () => {
            observer.disconnect();
            currentTimeouts.forEach(timeout => {
                if (timeout) clearTimeout(timeout);
            });
        };
    }, []);

    return (
        <>
            <section id="servizi" className="relative w-full bg-black text-white py-32 overflow-hidden">
                <div className="container mx-auto px-4 relative z-10 flex flex-col space-y-40">
                    <div className="text-center space-y-6 mb-10 transition-transform duration-500 ease-out hover:scale-105 cursor-default">
                        <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white">
                            I NOSTRI SERVIZI
                        </h2>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                            Eccellenza tecnologica al servizio della tua impresa.
                        </p>
                    </div>

                    {services.map((service, index) => (
                        <div
                            key={index}
                            ref={(el) => { serviceRefs.current[index] = el; }}
                            data-service-index={index}
                            onMouseEnter={() => {
                                const next = [...hoveredServices];
                                next[index] = true;
                                setHoveredServices(next);
                            }}
                            onMouseLeave={() => {
                                const next = [...hoveredServices];
                                next[index] = false;
                                setHoveredServices(next);
                            }}
                            className={cn(
                                "relative flex w-full items-center group transition-all duration-700",
                                service.align === "left" ? "justify-end" : "justify-start",
                                (visibleServices[index] || hoveredServices[index])
                                    ? "opacity-100 translate-y-0"
                                    : "opacity-20 translate-y-20"
                            )}
                        >
                            {/* Ghost Layer for Glow Effect */}
                            {/* This layer replicates the shape of the content to cast a unified shadow (glow) 
                                without showing artifacts at the intersection of the transparent text box. */}
                            <div className={cn(
                                "absolute inset-0 flex w-full items-center -z-10 pointer-events-none transition-[filter] duration-500 group-hover:delay-[1500ms] group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]",
                                service.align === "left" ? "justify-end" : "justify-start"
                            )}>
                                {/* Ghost Image - Opaque Black, placed ABOVE Ghost Text Box to block it at intersection */}
                                <div className={cn(
                                    "relative w-[85%] md:w-[70%] h-[400px] md:h-[600px] rounded-[32px] bg-black transition-transform duration-[1.5s] group-hover:scale-105 z-10",
                                    service.align === "left" ? "order-2" : "order-1"
                                )} />

                                {/* Ghost Text Box - Opaque Black, placed BELOW Ghost Image */}
                                <div className={cn(
                                    "absolute w-[90%] md:w-[500px] p-8 md:p-12 rounded-[32px] bg-black transition-all duration-500 group-hover:scale-105 z-0",
                                    service.align === "left"
                                        ? "left-0 md:left-20 top-1/2 -translate-y-1/2"
                                        : "right-0 md:right-20 top-1/2 -translate-y-1/2"
                                )}>
                                    {/* Invisible duplicate content to ensure correct sizing */}
                                    <div className="space-y-6 mb-8 opacity-0">
                                        <h3 className="text-3xl md:text-4xl font-bold tracking-tight">{service.title}</h3>
                                        <p className="text-lg leading-relaxed">{service.description}</p>
                                    </div>
                                    <div className="flex items-center gap-2 opacity-0">
                                        <span className="uppercase text-sm">Scopri di più</span>
                                        <ArrowRight className="w-5 h-5" />
                                    </div>
                                </div>
                            </div>

                            {/* Real Content */}
                            {/* Image Container */}
                            <div className={cn(
                                "relative w-[85%] md:w-[70%] h-[400px] md:h-[600px] overflow-hidden rounded-[32px] transition-transform duration-[1.5s] group-hover:scale-105",
                                service.align === "left" ? "order-2" : "order-1"
                            )}>
                                <Image
                                    src={service.image}
                                    alt={service.title}
                                    fill
                                    className="object-cover"
                                />
                                {/* Subtle Overlay */}
                                <div className="absolute inset-0 bg-black/20" />
                            </div>

                            {/* Glass Text Box - Overlaps */}
                            <div
                                className={cn(
                                    "absolute z-20 w-[90%] md:w-[500px] p-8 md:p-12 rounded-[32px] backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl transition-all duration-500 hover:bg-white/10 group-hover:scale-105 group-hover:backdrop-brightness-125 group-hover:shadow-[inset_0_0_30px_rgba(255,255,255,0.1)]",
                                    service.align === "left"
                                        ? "left-0 md:left-20 top-1/2 -translate-y-1/2"
                                        : "right-0 md:right-20 top-1/2 -translate-y-1/2"
                                )}
                            >
                                <div className="space-y-6 mb-8 transition-all duration-500 hover:scale-105 origin-left group/text-content cursor-default">
                                    <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-white transition-colors duration-300 group-hover/text-content:text-white">
                                        {service.title}
                                    </h3>
                                    <p className="text-lg leading-relaxed text-gray-300 transition-colors duration-300 group-hover/text-content:text-white">
                                        {service.description}
                                    </p>
                                </div>

                                <div
                                    className="flex items-center gap-2 text-white font-bold cursor-pointer transition-all duration-300 hover:text-cyan-400 hover:scale-110 tracking-[0.2em] group/btn"
                                    onClick={() => setIsContactOpen(true)}
                                >
                                    <span className="uppercase text-sm">Scopri di più</span>
                                    <ArrowRight className="w-5 h-5 transition-transform group-hover/btn:translate-x-2" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
        </>
    );
}
