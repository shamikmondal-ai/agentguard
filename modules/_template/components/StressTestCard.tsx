'use client'

import { Lock, Zap } from 'lucide-react'
import type { ModuleProps } from '@/registry'

// This is the "Coming Soon" stress-test placeholder shown on the landing page.
// Replace with a real implementation when the module is ready.

export function TemplateCard({ config, onComplete }: ModuleProps) {
  return (
    <div className="card-executive p-6 flex flex-col gap-4 relative overflow-hidden">
      {/* Coming-soon overlay */}
      <div className="absolute inset-0 bg-surface/80 backdrop-blur-[2px] flex flex-col items-center justify-center z-10 rounded-xl">
        <div className="flex flex-col items-center gap-3 text-center px-6">
          <div className="p-3 rounded-full bg-surface-raised border border-border">
            <Lock className="h-6 w-6 text-muted" />
          </div>
          <p className="text-sm font-semibold text-foreground">Coming Soon</p>
          <p className="text-xs text-muted max-w-[180px]">
            This stress test module is under active development.
          </p>
        </div>
      </div>

      {/* Ghost content behind overlay */}
      <div className="flex items-center gap-3 opacity-30 pointer-events-none select-none">
        <div className="p-2 rounded-lg bg-accent/10 border border-accent/20">
          <Zap className="h-5 w-5 text-accent" />
        </div>
        <div>
          <p className="text-xs eyebrow mb-0.5">Stress Test</p>
          <h3 className="font-serif text-lg font-bold text-foreground">Advanced Stress Test</h3>
        </div>
      </div>
      <p className="text-sm text-muted opacity-30 pointer-events-none select-none">
        Runs high-volume concurrent adversarial inputs to evaluate agent stability under load.
      </p>
      <div className="h-10 rounded-lg bg-surface-raised opacity-30 pointer-events-none select-none" />
    </div>
  )
}
