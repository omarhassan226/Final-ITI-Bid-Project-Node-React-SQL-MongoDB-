import { Box, Typography } from '@mui/material'
import React from 'react'
import { colors } from '../../../Util/utilities';

export default function ServiceBox({ children, title, text }) {
  return (
    <Box width={'100%'} paddingBottom={1}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: 30, height: 30, backgroundColor: '#ccc', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {children}
        </Box>
        <Typography margin={1}  sx={{fontWeight:'800', fontSize:'14px'}}>{title}</Typography>
      </Box>
      <Typography variant='' sx={{color:colors.gray , fontSize:'13px', maxWidth:'70%'}}>{text}</Typography>
    </Box>
  )
}
