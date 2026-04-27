import { ArrowRight, Shield, Activity, CheckCircle2, Lock } from 'lucide-react'
import Link from 'next/link'
import { registry } from '@/registry'
import { ScanConsole } from '@/components/shared/ScanConsole'
import { AgentPromptInput } from '@/components/shared/AgentPromptInput'
import { TemplateCard } from '@/modules/_template/components/StressTestCard'

export default function HomePage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute inset-0 bg-hero-glow" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 pb-20 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-surface/60 backdrop-blur-sm mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-success" />
            </span>
            <span className="eyebrow text-[10px]">Enterprise AI CX Governance</span>
          </div>

          <h1 className="font-serif text-hero font-black text-foreground mb-6 tracking-tight">
            Agent<span className="text-gradient-accent">Guard</span>
          </h1>

          <p className="mx-auto max-w-2xl text-lg sm:text-xl text-muted leading-relaxed mb-10">
            The enterprise-grade AI governance platform that finds prompt injection vulnerabilities, agency boundary
            violations, and compliance gaps in your AI agents{' '}
            <span className="text-foreground font-medium">before they reach production.</span>
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16">
            <a
              href="#configure"
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-white font-semibold hover:bg-accent/80 transition-all duration-200 shadow-glow text-sm w-full sm:w-auto"
            >
              <Shield className="h-4 w-4" />
              Run First Scan
              <ArrowRight className="h-4 w-4" />
            </a>
            <Link href="/report?demo=true" className="flex items-center gap-2 px-6 py-3 rounded-xl bg-surface border border-border text-foreground font-semibold hover:bg-surface-raised hover:border-accent/30 transition-all duration-200 text-sm w-full sm:w-auto">
              View Sample Report
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 text-center">
            {[
              { value: '99.2%', label: 'Detection Rate' },
              { value: '<2s', label: 'Avg. Scan Time' },
              { value: '12+', label: 'Test Modules' },
              { value: 'SOC 2', label: 'Compliant' },
            ].map(({ value, label }) => (
              <div key={label} className="flex flex-col items-center">
                <p className="text-2xl font-bold font-serif text-foreground">{value}</p>
                <p className="text-xs text-muted mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Configure Agent Prompt ───────────────────────────────────────── */}
      <section id="configure" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-6 pt-4">
        <AgentPromptInput />
      </section>

      {/* ── Module Grid ──────────────────────────────────────────────────── */}
      <section id="modules" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="eyebrow mb-2">Diagnostic Modules</p>
            <h2 className="font-serif text-display font-bold text-foreground">Stress Test Suite</h2>
          </div>
          <span className="hidden sm:flex items-center gap-1.5 text-xs text-muted border border-border px-3 py-1.5 rounded-full bg-surface">
            <Activity className="h-3 w-3 text-success" />
            {registry.filter((m) => m.isAvailable).length} modules active
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {registry
            .filter((m) => m.isAvailable)
            .map((mod) => {
              const ModuleComponent = mod.component
              return (
                <ModuleComponent
                  key={mod.id}
                  config={{}}
                  onComplete={() => {}}
                />
              )
            })}
          <TemplateCard config={{}} onComplete={() => {}} />
        </div>
      </section>

      {/* ── Scan Console ─────────────────────────────────────────────────── */}
      <ScanConsole />

      {/* ── Feature callouts ─────────────────────────────────────────────── */}
      <section className="border-t border-border bg-surface/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                iconColor: 'text-accent',
                iconBg: 'bg-accent/10 border-accent/20',
                title: 'Red-Team Grade Testing',
                body: 'Built on real-world adversarial attack libraries. Not toy prompts — production-quality threat simulation.',
              },
              {
                icon: CheckCircle2,
                iconColor: 'text-success',
                iconBg: 'bg-success/10 border-success/20',
                title: 'Compliance Ready',
                body: 'Automated evidence collection mapped to EU AI Act, NIST AI RMF, and enterprise AI governance frameworks.',
              },
              {
                icon: Lock,
                iconColor: 'text-warning',
                iconBg: 'bg-warning/10 border-warning/20',
                title: 'Zero-Data Leakage',
                body: 'All tests run within your VPC boundary. No agent conversations leave your environment.',
              },
            ].map(({ icon: Icon, iconColor, iconBg, title, body }) => (
              <div key={title} className="flex flex-col gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${iconBg}`}>
                  <Icon className={`h-5 w-5 ${iconColor}`} />
                </div>
                <h3 className="font-serif text-xl font-bold text-foreground">{title}</h3>
                <p className="text-sm text-muted leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
