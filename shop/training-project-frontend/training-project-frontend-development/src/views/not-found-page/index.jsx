import React from 'react'
import { Container, Typography, Box, Button } from '@material-ui/core'
import notFoundPage from '../../assets/page-not-found.png'

const NotFoundPage = () => {

  return (
    <Container>

      <Box display='flex' justifyContent='space-evenly' alignItems='center'>
        <Typography align='center' component='h2' variant='h4'>
          Something went wrong, page not-found
        </Typography>
        <Button variant='contained' size='large' href='/'>
          Go Home
        </Button>
      </Box>

      <Box display='flex' justifyContent='center'>
        <img src={notFoundPage} height='400' alt='not-founded page' />
      </Box>


    </Container>
  )

}

export default NotFoundPage

