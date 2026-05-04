import React, { memo } from 'react'
import Link from 'next/link'
import { Phone, Mail, MapPin, Clock, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import FooterSocialIcons from './footer-social-icons'

const Footer: React.FC = memo(function Footer() {
  return (
    <footer className='bg-slate-950 text-white'>
      {/* Top accent line */}
      <div className='h-px bg-gradient-to-r from-blue-600/50 via-blue-500/50 to-blue-600/50' />

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Main Grid */}
        <div className='py-16 lg:py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-8'>
          {/* Brand Column */}
          <div className='space-y-6'>
            <Link href='/' className='inline-flex items-center gap-3 group'>
              <div className='w-11 h-11 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-[var(--shadow-blue-md)]'>
                <span aria-hidden="true" className='text-2xl'>🦷</span>
              </div>
              <span className='font-bold text-xl text-white truncate max-w-44'>SmileCare</span>
            </Link>

            <p className='text-slate-400 text-sm leading-relaxed max-w-sm'>
              Your trusted dental care partner. We provide comprehensive dental
              services with a focus on patient comfort and modern treatment options.
            </p>

            <div className='pt-2'>
              <FooterSocialIcons />
            </div>

            <Link href="/booking">
              <Button variant="default" size="lg">
                <Calendar className='h-4 w-4' />
                Book Appointment
              </Button>
            </Link>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className='text-lg font-semibold text-white mb-6'>Quick Links</h3>
            <ul className='space-y-4'>
              {[
                { href: '/', label: 'Home' },
                { href: '/services', label: 'Services' },
                { href: '/doctors', label: 'Our Doctors' },
                { href: '/booking', label: 'Book Appointment' },
                { href: '/contact', label: 'Contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className='text-slate-400 hover:text-white text-sm transition-colors duration-200 block py-2 min-h-11'
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className='text-lg font-semibold text-white mb-6'>Services</h3>
            <ul className='space-y-4'>
              {[
                { href: '/services#cleaning', label: 'Teeth Cleaning' },
                { href: '/services#whitening', label: 'Teeth Whitening' },
                { href: '/services#braces', label: 'Braces & Aligners' },
                { href: '/services#implants', label: 'Dental Implants' },
                { href: '/services#emergency', label: 'Emergency Care' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className='text-slate-400 hover:text-white text-sm transition-colors duration-200 block py-2 min-h-11'
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className='text-lg font-semibold text-white mb-6'>Contact Info</h3>
            <ul className='space-y-4'>
              <li className='flex items-start gap-3'>
                <MapPin className='h-5 w-5 text-blue-400 mt-0.5 shrink-0' />
                <span className='text-slate-400 text-sm leading-relaxed truncate max-w-48 block'>
                  123 Dental Ave, Suite 100
                  <br />
                  New York, NY 10001
                </span>
              </li>
              <li className='flex items-center gap-3'>
                <Phone className='h-5 w-5 text-blue-400 shrink-0' />
                <a
                  href='tel:+15551237645'
                  className='text-slate-400 hover:text-white text-sm transition-colors duration-200 truncate max-w-44 block'
                >
                  +1 (555) 123-7645
                </a>
              </li>
              <li className='flex items-center gap-3'>
                <Mail className='h-5 w-5 text-blue-400 shrink-0' />
                <a
                  href='mailto:info@smilecare.com'
                  className='text-slate-400 hover:text-white text-sm transition-colors duration-200 truncate max-w-48 block'
                  title='info@smilecare.com'
                >
                  info@smilecare.com
                </a>
              </li>
              <li className='flex items-center gap-3'>
                <Clock className='h-5 w-5 text-blue-400 shrink-0' />
                <span className='text-slate-400 text-sm'>
                  Mon-Fri: 8am - 6pm
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className='border-t border-slate-800 py-6'>
          <div className='flex flex-col sm:flex-row items-center justify-between gap-4'>
            <p className='text-slate-500 text-sm'>
              © 2026 SmileCare Dental. All rights reserved.
            </p>
            <div className='flex gap-6'>
              <Link
                href='/privacy-policy'
                className='text-slate-500 hover:text-white text-sm transition-colors duration-200 py-2 min-h-11'
              >
                Privacy Policy
              </Link>
              <Link
                href='/terms'
                className='text-slate-500 hover:text-white text-sm transition-colors duration-200 py-2 min-h-11'
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
})

export default Footer