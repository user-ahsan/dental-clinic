import React, { FC, ReactNode } from 'react'
import Box from '@mui/material/Box'
import MuiLink from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import RouterLink from 'next/link'
import { Theme } from '@mui/material/styles'

interface FooterLinkItemProps {
  label: string
  path: string
  icon?: ReactNode
}

const linkStyles = {
  textDecoration: 'none',
  alignItems: 'center',
  mb: 0.5,
  color: 'text.primary',
  display: 'flex',
  alignItem: 'center',
  justifyContent: { xs: 'flex-start', md: 'flex-end' },
  '& svg': { fontSize: '0.875rem', verticalAlign: 'middle', zIndex: 'var(--z-index-base, 0)' },
  '& p': { marginRight: 1 },
  '& .icon-container': {
    position: 'relative',
    height: 28,
    width: 28,
    alignItems: 'center',
    justifyContent: 'center',
    '&:before': {
      zIndex: -1,
      content: '""',
      display: 'block !important',
      width: 28,
      height: 28,
      position: 'absolute',
      top: 0,
      backgroundColor: (theme: Theme) => theme.palette.primary.main,
      transform: 'scale(0)',
      borderRadius: '50%',
      transition: (theme: Theme) =>
        theme.transitions.create(['background-color', 'transform', 'scale'], { duration: 250 }),
    },
  },
  '&:hover': {
    color: 'primary.main',
    '& .icon-container': {
      color: 'var(--color-text-inverse)',
      '&:before': { transform: 'scale(1)', zIndex: 'var(--z-index-base, 0)' },
    },
  },
  '&:focus-visible': {
    outline: '2px solid var(--color-primary)',
    outlineOffset: '2px',
    borderRadius: '4px',
  },
}

export const FooterLinkItem: FC<FooterLinkItemProps> = ({ label, path, icon }) => {
  return (
    <MuiLink component={RouterLink} href={path} target="_blank" sx={linkStyles}>
      <Typography component="p" sx={{ display: 'inline-block', color: 'inherit', fontWeight: '500' }}>
        {label}
      </Typography>
      <Box className="icon-container" sx={{ display: { xs: 'none', md: 'flex' } }}>
        {icon}
      </Box>
    </MuiLink>
  )
}
