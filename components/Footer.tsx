export function Footer() {
    return (
        <footer className="relative w-full py-6 bg-black border-t border-white/5 overflow-hidden group/footer">
            <div className="container mx-auto px-6 relative z-10 flex flex-col gap-4 transition-transform duration-700 ease-out hover:scale-[1.01] cursor-default">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    {/* Logo & Copyright */}
                    <div className="flex flex-col items-center md:items-start space-y-1">
                        <div className="flex items-center text-base font-black tracking-[0.2em] uppercase transition-all duration-300 hover:text-cyan-400 hover:scale-105 cursor-pointer">
                            <span className="text-white">EVER</span>
                            <span className="text-cyan-400">BRIGHT</span>
                        </div>
                        <p className="text-white/50 text-[9px] font-bold tracking-[0.2em] uppercase transition-all duration-300 hover:text-cyan-400 hover:scale-110 cursor-pointer">
                            © {new Date().getFullYear()} EVERBRIGHT DIGITAL SOLUTIONS.
                        </p>
                    </div>

                    {/* Legal Info Mockup - Filtered */}
                    <div className="flex flex-wrap justify-center md:justify-end gap-x-8 gap-y-1 text-[9px] font-bold tracking-[0.2em] text-white/50 uppercase">
                        <a href="#" className="hover:text-cyan-400 hover:scale-110 transition-all duration-300">Privacy Policy</a>
                        <a href="#" className="hover:text-cyan-400 hover:scale-110 transition-all duration-300">Cookie Policy</a>
                    </div>
                </div>

                {/* Additional Company Info - Synced Style */}
                <div className="pt-4 border-t border-white/5 flex flex-wrap justify-center md:justify-between items-center gap-x-12 gap-y-2">
                    <p className="text-[9px] font-bold tracking-[0.2em] text-white/50 uppercase hover:text-cyan-400 hover:scale-110 transition-all duration-300 cursor-pointer">
                        P.IVA 01234567890 | Capitale Sociale € 50.000 i.v.
                    </p>
                    <p className="text-[9px] font-bold tracking-[0.2em] text-white/50 uppercase hover:text-cyan-400 hover:scale-110 transition-all duration-300 cursor-pointer">
                        Sede Legale: Via dell'Innovazione 1, 20121 Milano (MI)
                    </p>
                    <p className="text-[9px] font-bold tracking-[0.2em] text-white/50 uppercase hover:text-cyan-400 hover:scale-110 transition-all duration-300 cursor-pointer">
                        REA: MI-987654321
                    </p>
                </div>
            </div>
        </footer>
    );
}
