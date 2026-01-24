'use client';

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { servicesData, projectsData } from './data';
import { thaiServicesData, thaiProjectsData } from './thai-data';

interface ThaiContextType {
    isThai: boolean;
    services: typeof servicesData;
    projects: typeof projectsData;
    labels: {
        services: string;
        projects: string;
        contact: string;
        details: string;
        send: string;
    };
}

const ThaiContext = createContext<ThaiContextType | undefined>(undefined);

export function ThaiProvider({ children }: { children: React.ReactNode }) {
    const [isThai, setIsThai] = useState(false);
    const [, setInput] = useState('');
    const lastToggleRef = useRef(0);

    useEffect(() => {
        if (isThai) {
            document.body.classList.add('thai-mode');
        } else {
            document.body.classList.remove('thai-mode');
        }
    }, [isThai]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const key = e.key.toLowerCase();
            if (!/^[a-z]$/.test(key)) return;

            setInput((prev) => {
                const current = prev + key;
                const lastFour = current.slice(-4);

                if (lastFour === 'thai') {
                    const now = Date.now();
                    // Debounce to prevent double-toggle from strict mode or double listeners
                    if (now - lastToggleRef.current > 500) {
                        lastToggleRef.current = now;
                        setIsThai((v) => !v);
                    }
                    return '';
                }
                return current.slice(-20);
            });
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const value = {
        isThai,
        services: isThai ? thaiServicesData : servicesData,
        projects: isThai ? thaiProjectsData : projectsData,
        labels: isThai
            ? {
                services: 'บริการ',
                projects: 'โครงการ',
                contact: 'ติดต่อเรา',
                details: 'รายละเอียด',
                send: 'ส่งข้อความ',
            }
            : {
                services: 'SERVIZI',
                projects: 'PROGETTI',
                contact: 'CONTATTACI',
                details: 'DETTAGLI',
                send: 'INVIA MESSAGGIO',
            },
    };

    return <ThaiContext.Provider value={value}>{children}</ThaiContext.Provider>;
}

export function useThaiData() {
    const context = useContext(ThaiContext);
    if (context === undefined) {
        throw new Error('useThaiData must be used within a ThaiProvider');
    }
    return context;
}
