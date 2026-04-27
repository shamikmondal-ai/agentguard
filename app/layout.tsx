import type { Metadata } from 'next'
import Link from 'next/link'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/playfair-display/400.css'
import '@fontsource/playfair-display/700.css'
import '@fontsource/playfair-display/900.css'
import './globals.css'
import { DiagnosticProvider } from '@/providers/DiagnosticProvider'
import { Header } from '@/components/shared/Header'

export const metadata: Metadata = {
  title: 'AgentGuard — Enterprise AI CX Governance',
  description:
    'Professional AI governance and stress-testing platform. Identify prompt injection vulnerabilities, agency boundary violations, and compliance gaps in your AI agents before they reach production.',
  openGraph: {
    title: 'AgentGuard',
    description: 'Enterprise AI CX Governance',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-background text-foreground font-sans antialiased">
        <DiagnosticProvider>
          <Header />
          <main>{children}</main>
          <footer className="border-t border-border mt-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-muted">
                © {new Date().getFullYear()} AgentGuard. Enterprise AI Governance Platform.
              </p>
              <div className="flex items-center gap-4 text-xs text-muted">
                <Link href="/legal#privacy" className="hover:text-foreground transition-colors">Privacy</Link>
                <Link href="/legal#terms"   className="hover:text-foreground transition-colors">Terms</Link>
                <Link href="/legal#security" className="hover:text-foreground transition-colors">Security</Link>
                <Link
                  href="https://github.com/shamikmondal-ai/agentguard"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  Docs ↗
                </Link>
              </div>
            </div>
          </footer>
        </DiagnosticProvider>
      </body>
    </html>
  )
}
