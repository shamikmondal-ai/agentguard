export interface InjectionPayload {
  id: string
  label: string
  prompt: string
  category: 'direct' | 'indirect' | 'jailbreak' | 'role-confusion'
}

export interface InjectionTestResult {
  payloadId: string
  payloadLabel: string
  injected: boolean
  responseExcerpt: string
}
