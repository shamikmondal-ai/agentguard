'use client'

import { createContext, useContext, useReducer, useCallback, ReactNode } from 'react'

export type ScanPhase = 'idle' | 'scanning' | 'results' | 'report_generation'
export type LogType = 'info' | 'warn' | 'success' | 'error' | 'system'

export interface LogEntry {
  id: number
  msg: string
  type: LogType
}

export interface ModuleResult {
  moduleId: string
  moduleName: string
  passed: boolean
  score: number
  findings: Finding[]
  completedAt: Date
}

export interface Finding {
  id: string
  severity: 'critical' | 'high' | 'medium' | 'low'
  title: string
  description: string
  recommendation: string
}

interface DiagnosticState {
  phase: ScanPhase
  activeModuleId: string | null
  results: ModuleResult[]
  reportUrl: string | null
  agentSystemPrompt: string
  logs: LogEntry[]
}

type DiagnosticAction =
  | { type: 'START_SCAN'; moduleId: string }
  | { type: 'COMPLETE_SCAN'; results: ModuleResult[] }
  | { type: 'GENERATE_REPORT' }
  | { type: 'REPORT_READY'; url: string }
  | { type: 'RESET' }
  | { type: 'SET_PROMPT'; prompt: string }
  | { type: 'APPEND_LOG'; entry: LogEntry }

const initialState: DiagnosticState = {
  phase: 'idle',
  activeModuleId: null,
  results: [],
  reportUrl: null,
  agentSystemPrompt: '',
  logs: [],
}

function diagnosticReducer(state: DiagnosticState, action: DiagnosticAction): DiagnosticState {
  switch (action.type) {
    case 'START_SCAN':
      return { ...state, phase: 'scanning', activeModuleId: action.moduleId, results: [], reportUrl: null, logs: [] }
    case 'COMPLETE_SCAN':
      return { ...state, phase: 'results', activeModuleId: null, results: action.results }
    case 'GENERATE_REPORT':
      return { ...state, phase: 'report_generation' }
    case 'REPORT_READY':
      return { ...state, phase: 'results', reportUrl: action.url }
    case 'RESET':
      return { ...initialState, agentSystemPrompt: state.agentSystemPrompt }
    case 'SET_PROMPT':
      return { ...state, agentSystemPrompt: action.prompt }
    case 'APPEND_LOG':
      return { ...state, logs: [...state.logs.slice(-299), action.entry] }
    default:
      return state
  }
}

interface DiagnosticContextValue extends DiagnosticState {
  startScan: (moduleId: string) => void
  completeScan: (results: ModuleResult[]) => void
  generateReport: () => void
  reset: () => void
  setAgentSystemPrompt: (prompt: string) => void
  appendLog: (msg: string, type?: LogType) => void
}

const DiagnosticContext = createContext<DiagnosticContextValue | null>(null)

let _logId = 0

export function DiagnosticProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(diagnosticReducer, initialState)

  const startScan = useCallback((moduleId: string) => {
    dispatch({ type: 'START_SCAN', moduleId })
  }, [])

  const completeScan = useCallback((results: ModuleResult[]) => {
    dispatch({ type: 'COMPLETE_SCAN', results })
  }, [])

  const generateReport = useCallback(() => {
    dispatch({ type: 'GENERATE_REPORT' })
    setTimeout(() => {
      dispatch({ type: 'REPORT_READY', url: '/report' })
    }, 2500)
  }, [])

  const reset = useCallback(() => {
    dispatch({ type: 'RESET' })
  }, [])

  const setAgentSystemPrompt = useCallback((prompt: string) => {
    dispatch({ type: 'SET_PROMPT', prompt })
  }, [])

  const appendLog = useCallback((msg: string, type: LogType = 'info') => {
    dispatch({ type: 'APPEND_LOG', entry: { id: ++_logId, msg, type } })
  }, [])

  return (
    <DiagnosticContext.Provider
      value={{ ...state, startScan, completeScan, generateReport, reset, setAgentSystemPrompt, appendLog }}
    >
      {children}
    </DiagnosticContext.Provider>
  )
}

export function useDiagnostic() {
  const ctx = useContext(DiagnosticContext)
  if (!ctx) throw new Error('useDiagnostic must be used within DiagnosticProvider')
  return ctx
}
