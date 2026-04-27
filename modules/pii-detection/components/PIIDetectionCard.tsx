'use client'

import { useRef, useState } from 'react'
import {
  ShieldAlert, Play, CheckCircle2, XCircle, Loader2,
  AlertTriangle, ChevronDown, ChevronUp, Eye, EyeOff,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useDiagnostic } from '@/providers/DiagnosticProvider'
import { runPIIDetectionTest, type PIICheckResult } from '../logic'
import type { ModuleProps } from '@/registry'

const SEV_CONFIG = {
  critical: { color: 'text-danger',  bg: 'bg-danger/10 border-danger/20',   dot: 'bg-danger' },
  high:     { color: 'text-warning', bg: 'bg-warning/10 border-warning/20', dot: 'bg-warning' },
  medium:   { color: 'text-accent',  bg: 'bg-accent/10 border-accent/20',   dot: 'bg-accent' },
  low:      { color: 'text-muted',   bg: 'bg-surface-raised border-border', dot: 'bg-muted' },
}

const MICRO_COPY = [
  'Parsing privacy control patterns…',
  'Classifying data access flows…',
  'Scanning for PII echo vulnerabilities…',
  'Checking output sanitization rules…',
  'Evaluating data minimization controls…',
  'Mapping to GDPR obligations…',
  'Scoring privacy risk profile…',
]

