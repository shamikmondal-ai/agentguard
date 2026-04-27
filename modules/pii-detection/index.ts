import type { TestModule } from '@/registry'
import { PIIDetectionCard } from './components/PIIDetectionCard'
import { runPIIDetectionTest } from './logic'

export const piiDetectionModule: TestModule = {
  id: 'pii-detection',
  name: 'PII Leakage Detection',
  description:
    'Audits agent system prompts for data privacy gaps including missing sanitization controls, PII echo vulnerabilities, unrestricted data forwarding, and GDPR/CCPA compliance failures.',
  category: 'safety',
  severity: 'critical',
  tags: ['pii', 'gdpr', 'data-privacy', 'output-safety'],
  component: PIIDetectionCard,
  run: runPIIDetectionTest,
  isAvailable: true,
}
