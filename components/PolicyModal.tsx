"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

interface PolicyModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    content: React.ReactNode;
}

export function PolicyModal({ isOpen, onClose, title, content }: PolicyModalProps) {
    const [visible, setVisible] = useState(false);
    const [triggerShine, setTriggerShine] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setVisible(true);
            document.body.style.overflow = "hidden"; // Block scrolling
            setTimeout(() => setTriggerShine(true), 300);
            setTimeout(() => setTriggerShine(false), 2500);
        } else {
            const timer = setTimeout(() => setVisible(false), 500); // Wait for animation
            document.body.style.overflow = "unset";
            setTriggerShine(false);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!visible && !isOpen) return null;

    return (
        <div
            className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-500 ${isOpen ? "bg-black/40 backdrop-blur-md opacity-100" : "bg-black/0 backdrop-blur-none opacity-0 pointer-events-none"
                }`}
            onClick={onClose}
        >
            <div
                className={`relative w-full max-w-3xl max-h-[80vh] bg-zinc-900/95 backdrop-blur-xl border border-white/20 rounded-[32px] shadow-[0_0_60px_rgba(34,211,238,0.15)] p-8 md:p-12 overflow-hidden transition-all duration-500 transform group/modal flex flex-col ${isOpen ? "scale-100 translate-y-0 opacity-100" : "scale-95 translate-y-10 opacity-0"
                    } hover:shadow-[0_0_120px_rgba(34,211,238,0.3)] hover:border-cyan-400/30`}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Global Card Shine */}
                <div className={`absolute inset-0 -translate-x-full duration-[1.5s] ease-in-out bg-gradient-to-r from-transparent via-white/5 to-transparent z-0 pointer-events-none ${triggerShine ? 'translate-x-full' : 'group-hover/modal:translate-x-full'}`} />

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors z-20"
                >
                    <X size={24} />
                </button>

                {/* Header */}
                <div className="mb-6 text-center space-y-2 relative z-10 shrink-0">
                    <h2 className="text-3xl font-bold tracking-tighter text-white uppercase">{title}</h2>
                    <div className="h-[2px] w-20 bg-cyan-400 mx-auto rounded-full" />
                </div>

                {/* Content - Scrollable */}
                <div className="relative z-10 overflow-y-auto pr-2 custom-scrollbar text-left">
                    <div className="text-gray-300 text-sm md:text-base space-y-4 leading-relaxed font-light">
                        {content}
                    </div>
                </div>

                {/* Footer / Close Button */}
                <div className="relative z-10 pt-8 shrink-0">
                    <button
                        onClick={onClose}
                        className="w-full bg-white text-black hover:bg-cyan-400 hover:text-black font-bold rounded-full py-4 text-sm tracking-[0.2em] shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] transition-all uppercase"
                    >
                        Chiudi
                    </button>
                </div>
            </div>
        </div>
    );
}
