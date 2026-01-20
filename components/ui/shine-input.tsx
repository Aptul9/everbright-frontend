'use client'

interface ShineInputProps {
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
}

export const ShineInput = ({
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
}: ShineInputProps) => {
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