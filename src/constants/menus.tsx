// components
import Box from '@mui/material/Box'

// icons
import HomeOutlinedIcon from '@/assets/icons/fluent--home-32-regular.svg'
import LayersOutlinedIcon from '@/assets/icons/fluent--layer-24-regular.svg'
import ContactCardGroupIcon from '@/assets/icons/fluent--contact-card-group-28-regular.svg'
import CalendarOutlinedIcon from '@/assets/icons/quill--paper.svg'
import ContactOutlinedIcon from '@/assets/icons/fluent--contact-card-group-28-regular.svg'
import PhoneOutlinedIcon from '@/assets/icons/eva--phone-outline.svg'
import HelpCircleOutlinedIcon from '@/assets/icons/material-symbols--contact-support-outline-rounded.svg'
import ShieldOutlinedIcon from '@/assets/icons/hugeicons--shield-01.svg'

export const companyMenus: IMenu[] = [
  {
    label: 'Home',
    path: '/',
    icon: <Box component={HomeOutlinedIcon} sx={{ width: 18, height: 'auto' }} />,
  },
  {
    label: 'Services',
    path: '/services',
    icon: (
      <Box component={LayersOutlinedIcon} sx={{ width: 20, height: 'auto' }} />
    ),
  },
  {
    label: 'Our Doctors',
    path: '/doctors',
    icon: (
      <Box component={ContactCardGroupIcon} sx={{ width: 18, height: 'auto' }} />
    ),
  },
  {
    label: 'Book Appointment',
    path: '/booking',
    icon: (
      <Box
        component={CalendarOutlinedIcon}
        sx={{ width: 18, height: 'auto' }}
      />
    ),
  },
  {
    label: 'Contact',
    path: '/contact',
    icon: (
      <Box
        component={ContactOutlinedIcon}
        sx={{ width: 18, height: 'auto' }}
      />
    ),
  },
]

export const supportLinks: IMenu[] = [
  {
    label: 'Emergency Hotline',
    path: '/emergency',
    icon: (
      <Box component={PhoneOutlinedIcon} sx={{ width: 22, height: 'auto' }} />
    ),
  },
  {
    label: 'Patient Portal',
    path: '/login',
    icon: (
      <Box component={ContactOutlinedIcon} sx={{ width: 18, height: 'auto' }} />
    ),
  },
  {
    label: 'FAQ',
    path: '/faq',
    icon: (
      <Box
        component={HelpCircleOutlinedIcon}
        sx={{ width: 18, height: 'auto' }}
      />
    ),
  },
  {
    label: 'Privacy Policy',
    path: '/privacy-policy',
    icon: (
      <Box component={ShieldOutlinedIcon} sx={{ width: 18, height: 'auto' }} />
    ),
  },
]