'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { CheckCircle2, AlertCircle } from 'lucide-react'
import { sendEmail } from '@/app/actions/sendEmail'
import { ShineInput } from '@/components/effects/shine-input'
import { formStructure } from './form-config'
import { useThaiData } from '@/lib/thai-context'

interface ContactFormData {
  nome: string
  cognome: string
  azienda: string
  telefono: string
  email: string
  messaggio: string
  [key: string]: string
}

interface ContactFormProps {
  onSuccess: () => void
}

export function ContactForm({ onSuccess }: ContactFormProps) {
  const { isThai, labels: contextLabels } = useThaiData()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [formData, setFormData] = useState<ContactFormData>({
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
  const [touchedElement, setTouchedElement] = useState<string | null>(null)

  const thaiLabels: Record<string, { label: string; placeholder: string }> = {
    nome: { label: 'ชื่อ', placeholder: 'สมชาย' },
    cognome: { label: 'นามสกุล', placeholder: 'ใจดี' },
    azienda: { label: 'บริษัท', placeholder: 'ชื่อบริษัทของคุณ' },
    telefono: { label: 'โทรศัพท์', placeholder: '081-234-5678' },
    email: { label: 'อีเมล', placeholder: 'somchai@company.com' },
    messaggio: { label: 'ข้อความ', placeholder: 'เล่าโครงการของคุณให้เราฟัง...' },
  }

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
    const nameRegex = /^[A-Za-zÀ-ÿ\u0E00-\u0E7F\s]{3,}$/ // Added Thai characters to regex
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
          onSuccess()
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

  return (
    <form className="space-y-3 md:space-y-4 relative z-10" onSubmit={handleSubmit} noValidate>
      {formStructure.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className={row.length > 1 ? 'grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4' : 'w-full'}
        >
          {row.map((field) => {
            const translation = isThai ? thaiLabels[field.name] : null
            return (
              <ShineInput
                key={field.name}
                {...field}
                label={translation?.label || field.label}
                placeholder={translation?.placeholder || field.placeholder}
                formData={formData}
                handleChange={handleChange}
                errors={errors}
                isShaking={isShaking}
                submitCount={submitCount}
                disabled={isSubmitting || submitStatus === 'success'}
              />
            )
          })}
        </div>
      ))}

      <div className="relative pt-2">
        {submitStatus === 'error' && (
          <div className="absolute -top-4 left-0 right-0 flex justify-center items-center gap-2 text-red-500 text-[10px] font-bold uppercase tracking-widest animate-in fade-in slide-in-from-bottom-2">
            <AlertCircle size={12} />
            {isThai ? 'เกิดข้อผิดพลาดในการส่ง กรุณาลองใหม่' : "Errore nell'invio. Riprova."}
          </div>
        )}

        <Button
          type="submit"
          disabled={isSubmitting || submitStatus === 'success'}
          onTouchStart={() => setTouchedElement('submit')}
          onTouchEnd={() => setTouchedElement(null)}
          className={`w-full font-bold rounded-full py-4 md:py-6 text-sm md:text-lg transition-all relative overflow-hidden
                            ${submitStatus === 'success'
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
                {isThai ? 'กำลังส่ง...' : 'INVIO...'}
              </>
            ) : submitStatus === 'success' ? (
              <>
                <CheckCircle2 size={20} />
                {isThai ? 'ส่งข้อความแล้ว' : 'MESSAGGIO INVIATO'}
              </>
            ) : (
              contextLabels.send
            )}
          </span>
          {isSubmitting && (
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent animate-shine" />
          )}
        </Button>
      </div>
    </form>
  )
}
