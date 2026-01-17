import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { SpaceSunrise } from "@/components/SpaceSunrise"

export function Hero() {
    return (
        <section className="relative flex flex-col items-center justify-center min-h-screen w-full text-white px-4 overflow-hidden pt-20">
            {/* 0. Sunrise Background Effect */}
            <SpaceSunrise />

            {/* 2. Content */}
            <div className="relative z-20 flex flex-col items-start text-left max-w-5xl mx-auto space-y-8 w-full">
                <div className="flex flex-col items-start space-y-8 transition-transform duration-500 ease-out hover:scale-105 cursor-default origin-left">
                    {/* Main Title */}
                    <h1 className="flex flex-col items-start font-bold tracking-tighter text-6xl md:text-8xl lg:text-9xl leading-[0.9]">
                        <span className="block">ILLUMINA IL</span>
                        <span className="block text-white">TUO BUSINESS.</span>
                    </h1>

                    {/* Subtext */}
                    <p className="max-w-3xl text-lg md:text-xl text-gray-400 font-medium leading-relaxed">
                        In Everbright, trasformiamo la potenza del cambiamento in valore reale.
                        Strategie innovative per aziende che guardano al futuro.
                    </p>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row items-start gap-4 mt-8">
                    <Button
                        size="lg"
                        className="bg-white text-black hover:bg-cyan-400 hover:text-black font-bold px-8 h-14 rounded-full transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] hover:scale-105"
                    >
                        I Nostri Servizi
                    </Button>
                    <Button
                        size="lg"
                        variant="outline"
                        className="border-white text-white hover:border-cyan-400 hover:text-cyan-400 font-bold px-8 h-14 rounded-full transition-all hover:bg-cyan-400/10 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)] hover:scale-105"
                    >
                        Contattaci
                    </Button>
                </div>
            </div>
        </section>
    )
}
