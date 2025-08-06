import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import MobileMenuButton from '../components/MobileMenuButton'
import Sidebar from '../components/Sidebar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'NextJS Playground',
  description: 'Demo project',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className='max-h-[100dvh]'>
      <body className={`${inter.className} flex flex-col min-h-screen bg-white text-black dark:bg-black dark:text-white h-[calc(var(--vh)_*_100)]`}>
        <Header />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 p-4">{children}</main>
        </div>
        <Footer />
      </body>
    </html>
  )
}

function Header() {
  return (
    <header className="bg-gray-800 dark:bg-gray-900 text-white px-4 py-3 relative">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 sm:hidden">
        <MobileMenuButton />
      </div>
      <h1 className="text-lg font-semibold text-center">NextJS Playground</h1>
    </header>
  )
}

function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 text-center py-2 text-sm text-gray-800 dark:text-gray-300 mt-auto">
      © 2025 L. Kovari — Built with Next.js
    </footer>
  )
}