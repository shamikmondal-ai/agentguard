'use client'

import { registry } from '@/registry'
import { TemplateCard } from '@/modules/_template/components/StressTestCard'

export function ModuleGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {registry
        .filter((m) => m.isAvailable)
        .map((mod) => {
          const ModuleComponent = mod.component
          return (
            <ModuleComponent
              key={mod.id}
              config={{}}
              onComplete={() => {}}
            />
          )
        })}
      <TemplateCard config={{}} onComplete={() => {}} />
    </div>
  )
}
