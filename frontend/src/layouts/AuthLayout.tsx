import Box from '@mui/joy/Box'
import Sheet from '@mui/joy/Sheet'
import Typography from '@mui/joy/Typography'
import { type PropsWithChildren } from 'react'

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Sheet
        sx={{
          width: 300,
          margin: 'auto',
          py: 3,
          px: 3,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          borderRadius: 'sm',
          boxShadow: 'md'
        }}
      >
        {children}
      </Sheet>
      <Box sx={{ py: 3, textAlign: 'center' }}>
        <Typography sx={{ color: 'GrayText', fontSize: 'small' }}>
          © 2023 Connecto
        </Typography>
      </Box>
    </Box>
  )
}
