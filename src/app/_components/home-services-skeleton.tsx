export function HomeServicesSkeleton() {
  return (
    <section className="min-h-[600px] py-20 lg:py-28 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 lg:mb-16">
          <div className="inline-block px-4 py-1.5 bg-slate-200 text-slate-200 text-xs font-semibold tracking-wider uppercase rounded-full mb-4 animate-pulse">
            Our Dental Services
          </div>
          <div className="h-10 w-full max-w-80 mx-auto bg-slate-200 rounded animate-pulse mb-4" />
          <div className="h-6 w-full max-w-96 mx-auto bg-slate-200 rounded animate-pulse" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-xl p-6 lg:p-8">
              <div className="w-16 h-16 rounded-xl bg-slate-200 mb-5 animate-pulse" />
              <div className="h-6 w-full bg-slate-200 rounded animate-pulse mb-3" />
              <div className="h-4 w-full bg-slate-200 rounded animate-pulse mb-4" />
              <div className="h-4 w-20 bg-slate-200 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