export function PIIDetectionCard({ config, onComplete }: ModuleProps) {
  const { startScan, completeScan, agentSystemPrompt, appendLog } = useDiagnostic()
  const [running, setRunning] = useState(false)
  const [done, setDone] = useState(false)
  const [score, setScore] = useState<number | null>(null)
  const [checks, setChecks] = useState<PIICheckResult[]>([])
  const [expanded, setExpanded] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)
  const [copyIdx, setCopyIdx] = useState(0)
  const [shaking, setShaking] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const hasPrompt = !!agentSystemPrompt.trim()
  const failedChecks = checks.filter((c) => !c.passed)
  const passedChecks = checks.filter((c) => c.passed)
  const scoreColor =
    score === null ? 'text-muted' : score >= 80 ? 'text-success' : score >= 50 ? 'text-warning' : 'text-danger'

  async function handleRun() {
    if (!hasPrompt) {
      setShaking(true)
      setTimeout(() => setShaking(false), 500)
      return
    }

    setRunning(true)
    setDone(false)
    setChecks([])
    setExpanded(null)
    setProgress(0)
    setCopyIdx(0)
    startScan('pii-detection')

    document.getElementById('scan-console')?.scrollIntoView({ behavior: 'smooth', block: 'start' })

    const progressInterval = setInterval(() => {
      setProgress((p) => Math.min(p + Math.random() * 7, 90))
    }, 300)
    const copyInterval = setInterval(() => {
      setCopyIdx((i) => (i + 1) % MICRO_COPY.length)
    }, 1800)

    const result = await runPIIDetectionTest({ ...config, agentSystemPrompt, onLog: appendLog })

    clearInterval(progressInterval)
    clearInterval(copyInterval)
    setProgress(100)

    completeScan([result])
    setScore(result.score)
    // @ts-expect-error extended field
    setChecks(result.checkResults ?? [])
    setDone(true)
    setRunning(false)
    onComplete(result)
  }

  return (
    <div ref={cardRef} className={cn('card-executive p-6 flex flex-col gap-4', shaking && 'shake')}>
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-danger/10 border border-danger/20">
            <ShieldAlert className="h-5 w-5 text-danger" />
          </div>
          <div>
            <p className="text-xs eyebrow mb-0.5">Safety · Critical</p>
            <h3 className="font-serif text-lg font-bold text-foreground">PII Leakage Detection</h3>
          </div>
        </div>
        {done && score !== null && (
          <div className="text-right fade-slide-in">
            <p className={cn('text-2xl font-bold tabular-nums', scoreColor)}>{score}</p>
            <p className="text-xs text-muted">/ 100</p>
          </div>
        )}
      </div>

      {/* Description */}
      <p className="text-sm text-muted leading-relaxed">
        Audits the system prompt for data privacy gaps — missing sanitization controls, echo vulnerabilities,
        unrestricted data forwarding, and GDPR/CCPA handling failures.
      </p>

      {/* Tags */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="badge-severity-critical">critical</span>
        {['pii', 'gdpr', 'data-privacy', 'output-safety'].map((tag) => (
          <span key={tag} className="text-xs bg-surface-raised border border-border text-muted px-2 py-0.5 rounded">
            {tag}
          </span>
        ))}
      </div>

      {/* No-prompt nudge */}
      {!hasPrompt && !done && (
        <div className="flex items-center gap-2 text-xs text-warning bg-warning/5 border border-warning/20 rounded-lg px-3 py-2">
          <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
          Configure your agent system prompt above to run PII analysis.
        </div>
      )}

      {/* Progress bar + micro-copy */}
      {running && (
        <div className="space-y-1.5">
          <div className="h-1 w-full rounded-full bg-surface-raised overflow-hidden">
            <div
              className="h-full rounded-full bg-danger/70 transition-[width] duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-[10px] text-muted">{MICRO_COPY[copyIdx]}</p>
        </div>
      )}

      {/* Check results */}
      {done && checks.length > 0 && (
        <div className="space-y-1.5">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold text-muted uppercase tracking-wider">Privacy Control Audit</p>
            <div className="flex items-center gap-3 text-xs text-muted">
              <span className="flex items-center gap-1">
                <EyeOff className="h-3 w-3 text-danger" />
                {failedChecks.length} gap{failedChecks.length !== 1 ? 's' : ''}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="h-3 w-3 text-success" />
                {passedChecks.length} pass{passedChecks.length !== 1 ? 'es' : ''}
              </span>
            </div>
          </div>

          {failedChecks.map((check, i) => {
            const cfg = SEV_CONFIG[check.severity]
            const isOpen = expanded === check.id
            return (
              <div
                key={check.id}
                className={cn('fade-slide-in rounded-lg border overflow-hidden transition-all duration-200', cfg.bg)}
                style={{ animationDelay: `${i * 0.07}s` }}
              >
                <button
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-left"
                  onClick={() => setExpanded(isOpen ? null : check.id)}
                >
                  <XCircle className={cn('h-3.5 w-3.5 shrink-0', cfg.color)} />
                  <span className="flex-1 text-xs font-semibold text-foreground min-w-0 truncate">
                    {check.title}
                  </span>
                  <span className={cn('text-[10px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded shrink-0', cfg.color)}>
                    {check.severity}
                  </span>
                  {isOpen
                    ? <ChevronUp className="h-3 w-3 text-muted shrink-0" />
                    : <ChevronDown className="h-3 w-3 text-muted shrink-0" />}
                </button>

                {isOpen && (
                  <div className="px-3 pb-3 space-y-2 border-t border-current/10">
                    <div className="mt-2">
                      <p className="text-[10px] font-semibold text-muted uppercase tracking-wider mb-1">Finding</p>
                      <p className="text-xs text-foreground/80 leading-relaxed">{check.description}</p>
                    </div>
                    <div className="bg-background/60 rounded-lg p-2.5">
                      <p className="text-[10px] font-semibold text-muted uppercase tracking-wider mb-1">Recommended Fix</p>
                      <p className="text-xs text-accent/90 leading-relaxed font-mono">{check.recommendation}</p>
                    </div>
                  </div>
                )}
              </div>
            )
          })}

          {passedChecks.length > 0 && (
            <div className="mt-1 space-y-1">
              {passedChecks.map((check) => (
                <div key={check.id} className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-success/5 border border-success/15">
                  <CheckCircle2 className="h-3.5 w-3.5 text-success shrink-0" />
                  <span className="text-xs text-muted">{check.title}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Summary banner */}
      {done && score !== null && (
        <div
          className={cn(
            'fade-slide-in flex items-center gap-2 text-sm font-medium rounded-lg px-3 py-2 border',
            score >= 70
              ? 'bg-success/10 text-success border-success/20'
              : 'bg-danger/10 text-danger border-danger/20',
          )}
        >
          {score >= 70
            ? <CheckCircle2 className="h-4 w-4 shrink-0" />
            : <XCircle className="h-4 w-4 shrink-0" />}
          {score >= 70
            ? 'PII controls meet baseline requirements'
            : `${failedChecks.length} privacy control gap${failedChecks.length !== 1 ? 's' : ''} require remediation`}
        </div>
      )}

      {/* Run button */}
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
          <><Loader2 className="h-4 w-4 animate-spin" />Scanning…</>
        ) : (
          <><Play className="h-4 w-4" />{done ? 'Re-run Audit' : 'Run PII Audit'}</>
        )}
      </button>
    </div>
  )
}
