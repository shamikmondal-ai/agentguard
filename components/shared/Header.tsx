'use client'

import { Shield, LayoutGrid, FileText, Settings } from 'lucide-react'
import Link from 'next/link'
import { useDiagnostic } from '@/providers/DiagnosticProvider'
import { StatusBadge } from './StatusBadge'

export function Header() {
  const { phase } = useDiagnostic()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="p-1.5 rounded-lg bg-accent/10 border border-accent/20 group-hover:bg-accent/20 transition-colors">
              <Shield className="h-5 w-5 text-accent" />
            </div>
            <span className="font-serif text-lg font-bold text-foreground tracking-tight">
              Agent<span className="text-accent">Guard</span>
            </span>
          </Link>

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {[
              { label: 'Modules', icon: LayoutGrid, href: '#modules' },
              { label: 'Reports', icon: FileText, href: '#reports' },
              { label: 'Settings', icon: Settings, href: '#settings' },
            ].map(({ label, icon: Icon, href }) => (
              <Link
                key={label}
                href={href}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-muted hover:text-foreground hover:bg-surface-raised transition-all duration-150"
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <StatusBadge phase={phase} />
            <button className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-lg bg-accent text-white text-sm font-semibold hover:bg-accent/80 transition-all duration-200 shadow-glow hover:shadow-glow">
              <Shield className="h-3.5 w-3.5" />
              New Scan
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
