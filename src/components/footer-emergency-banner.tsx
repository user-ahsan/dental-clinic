'use client'

import React, { useEffect, useState } from 'react'
import { X } from 'lucide-react'

const FOOTER_BANNER_KEY = 'footer-banner-dismissed'

const FooterEmergencyBanner: React.FC = () => {
  const [isDismissed, setIsDismissed] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  // Only read localStorage and set state after mount to prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true)
    // Check if banner was previously dismissed
    try {
      const stored = localStorage.getItem(FOOTER_BANNER_KEY)
      if (stored === 'true') {
        setIsDismissed(true)
      }
    } catch {
      // localStorage not available (SSR/private browsing)
    }
  }, [])

  const handleDismiss = () => {
    setIsDismissed(true)
    try {
      localStorage.setItem(FOOTER_BANNER_KEY, 'true')
    } catch {
      // localStorage not available
    }
  }

  // Don't render anything until mounted to avoid hydration mismatch
  // Server always renders banner; client checks localStorage after mount
  if (!isMounted) {
    return null
  }

  if (isDismissed) return null

  return (
    <div className='fixed bottom-0 left-0 right-0 z-40 bg-red-600 text-white py-3 px-4 shadow-lg'>
      <div className='max-w-7xl mx-auto flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <span className='text-xl'>🚨</span>
          <span className='font-medium'>
            Dental Emergency? Call{' '}
            <a
              href='tel:+15551237645'
              className='underline font-bold hover:text-red-100 transition-colors duration-150'
            >
              +1 (555) 123-SMILE
            </a>{' '}
            — Available 24/7
          </span>
        </div>
        <button
          onClick={handleDismiss}
          className="p-2.5 size-11 rounded-lg transition-colors duration-200 hover:bg-red-700/70 focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-1 focus-visible:ring-offset-red-600 outline-none"
          aria-label='Dismiss emergency banner'
        >
          <X size={20} aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}

export default FooterEmergencyBanner
