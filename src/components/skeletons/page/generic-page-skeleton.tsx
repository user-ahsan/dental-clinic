import { Skeleton } from "@/components/ui/skeleton"

/** Generic loading skeleton for content pages */
export function PageSkeleton() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="h-64 bg-slate-200 animate-pulse" />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto space-y-6">
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-5/6" />
          <div className="pt-8">
            <Skeleton className="h-64 w-full rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  )
}
