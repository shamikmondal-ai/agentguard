import { cn } from '@/lib/utils'

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn('skeleton rounded', className)} />
}

export function ScanResultSkeleton() {
  return (
    <div className="space-y-3" aria-busy="true" aria-label="Loading scan results">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="flex items-center gap-3 p-3 rounded-lg bg-surface-raised border border-border"
          style={{ animationDelay: `${i * 0.1}s` }}
        >
          <Skeleton className="h-5 w-5 rounded-full shrink-0" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-3.5 w-36" />
            <Skeleton className="h-2.5 w-24" />
          </div>
          <Skeleton className="h-6 w-14 rounded" />
        </div>
      ))}
    </div>
  )
}
