import React from 'react'
import { Box, Container, Typography } from '@material-ui/core'

const Footer = () => {


  return (
    <footer>
      <Box sx={{ bgcolor: '#2E3B55', color: '#fff', p: 3 }}>
        <Container maxWidth='md'>
          <Box display='flex' justifyContent='space-between'>

            <Box width='40%' mr={7}>
              <Typography variant='body1'>
                My sticky footer can be found here.
              </Typography>
              <Typography variant='body2'>
                Copyright ©
                {new Date().getFullYear()}
                {'.'}
              </Typography>
            </Box>

            <Box>
              <Typography variant='body1'>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illo, eligendi libero placeat, fugit ea ipsa laborum ullam aut voluptates illum odit blanditiis nisi provident cupiditate enim fugiat dicta, eaque aspernatur!
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    </footer>
  )
}


export default Footer