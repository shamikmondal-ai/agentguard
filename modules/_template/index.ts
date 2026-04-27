// ── TEMPLATE: Copy this folder and rename to build a new test module ──
//
// Steps:
//   1. Copy _template/ → modules/your-module-name/
//   2. Update the fields below (id, name, description, etc.)
//   3. Implement logic.ts (your actual test runner)
//   4. Implement components/YourModuleCard.tsx
//   5. Import and add your module to registry/index.ts

import type { TestModule } from '@/registry'
import { TemplateCard } from './components/StressTestCard'
import { runTemplateTest } from './logic'

export const templateModule: TestModule = {
  id: 'template',              // ← unique kebab-case ID
  name: 'Template Module',     // ← display name
  description: 'A placeholder template for new test modules.',
  category: 'safety',          // ← safety | compliance | performance | reliability
  severity: 'medium',          // ← critical | high | medium | low
  tags: ['template'],
  component: TemplateCard,
  run: runTemplateTest,
  isAvailable: false,          // ← set to true when ready
}
