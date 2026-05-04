import { Metadata } from 'next'
import Link from 'next/link'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { ArrowLeft, HelpCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'FAQ - SmileCare Dental',
  description: 'Frequently asked questions about our dental services and treatments.',
}

const faqs = [
  { q: 'How often should I visit the dentist?', a: 'We recommend visiting every 6 months for a routine checkup and cleaning.' },
  { q: 'Do you accept insurance?', a: 'Yes, we accept most major dental insurance plans. Contact us to verify your coverage.' },
  { q: 'What should I do in a dental emergency?', a: 'Call our office immediately. We offer same-day emergency appointments.' },
]

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Breadcrumb />
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <div className="flex items-center gap-3 mb-8">
            <HelpCircle className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">Frequently Asked Questions</h1>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-200 p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{faq.q}</h3>
                <p className="text-slate-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
