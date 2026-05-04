export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50">
      <div className="flex flex-col items-center gap-6">
        <div className="text-5xl animate-bounce">🦷</div>
        <p className="text-blue-600 font-semibold text-lg animate-pulse">Preparing your smile...</p>
        <div className="w-48 h-1.5 bg-blue-100 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-blue-600 to-emerald-500 animate-[loading_1.5s_ease-in-out_infinite]" />
        </div>
      </div>
    </div>
  )
}
