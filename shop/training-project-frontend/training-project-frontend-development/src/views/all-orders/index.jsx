import React, { useEffect, useState } from 'react'
import { Container, Typography, Box, Divider } from '@material-ui/core'
import { getData } from '../../requests/requests'
import LinearOrderInfo from '../../components/linear-order-info'
import ErrorSnackbar from '../../components/error-snackbar'

const AllOrders = () => {

  const [orders, setOrders] = useState([])
  const [error, setError] = useState('')
  const [isErrorShown, setIsErrorShown] = useState(false)



  useEffect(() => {
    getData('/api/orders')
      .then(response => setOrders(response))
      .catch(e => {
        setError(e.statusText)
        setIsErrorShown(true)
      })
  }, [])


  return (
    <Container component='main' maxWidth='lg'>
      <Box mt={10} className='user-info-container' sx={{bgcolor: '#ceb19c'}}>

        <Box p={4}>
          <Typography variant='h6' >Email</Typography>
        </Box>

        <Box p={4}>
          <Typography variant='h6' >Phone</Typography>
        </Box>

        <Box p={4}>
          <Typography variant='h6' >Total price</Typography>
        </Box>
        <Box p={4}>
          <Typography variant='h6' >Status</Typography>
        </Box>

      </Box>
      <Divider/>
      {orders && orders.map((order, index) => <LinearOrderInfo key={index} order={order} />)}
      {isErrorShown && <ErrorSnackbar errorMessage={error} setIsErrorShown={setIsErrorShown} />}
    </Container>
  )

}




export default AllOrders