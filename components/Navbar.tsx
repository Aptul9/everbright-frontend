"use client";

import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Navbar() {
    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const targetId = href.replace("#", "");
        const elem = document.getElementById(targetId);
        elem?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <header className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center text-2xl font-bold tracking-tighter uppercase">
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

                {/* Action / Login */}
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 hidden sm:flex">
                        Login
                    </Button>
                </div>
            </div>
        </header>
    )
}
