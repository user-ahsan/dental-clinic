'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { companyMenus } from '@/constants/menus'

const AppBar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleBookNow = () => {
    window.location.href = '/booking'
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg'
            : 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md'
        }`}
      >
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex items-center justify-between h-16'>
            {/* Logo */}
            <Link href='/' className='flex items-center gap-2'>
              <span className='text-2xl'>🦷</span>
              <span className='font-bold text-xl text-blue-600 dark:text-blue-400'>
                SmileCare
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className='hidden md:flex items-center gap-1'>
              {companyMenus.map((menu) => (
                <Link
                  key={menu.path}
                  href={menu.path}
                  className='px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors rounded-md hover:bg-gray-100 dark:hover:bg-gray-800'
                >
                  {menu.label}
                </Link>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className='hidden md:flex items-center gap-3'>
              <Button
                onClick={handleBookNow}
                className='bg-blue-600 hover:bg-blue-700 text-white'
              >
                Book Now
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className='md:hidden p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
              aria-label='Toggle menu'
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className='fixed inset-0 z-40 bg-black/50 md:hidden'
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Slide-out */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-72 bg-white dark:bg-gray-900 shadow-xl transform transition-transform duration-300 md:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className='p-6'>
          <div className='flex items-center justify-between mb-8'>
            <span className='font-bold text-xl text-blue-600 dark:text-blue-400'>
              🦷 SmileCare
            </span>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className='p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
              aria-label='Close menu'
            >
              <X size={24} />
            </button>
          </div>
          <nav className='flex flex-col gap-2'>
            {companyMenus.map((menu) => (
              <Link
                key={menu.path}
                href={menu.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className='px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors'
              >
                {menu.label}
              </Link>
            ))}
            <div className='mt-4 pt-4 border-t border-gray-200 dark:border-gray-700'>
              <Button
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  handleBookNow()
                }}
                className='w-full bg-blue-600 hover:bg-blue-700 text-white'
              >
                <Phone className='mr-2 h-4 w-4' />
                Book Now
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </>
  )
}

export default AppBar