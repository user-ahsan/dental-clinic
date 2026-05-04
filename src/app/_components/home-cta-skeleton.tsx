export function HomeCTASkeleton() {
  return (
    <section className="min-h-[350px] py-16 lg:py-24 bg-slate-200 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-slate-300 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-slate-300 rounded-full blur-3xl animate-pulse" />
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <div className="h-12 w-full max-w-96 mx-auto bg-slate-300 rounded animate-pulse mb-4" />
          <div className="h-6 w-full max-w-2xl mx-auto bg-slate-300 rounded animate-pulse mb-8" />
          <div className="h-14 w-36 sm:w-48 mx-auto bg-slate-300 rounded-xl animate-pulse" />
          <div className="mt-12 flex flex-wrap items-center justify-center gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-5 h-5 bg-slate-300 rounded-full animate-pulse" />
                <div className="h-4 w-24 bg-slate-300 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
