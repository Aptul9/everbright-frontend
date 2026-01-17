"use client";

import { Button } from "@/components/ui/button"
import { SpaceSunrise } from "@/components/SpaceSunrise"
import { useState } from "react"
import { ContactModal } from "@/components/ContactModal"

export function Hero() {
    const [isContactOpen, setIsContactOpen] = useState(false);

    const handleScroll = (e: React.MouseEvent<HTMLButtonElement>, href: string) => {
        e.preventDefault();
        const targetId = href.replace("#", "");
        const elem = document.getElementById(targetId);
        elem?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <>
            <section className="relative flex flex-col items-center justify-center min-h-screen w-full text-white px-4 overflow-hidden pt-20">
                {/* 0. Sunrise Background Effect */}
                <SpaceSunrise />

                {/* 2. Content */}
                <div className="relative z-20 flex flex-col items-start text-left max-w-5xl mx-auto space-y-8 w-full group/hero">
                    <div className="flex flex-col items-start space-y-8 transition-transform duration-500 ease-out group-hover/hero:scale-105 cursor-default origin-left">
                        {/* Main Title */}
                        <h1 className="flex flex-col items-start font-bold tracking-tighter text-6xl md:text-8xl lg:text-9xl leading-[0.9]">
                            <span className="block">ILLUMINA IL</span>
                            <span className="block text-white">TUO BUSINESS.</span>
                        </h1>

                        {/* Subtext */}
                        <p className="max-w-3xl text-lg md:text-xl text-gray-400 font-medium leading-relaxed">
                            In <span className="everbright-highlight group-hover/hero:text-white group-hover/hero:drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] transition-all duration-1000">Everbright</span>, trasformiamo la potenza del cambiamento in valore reale.
                            Strategie innovative per aziende che guardano al futuro.
                        </p>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row items-start gap-6 mt-4 transition-transform duration-500 ease-out group-hover/hero:scale-105 origin-left">
                        <Button
                            className="bg-white text-black hover:bg-cyan-400 hover:text-black font-bold rounded-full px-10 h-14 text-sm tracking-[0.2em] uppercase transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] hover:scale-105 active:scale-95"
                            onClick={() => setIsContactOpen(true)}
                        >
                            Contattaci
                        </Button>
                        <Button
                            variant="outline"
                            className="border-white text-white hover:border-cyan-400 hover:text-cyan-400 font-bold px-10 h-14 rounded-full text-sm tracking-[0.2em] uppercase transition-all duration-300 hover:bg-cyan-400/10 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)] hover:scale-105 active:scale-95"
                            onClick={(e) => handleScroll(e, "#servizi")}
                        >
                            I Nostri Servizi
                        </Button>
                    </div>
                </div>
            </section>
            <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
        </>
    )
}
