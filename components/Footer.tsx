'use client'

import { useState } from 'react'
import { PolicyModal } from '@/components/PolicyModal'
import Image from 'next/image'

export function Footer() {
  const [touchedElement, setTouchedElement] = useState<string | null>(null)
  const [activePolicy, setActivePolicy] = useState<'privacy' | 'cookie' | null>(null)

  const privacyContent = (
    <>
      <p>
        <strong>Ultimo aggiornamento:</strong> Gennaio 2026
      </p>
      <p>
        Questa Informativa sulla Privacy descrive come Everbright raccoglie, utilizza e protegge le
        tue informazioni personali.
      </p>

      <h3 className="text-white font-bold text-lg mt-4">1. Titolare del Trattamento</h3>
      <p>
        Everbright Digital Solutions S.r.l.
        <br />
        Via dell&apos;Innovazione 1, 20121 Milano (MI)
        <br />
        Email: privacy@everbright.com
      </p>

      <h3 className="text-white font-bold text-lg mt-4">2. Dati Raccolti</h3>
      <p>
        Raccogliamo dati forniti volontariamente dall&apos;utente (es. modulo contatti) e dati di
        navigazione automatica (es. indirizzo IP, tipo di browser).
      </p>

      <h3 className="text-white font-bold text-lg mt-4">3. Finalità del Trattamento</h3>
      <ul className="list-disc pl-5 space-y-1">
        <li>Fornire e migliorare i nostri servizi IT.</li>
        <li>Rispondere alle richieste di contatto.</li>
        <li>Analisi statistiche anonime.</li>
      </ul>

      <h3 className="text-white font-bold text-lg mt-4">4. Diritti dell&apos;Utente</h3>
      <p>
        Hai il diritto di accedere, rettificare o cancellare i tuoi dati in qualsiasi momento
        contattandoci all&apos;indirizzo email sopra indicato.
      </p>
    </>
  )

  const cookieContent = (
    <>
      <p>Questo sito utilizza cookie per migliorare l&apos;esperienza di navigazione.</p>

      <h3 className="text-white font-bold text-lg mt-4">Cosa sono i cookie?</h3>
      <p>
        I cookie sono piccoli file di testo salvati sul tuo dispositivo quando visiti un sito web.
      </p>

      <h3 className="text-white font-bold text-lg mt-4">Tipologie di Cookie utilizzati</h3>
      <ul className="list-disc pl-5 space-y-1">
        <li>
          <strong>Cookie Tecnici:</strong> Necessari per il funzionamento del sito (es. navigazione
          sicura).
        </li>
        <li>
          <strong>Cookie Analitici:</strong> Utilizzati per raccogliere statistiche anonime
          sull&apos;uso del sito.
        </li>
      </ul>

      <h3 className="text-white font-bold text-lg mt-4">Gestione dei Cookie</h3>
      <p>
        Puoi disabilitare i cookie direttamente dalle impostazioni del tuo browser. Tuttavia, la
        disattivazione dei cookie tecnici potrebbe compromettere il funzionamento del sito.
      </p>
    </>
  )

  return (
    <footer className="relative w-full py-6 bg-black border-t border-white/5 overflow-hidden group/footer">
      <div className="container mx-auto px-6 relative z-10 flex flex-col gap-4 transition-transform duration-700 ease-out hover:scale-[1.01] cursor-default">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col items-center md:items-start space-y-2">
            <div
              onTouchStart={() => setTouchedElement('logo')}
              onTouchEnd={() => setTouchedElement(null)}
              className={`flex items-center gap-2 md:gap-3 transition-transform duration-300 hover:scale-105 ${touchedElement === 'logo' ? 'scale-105' : ''}`}
            >
              <div className="relative w-10 h-10 md:w-16 lg:w-20 md:h-16 lg:h-20 shrink-0 flex items-center justify-center">
                <Image
                  src="/logo-icon.png"
                  alt="Everbright"
                  fill
                  className="object-contain mix-blend-screen brightness-125 scale-[2.2] md:scale-[2] lg:scale-[2.2] drop-shadow-[0_0_25px_rgba(34,211,238,0.6)]"
                />
              </div>
              <div className="flex flex-col -space-y-1 md:-space-y-1.5 font-inter pt-1 whitespace-nowrap">
                <div className="text-lg md:text-xl lg:text-2xl font-black tracking-tighter md:tracking-tight uppercase text-transparent bg-clip-text bg-linear-to-b from-white via-white to-cyan-100 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                  EVERBRIGHT
                </div>
                <div className="flex items-center gap-1 md:gap-2">
                  <div className="h-px w-3 md:w-4 bg-linear-to-r from-transparent via-cyan-400/50 to-transparent" />
                  <span className="text-[8px] md:text-[8px] lg:text-[9px] font-bold tracking-[0.3em] md:tracking-[0.45em] lg:tracking-[0.55em] text-cyan-300/80 uppercase">
                    IT SERVICES
                  </span>
                  <div className="h-px w-3 md:w-4 bg-linear-to-r from-transparent via-cyan-400/50 to-transparent" />
                </div>
              </div>
            </div>
            <p
              onTouchStart={() => setTouchedElement('copyright')}
              onTouchEnd={() => setTouchedElement(null)}
              className={`text-white/50 text-[9px] font-bold tracking-[0.2em] uppercase transition-all duration-300 ${touchedElement === 'copyright' ? 'scale-105 text-white' : ''}`}
            >
              © {new Date().getFullYear()}{' '}
              <span className="everbright-highlight group-hover/footer:text-white group-hover/footer:drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] transition-all duration-1000">
                EVERBRIGHT
              </span>{' '}
              DIGITAL SOLUTIONS.
            </p>
          </div>

          <div className="flex flex-wrap justify-center md:justify-end gap-x-8 gap-y-1 text-[9px] font-bold tracking-[0.2em] text-white/50 uppercase">
            <button
              onClick={(e) => {
                e.preventDefault()
                setActivePolicy('privacy')
              }}
              className={`hover:text-cyan-400 hover:scale-110 transition-all duration-300 ${touchedElement === 'privacy' ? 'text-cyan-400 scale-110' : ''}`}
              onTouchStart={() => setTouchedElement('privacy')}
              onTouchEnd={() => setTouchedElement(null)}
            >
              Privacy Policy
            </button>
            <button
              onClick={(e) => {
                e.preventDefault()
                setActivePolicy('cookie')
              }}
              className={`hover:text-cyan-400 hover:scale-110 transition-all duration-300 ${touchedElement === 'cookie' ? 'text-cyan-400 scale-110' : ''}`}
              onTouchStart={() => setTouchedElement('cookie')}
              onTouchEnd={() => setTouchedElement(null)}
            >
              Cookie Policy
            </button>
          </div>
        </div>

        <div className="pt-4 border-t border-white/5 flex flex-wrap justify-center md:justify-between items-center gap-x-12 gap-y-2">
          <p
            className={`text-[9px] font-bold tracking-[0.2em] text-white/50 uppercase hover:text-cyan-400 hover:scale-110 transition-all duration-300 cursor-pointer ${touchedElement === 'piva' ? 'text-cyan-400 scale-110' : ''}`}
            onTouchStart={() => setTouchedElement('piva')}
            onTouchEnd={() => setTouchedElement(null)}
          >
            P.IVA 01234567890  | Capitale Sociale € 1 i.v.
          </p>
          <p
            className={`text-[9px] font-bold tracking-[0.2em] text-white/50 uppercase hover:text-cyan-400 hover:scale-110 transition-all duration-300 cursor-pointer ${touchedElement === 'sede' ? 'text-cyan-400 scale-110' : ''}`}
            onTouchStart={() => setTouchedElement('sede')}
            onTouchEnd={() => setTouchedElement(null)}
          >
            Sede Legale: Via Castromurro 39, 87021 Belvedere Marittimo (CS)
          </p>
          <p
            className={`text-[9px] font-bold tracking-[0.2em] text-white/50 uppercase hover:text-cyan-400 hover:scale-110 transition-all duration-300 cursor-pointer ${touchedElement === 'rea' ? 'text-cyan-400 scale-110' : ''}`}
            onTouchStart={() => setTouchedElement('rea')}
            onTouchEnd={() => setTouchedElement(null)}
          >
            REA: CS-267446
          </p>
        </div>
      </div>

      <PolicyModal
        isOpen={activePolicy === 'privacy'}
        onClose={() => setActivePolicy(null)}
        title="Privacy Policy"
        content={privacyContent}
      />

      <PolicyModal
        isOpen={activePolicy === 'cookie'}
        onClose={() => setActivePolicy(null)}
        title="Cookie Policy"
        content={cookieContent}
      />
    </footer>
  )
}
