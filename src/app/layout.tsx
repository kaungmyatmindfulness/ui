import type { Metadata } from 'next'

import { Geist, Geist_Mono } from 'next/font/google'

import Providers from '@/app/providers'

import './globals.css'
import { Toaster } from '@/components/ui/sonner'
import Link from 'next/link'

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
})

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
})

export const metadata: Metadata = {
    title: 'UN OICT React Developer Role - Technical Assessment',
    description:
        'This is a technical assessment for the UN OICT React Developer role, showcasing a simple photo management application built with Next.js and React Query.',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <header className="h-16">
                    <nav className="bg-gray-800 p-4">
                        <div className="mx-auto">
                            <Link href="/" className="text-white">
                                <h1 className="text-2xl text-white">
                                    UN OICT React Developer Role - Technical
                                    Assessment
                                </h1>
                            </Link>
                        </div>
                    </nav>
                </header>
                <main className="mx-auto min-h-[calc(100dvh-32*4px)] max-w-5xl p-4">
                    <Providers>{children}</Providers>
                </main>
                <footer className="h-16">
                    <div className="flex h-full items-center justify-center bg-gray-800 p-4 text-center text-white">
                        <p>
                            &copy; {new Date().getFullYear()} Photos App for UN
                            OICT React Developer Role - Technical Assessment.
                            By:{' '}
                            <a
                                href="mailto:kaungmyat.mindfulness@gmail.com"
                                className="underline"
                            >
                                Kaung Myat Hein
                            </a>
                        </p>
                    </div>
                </footer>
                <Toaster />
            </body>
        </html>
    )
}
