export function Footer() {
    return (
        <footer className="relative w-full py-12 bg-black border-t border-white/5 overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    {/* Logo & Copyright */}
                    <div className="flex flex-col items-center md:items-start space-y-4">
                        <div className="flex items-center text-xl font-black tracking-[0.2em] uppercase">
                            <span className="text-white">EVER</span>
                            <span className="text-cyan-400">BRIGHT</span>
                        </div>
                        <p className="text-gray-500 text-xs tracking-widest uppercase">
                            © {new Date().getFullYear()} EVERBRIGHT DIGITAL SOLUTIONS.
                        </p>
                    </div>

                    {/* Legal Info Mockup */}
                    <div className="flex flex-wrap justify-center md:justify-end gap-x-8 gap-y-4 text-[10px] font-bold tracking-[0.15em] text-gray-400 uppercase">
                        <a href="#" className="hover:text-cyan-400 transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-cyan-400 transition-colors">Cookie Policy</a>
                        <a href="#" className="hover:text-cyan-400 transition-colors">Termini e Condizioni</a>
                        <a href="#" className="hover:text-cyan-400 transition-colors">Note Legali</a>
                    </div>
                </div>

                {/* Additional Company Info */}
                <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[9px] font-medium tracking-widest text-gray-600 uppercase">
                    <p>P.IVA 01234567890 | Capitale Sociale € 50.000 i.v.</p>
                    <p>Sede Legale: Via dell'Innovazione 1, 20121 Milano (MI)</p>
                    <p>REA: MI-987654321</p>
                </div>
            </div>
        </footer>
    );
}
