'use client'

import Link from 'next/link'
import { FileCode, AlertTriangle, CheckCircle2, Settings } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useDiagnostic } from '@/providers/DiagnosticProvider'

export function AgentStatus() {
  const { agentSystemPrompt } = useDiagnostic()

  const hasPrompt = !!agentSystemPrompt.trim()
  const wordCount = hasPrompt ? agentSystemPrompt.trim().split(/\s+/).length : 0
  const preview = hasPrompt ? agentSystemPrompt.trim().split('\n')[0].slice(0, 72) : ''

  return (
    <div className={cn(
      'flex items-center gap-3 px-5 py-4 rounded-xl border transition-colors',
      hasPrompt
        ? 'bg-success/5 border-success/20'
        : 'bg-warning/5 border-warning/20',
    )}>
      <div className={cn(
        'p-2 rounded-lg border shrink-0',
        hasPrompt ? 'bg-success/10 border-success/20' : 'bg-warning/10 border-warning/20',
      )}>
        <FileCode className={cn('h-4 w-4', hasPrompt ? 'text-success' : 'text-warning')} />
      </div>

      <div className="flex-1 min-w-0">
        {hasPrompt ? (
          <>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-3.5 w-3.5 text-success shrink-0" />
              <p className="text-sm font-semibold text-foreground">Agent prompt configured</p>
              <span className="text-[10px] text-success bg-success/10 border border-success/20 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">
                {wordCount} words
              </span>
            </div>
            {preview && (
              <p className="text-xs text-muted mt-0.5 truncate font-mono">{preview}{agentSystemPrompt.trim().split('\n')[0].length > 72 ? '…' : ''}</p>
            )}
          </>
        ) : (
          <>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-3.5 w-3.5 text-warning shrink-0" />
              <p className="text-sm font-semibold text-foreground">No agent prompt configured</p>
            </div>
            <p className="text-xs text-muted mt-0.5">All scan modules require a system prompt to run.</p>
          </>
        )}
      </div>

      <Link
        href="/settings"
        className="flex items-center gap-1.5 shrink-0 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all duration-150 hover:bg-surface-raised text-muted border-border hover:text-foreground hover:border-accent/30"
      >
        <Settings className="h-3.5 w-3.5" />
        {hasPrompt ? 'Edit' : 'Configure'}
      </Link>
    </div>
  )
}
