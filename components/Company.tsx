"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ContactModal } from "@/components/ContactModal";

export function Company() {
    const [isContactOpen, setIsContactOpen] = useState(false);

    return (
        <>
            <section id="azienda" className="relative w-full py-24 md:py-32 overflow-hidden text-white">
                {/* Background Layer (below stars) */}
                <div className="absolute inset-0 bg-zinc-950/80 backdrop-blur-sm border-t border-white/10 z-0" />

                <div className="container mx-auto px-4 relative z-20">
                    <div className="flex flex-col md:flex-row items-center gap-16 md:gap-24 group">

                        {/* Image Block */}
                        <div className="w-full md:w-1/2 relative">
                            <div className="relative h-[500px] w-full rounded-[32px] overflow-hidden transition-transform duration-[1.5s] group-hover:scale-105">
                                <Image
                                    src="/company.png"
                                    alt="Everbright Headquarters"
                                    fill
                                    className="object-cover"
                                />
                                {/* Glass Overlay Effect */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                            </div>
                        </div>

                        {/* Text Block */}
                        <div className="w-full md:w-1/2 space-y-8 transition-transform duration-[1.5s] group-hover:scale-105">
                            <h2 className="text-5xl md:text-6xl font-bold tracking-tighter leading-tight">
                                IL FUTURO È <span className="text-cyan-400">ORA.</span>
                            </h2>

                            <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
                                <p>
                                    Siamo <span className="everbright-highlight group-hover:text-white group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] transition-all duration-1000">Everbright</span>. Non siamo solo consulenti, siamo architetti del cambiamento digitale.
                                    Nati dalla passione per la tecnologia e guidati dall'innovazione, aiutiamo le aziende a
                                    superare i confini del possibile.
                                </p>
                                <p>
                                    In <span className="everbright-highlight group-hover:text-white group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] transition-all duration-1000">Everbright</span>, il nostro team di esperti lavora ogni giorno per trasformare sfide complesse in soluzioni
                                    eleganti e scalabili. Crediamo che la tecnologia debba essere un acceleratore, non un ostacolo.
                                </p>
                            </div>

                            <div className="pt-4">
                                <Button
                                    size="lg"
                                    className="bg-white text-black hover:bg-cyan-400 hover:text-black font-bold px-10 h-14 rounded-full text-sm tracking-[0.2em] uppercase transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] hover:scale-105 active:scale-95"
                                    onClick={() => setIsContactOpen(true)}
                                >
                                    Contattaci
                                </Button>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
            <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
        </>
    );
}
