import { cn, formatScanPhase } from '@/lib/utils'
import type { ScanPhase } from '@/providers/DiagnosticProvider'

const phaseConfig: Record<ScanPhase, { dot: string; label: string }> = {
  idle: { dot: 'bg-success shadow-glow-success', label: 'text-success' },
  scanning: { dot: 'bg-warning', label: 'text-warning' },
  results: { dot: 'bg-accent shadow-glow', label: 'text-accent' },
  report_generation: { dot: 'bg-muted', label: 'text-muted' },
}

interface StatusBadgeProps {
  phase: ScanPhase
  className?: string
}

export function StatusBadge({ phase, className }: StatusBadgeProps) {
  const cfg = phaseConfig[phase]

  return (
    <div
      className={cn(
        'flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface border border-border text-xs font-medium',
        className,
      )}
    >
      <span className="relative flex h-2 w-2">
        <span className={cn('animate-ping absolute inline-flex h-full w-full rounded-full opacity-75', cfg.dot)} />
        <span className={cn('relative inline-flex rounded-full h-2 w-2', cfg.dot)} />
      </span>
      <span className={cfg.label}>{formatScanPhase(phase)}</span>
    </div>
  )
}
