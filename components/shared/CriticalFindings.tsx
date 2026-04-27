'use client'

import type { Finding } from '@/providers/DiagnosticProvider'
import { cn } from '@/lib/utils'

const SEV_ORDER = { critical: 0, high: 1, medium: 2, low: 3 } as const
const SEV_BAR: Record<string, string> = {
  critical: 'bg-danger',
  high: 'bg-warning',
  medium: 'bg-accent',
  low: 'bg-muted',
}
const SEV_TEXT: Record<string, string> = {
  critical: 'text-danger',
  high: 'text-warning',
  medium: 'text-accent',
  low: 'text-muted',
}

interface Props {
  findings: Finding[]
}

export function CriticalFindings({ findings }: Props) {
  const top = [...findings]
    .sort((a, b) => SEV_ORDER[a.severity] - SEV_ORDER[b.severity])
    .slice(0, 3)

  if (top.length === 0) return null

  return (
    <div className="space-y-3 mb-6">
      <p className="text-xs eyebrow">Top Findings</p>
      {top.map((finding, i) => (
        <div
          key={finding.id}
          className="fade-slide-in flex items-start gap-3 p-4 rounded-xl bg-surface-raised border border-border"
          style={{ animationDelay: `${i * 0.1}s` }}
        >
          <div className={cn('w-1 self-stretch rounded-full shrink-0', SEV_BAR[finding.severity])} />
          <div className="flex-1 min-w-0 space-y-2">
            <div className="flex items-center gap-2">
              <span className={cn('text-[10px] font-bold uppercase tracking-wider shrink-0', SEV_TEXT[finding.severity])}>
                {finding.severity}
              </span>
              <span className="text-xs text-foreground font-semibold truncate">{finding.title}</span>
            </div>
            <p className="text-xs text-muted leading-relaxed">{finding.description}</p>
            <div className="bg-background/60 rounded-lg px-2.5 py-2">
              <p className="text-[10px] text-muted uppercase tracking-wider mb-0.5">Recommended Fix</p>
              <p className="text-xs text-accent/90 font-mono leading-relaxed">{finding.recommendation}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
