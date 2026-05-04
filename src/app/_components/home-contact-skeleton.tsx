export function HomeContactSkeleton() {
  return (
    <section className="min-h-[600px] py-20 lg:py-28 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 lg:mb-16">
          <div className="inline-block px-4 py-1.5 bg-slate-200 text-slate-200 text-xs font-semibold tracking-wider uppercase rounded-full mb-4 animate-pulse">
            Get In Touch
          </div>
          <div className="h-10 w-full max-w-64 mx-auto bg-slate-200 rounded animate-pulse mb-4" />
          <div className="h-6 w-full max-w-96 mx-auto bg-slate-200 rounded animate-pulse" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <div className="space-y-8">
            <div>
              <div className="h-8 w-full max-w-48 bg-slate-200 rounded animate-pulse mb-2" />
              <div className="h-4 w-full max-w-64 bg-slate-200 rounded animate-pulse" />
            </div>
            <div className="space-y-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-slate-200 rounded-xl animate-pulse shrink-0" />
                  <div className="space-y-2">
                    <div className="h-3 w-16 bg-slate-200 rounded animate-pulse" />
                    <div className="h-5 w-32 sm:w-48 bg-slate-200 rounded animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-slate-200 rounded-xl p-6 animate-pulse">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-slate-300 rounded-xl animate-pulse" />
                <div>
                  <div className="h-5 w-32 bg-slate-300 rounded animate-pulse mb-2" />
                  <div className="h-4 w-32 sm:w-48 bg-slate-300 rounded animate-pulse" />
                </div>
              </div>
            </div>
          </div>
          <div className="bg-slate-50 rounded-xl p-5 sm:p-6 lg:p-10 border border-slate-100">
            <div className="h-6 w-32 bg-slate-200 rounded animate-pulse mb-6" />
            <div className="space-y-5">
              {[1, 2, 3, 4].map((i) => (
                <div key={i}>
                  <div className="h-4 w-20 bg-slate-200 rounded animate-pulse mb-2" />
                  <div className="h-12 w-full bg-slate-200 rounded-xl animate-pulse" />
                </div>
              ))}
              <div className="h-12 w-full bg-slate-200 rounded-xl animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
