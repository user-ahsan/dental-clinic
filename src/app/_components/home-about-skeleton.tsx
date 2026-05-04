export function HomeAboutSkeleton() {
  return (
    <section className="min-h-[500px] py-20 lg:py-28 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 lg:mb-16">
          <div className="h-10 w-full max-w-64 mx-auto bg-slate-200 rounded animate-pulse mb-4" />
          <div className="h-6 w-full max-w-96 mx-auto bg-slate-200 rounded animate-pulse" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-20">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-slate-50 rounded-xl p-6 lg:p-8">
              <div className="w-14 h-14 bg-slate-200 rounded-xl animate-pulse mb-5" />
              <div className="h-6 w-full bg-slate-200 rounded animate-pulse mb-3" />
              <div className="h-4 w-full bg-slate-200 rounded animate-pulse" />
            </div>
          ))}
        </div>
        <div className="bg-slate-200 rounded-xl p-8 lg:p-12 animate-pulse">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-12">
            {[1, 2, 3].map((i) => (
              <div key={i} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-slate-300 rounded-xl mb-4" />
                <div className="h-10 w-20 mx-auto bg-slate-300 rounded animate-pulse mb-2" />
                <div className="h-4 w-24 mx-auto bg-slate-300 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
