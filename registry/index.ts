import type { ComponentType } from 'react'
import type { ModuleResult } from '@/providers/DiagnosticProvider'

export type { ModuleResult } from '@/providers/DiagnosticProvider'
import { promptInjectionModule } from '@/modules/prompt-injection'
import { agencyCheckModule } from '@/modules/agency-check'
import { piiDetectionModule } from '@/modules/pii-detection'

export interface ModuleConfig {
  targetUrl?: string
  agentSystemPrompt?: string
  customPayloads?: string[]
  iterations?: number
  onLog?: (message: string, type?: 'info' | 'warn' | 'success' | 'error' | 'system') => void
}

export interface ModuleProps {
  config: ModuleConfig
  onComplete: (result: ModuleResult) => void
}

export interface TestModule {
  id: string
  name: string
  description: string
  category: 'safety' | 'compliance' | 'performance' | 'reliability'
  severity: 'critical' | 'high' | 'medium' | 'low'
  tags: string[]
  component: ComponentType<ModuleProps>
  run: (config: ModuleConfig) => Promise<ModuleResult>
  isAvailable: boolean
}

// ---------------------------------------------------------------------------
// Registry — drop new module objects into this array to register them.
// ---------------------------------------------------------------------------
export const registry: TestModule[] = [
  promptInjectionModule,
  agencyCheckModule,
  piiDetectionModule,
]
// ---------------------------------------------------------------------------

export const getModule = (id: string): TestModule | undefined =>
  registry.find((m) => m.id === id)

export const getModulesByCategory = (category: TestModule['category']): TestModule[] =>
  registry.filter((m) => m.category === category)

export const getModulesBySeverity = (severity: TestModule['severity']): TestModule[] =>
  registry.filter((m) => m.severity === severity)
