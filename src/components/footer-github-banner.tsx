'use client'

import React, { useState } from 'react'
import { X } from 'lucide-react'

const FooterGitHubBanner: React.FC = () => {
  const [isDismissed, setIsDismissed] = useState(false)

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
              className='underline font-bold hover:text-red-100'
            >
              +1 (555) 123-SMILE
            </a>{' '}
            — Available 24/7
          </span>
        </div>
        <button
          onClick={() => setIsDismissed(true)}
          className='p-1 hover:bg-red-700 rounded transition-colors'
          aria-label='Dismiss emergency banner'
        >
          <X size={20} />
        </button>
      </div>
    </div>
  )
}

export default FooterGitHubBanner