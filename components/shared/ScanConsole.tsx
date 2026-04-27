'use client'

import { useEffect, useRef } from 'react'
import { CheckCircle2, XCircle, AlertTriangle, Terminal } from 'lucide-react'
import { useDiagnostic, type LogEntry } from '@/providers/DiagnosticProvider'
import { cn } from '@/lib/utils'
import { ScanResultSkeleton } from './Skeleton'
import { CriticalFindings } from './CriticalFindings'

const LOG_COLOR: Record<string, string> = {
  system:  'text-accent/80',
  info:    'text-muted',
  success: 'text-success',
  warn:    'text-warning',
  error:   'text-danger',
}

function LogLine({ entry }: { entry: LogEntry }) {
  return (
    <div className={cn('font-mono text-[11px] leading-5 whitespace-pre-wrap', LOG_COLOR[entry.type] ?? 'text-muted')}>
      {entry.msg}
    </div>
  )
}

export function ScanConsole() {
  const { phase, results, logs, generateReport } = useDiagnostic()
  const logEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }, [logs.length])

  if (phase === 'idle') return null

  const totalFindings = results.reduce((acc, r) => acc + r.findings.length, 0)
  const allFindings = results.flatMap((r) => r.findings)

  return (
    <section id="scan-console" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="card-executive p-6">
        <div className="flex items-center gap-2 mb-5">
          <Terminal className="h-4 w-4 text-muted" />
          <h2 className="font-serif text-lg font-bold text-foreground">Scan Console</h2>
          {phase === 'scanning' && (
            <div className="ml-auto flex items-center gap-2">
              <div className="h-3 w-3 rounded-full border-2 border-warning border-t-transparent animate-spin" />
              <span className="text-xs text-warning font-medium">Running…</span>
            </div>
          )}
        </div>

        {/* Log stream */}
        {logs.length > 0 && (
          <div className="mb-5 bg-background rounded-lg border border-border p-4 max-h-52 overflow-y-auto scrollbar-hidden">
            {logs.map((entry) => (
              <LogLine key={entry.id} entry={entry} />
            ))}
            <div ref={logEndRef} />
          </div>
        )}

        {/* Skeleton while scanning */}
        {phase === 'scanning' && <ScanResultSkeleton />}

        {/* Results */}
        {(phase === 'results' || phase === 'report_generation') && results.length > 0 && (
          <>
            <div className="space-y-3 mb-5">
              {results.map((result, i) => (
                <div
                  key={result.moduleId}
                  className="fade-slide-in flex items-start gap-3 p-3 rounded-lg bg-surface-raised border border-border"
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  {result.passed ? (
                    <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="h-5 w-5 text-danger shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-semibold text-foreground">{result.moduleName}</p>
                      <span
                        className={cn(
                          'text-xl font-bold tabular-nums',
                          result.score >= 80 ? 'text-success' : result.score >= 50 ? 'text-warning' : 'text-danger',
                        )}
                      >
                        {result.score}
                        <span className="text-xs text-muted font-normal">/100</span>
                      </span>
                    </div>
                    {result.findings.length > 0 && (
                      <p className="text-xs text-muted mt-1">
                        {result.findings.length} finding{result.findings.length !== 1 ? 's' : ''} detected
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {totalFindings > 0 && (
              <>
                <div className="flex items-center gap-2 p-3 rounded-lg bg-danger/5 border border-danger/20 mb-5">
                  <AlertTriangle className="h-4 w-4 text-danger shrink-0" />
                  <p className="text-sm text-danger font-medium">
                    {totalFindings} vulnerabilit{totalFindings !== 1 ? 'ies' : 'y'} detected across{' '}
                    {results.filter((r) => !r.passed).length} module{results.filter((r) => !r.passed).length !== 1 ? 's' : ''}
                  </p>
                </div>
                <CriticalFindings findings={allFindings} />
              </>
            )}

            <button
              onClick={generateReport}
              disabled={phase === 'report_generation'}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent text-white text-sm font-semibold hover:bg-accent/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-glow"
            >
              {phase === 'report_generation' ? (
                <>
                  <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  Generating…
                </>
              ) : (
                'Generate Full Report'
              )}
            </button>
          </>
        )}
      </div>
    </section>
  )
}
