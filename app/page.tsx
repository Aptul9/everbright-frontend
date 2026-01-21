import { Hero } from '@/components/hero/Hero'
import { Services } from '@/components/services/Services'
import { Projects } from '@/components/projects/Projects'
import { StarField } from '@/components/effects/StarField'
import { Company } from '@/components/company/Company'
import { Footer } from '@/components/footer/Footer'
import { ClickSparkle } from '@/components/effects/ClickSparkle'

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black selection:bg-cyan-500/30">
      <div className="fixed inset-0 z-5 pointer-events-none">
        <StarField />
      </div>
      <Hero />
      <Services />
      <Projects />
      <Company />
      <Footer />
      <ClickSparkle />
    </main>
  )
}
