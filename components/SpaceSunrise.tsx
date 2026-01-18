"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function SpaceSunrise() {
    const [active, setActive] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setActive(true);
        }, 2200);
        return () => clearTimeout(timer);
    }, []);

    return (
        /* 
           FIX: Added a mask-image linear gradient that fades the top 20% of the container.
           This ensures that regardless of how massive the Earth Arc is, its "shoulders" 
           fade to transparent before hitting the top corners of the screen.
        */
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none [mask-image:linear-gradient(to_bottom,transparent_0%,black_20%)]">
            {/* 1. Arc of the Earth (Atmosphere) */}
            <div
                className={cn(
                    "absolute left-1/2 -translate-x-1/2 rounded-[100%] bg-black transition-all duration-[4000ms] ease-out will-change-transform",
                    // Fixed: increased width on mobile to avoid "ovalissimo" vertical shape
                    active
                        ? "w-[400%] h-[200%] md:w-[200%] -bottom-[90%] opacity-100 shadow-[0_-60px_160px_20px_rgba(0,100,255,0.7),0_-20px_60px_10px_rgba(180,220,255,0.5)] border-t-[1px] border-blue-400/40"
                        : "w-[240%] h-[120%] md:w-[120%] -bottom-[100%] opacity-0 shadow-none border-transparent"
                )}
            />

            {/* 2. The Sun (Main Star) */}
            <div
                className={cn(
                    "absolute left-1/2 -translate-x-1/2 transition-all duration-[5000ms] ease-out flex items-center justify-center",
                    active ? "bottom-[10%] opacity-100 scale-100" : "bottom-[-10%] opacity-0 scale-50"
                )}
            >
                {/* Core White Hot Ball */}
                <div className="w-16 h-16 bg-white rounded-full blur-[8px] shadow-[0_0_60px_20px_rgba(255,255,255,0.6)]" />

                {/* Horizontal Flare line - widened on mobile to keep it line-like instead of oval */}
                <div className="absolute w-[400vw] md:w-[180vw] h-[2px] bg-blue-400/30 blur-[3px]" />
                <div className="absolute w-[200vw] md:w-[90vw] h-[3px] bg-white/40 blur-[4px]" />

                {/* Star Rays (Rotated Elements) */}
                <div className="absolute w-1 h-[60vw] bg-gradient-to-t from-transparent via-white/20 to-transparent blur-[0px] rotate-45" />
                <div className="absolute w-1 h-[60vw] bg-gradient-to-t from-transparent via-white/20 to-transparent blur-[0px] -rotate-45" />
            </div>

            {/* 3. Global Screen Fill Flash (First moment of light) */}
            <div
                className={cn(
                    "absolute inset-0 bg-white mix-blend-overlay transition-opacity duration-[3000ms] ease-out",
                    active ? "opacity-0" : "opacity-0"
                )}
            />

            {/* 4. Ambient Blue Fog at bottom to blend */}
            <div
                className={cn(
                    "absolute bottom-0 left-0 w-full h-[300px] bg-gradient-to-t from-blue-950/20 to-transparent transition-opacity duration-1000",
                    active ? "opacity-100" : "opacity-0"
                )}
            />
        </div>
    );
}
