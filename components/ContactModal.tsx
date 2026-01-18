'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { X, CheckCircle2, AlertCircle } from 'lucide-react'
import { sendEmail } from '@/app/actions/sendEmail'

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
}

const ShineInput = ({
  label,
  placeholder,
  name,
  type = 'text',
  isTextArea = false,
  formData,
  handleChange,
  errors,
  isShaking,
  submitCount,
  disabled,
}: {
  label: string
  placeholder: string
  name: string
  type?: string
  isTextArea?: boolean
  formData: Record<string, string>
  handleChange: (name: string, value: string) => void
  errors: string[]
  isShaking: boolean
  submitCount: number
  disabled?: boolean
}) => {
  const hasError = errors.includes(name)

  const getErrorMessage = () => {
    if (!hasError) return ''
    if (name === 'nome') return 'Min. 3 lettere'
    if (name === 'cognome') return 'Min. 3 lettere'
    if (name === 'email') return 'Email non valida'
    return 'Campo richiesto'
  }

  return (
    <div
      key={`${name}-${submitCount}`}
      className={`space-y-1 md:space-y-2 w-full group/field ${hasError && isShaking ? 'animate-shake' : ''} ${disabled ? 'opacity-50 pointer-events-none' : ''}`}
    >
      <div className="flex justify-between items-end px-2">
        <label
          className={`block text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all duration-300 origin-left 
                    ${
                      hasError
                        ? 'text-red-500 scale-105 group-hover/field:text-cyan-400 group-focus-within/field:text-cyan-400'
                        : 'text-gray-400 group-hover/field:text-cyan-400 group-hover/field:scale-105 group-focus-within/field:text-cyan-400 group-focus-within/field:scale-105'
                    }`}
        >
          {label} {['nome', 'cognome', 'email'].includes(name) && '*'}
        </label>

        {hasError && (
          <span className="text-[10px] font-bold text-red-500 uppercase tracking-tighter animate-in fade-in slide-in-from-right-2 duration-300 group-hover/field:text-cyan-400 group-focus-within/field:text-cyan-400 transition-colors">
            {getErrorMessage()}
          </span>
        )}
      </div>

      <div
        className={`relative w-full overflow-hidden rounded-xl md:rounded-2xl border transition-all duration-300 
                ${
                  hasError
                    ? 'border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.4)] bg-red-500/20 group-hover/field:border-cyan-400/50 group-hover/field:bg-white/10 group-hover/field:shadow-[0_0_20px_rgba(34,211,238,0.2)] group-focus-within/field:border-cyan-400 group-focus-within/field:bg-white/10 group-focus-within/field:shadow-[0_0_20px_rgba(34,211,238,0.2)] group-hover/field:scale-[1.02] group-focus-within/field:scale-[1.02]'
                    : 'bg-white/5 border-white/10 group-hover/field:scale-[1.02] group-hover/field:bg-white/10 group-hover/field:border-cyan-400/30 group-hover/field:shadow-[0_0_20px_rgba(34,211,238,0.2)] group-focus-within/field:scale-[1.02] group-focus-within/field:bg-white/10 group-focus-within/field:border-cyan-400 group-focus-within/field:shadow-[0_0_20px_rgba(34,211,238,0.2)]'
                }`}
      >
        <div className="absolute inset-0 -translate-x-full group-hover/field:translate-x-full duration-[0.8s] ease-in-out bg-linear-to-r from-transparent via-white/25 to-transparent z-0 pointer-events-none" />

        {isTextArea ? (
          <textarea
            rows={3}
            disabled={disabled}
            className={`w-full bg-transparent px-3 py-2 md:px-4 md:py-3 text-sm md:text-base text-white placeholder:text-gray-600 focus:outline-none relative z-10 resize-none transition-colors duration-300 ${hasError ? 'placeholder:text-red-400/50 group-hover/field:placeholder:text-gray-600 group-focus-within/field:placeholder:text-gray-600' : ''}`}
            placeholder={placeholder}
            value={formData[name]}
            onChange={(e) => handleChange(name, e.target.value)}
          />
        ) : (
          <input
            type={type}
            disabled={disabled}
            className={`w-full bg-transparent px-3 py-2 md:px-4 md:py-3 text-sm md:text-base text-white placeholder:text-gray-600 focus:outline-none relative z-10 transition-colors duration-300 ${hasError ? 'placeholder:text-red-400/50 group-hover/field:placeholder:text-gray-600 group-focus-within/field:placeholder:text-gray-600' : ''}`}
            placeholder={placeholder}
            value={formData[name]}
            onChange={(e) => handleChange(name, e.target.value)}
          />
        )}
      </div>
    </div>
  )
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [visible, setVisible] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [formData, setFormData] = useState({
    nome: '',
    cognome: '',
    azienda: '',
    telefono: '',
    email: '',
    messaggio: '',
  })
  const [errors, setErrors] = useState<string[]>([])
  const [isShaking, setIsShaking] = useState(false)
  const [submitCount, setSubmitCount] = useState(0)
  const [triggerShine, setTriggerShine] = useState(false)
  const [touchedElement, setTouchedElement] = useState<string | null>(null)

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setVisible(true)
        setTriggerShine(true)
      }, 10)
      document.body.style.overflow = 'hidden'
      const shineResetTimer = setTimeout(() => setTriggerShine(false), 2500)
      return () => {
        clearTimeout(timer)
        clearTimeout(shineResetTimer)
      }
    } else {
      const timer = setTimeout(() => {
        setVisible(false)
        setFormData({
          nome: '',
          cognome: '',
          azienda: '',
          telefono: '',
          email: '',
          messaggio: '',
        })
        setErrors([])
        setSubmitCount(0)
        setTriggerShine(false)
        setTouchedElement(null)
        setSubmitStatus('idle')
      }, 500)
      document.body.style.overflow = 'unset'
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors.includes(name)) {
      setErrors((prev) => prev.filter((e) => e !== name))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isSubmitting || submitStatus === 'success') return

    const newErrors: string[] = []
    const nameRegex = /^[A-Za-zÀ-ÿ\s]{3,}$/
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!nameRegex.test(formData.nome)) newErrors.push('nome')
    if (!nameRegex.test(formData.cognome)) newErrors.push('cognome')
    if (!emailRegex.test(formData.email)) newErrors.push('email')

    if (newErrors.length > 0) {
      setErrors(newErrors)
      setIsShaking(false)
      setSubmitCount((prev) => prev + 1)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsShaking(true)
        })
      })
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const result = await sendEmail(formData)
      if (result.success) {
        setSubmitStatus('success')
        setTimeout(() => {
          onClose()
        }, 2500)
      } else {
        setSubmitStatus('error')
      }
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!visible && !isOpen) return null

  return (
    <div
      className={`fixed inset-0 z-100 flex justify-center items-start md:items-center p-4 sm:p-6 overflow-y-auto transition-all duration-500 ${
        isOpen
          ? 'bg-black/40 backdrop-blur-md opacity-100'
          : 'bg-black/0 backdrop-blur-none opacity-0 pointer-events-none'
      }`}
      onClick={onClose}
    >
      <div
        className={`relative w-full max-w-2xl my-auto bg-zinc-900/90 backdrop-blur-xl border border-white/20 rounded-[32px] shadow-[0_0_60px_rgba(34,211,238,0.15)] p-6 sm:p-8 md:p-12 overflow-hidden transition-all duration-500 transform group/form ${
          isOpen ? 'scale-100 translate-y-0 opacity-100' : 'scale-95 translate-y-10 opacity-0'
        } hover:shadow-[0_0_120px_rgba(34,211,238,0.3)] hover:border-cyan-400/30`}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`absolute inset-0 -translate-x-full duration-[1.5s] ease-in-out bg-linear-to-r from-transparent via-white/5 to-transparent z-0 pointer-events-none group-hover/form:translate-x-full ${triggerShine ? 'translate-x-full' : ''}`}
        />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 md:top-6 md:right-6 text-gray-400 hover:text-white transition-colors z-20"
        >
          <X size={20} className="md:w-6 md:h-6" />
        </button>

        <div
          onTouchStart={() => setTouchedElement('header')}
          onTouchEnd={() => setTouchedElement(null)}
          className={`mb-4 md:mb-8 text-center space-y-1 relative z-10 transition-transform duration-500 ease-out hover:scale-105 cursor-default ${touchedElement === 'header' ? 'scale-105' : ''}`}
        >
          <h2 className="text-xl md:text-3xl font-bold tracking-tighter text-white uppercase">
            PARLAMI DI <span className="text-cyan-400">TE</span>.
          </h2>
          <p className="text-gray-400 text-[10px] md:text-sm">
            Siamo pronti ad ascoltare la tua visione.
          </p>
        </div>

        <form className="space-y-3 md:space-y-4 relative z-10" onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            <ShineInput
              label="Nome"
              placeholder="Mario"
              name="nome"
              formData={formData}
              handleChange={handleChange}
              errors={errors}
              isShaking={isShaking}
              submitCount={submitCount}
              disabled={isSubmitting || submitStatus === 'success'}
            />
            <ShineInput
              label="Cognome"
              placeholder="Rossi"
              name="cognome"
              formData={formData}
              handleChange={handleChange}
              errors={errors}
              isShaking={isShaking}
              submitCount={submitCount}
              disabled={isSubmitting || submitStatus === 'success'}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            <ShineInput
              label="Azienda"
              placeholder="Nome Azienda"
              name="azienda"
              formData={formData}
              handleChange={handleChange}
              errors={errors}
              isShaking={isShaking}
              submitCount={submitCount}
              disabled={isSubmitting || submitStatus === 'success'}
            />
            <ShineInput
              label="Telefono"
              placeholder="+39 333..."
              type="tel"
              name="telefono"
              formData={formData}
              handleChange={handleChange}
              errors={errors}
              isShaking={isShaking}
              submitCount={submitCount}
              disabled={isSubmitting || submitStatus === 'success'}
            />
          </div>

          <ShineInput
            label="Email"
            placeholder="mario.rossi@azienda.com"
            type="email"
            name="email"
            formData={formData}
            handleChange={handleChange}
            errors={errors}
            isShaking={isShaking}
            submitCount={submitCount}
            disabled={isSubmitting || submitStatus === 'success'}
          />

          <ShineInput
            label="Messaggio"
            placeholder="Raccontaci il tuo progetto..."
            isTextArea={true}
            name="messaggio"
            formData={formData}
            handleChange={handleChange}
            errors={errors}
            isShaking={isShaking}
            submitCount={submitCount}
            disabled={isSubmitting || submitStatus === 'success'}
          />

          <div className="relative pt-2">
            {submitStatus === 'error' && (
              <div className="absolute -top-4 left-0 right-0 flex justify-center items-center gap-2 text-red-500 text-[10px] font-bold uppercase tracking-widest animate-in fade-in slide-in-from-bottom-2">
                <AlertCircle size={12} />
                Errore nell&apos;invio. Riprova.
              </div>
            )}

            <Button
              type="submit"
              disabled={isSubmitting || submitStatus === 'success'}
              onTouchStart={() => setTouchedElement('submit')}
              onTouchEnd={() => setTouchedElement(null)}
              className={`w-full font-bold rounded-full py-4 md:py-6 text-sm md:text-lg transition-all relative overflow-hidden
                                ${
                                  submitStatus === 'success'
                                    ? 'bg-green-500 text-white shadow-[0_0_30px_rgba(34,197,94,0.4)]'
                                    : 'bg-white text-black hover:bg-cyan-400 hover:text-black shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(34,211,238,0.5)]'
                                } 
                                ${touchedElement === 'submit' ? 'scale-105' : ''} 
                                ${isSubmitting ? 'opacity-80' : ''}`}
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                    INVIO...
                  </>
                ) : submitStatus === 'success' ? (
                  <>
                    <CheckCircle2 size={20} />
                    MESSAGGIO INVIATO
                  </>
                ) : (
                  'INVIA MESSAGGIO'
                )}
              </span>
              {isSubmitting && (
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent animate-shine" />
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
