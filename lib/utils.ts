import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatScanPhase(phase: string): string {
  const labels: Record<string, string> = {
    idle: 'Ready',
    scanning: 'Scanning…',
    results: 'Results Ready',
    report_generation: 'Generating Report…',
  }
  return labels[phase] ?? phase
}

export function formatSeverity(severity: string): string {
  return severity.charAt(0).toUpperCase() + severity.slice(1)
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
