'use client'

import React from 'react'
import Link from 'next/link'
import {
  Globe,
  MapPin,
} from 'lucide-react'

const socialLinks = [
  {
    name: 'Facebook',
    link: 'https://www.facebook.com/smilecaredental',
    icon: Globe,
  },
  {
    name: 'Instagram',
    link: 'https://www.instagram.com/smilecaredental',
    icon: Globe,
  },
  {
    name: 'LinkedIn',
    link: 'https://www.linkedin.com/company/smilecaredental',
    icon: MapPin,
  },
  {
    name: 'Google Maps',
    link: 'https://maps.google.com/?q=SmileCare+Dental',
    icon: MapPin,
  },
]

interface SocialLinkItemProps {
  name: string
  link: string
  icon: React.ComponentType<{ className?: string }>
}

const SocialLinkItem: React.FC<SocialLinkItemProps> = ({
  link,
  icon: Icon,
}) => (
  <Link
    target='_blank'
    rel='noopener noreferrer'
    href={link}
    className='flex items-center justify-center w-10 h-10 rounded-full bg-gray-700 hover:bg-blue-600 transition-colors'
  >
    <Icon className='h-5 w-5 text-white' />
  </Link>
)

const SocialLinks: React.FC = () => {
  return (
    <div className='flex items-center gap-2'>
      {socialLinks.map((item) => (
        <SocialLinkItem
          key={item.name}
          name={item.name}
          link={item.link}
          icon={item.icon}
        />
      ))}
    </div>
  )
}

export default SocialLinks