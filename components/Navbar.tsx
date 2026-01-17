import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Navbar() {
    return (
        <header className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="text-white font-bold text-xl tracking-tighter uppercase">
                    Everbright
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    <Link href="#" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                        SERVIZI
                    </Link>
                    <Link href="#" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                        AZIENDA
                    </Link>
                    <Link href="#" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                        CONTENUTI
                    </Link>
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
