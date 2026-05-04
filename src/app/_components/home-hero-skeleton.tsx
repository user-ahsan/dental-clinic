export function HomeHeroSkeleton() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <div className="flex-1 text-center lg:text-left space-y-8">
            <div className="space-y-4">
              <div className="h-4 w-32 mx-auto lg:mx-0 bg-slate-200 rounded animate-pulse" />
              <div className="h-12 w-full max-w-md mx-auto lg:mx-0 bg-slate-200 rounded-lg animate-pulse" />
              <div className="h-6 w-full max-w-xl mx-auto lg:mx-0 bg-slate-200 rounded animate-pulse" />
            </div>
            <div className="flex flex-wrap justify-center lg:justify-start gap-8 py-6">
              <div className="text-center">
                <div className="h-8 w-16 bg-slate-200 rounded animate-pulse mx-auto" />
                <div className="h-4 w-20 bg-slate-200 rounded animate-pulse mt-2 mx-auto" />
              </div>
              <div className="text-center">
                <div className="h-8 w-16 bg-slate-200 rounded animate-pulse mx-auto" />
                <div className="h-4 w-20 bg-slate-200 rounded animate-pulse mt-2 mx-auto" />
              </div>
              <div className="text-center">
                <div className="h-8 w-16 bg-slate-200 rounded animate-pulse mx-auto" />
                <div className="h-4 w-20 bg-slate-200 rounded animate-pulse mt-2 mx-auto" />
              </div>
            </div>
          </div>
          <div className="flex-1 relative">
            <div className="relative w-full max-w-lg mx-auto aspect-square">
              <div className="absolute inset-0 border-2 border-slate-200 rounded-xl animate-pulse" />
              <div className="absolute inset-4 border-2 border-slate-200 rounded-xl animate-pulse" />
              <div className="absolute inset-8 border-2 border-slate-200 rounded-xl animate-pulse" />
              <div className="absolute inset-12 bg-slate-200 rounded-xl animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
