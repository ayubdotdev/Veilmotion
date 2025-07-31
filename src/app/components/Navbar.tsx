// components/Navbar.tsx
'use client'

import Link from 'next/link'
import { Rocket, Github, Twitter } from 'lucide-react'
import { ModeToggle } from './mode-toggle'
import Image from 'next/image'

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 z-50 w-full px-4 sm:px-8">
      <nav className="mx-auto mt-4 flex max-w-5xl items-center justify-between rounded-xl border border-black/10 bg-white/30 p-2.5 shadow-lg backdrop-blur-lg dark:border-white/10 dark:bg-black/30">
        <Link href="/" className="flex items-center">
          {/* Light mode logo */}
          <Image
            src="/icconff.png"
            alt="App logo"
            height={60}
            width={60}
          />
          <span className="ml-2 text-xl font-semibold text-zinc-800 dark:text-zinc-200">
            VeilMotion
          </span>
        </Link>

        {/* Right Side: Social Icons and Theme Toggle */}
        <div className="flex items-center gap-2 sm:gap-4">
          <Link href="https://github.com/ayubdotdev" target="_blank" rel="noopener noreferrer">
            <Github className="h-6 w-6 text-zinc-700 transition-colors hover:text-indigo-500 dark:text-zinc-300 dark:hover:text-indigo-400" />
          </Link>
          <Link href="https://x.com/Ayyubdotdev" target="_blank" rel="noopener noreferrer">
            <Twitter className="h-6 w-6 text-zinc-700 transition-colors hover:text-indigo-500 dark:text-zinc-300 dark:hover:text-indigo-400" />
          </Link>
          <div className="h-6 w-px bg-slate-300 dark:bg-slate-700" />
          <ModeToggle />
        </div>
      </nav>
    </header>
  )
}