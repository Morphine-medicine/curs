import { Container, Box, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import ErrorSnackbar from '../../components/error-snackbar'
import { getData } from '../../requests/requests'
import './styles.scss'
import avatarPlaceholder from '../../assets/avatar-placeholder.jpg'
import LoadingContainer from '../../components/loading-container'
import OrderCard from '../../components/order-card'

const PersonalCabinet = () => {


  const [username, setUsername] = useState('')
  const [orders, setOrders] = useState('')
  const id = localStorage.getItem('userId')

  useEffect(() => {
    setLoading(true)
    getData(`/api/personalCabinet/${id}`)
      .then(response => setUsername(response.username))
      .catch(e => {
        setError(e.statusText)
        setIsErrorShown(true)
      })
      .finally(() => setTimeout(() => setLoading(false), 1000))
  }, [])

  useEffect(() => {
    setLoading(true)
    getData(`/api/orders/user/${id}`)
      .then(response => setOrders(response))
      .catch(e => {
        setError(e.statusText)
        setIsErrorShown(true)
      })
      .finally(() => setTimeout(() => setLoading(false), 1000))
  }, [])

  //error handling
  const [error, setError] = useState('')
  const [isErrorShown, setIsErrorShown] = useState(false)


  const [loading, setLoading] = useState(false)

  return (
    <Container component='main' maxWidth='lg'>
      <LoadingContainer loading={loading}>
        <Box m={3} sx={{ textAlign: 'center' }}>
          <Box display='flex' justifyContent='space-between'>
            <Box>
              <img src={avatarPlaceholder} className='user-info-avatar' alt="No-avatar image" />
              <Box p={3} width={250}>
                <Typography variant='h6' paragraph> Username: {username}</Typography>
              </Box>
            </Box>

            <Box p={3}>
              {orders && orders.map((item, index) => {
                return (
                  <Box mb={5} display='flex' justify-content='center' key={index}>
                    <OrderCard item={item} />
                  </Box>
                )
              })}
            </Box>
          </Box>
        </Box>
      </LoadingContainer>
      {isErrorShown && <ErrorSnackbar errorMessage={error} setIsErrorShown={setIsErrorShown} />}
    </Container>

  )

}

export default PersonalCabinet
