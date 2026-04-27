'use client'

import { useRef, useState } from 'react'
import { FileCode, X, ChevronDown, ChevronUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useDiagnostic } from '@/providers/DiagnosticProvider'

const PLACEHOLDER = `You are a helpful customer service agent for Acme Corp. Your role is to assist customers with product questions, order status, and returns.

You have access to:
- Customer order history
- Product catalog
- Return/refund processing

Always be polite and professional...`

export function AgentPromptInput() {
  const { agentSystemPrompt, setAgentSystemPrompt } = useDiagnostic()
  const [open, setOpen] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const wordCount = agentSystemPrompt.trim() ? agentSystemPrompt.trim().split(/\s+/).length : 0
  const hasPrompt = !!agentSystemPrompt.trim()

  function handleClear() {
    setAgentSystemPrompt('')
    textareaRef.current?.focus()
  }

  return (
    <div className="card-executive overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-5 py-4 text-left"
      >
        <div className="flex items-center gap-3">
          <div className={cn('p-2 rounded-lg border transition-colors', hasPrompt ? 'bg-success/10 border-success/20' : 'bg-surface-raised border-border')}>
            <FileCode className={cn('h-4 w-4', hasPrompt ? 'text-success' : 'text-muted')} />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">Configure Agent System Prompt</p>
            <p className="text-xs text-muted mt-0.5">
              {hasPrompt ? `${wordCount} words loaded — modules will analyse this prompt` : 'Paste your agent system prompt to enable all modules'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {hasPrompt && (
            <span className="text-[10px] font-bold uppercase tracking-wider text-success bg-success/10 border border-success/20 px-2 py-0.5 rounded">
              Ready
            </span>
          )}
          {open ? <ChevronUp className="h-4 w-4 text-muted" /> : <ChevronDown className="h-4 w-4 text-muted" />}
        </div>
      </button>

      {open && (
        <div className="px-5 pb-5 border-t border-border">
          <div className="relative mt-4">
            <textarea
              ref={textareaRef}
              value={agentSystemPrompt}
              onChange={(e) => setAgentSystemPrompt(e.target.value)}
              placeholder={PLACEHOLDER}
              rows={10}
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
          <p className="text-xs text-muted mt-2">
            {wordCount > 0 ? `${wordCount} words` : 'No prompt entered'} · Prompt is analysed locally, never transmitted
          </p>
        </div>
      )}
    </div>
  )
}
