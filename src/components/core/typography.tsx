import MuiTypography from '@mui/material/Typography'
import { FC, JSX, ReactNode } from 'react'

interface TypographyProps {
  type?: 'primary' | 'secondary'
  children?: ReactNode
}

const Typography: FC<TypographyProps> = ({
  type = 'secondary',
  children,
}): JSX.Element => {
  return (
    <MuiTypography
      sx={{
        fontFamily: type === 'primary' ? 'Be Vietnam Pro, sans-serif' : 'inherit',
      }}
    >
      {children}
    </MuiTypography>
  )
}

export default Typography
