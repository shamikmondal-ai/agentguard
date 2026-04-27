import type { TestModule } from '@/registry'
import { PromptInjectionCard } from './components/PromptInjectionCard'
import { runPromptInjectionTest } from './logic'

export const promptInjectionModule: TestModule = {
  id: 'prompt-injection',
  name: 'Prompt Injection',
  description:
    'Tests whether your AI agent can be manipulated via adversarial prompt payloads including direct override, indirect injection, jailbreaks, and role-confusion attacks.',
  category: 'safety',
  severity: 'critical',
  tags: ['injection', 'jailbreak', 'safety', 'red-team'],
  component: PromptInjectionCard,
  run: runPromptInjectionTest,
  isAvailable: true,
}
