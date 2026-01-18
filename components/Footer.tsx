"use client";

import { useState } from "react";

export function Footer() {
    const [touchedElement, setTouchedElement] = useState<string | null>(null);

    return (
        <footer className="relative w-full py-6 bg-black border-t border-white/5 overflow-hidden group/footer">
            <div className="container mx-auto px-6 relative z-10 flex flex-col gap-4 transition-transform duration-700 ease-out hover:scale-[1.01] cursor-default">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    {/* Logo & Copyright */}
                    <div className="flex flex-col items-center md:items-start space-y-2">
                        {/* Logo Section - Matching Navbar */}
                        <div
                            onTouchStart={() => setTouchedElement('logo')}
                            onTouchEnd={() => setTouchedElement(null)}
                            className={`flex items-center gap-0 transition-transform duration-300 hover:scale-105 ${touchedElement === 'logo' ? 'scale-105' : ''}`}
                        >
                            <div className="relative w-20 h-20 flex-shrink-0 -ml-4 flex items-center justify-center">
                                <img
                                    src="/logo-icon.png"
                                    alt="Everbright"
                                    className="w-full h-full object-contain mix-blend-screen brightness-125 scale-140 drop-shadow-[0_0_20px_rgba(34,211,238,0.5)]"
                                />
                            </div>
                            <div className="flex flex-col -space-y-1 font-inter">
                                <div className="text-xl md:text-2xl font-black tracking-tight uppercase text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-cyan-100 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                                    EVERBRIGHT
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <div className="h-[1px] w-4 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
                                    <span className="text-[8px] md:text-[9px] font-bold tracking-[0.45em] text-cyan-300/80 uppercase whitespace-nowrap">
                                        IT SERVICES
                                    </span>
                                    <div className="h-[1px] w-4 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
                                </div>
                            </div>
                        </div>
                        <p
                            onTouchStart={() => setTouchedElement('copyright')}
                            onTouchEnd={() => setTouchedElement(null)}
                            className={`text-white/50 text-[9px] font-bold tracking-[0.2em] uppercase transition-all duration-300 ${touchedElement === 'copyright' ? 'scale-105 text-white' : ''}`}
                        >
                            © {new Date().getFullYear()} <span className="everbright-highlight group-hover/footer:text-white group-hover/footer:drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] transition-all duration-1000">EVERBRIGHT</span> DIGITAL SOLUTIONS.
                        </p>
                    </div>

                    {/* Legal Info Mockup - Filtered */}
                    <div className="flex flex-wrap justify-center md:justify-end gap-x-8 gap-y-1 text-[9px] font-bold tracking-[0.2em] text-white/50 uppercase">
                        <a
                            href="#"
                            className={`hover:text-cyan-400 hover:scale-110 transition-all duration-300 ${touchedElement === 'privacy' ? 'text-cyan-400 scale-110' : ''}`}
                            onTouchStart={() => setTouchedElement('privacy')}
                            onTouchEnd={() => setTouchedElement(null)}
                        >
                            Privacy Policy
                        </a>
                        <a
                            href="#"
                            className={`hover:text-cyan-400 hover:scale-110 transition-all duration-300 ${touchedElement === 'cookie' ? 'text-cyan-400 scale-110' : ''}`}
                            onTouchStart={() => setTouchedElement('cookie')}
                            onTouchEnd={() => setTouchedElement(null)}
                        >
                            Cookie Policy
                        </a>
                    </div>
                </div>

                {/* Additional Company Info - Synced Style */}
                <div className="pt-4 border-t border-white/5 flex flex-wrap justify-center md:justify-between items-center gap-x-12 gap-y-2">
                    <p
                        className={`text-[9px] font-bold tracking-[0.2em] text-white/50 uppercase hover:text-cyan-400 hover:scale-110 transition-all duration-300 cursor-pointer ${touchedElement === 'piva' ? 'text-cyan-400 scale-110' : ''}`}
                        onTouchStart={() => setTouchedElement('piva')}
                        onTouchEnd={() => setTouchedElement(null)}
                    >
                        P.IVA 01234567890 | Capitale Sociale € 50.000 i.v.
                    </p>
                    <p
                        className={`text-[9px] font-bold tracking-[0.2em] text-white/50 uppercase hover:text-cyan-400 hover:scale-110 transition-all duration-300 cursor-pointer ${touchedElement === 'sede' ? 'text-cyan-400 scale-110' : ''}`}
                        onTouchStart={() => setTouchedElement('sede')}
                        onTouchEnd={() => setTouchedElement(null)}
                    >
                        Sede Legale: Via dell'Innovazione 1, 20121 Milano (MI)
                    </p>
                    <p
                        className={`text-[9px] font-bold tracking-[0.2em] text-white/50 uppercase hover:text-cyan-400 hover:scale-110 transition-all duration-300 cursor-pointer ${touchedElement === 'rea' ? 'text-cyan-400 scale-110' : ''}`}
                        onTouchStart={() => setTouchedElement('rea')}
                        onTouchEnd={() => setTouchedElement(null)}
                    >
                        REA: MI-987654321
                    </p>
                </div>
            </div>
        </footer>
    );
}
