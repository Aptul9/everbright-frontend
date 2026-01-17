"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
    const [visible, setVisible] = useState(false);
    const [formData, setFormData] = useState({
        nome: "",
        cognome: "",
        azienda: "",
        telefono: "",
        email: "",
        messaggio: ""
    });
    const [errors, setErrors] = useState<string[]>([]);
    const [isShaking, setIsShaking] = useState(false);
    const [submitCount, setSubmitCount] = useState(0);

    useEffect(() => {
        if (isOpen) {
            setVisible(true);
            document.body.style.overflow = "hidden"; // Block scrolling
        } else {
            const timer = setTimeout(() => setVisible(false), 500); // Wait for animation
            document.body.style.overflow = "unset";
            // Reset form on close
            setFormData({
                nome: "",
                cognome: "",
                azienda: "",
                telefono: "",
                email: "",
                messaggio: ""
            });
            setErrors([]);
            setSubmitCount(0);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    const handleChange = (name: string, value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }));
        // Remove error when user starts typing
        if (errors.includes(name)) {
            setErrors(prev => prev.filter(e => e !== name));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const requiredFields = ["nome", "cognome", "email"];
        const newErrors = requiredFields.filter(field => !formData[field as keyof typeof formData].trim());

        if (newErrors.length > 0) {
            setErrors(newErrors);
            setIsShaking(false);
            setSubmitCount(prev => prev + 1);

            // This micro-delay is crucial to force the browser to recognize the class removal
            // and subsequent re-addition, which triggers the CSS animation again.
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    setIsShaking(true);
                });
            });
            return;
        }

        // Logic for successful submission
        console.log("Form submitted successfully:", formData);
        onClose();
    };


    if (!visible && !isOpen) return null;

    // Helper for Shine Effect Inputs
    const ShineInput = ({ label, placeholder, name, type = "text", isTextArea = false }: { label: string, placeholder: string, name: string, type?: string, isTextArea?: boolean }) => {
        const hasError = errors.includes(name);

        return (
            <div
                key={`${name}-${submitCount}`}
                className={`space-y-2 w-full group/field ${hasError && isShaking ? "animate-shake" : ""}`}
            >
                <label className={`block text-xs font-bold uppercase tracking-widest ml-2 transition-all duration-300 origin-left 
                    ${hasError ? "text-red-500 scale-105" : "text-gray-400 group-hover/field:text-cyan-400 group-hover/field:scale-105 group-focus-within/field:text-cyan-400 group-focus-within/field:scale-105"}`}>
                    {label} {["nome", "cognome", "email"].includes(name) && "*"}
                </label>
                <div className={`relative w-full overflow-hidden rounded-2xl border transition-all duration-300 
                    ${hasError
                        ? "border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.4)] bg-red-500/20"
                        : "bg-white/5 border-white/10 group-hover/field:scale-[1.02] group-hover/field:bg-white/10 group-hover/field:border-cyan-400/30 group-hover/field:shadow-[0_0_20px_rgba(34,211,238,0.2)] group-focus-within/field:scale-[1.02] group-focus-within/field:bg-white/10 group-focus-within/field:border-cyan-400 group-focus-within/field:shadow-[0_0_20px_rgba(34,211,238,0.2)]"}`}>

                    {/* Shine Effect Layer */}
                    {!hasError && (
                        <div className="absolute inset-0 -translate-x-full group-hover/field:translate-x-full duration-[0.8s] ease-in-out bg-gradient-to-r from-transparent via-white/25 to-transparent z-0 pointer-events-none" />
                    )}

                    {isTextArea ? (
                        <textarea
                            rows={4}
                            className={`w-full bg-transparent px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none relative z-10 resize-none transition-colors duration-300 ${hasError ? "placeholder:text-red-400/50" : ""}`}
                            placeholder={placeholder}
                            value={formData[name as keyof typeof formData]}
                            onChange={(e) => handleChange(name, e.target.value)}
                        />
                    ) : (
                        <input
                            type={type}
                            className={`w-full bg-transparent px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none relative z-10 transition-colors duration-300 ${hasError ? "placeholder:text-red-400/50" : ""}`}
                            placeholder={placeholder}
                            value={formData[name as keyof typeof formData]}
                            onChange={(e) => handleChange(name, e.target.value)}
                        />
                    )}
                </div>
            </div>
        );
    };

    return (
        <div
            className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-500 ${isOpen ? "bg-black/40 backdrop-blur-md opacity-100" : "bg-black/0 backdrop-blur-none opacity-0 pointer-events-none"
                }`}
            onClick={onClose}
        >
            <div
                className={`relative w-full max-w-2xl bg-zinc-900/90 backdrop-blur-xl border border-white/20 rounded-[32px] shadow-[0_0_60px_rgba(34,211,238,0.15)] p-8 md:p-12 overflow-hidden transition-all duration-500 transform group/form ${isOpen ? "scale-100 translate-y-0 opacity-100" : "scale-95 translate-y-10 opacity-0"
                    } hover:shadow-[0_0_120px_rgba(34,211,238,0.3)] hover:border-cyan-400/30`}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Global Card Shine */}
                <div className="absolute inset-0 -translate-x-full group-hover/form:translate-x-full duration-[1.5s] ease-in-out bg-gradient-to-r from-transparent via-white/5 to-transparent z-0 pointer-events-none" />

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors z-20"
                >
                    <X size={24} />
                </button>

                {/* Header */}
                <div className="mb-8 text-center space-y-2 relative z-10 transition-transform duration-500 ease-out hover:scale-105 cursor-default">
                    <h2 className="text-3xl font-bold tracking-tighter text-white uppercase">PARLAMI DI <span className="text-cyan-400">TE</span>.</h2>
                    <p className="text-gray-400 text-sm">Siamo pronti ad ascoltare la tua visione.</p>
                </div>

                {/* Form */}
                <form className="space-y-4 relative z-10" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <ShineInput label="Nome" placeholder="Mario" name="nome" />
                        <ShineInput label="Cognome" placeholder="Rossi" name="cognome" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <ShineInput label="Azienda" placeholder="Nome Azienda" name="azienda" />
                        <ShineInput label="Telefono" placeholder="+39 333..." type="tel" name="telefono" />
                    </div>

                    <ShineInput label="Email" placeholder="mario.rossi@azienda.com" type="email" name="email" />

                    <ShineInput label="Messaggio" placeholder="Raccontaci il tuo progetto..." isTextArea={true} name="messaggio" />

                    <Button
                        type="submit"
                        className="w-full bg-white text-black hover:bg-cyan-400 hover:text-black font-bold rounded-full py-6 text-lg shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] transition-all"
                    >
                        INVIA MESSAGGIO
                    </Button>
                </form>
            </div>
        </div>
    );
}

