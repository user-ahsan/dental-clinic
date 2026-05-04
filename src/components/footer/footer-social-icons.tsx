import React, { memo } from 'react'
import Link from 'next/link'
import { Share2, Camera, MessageCircle, Link2 } from 'lucide-react'

interface SocialLink {
  name: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

const socialLinks: SocialLink[] = [
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/smilecaredental',
    icon: Share2,
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/smilecaredental',
    icon: Camera,
  },
  {
    name: 'Twitter',
    href: 'https://twitter.com/smilecaredental',
    icon: MessageCircle,
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/company/smilecaredental',
    icon: Link2,
  },
]

const FooterSocialIcons: React.FC = memo(function FooterSocialIcons() {
  return (
    <div className='flex items-center gap-2'>
      {socialLinks.map((social) => {
        const Icon = social.icon
        return (
<Link
            key={social.name}
            href={social.href}
            target='_blank'
            rel='noopener noreferrer'
            aria-label={`Follow us on ${social.name}`}
            className='footer-social-btn flex items-center justify-center min-w-11 min-h-11 w-9 h-9 rounded-full bg-gray-800 hover:bg-blue-600 text-gray-400 hover:text-white transition-all duration-200 hover:scale-110'
          >
            <Icon className='h-4 w-4 text-white' />
          </Link>
        )
      })}
    </div>
  )
})

export default FooterSocialIcons