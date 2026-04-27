'use client'

import { useRef, useState } from 'react'
import { ShieldAlert, Play, CheckCircle2, XCircle, Loader2, AlertTriangle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useDiagnostic } from '@/providers/DiagnosticProvider'
import { runPromptInjectionTest } from '../logic'
import type { ModuleProps } from '@/registry'

const MICRO_COPY = [
  'Parsing adversarial payloads…',
  'Firing direct injection probes…',
  'Testing role-confusion vectors…',
  'Evaluating jailbreak resistance…',
  'Scanning indirect injection paths…',
  'Scoring resistance profile…',
]

export function PromptInjectionCard({ config, onComplete }: ModuleProps) {
  const { startScan, completeScan, agentSystemPrompt, appendLog } = useDiagnostic()
  const [running, setRunning] = useState(false)
  const [done, setDone] = useState(false)
  const [score, setScore] = useState<number | null>(null)
  const [progress, setProgress] = useState(0)
  const [copyIdx, setCopyIdx] = useState(0)
  const [shaking, setShaking] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const hasPrompt = !!agentSystemPrompt.trim()

  async function handleRun() {
    if (!hasPrompt) {
      setShaking(true)
      setTimeout(() => setShaking(false), 500)
      return
    }

    setRunning(true)
    setDone(false)
    setProgress(0)
    setCopyIdx(0)
    startScan('prompt-injection')

    document.getElementById('scan-console')?.scrollIntoView({ behavior: 'smooth', block: 'start' })

    const progressInterval = setInterval(() => {
      setProgress((p) => Math.min(p + Math.random() * 15, 90))
    }, 200)
    const copyInterval = setInterval(() => {
      setCopyIdx((i) => (i + 1) % MICRO_COPY.length)
    }, 1500)

    const result = await runPromptInjectionTest({ ...config, agentSystemPrompt, onLog: appendLog })

    clearInterval(progressInterval)
    clearInterval(copyInterval)
    setProgress(100)

    completeScan([result])
    setScore(result.score)
    setDone(true)
    setRunning(false)
    onComplete(result)
  }

  const scoreColor =
    score === null ? 'text-muted' : score >= 80 ? 'text-success' : score >= 50 ? 'text-warning' : 'text-danger'

  return (
    <div ref={cardRef} className={cn('card-executive p-6 flex flex-col gap-4', shaking && 'shake')}>
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-danger/10 border border-danger/20">
            <ShieldAlert className="h-5 w-5 text-danger" />
          </div>
          <div>
            <p className="text-xs eyebrow mb-0.5">Safety · Critical</p>
            <h3 className="font-serif text-lg font-bold text-foreground">Prompt Injection</h3>
          </div>
        </div>
        {done && score !== null && (
          <div className="text-right fade-slide-in">
            <p className={cn('text-2xl font-bold tabular-nums', scoreColor)}>{score}</p>
            <p className="text-xs text-muted">/ 100</p>
          </div>
        )}
      </div>

      <p className="text-sm text-muted leading-relaxed">
        Fires 4 adversarial payloads (direct, indirect, jailbreak, role-confusion) against your agent and measures
        resistance.
      </p>

      <div className="flex items-center gap-2 flex-wrap">
        <span className="badge-severity-critical">critical</span>
        {['direct', 'jailbreak', 'indirect'].map((tag) => (
          <span key={tag} className="text-xs bg-surface-raised border border-border text-muted px-2 py-0.5 rounded">
            {tag}
          </span>
        ))}
      </div>

      {!hasPrompt && !done && (
        <div className="flex items-center gap-2 text-xs text-warning bg-warning/5 border border-warning/20 rounded-lg px-3 py-2">
          <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
          Configure your agent system prompt above to run this test.
        </div>
      )}

      {/* Progress bar + micro-copy */}
      {running && (
        <div className="space-y-1.5">
          <div className="h-1 w-full rounded-full bg-surface-raised overflow-hidden">
            <div
              className="h-full rounded-full bg-accent transition-[width] duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-[10px] text-muted">{MICRO_COPY[copyIdx]}</p>
        </div>
      )}

      {done && (
        <div
          className={cn(
            'fade-slide-in flex items-center gap-2 text-sm font-medium rounded-lg px-3 py-2',
            score !== null && score >= 75
              ? 'bg-success/10 text-success border border-success/20'
              : 'bg-danger/10 text-danger border border-danger/20',
          )}
        >
          {score !== null && score >= 75 ? (
            <CheckCircle2 className="h-4 w-4 shrink-0" />
          ) : (
            <XCircle className="h-4 w-4 shrink-0" />
          )}
          {score !== null && score >= 75
            ? 'Agent passed injection resistance test'
            : 'Agent failed — vulnerabilities detected'}
        </div>
      )}

      <button
        onClick={handleRun}
        disabled={running}
        className={cn(
          'mt-auto flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-sm font-semibold transition-all duration-200',
          running
            ? 'bg-surface-raised text-muted cursor-not-allowed'
            : hasPrompt
              ? 'bg-accent hover:bg-accent/80 text-white shadow-glow'
              : 'bg-surface-raised text-muted border border-border cursor-pointer hover:border-warning/40',
        )}
      >
        {running ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Running…
          </>
        ) : (
          <>
            <Play className="h-4 w-4" />
            {done ? 'Re-run Test' : 'Run Test'}
          </>
        )}
      </button>
    </div>
  )
}
