"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
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
        title: "Artificial Intelligence",
        description: "Trasforma i dati in vantaggio competitivo. Implementiamo soluzioni di AI generativa e Machine Learning per automatizzare processi, prevedere trend e innovare il tuo settore.",
        image: "/services/ai.png",
        align: "left",
    }
];

export function Services() {
    const [isContactOpen, setIsContactOpen] = useState(false);

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
                            className={cn(
                                "relative flex w-full items-center group",
                                service.align === "left" ? "justify-end" : "justify-start"
                            )}
                        >
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
