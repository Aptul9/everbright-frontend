import type { Metadata } from 'next'
import { Geist, Geist_Mono, Inter } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/navbar/Navbar'
import { ThaiProvider } from '@/lib/thai-context'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Everbright',
  description: 'Illumina il tuo business',
  icons: {
    icon: '/logo-icon.png?v=3',
    apple: '/logo-icon.png?v=3',
    shortcut: '/logo-icon.png?v=3',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased bg-background text-foreground`}
      >
        <ThaiProvider>
          <Navbar />
          {children}
        </ThaiProvider>
      </body>
    </html>
  )
}
