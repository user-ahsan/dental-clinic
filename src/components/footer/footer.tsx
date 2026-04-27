'use client'

import React from 'react'
import Link from 'next/link'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'

const Footer: React.FC = () => {
  return (
    <footer className='bg-gray-900 text-white'>
      {/* Main Footer Content */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {/* Brand Column */}
          <div>
            <div className='flex items-center gap-2 mb-4'>
              <span className='text-2xl'>🦷</span>
              <span className='font-bold text-xl text-white'>SmileCare</span>
            </div>
            <p className='text-gray-400 text-sm leading-relaxed mb-4'>
              Your trusted dental care partner. We provide comprehensive dental
              services with a focus on patient comfort and modern treatment
              options.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className='font-semibold text-base mb-4'>Quick Links</h3>
            <ul className='space-y-2'>
              <li>
                <Link
                  href='/'
                  className='text-gray-400 hover:text-white text-sm transition-colors'
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href='/services'
                  className='text-gray-400 hover:text-white text-sm transition-colors'
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href='/doctors'
                  className='text-gray-400 hover:text-white text-sm transition-colors'
                >
                  Our Doctors
                </Link>
              </li>
              <li>
                <Link
                  href='/booking'
                  className='text-gray-400 hover:text-white text-sm transition-colors'
                >
                  Book Appointment
                </Link>
              </li>
              <li>
                <Link
                  href='/contact'
                  className='text-gray-400 hover:text-white text-sm transition-colors'
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className='font-semibold text-base mb-4'>Services</h3>
            <ul className='space-y-2'>
              <li>
                <Link
                  href='/services#cleaning'
                  className='text-gray-400 hover:text-white text-sm transition-colors'
                >
                  Teeth Cleaning
                </Link>
              </li>
              <li>
                <Link
                  href='/services#whitening'
                  className='text-gray-400 hover:text-white text-sm transition-colors'
                >
                  Teeth Whitening
                </Link>
              </li>
              <li>
                <Link
                  href='/services#braces'
                  className='text-gray-400 hover:text-white text-sm transition-colors'
                >
                  Braces & Aligners
                </Link>
              </li>
              <li>
                <Link
                  href='/services#implants'
                  className='text-gray-400 hover:text-white text-sm transition-colors'
                >
                  Dental Implants
                </Link>
              </li>
              <li>
                <Link
                  href='/services#emergency'
                  className='text-gray-400 hover:text-white text-sm transition-colors'
                >
                  Emergency Care
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className='font-semibold text-base mb-4'>Contact Info</h3>
            <ul className='space-y-3'>
              <li className='flex items-start gap-3'>
                <MapPin className='h-5 w-5 text-blue-400 mt-0.5 shrink-0' />
                <span className='text-gray-400 text-sm'>
                  123 Dental Ave, Suite 100
                  <br />
                  New York, NY 10001
                </span>
              </li>
              <li className='flex items-center gap-3'>
                <Phone className='h-5 w-5 text-blue-400 shrink-0' />
                <a
                  href='tel:+15551237645'
                  className='text-gray-400 hover:text-white text-sm transition-colors'
                >
                  +1 (555) 123-SMILE
                </a>
              </li>
              <li className='flex items-center gap-3'>
                <Mail className='h-5 w-5 text-blue-400 shrink-0' />
                <a
                  href='mailto:info@smilecare.com'
                  className='text-gray-400 hover:text-white text-sm transition-colors'
                >
                  info@smilecare.com
                </a>
              </li>
              <li className='flex items-center gap-3'>
                <Clock className='h-5 w-5 text-blue-400 shrink-0' />
                <span className='text-gray-400 text-sm'>
                  Mon-Fri: 8am - 6pm
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className='border-t border-gray-800'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
          <div className='flex flex-col sm:flex-row items-center justify-between gap-2'>
            <p className='text-gray-400 text-sm'>
              © 2026 SmileCare Dental. All rights reserved.
            </p>
            <div className='flex gap-4'>
              <Link
                href='/privacy-policy'
                className='text-gray-400 hover:text-white text-sm transition-colors'
              >
                Privacy Policy
              </Link>
              <Link
                href='/terms'
                className='text-gray-400 hover:text-white text-sm transition-colors'
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer