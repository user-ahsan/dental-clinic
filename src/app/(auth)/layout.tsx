import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Authentication - SmileCare Dental',
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-4">
      {children}
    </div>
  )
}
