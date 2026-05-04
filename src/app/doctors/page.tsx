import Link from 'next/link'
import { Metadata } from 'next'
import { Breadcrumb } from '@/components/ui/breadcrumb'

export const metadata: Metadata = {
  title: 'Our Doctors - SmileCare Dental',
  description: 'Meet our team of experienced dental professionals at SmileCare Dental.',
}

const doctors = [
  { id: '1', name: 'Dr. Sarah Johnson', specialty: 'General Dentistry', bio: '15 years experience' },
  { id: '2', name: 'Dr. Michael Chen', specialty: 'Orthodontics', bio: 'Specialist in braces' },
  { id: '3', name: 'Dr. Emily Williams', specialty: 'Pediatric Dentistry', bio: 'Kids specialist' },
]

export default function DoctorsPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Our Doctors", href: "/doctors" },
        ]}
        backButtonLabel="Back to Home"
      />

      <div className="py-20">
        <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8 lg:mb-12">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">Our Doctors</h1>
            <p className="text-lg text-slate-600 leading-relaxed">Meet our team of experienced dental professionals.</p>
          </div>
          <Link
            href="/admin/doctors"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Admin View
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((doc) => (
            <div key={doc.id} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
              <div className="w-24 h-24 bg-slate-200 rounded-full mb-4" aria-hidden="true" />
              <h2 className="text-xl font-semibold text-slate-900 mb-1">{doc.name}</h2>
              <p className="text-blue-600 font-medium mb-2">{doc.specialty}</p>
              <p className="text-slate-600">{doc.bio}</p>
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
  )
}
