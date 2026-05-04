import { Skeleton } from "@/components/ui/skeleton"

export function ServicesPageSkeleton() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="h-64 bg-slate-200 animate-pulse" />
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-xl p-6">
              <Skeleton className="h-16 w-16 rounded-xl mb-4" />
              <Skeleton className="h-6 w-full mb-3" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4 mb-4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
