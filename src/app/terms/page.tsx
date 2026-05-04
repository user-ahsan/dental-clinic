import { Metadata } from 'next'
import Link from 'next/link'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { ArrowLeft, FileText } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Terms of Service - SmileCare Dental',
  description: 'SmileCare Dental terms of service and conditions.',
}

export default function TermsPage() {
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
            <FileText className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">Terms of Service</h1>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 lg:p-8 prose prose-slate max-w-none">
            <p className="text-slate-600 leading-relaxed">Our terms and conditions of service.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
