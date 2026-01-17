import { Hero } from "@/components/Hero"
import { Services } from "@/components/Services"
import { StarField } from "@/components/StarField"
import { Company } from "@/components/Company"
import { Footer } from "@/components/Footer"

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black selection:bg-cyan-500/30">
      <div className="fixed inset-0 z-[5] pointer-events-none">
        <StarField />
      </div>
      <Hero />
      <Services />
      <Company />
      <Footer />
    </main>
  )
}
