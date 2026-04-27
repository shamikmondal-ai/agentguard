import type { Metadata } from 'next'
import Link from 'next/link'
import { Scale, Shield, FileText, Lock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Legal — AgentGuard',
  description: 'Privacy policy, terms of use, and security disclosures for AgentGuard.',
}

const SECTIONS = [
  {
    id: 'privacy',
    icon: Shield,
    iconColor: 'text-accent',
    iconBg: 'bg-accent/10 border-accent/20',
    title: 'Privacy Policy',
    body: `AgentGuard processes no personal data on its servers. All agent system prompt analysis is performed locally in your browser using JavaScript — nothing is transmitted to third parties or stored remotely. Scan results are held only in browser session storage and are cleared when you close the tab.`,
  },
  {
    id: 'terms',
    icon: FileText,
    iconColor: 'text-warning',
    iconBg: 'bg-warning/10 border-warning/20',
    title: 'Terms of Use',
    body: `AgentGuard is provided as-is for evaluation and AI governance purposes. Users are responsible for ensuring their use complies with applicable laws and their organisation's policies. Results produced by AgentGuard are indicative only and do not constitute a legal compliance opinion. A qualified professional should review any compliance decisions.`,
  },
  {
    id: 'security',
    icon: Lock,
    iconColor: 'text-success',
    iconBg: 'bg-success/10 border-success/20',
    title: 'Security',
    body: `Vulnerability disclosures and security questions can be submitted via the GitHub repository issues page. We aim to acknowledge critical issues within 48 hours. AgentGuard runs entirely client-side — there is no backend attack surface for the analysis engine.`,
  },
]

export default function LegalPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-16 space-y-12">

      {/* Header */}
      <div>
        <div className="inline-flex p-3 rounded-xl bg-surface-raised border border-border mb-6">
          <Scale className="h-6 w-6 text-muted" />
        </div>
        <p className="eyebrow mb-3">Legal</p>
        <h1 className="font-serif text-4xl font-bold text-foreground mb-4">Policies & Terms</h1>
        <p className="text-muted leading-relaxed max-w-xl">
          AgentGuard is an open-source AI governance platform. Full legal documentation will be formalised at general availability.
        </p>
      </div>

      {/* Sections */}
      <div className="space-y-4">
        {SECTIONS.map(({ id, icon: Icon, iconColor, iconBg, title, body }) => (
          <div key={id} id={id} className="card-executive p-6 space-y-4 scroll-mt-24">
            <div className="flex items-start gap-4">
              <div className={`p-2 rounded-lg border shrink-0 ${iconBg}`}>
                <Icon className={`h-5 w-5 ${iconColor}`} />
              </div>
              <div>
                <h2 className="font-serif text-xl font-bold text-foreground">{title}</h2>
              </div>
            </div>
            <p className="text-muted leading-relaxed text-sm">{body}</p>
            <p className="text-xs text-muted/60 border-t border-border pt-3">
              Full formal policy coming at general availability.
            </p>
          </div>
        ))}
      </div>

      {/* Links */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-border">
        <p className="text-xs text-muted">For questions, open an issue on GitHub.</p>
        <div className="flex items-center gap-4">
          <Link href="/" className="text-xs text-muted hover:text-foreground transition-colors">
            ← Back to Scanner
          </Link>
          <Link
            href="https://github.com/shamikmondal-ai/agentguard"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-accent hover:text-accent/80 transition-colors"
          >
            View on GitHub →
          </Link>
        </div>
      </div>
    </div>
  )
}
