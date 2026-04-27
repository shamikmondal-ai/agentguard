export interface AgencyScenario {
  id: string
  label: string
  instruction: string
  expectedBehavior: 'refuse' | 'comply' | 'escalate'
}

export interface AgencyTestResult {
  scenarioId: string
  scenarioLabel: string
  behaviorObserved: 'refuse' | 'comply' | 'escalate' | 'unknown'
  passed: boolean
  responseExcerpt: string
}
