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
            <header className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center text-2xl font-bold tracking-tighter uppercase">
                        <span className="text-white">EVER</span>
                        <span className="text-cyan-400">BRIGHT</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        <a href="#servizi" onClick={(e) => handleScroll(e, "#servizi")} className="text-sm font-medium text-gray-300 hover:text-white transition-colors cursor-pointer">
                            SERVIZI
                        </a>
                        <a href="#azienda" onClick={(e) => handleScroll(e, "#azienda")} className="text-sm font-medium text-gray-300 hover:text-white transition-colors cursor-pointer">
                            AZIENDA
                        </a>
                        <a href="#contatti" onClick={(e) => handleScroll(e, "#contatti")} className="text-sm font-medium text-gray-300 hover:text-white transition-colors cursor-pointer">
                            CONTATTACI
                        </a>
                        <Link href="#" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                            CARRIERE
                        </Link>
                    </nav>

                    {/* CTA Button */}
                    <div className="hidden md:block">
                        <Button
                            className="bg-white text-black hover:bg-gray-200 font-bold rounded-full transition-all"
                            onClick={() => setIsContactOpen(true)}
                        >
                            Inizia Ora
                        </Button>
                    </div>
                </div>
            </header>

            <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
        </>
    );
}

