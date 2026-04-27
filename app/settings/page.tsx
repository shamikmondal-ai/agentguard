'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { Settings, FileCode, X, Layers, Info, CheckCircle2, AlertTriangle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useDiagnostic } from '@/providers/DiagnosticProvider'
import { registry } from '@/registry'

const PLACEHOLDER = `You are a helpful customer service agent for Acme Corp. Your role is to assist customers with product questions, order status, and returns.

You have access to:
- Customer order history
- Product catalog
- Return/refund processing

Always be polite and professional...`

const SEV_COLORS: Record<string, string> = {
  critical: 'text-danger bg-danger/10 border-danger/20',
  high:     'text-warning bg-warning/10 border-warning/20',
  medium:   'text-accent bg-accent/10 border-accent/20',
  low:      'text-muted bg-surface-raised border-border',
}

export default function SettingsPage() {
  const { agentSystemPrompt, setAgentSystemPrompt } = useDiagnostic()
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [saved, setSaved] = useState(false)

  const wordCount = agentSystemPrompt.trim() ? agentSystemPrompt.trim().split(/\s+/).length : 0
  const hasPrompt = !!agentSystemPrompt.trim()

  function handleSave() {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  function handleClear() {
    setAgentSystemPrompt('')
    textareaRef.current?.focus()
  }

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12 space-y-10">

      {/* Page header */}
      <div>
        <div className="inline-flex p-3 rounded-xl bg-surface-raised border border-border mb-6">
          <Settings className="h-6 w-6 text-muted" />
        </div>
        <p className="eyebrow mb-3">Configuration</p>
        <h1 className="font-serif text-4xl font-bold text-foreground mb-3">Settings</h1>
        <p className="text-muted text-sm leading-relaxed max-w-xl">
          Configure your agent under test and manage scan preferences. All configuration is stored in your browser session.
        </p>
      </div>

      {/* Agent system prompt */}
      <div className="card-executive p-6 space-y-4">
        <div className="flex items-center gap-3 mb-1">
          <div className={cn('p-2 rounded-lg border transition-colors', hasPrompt ? 'bg-success/10 border-success/20' : 'bg-surface-raised border-border')}>
            <FileCode className={cn('h-4 w-4', hasPrompt ? 'text-success' : 'text-muted')} />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-foreground">Agent System Prompt</h2>
            <p className="text-xs text-muted mt-0.5">
              {hasPrompt
                ? `${wordCount} words — modules will analyse this prompt`
                : 'Paste your agent system prompt to enable all scan modules'}
            </p>
          </div>
          {hasPrompt && (
            <span className="ml-auto text-[10px] font-bold uppercase tracking-wider text-success bg-success/10 border border-success/20 px-2 py-0.5 rounded">
              Ready
            </span>
          )}
        </div>

        <div className="relative">
          <textarea
            ref={textareaRef}
            value={agentSystemPrompt}
            onChange={(e) => setAgentSystemPrompt(e.target.value)}
            placeholder={PLACEHOLDER}
            rows={12}
            className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted/40 font-mono leading-relaxed resize-y focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-colors"
          />
          {hasPrompt && (
            <button
              onClick={handleClear}
              className="absolute top-2 right-2 p-1 rounded text-muted hover:text-foreground hover:bg-surface-raised transition-colors"
              title="Clear prompt"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        <div className="flex items-center justify-between">
          <p className="text-xs text-muted">
            {wordCount > 0 ? `${wordCount} words` : 'No prompt entered'} · Analysed locally, never transmitted
          </p>
          <div className="flex items-center gap-2">
            {hasPrompt && (
              <button
                onClick={handleClear}
                className="text-xs text-muted hover:text-foreground border border-border px-3 py-1.5 rounded-lg transition-colors"
              >
                Clear
              </button>
            )}
            <button
              onClick={handleSave}
              className="flex items-center gap-1.5 text-xs bg-accent hover:bg-accent/80 text-white px-3 py-1.5 rounded-lg transition-colors font-semibold"
            >
              {saved ? (
                <><CheckCircle2 className="h-3.5 w-3.5" />Saved</>
              ) : (
                'Save'
              )}
            </button>
          </div>
        </div>

        {!hasPrompt && (
          <div className="flex items-center gap-2 text-xs text-warning bg-warning/5 border border-warning/20 rounded-lg px-3 py-2">
            <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
            All scan modules require a system prompt to run. Paste your agent configuration above.
          </div>
        )}
      </div>

      {/* Active modules */}
      <div className="card-executive p-6 space-y-4">
        <div className="flex items-center gap-3 mb-1">
          <div className="p-2 rounded-lg bg-surface-raised border border-border">
            <Layers className="h-4 w-4 text-muted" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-foreground">Active Scan Modules</h2>
            <p className="text-xs text-muted mt-0.5">{registry.filter((m) => m.isAvailable).length} modules registered and active</p>
          </div>
        </div>

        <div className="space-y-2">
          {registry.map((mod) => (
            <div key={mod.id} className="flex items-center gap-3 p-3 rounded-lg bg-surface-raised border border-border">
              <div className={cn('w-1.5 h-1.5 rounded-full shrink-0', mod.isAvailable ? 'bg-success' : 'bg-muted')} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground">{mod.name}</p>
                <p className="text-xs text-muted mt-0.5 truncate">{mod.description}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className={cn('text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border', SEV_COLORS[mod.severity])}>
                  {mod.severity}
                </span>
                {mod.isAvailable
                  ? <span className="text-[10px] text-success font-medium">Active</span>
                  : <span className="text-[10px] text-muted">Coming soon</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* About */}
      <div className="card-executive p-6 space-y-3">
        <div className="flex items-center gap-3 mb-1">
          <div className="p-2 rounded-lg bg-surface-raised border border-border">
            <Info className="h-4 w-4 text-muted" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-foreground">About AgentGuard</h2>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 text-xs">
          {[
            { label: 'Version', value: '0.1.0-beta' },
            { label: 'Platform', value: 'Next.js 14' },
            { label: 'Analysis', value: 'Client-side only' },
            { label: 'Data retention', value: 'Session only' },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-center justify-between p-2.5 rounded-lg bg-surface-raised border border-border">
              <span className="text-muted">{label}</span>
              <span className="font-medium text-foreground">{value}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-4 pt-2 border-t border-border">
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
