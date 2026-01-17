"use client";

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { ContactModal } from "@/components/ContactModal"

export function Navbar() {
    const [isContactOpen, setIsContactOpen] = useState(false);

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();

        if (href === "#contatti") {
            if (window.scrollY < 50) {
                // Already at top, open immediately
                setIsContactOpen(true);
            } else {
                // Scroll first, then open
                window.scrollTo({ top: 0, behavior: "smooth" });
                setTimeout(() => {
                    setIsContactOpen(true);
                }, 700);
            }
            return;
        }

        const targetId = href.replace("#", "");
        const elem = document.getElementById(targetId);
        elem?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <>
            <header className="fixed top-0 w-full z-50 px-6 py-6 pointer-events-none">
                <div className="max-w-7xl mx-auto h-16 pointer-events-auto flex items-center justify-between px-10 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.3)] transition-all duration-500 hover:border-cyan-400/30 group/nav">
                    {/* Logo */}
                    <Link
                        href="/"
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="flex items-center text-xl md:text-2xl font-black tracking-[0.2em] uppercase transition-transform duration-300 hover:scale-105"
                    >
                        <span className="text-white">EVER</span>
                        <span className="text-cyan-400">BRIGHT</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-10">
                        {[
                            { name: "SERVIZI", id: "#servizi" },
                            { name: "AZIENDA", id: "#azienda" },
                            { name: "CARRIERE", id: "#carriere" },
                        ].map((link) => (
                            <a
                                key={link.name}
                                href={link.id}
                                onClick={(e) => handleScroll(e, link.id)}
                                className="relative text-sm font-bold tracking-[0.1em] text-gray-300 hover:text-cyan-400 hover:scale-110 transition-all duration-300 cursor-pointer"
                            >
                                {link.name}
                            </a>
                        ))}
                    </nav>

                    {/* CTA Button */}
                    <div className="hidden md:block">
                        <Button
                            className="bg-white text-black hover:bg-cyan-400 hover:text-black font-bold rounded-full px-8 h-11 text-sm tracking-widest uppercase transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(34,211,238,0.4)] hover:scale-105 active:scale-95"
                            onClick={() => setIsContactOpen(true)}
                        >
                            Contattaci
                        </Button>
                    </div>

                    {/* Mobile Menu Icon */}
                    <div className="md:hidden flex items-center">
                        <div className="w-6 h-4 flex flex-col justify-between cursor-pointer group/mobile">
                            <span className="w-full h-[2px] bg-white rounded-full transition-all group-hover/mobile:bg-cyan-400" />
                            <span className="w-2/3 h-[2px] bg-white rounded-full self-end transition-all group-hover/mobile:bg-cyan-400 group-hover/mobile:w-full" />
                        </div>
                    </div>
                </div>
            </header>

            <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
        </>
    );
}

