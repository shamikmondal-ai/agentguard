'use client'

import { useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import {
  CheckCircle2, Minus, X, ArrowRight,
  Star, Users, Building2, ShieldCheck, Mail, Sparkles,
} from 'lucide-react'
import { cn } from '@/lib/utils'

/* ── Data ─────────────────────────────────────────────────────────────── */

const DELIVERABLES = [
  {
    title: 'Deep-Dive Adversarial Red-Teaming',
    desc: 'Multi-vector attack simulation across your full agent stack',
  },
  {
    title: 'NIST & EU AI Act Compliance Mapping',
    desc: 'Audit-ready evidence package with full control cross-referencing',
  },
  {
    title: 'Agentic Logic Hardening Roadmap',
    desc: 'Prioritised fix backlog with copy-paste remediation code',
  },
  {
    title: 'Liability & Insurance Risk Assessment',
    desc: 'Quantified risk exposure for legal, boardroom, and underwriting',
  },
  {
    title: '1-on-1 Strategic Debrief with Shamik Mondal',
    desc: 'Executive walkthrough of findings and remediation priorities',
  },
]

const COMPARISON: { feature: string; free: string | null; full: string; highlight?: boolean }[] = [
  { feature: 'Testing depth',      free: 'Basic keyword checks',       full: 'Context-aware deep-testing' },
  { feature: 'Analysis',           free: 'Automated heuristics',       full: 'Human expert review' },
  { feature: 'Findings',           free: 'Generic recommendations',    full: 'Bespoke remediation code' },
  { feature: 'Remediation plan',   free: null,                         full: 'Agentic hardening roadmap' },
  { feature: 'Compliance mapping', free: 'Partial NIST only',          full: 'Full NIST + EU AI Act' },
  { feature: 'Price',              free: 'Free',                       full: '$3,000',                  highlight: true },
]

/* ── Form types ───────────────────────────────────────────────────────── */

interface FormState {
  agentCount: string
  industry: string
  concern: string
  email: string
}

const EMPTY_FORM: FormState = { agentCount: '', industry: '', concern: '', email: '' }

/* ── Booking Modal ────────────────────────────────────────────────────── */

function BookingModal({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const [form, setForm] = useState<FormState>(EMPTY_FORM)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Partial<FormState>>({})

  function validate(): boolean {
    const e: Partial<FormState> = {}
    if (!form.agentCount) e.agentCount = 'Required'
    if (!form.industry)   e.industry   = 'Required'
    if (!form.concern)    e.concern    = 'Required'
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid work email required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (validate()) setSubmitted(true)
  }

  function handleClose(v: boolean) {
    onOpenChange(v)
    if (!v) {
      setTimeout(() => {
        setSubmitted(false)
        setForm(EMPTY_FORM)
        setErrors({})
      }, 300)
    }
  }

  const set = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [k]: e.target.value }))
    setErrors((er) => ({ ...er, [k]: undefined }))
  }

  return (
    <Dialog.Root open={open} onOpenChange={handleClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-background/75 backdrop-blur-md" />
        <Dialog.Content
          className="fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg max-h-[90vh] overflow-y-auto fade-slide-in"
          aria-describedby="booking-desc"
        >
          <div className="bg-surface border border-border rounded-2xl shadow-card-hover p-8">

            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="h-1.5 w-6 rounded-full bg-warning/80" />
                  <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-warning/80">
                    Booking Intake
                  </span>
                </div>
                <Dialog.Title className="font-serif text-2xl font-bold text-foreground leading-tight">
                  Secure Your Audit Slot
                </Dialog.Title>
                <p id="booking-desc" className="text-sm text-muted mt-1.5 leading-relaxed">
                  We review every submission personally. Expect a response within 24 hours.
                </p>
              </div>
              <Dialog.Close className="p-1.5 rounded-lg text-muted hover:text-foreground hover:bg-surface-raised transition-colors shrink-0 ml-4">
                <X className="h-4 w-4" />
              </Dialog.Close>
            </div>

            {submitted ? (
              /* ── Success state ── */
              <div className="py-8 text-center space-y-4">
                <div className="mx-auto w-14 h-14 rounded-full bg-success/10 border border-success/20 flex items-center justify-center">
                  <CheckCircle2 className="h-7 w-7 text-success" />
                </div>
                <h3 className="font-serif text-xl font-bold text-foreground">Request received</h3>
                <p className="text-sm text-muted leading-relaxed max-w-xs mx-auto">
                  Your intake has been submitted. Shamik will review it and reach out to {form.email} within one business day.
                </p>
                <button
                  onClick={() => handleClose(false)}
                  className="mt-2 text-xs text-muted hover:text-foreground transition-colors"
                >
                  Close
                </button>
              </div>
            ) : (
              /* ── Form ── */
              <form onSubmit={handleSubmit} noValidate className="space-y-5">

                {/* Number of Active Agents */}
                <Field
                  label="Number of Active Agents"
                  icon={<Users className="h-4 w-4" />}
                  error={errors.agentCount}
                >
                  <select
                    value={form.agentCount}
                    onChange={set('agentCount')}
                    className={inputCls(!!errors.agentCount)}
                  >
                    <option value="">Select range…</option>
                    <option>1</option>
                    <option>2–5</option>
                    <option>6–20</option>
                    <option>21+</option>
                  </select>
                </Field>

                {/* Industry */}
                <Field
                  label="Industry / Compliance Requirements"
                  icon={<Building2 className="h-4 w-4" />}
                  error={errors.industry}
                >
                  <select
                    value={form.industry}
                    onChange={set('industry')}
                    className={inputCls(!!errors.industry)}
                  >
                    <option value="">Select industry…</option>
                    <option>Financial Services (FCA / SEC)</option>
                    <option>Healthcare (HIPAA / NHS)</option>
                    <option>Legal / Government</option>
                    <option>Retail / E-commerce</option>
                    <option>Insurance</option>
                    <option>Other</option>
                  </select>
                </Field>

                {/* Primary Security Concern */}
                <Field
                  label="Primary Security Concern"
                  icon={<ShieldCheck className="h-4 w-4" />}
                  error={errors.concern}
                >
                  <select
                    value={form.concern}
                    onChange={set('concern')}
                    className={inputCls(!!errors.concern)}
                  >
                    <option value="">Select concern…</option>
                    <option>Prompt injection / jailbreak</option>
                    <option>PII leakage / data privacy</option>
                    <option>Agency boundary violations</option>
                    <option>Regulatory compliance (NIST / EU AI Act)</option>
                    <option>Liability / insurance readiness</option>
                    <option>Other</option>
                  </select>
                </Field>

                {/* Email */}
                <Field
                  label="Professional Email"
                  icon={<Mail className="h-4 w-4" />}
                  error={errors.email}
                >
                  <input
                    type="email"
                    value={form.email}
                    onChange={set('email')}
                    placeholder="you@company.com"
                    className={inputCls(!!errors.email)}
                  />
                </Field>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-warning text-background font-bold text-sm hover:bg-warning/90 transition-all duration-200 mt-2 shadow-glow"
                  style={{ boxShadow: '0 0 20px rgb(255 214 0 / 0.25)' }}
                >
                  Submit Booking Request
                  <ArrowRight className="h-4 w-4" />
                </button>

                <p className="text-center text-[11px] text-muted">
                  No commitment required. Slots are limited — we work with 4 clients per quarter.
                </p>
              </form>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

/* ── Small helpers ─────────────────────────────────────────────────────── */

function inputCls(hasError: boolean) {
  return cn(
    'w-full bg-background border rounded-lg px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 transition-colors',
    hasError
      ? 'border-danger/50 focus:border-danger focus:ring-danger/20'
      : 'border-border focus:border-accent/50 focus:ring-accent/20',
  )
}

function Field({
  label,
  icon,
  error,
  children,
}: {
  label: string
  icon: React.ReactNode
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-1.5">
      <label className="flex items-center gap-1.5 text-xs font-semibold text-muted">
        <span className="text-muted/60">{icon}</span>
        {label}
      </label>
      {children}
      {error && <p className="text-[11px] text-danger">{error}</p>}
    </div>
  )
}

/* ── Main exported section ─────────────────────────────────────────────── */

export function PremiumAuditSection() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <BookingModal open={modalOpen} onOpenChange={setModalOpen} />

      <section className="relative border-t border-border overflow-hidden">
        {/* Subtle warm glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[200px] bg-warning/5 blur-[100px] rounded-full pointer-events-none" />
        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-warning/40 to-transparent" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">

          {/* Section header */}
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-warning/20 bg-warning/5 mb-5">
              <Star className="h-3 w-3 text-warning fill-warning" />
              <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-warning/80">
                Bespoke Service
              </span>
            </div>
            <h2 className="font-serif text-display font-black text-foreground mb-4 tracking-tight">
              Premium{' '}
              <span
                className="italic"
                style={{
                  background: 'linear-gradient(135deg, #FFD600 0%, #FFA000 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Governance Audit
              </span>
            </h2>
            <p className="mx-auto max-w-xl text-muted text-base leading-relaxed">
              For teams where AI failure is not an option. A bespoke, human-led deep-dive that goes
              far beyond automated tooling.
            </p>
          </div>

          {/* Two-column content */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-10">

            {/* ── Left: Scope card (3/5) ── */}
            <div className="lg:col-span-3 bg-surface border border-warning/15 rounded-2xl p-7 shadow-card relative overflow-hidden">
              {/* Corner sparkle */}
              <div className="absolute top-4 right-4 opacity-20">
                <Sparkles className="h-16 w-16 text-warning" />
              </div>

              <div className="mb-6">
                <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-warning/70 mb-2">
                  Service Detail
                </p>
                <h3 className="font-serif text-2xl font-bold text-foreground leading-tight">
                  Enterprise CX Governance Audit
                </h3>
              </div>

              <ul className="space-y-4">
                {DELIVERABLES.map(({ title, desc }) => (
                  <li key={title} className="flex gap-3">
                    <CheckCircle2 className="h-5 w-5 text-warning shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-foreground">{title}</p>
                      <p className="text-xs text-muted mt-0.5 leading-relaxed">{desc}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-7 pt-5 border-t border-border flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-warning/10 border border-warning/20 flex items-center justify-center shrink-0">
                  <span className="text-xs font-bold text-warning">SM</span>
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground">Shamik Mondal</p>
                  <p className="text-[11px] text-muted">AI Governance Lead · Former Bain & Company</p>
                </div>
              </div>
            </div>

            {/* ── Right: Comparison table (2/5) ── */}
            <div className="lg:col-span-2 bg-surface border border-border rounded-2xl overflow-hidden shadow-card flex flex-col">
              {/* Table header */}
              <div className="grid grid-cols-3 text-center border-b border-border">
                <div className="py-3 px-2 text-left pl-4">
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-muted">Feature</span>
                </div>
                <div className="py-3 px-2 border-l border-border">
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-muted">Free Scan</span>
                </div>
                <div className="py-3 px-2 border-l border-warning/20 bg-warning/5">
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-warning/80">Full Audit</span>
                </div>
              </div>

              {/* Table rows */}
              <div className="flex-1 divide-y divide-border">
                {COMPARISON.map(({ feature, free, full, highlight }) => (
                  <div
                    key={feature}
                    className={cn('grid grid-cols-3 text-xs', highlight && 'bg-warning/5')}
                  >
                    <div className="py-3 px-4 text-muted font-medium flex items-center">{feature}</div>
                    <div className="py-3 px-3 border-l border-border flex items-center justify-center text-center">
                      {free === null ? (
                        <Minus className="h-3.5 w-3.5 text-border" />
                      ) : (
                        <span className="text-muted leading-snug">{free}</span>
                      )}
                    </div>
                    <div className={cn(
                      'py-3 px-3 border-l border-warning/20 flex items-center justify-center text-center',
                      highlight ? 'bg-warning/10' : 'bg-warning/5',
                    )}>
                      <span className={cn(
                        'leading-snug font-semibold',
                        highlight ? 'text-warning text-base font-bold' : 'text-foreground',
                      )}>
                        {full}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── CTA ── */}
          <div className="text-center space-y-3">
            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl font-bold text-sm text-background transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background: 'linear-gradient(135deg, #FFD600 0%, #FFA000 100%)',
                boxShadow: '0 0 24px rgb(255 214 0 / 0.3), 0 4px 16px rgb(0 0 0 / 0.3)',
              }}
            >
              <ShieldCheck className="h-4 w-4" />
              Secure Your Audit Slot
              <ArrowRight className="h-4 w-4" />
            </button>
            <p className="text-xs text-muted">
              4 client slots per quarter · Priority given to regulated industries
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
