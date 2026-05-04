import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Emergency Hotline - SmileCare Dental',
  description: '24/7 emergency dental hotline for urgent dental care needs.',
}

export default function EmergencyPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Emergency Hotline</h1>
        <p className="text-lg text-slate-600 leading-relaxed">For dental emergencies, please call our 24/7 hotline.</p>
      </div>
    </div>
  )
}
