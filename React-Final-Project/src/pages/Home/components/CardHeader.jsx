import { Box, Button, Typography } from '@mui/material'
import React from 'react'

export default function CardHeader({children}) {
  return (
    <Box display={'flex'} justifyContent={'space-between'} marginY={5}>
        <Typography variant='h5'>
            {children}
        </Typography>
    </Box>
  )
}
