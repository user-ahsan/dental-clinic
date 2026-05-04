export function HomeOurMotivationSkeleton() {
  return (
    <section className="min-h-[500px] py-20 lg:py-28 bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <div className="flex-1 space-y-6">
            <div className="h-4 w-24 bg-slate-200 rounded animate-pulse" />
            <div className="h-10 w-full max-w-md bg-slate-200 rounded animate-pulse" />
            <div className="space-y-3">
              <div className="h-4 w-full bg-slate-200 rounded animate-pulse" />
              <div className="h-4 w-full bg-slate-200 rounded animate-pulse" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white/80 backdrop-blur rounded-xl border border-slate-100 p-4">
                  <div className="w-10 h-10 bg-slate-200 rounded-xl animate-pulse mb-4" />
                  <div className="h-5 w-24 bg-slate-200 rounded animate-pulse mb-2" />
                  <div className="h-4 w-full bg-slate-200 rounded animate-pulse" />
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 relative">
            <div className="relative w-full max-w-lg mx-auto">
              <div className="absolute inset-0 bg-slate-200 rounded-xl animate-pulse transform rotate-6" />
              <div className="relative bg-white rounded-xl p-5 sm:p-6 lg:p-8 shadow-sm border border-slate-100">
                <div className="text-center mb-6 lg:mb-8">
                  <div className="inline-block p-3 bg-slate-200 rounded-full mb-4 animate-pulse" />
                  <div className="h-6 w-full max-w-sm mx-auto bg-slate-200 rounded animate-pulse" />
                </div>
                <div className="flex justify-center mb-6">
                  <div className="w-32 h-32 bg-slate-200 rounded-full animate-pulse" />
                </div>
                <div className="flex justify-center gap-8 pt-6 border-t border-slate-100">
                  <div className="text-center">
                    <div className="h-8 w-12 bg-slate-200 rounded animate-pulse mx-auto" />
                    <div className="h-3 w-16 bg-slate-200 rounded animate-pulse mt-2 mx-auto" />
                  </div>
                  <div className="text-center">
                    <div className="h-8 w-12 bg-slate-200 rounded animate-pulse mx-auto" />
                    <div className="h-3 w-16 bg-slate-200 rounded animate-pulse mt-2 mx-auto" />
                  </div>
                  <div className="text-center">
                    <div className="h-8 w-12 bg-slate-200 rounded animate-pulse mx-auto" />
                    <div className="h-3 w-16 bg-slate-200 rounded animate-pulse mt-2 mx-auto" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
