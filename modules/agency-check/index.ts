import type { TestModule } from '@/registry'
import { AgencyCheckCard } from './components/AgencyCheckCard'
import { runAgencyCheckTest } from './logic'

export const agencyCheckModule: TestModule = {
  id: 'agency-check',
  name: 'Agency Check',
  description:
    'Evaluates agent authority boundaries across 4 high-stakes scenarios: unauthorized actions, scope creep, autonomous multi-step chains, and privilege escalation.',
  category: 'compliance',
  severity: 'high',
  tags: ['agency', 'authorization', 'scope', 'compliance'],
  component: AgencyCheckCard,
  run: runAgencyCheckTest,
  isAvailable: true,
}
