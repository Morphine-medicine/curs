import { Slider, Container, Box, Typography, Button } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import ErrorSnackbar from '../../components/error-snackbar'
import { getData, putData } from '../../requests/requests'
import SuccessSnackbar from '../../components/success-snackbar'
import { orderStatus } from '../../clientConfig'

const OrderInfo = () => {

  const { id } = useParams()
  const [order, setOrder] = useState({
    email: '',
    phone: '',
    cart: {
      items: [],
      totalPrice: 0
    },
    status: ''
  })

  const [error, setError] = useState('')
  const [isErrorShown, setIsErrorShown] = useState(false)

  const [successMessage, setSuccessMessage] = useState('')
  const [isMessageShown, setIsMessageShown] = useState(false)


  useEffect(() => {
    getData(`/api/orders/${id}`)
      .then(response => {
        setOrder(response)
      })
      .catch(e => {
        setError(e.statusText)
        setIsErrorShown(true)
      })
  }, [])

  const confirm = () => {
    console.log(order)
    putData(`/api/orders/changeStatus/${id}`, { status: order.status })
      .then(() => {
        setSuccessMessage('Successfully updated!')
        setIsMessageShown(true)
      })
      .catch(e => {
        setError(e.statusText)
        setIsErrorShown(true)
      })
  }


  const marks = [
    {
      value: 0,
      label: orderStatus.DECLINED,
    },
    {
      value: 25,
      label: orderStatus.CREATED,
    },
    {
      value: 50,
      label: orderStatus.CONFIRMED,
    },
    {
      value: 75,
      label: orderStatus.SHIPPING,
    },
    {
      value: 100,
      label: orderStatus.ARRIVED,
    },
  ]

  const onStatusChange = (e, value) => {
    const status = marks.filter(item => item.value === value)[0].label
    setOrder({...order, status: status})
  }
  return (
    <Container component='main' maxWidth='lg'>
      {order && <Box mb={10} display='flex' justifyContent='space-between' alignItems='center'>

        <Box mt={5} px={3}>
          <Typography variant='h4'>User data</Typography>
          <Box my={5}>
            <Typography variant='h6' > Order id: {order._id}</Typography>
          </Box>
          <Box my={5}>
            <Typography variant='h6' > Email: {order.email}</Typography>
          </Box>
          <Box my={5}>
            <Typography variant='h6' paragraph> Phone: {order.phone}</Typography>
          </Box>
          <Box my={5}>
            <Typography variant='h6' paragraph> Total price: {order.cart.totalPrice}$</Typography>
          </Box>

        </Box>
        <Box>
          <Box mt={5} px={3} display='flex' justifyContent='space-between' alignItems='center' textAlign='center'>
            <Box my={1} width={200}>
              <Typography variant='h6' paragraph> Title: </Typography>
            </Box>
            <Box my={1} width={200} >
              <Typography variant='h6' paragraph > Price: </Typography>
            </Box>
            <Box my={1} width={200}>
              <Typography variant='h6' paragraph> Quantity: </Typography>
            </Box>
          </Box>
          <Box>
            {order.cart.items.length > 0 && order.cart.items.map(item => {
              return (
                <Box key={item._id} mt={5} px={3} display='flex' justifyContent='space-between' alignItems='center' textAlign='center'>
                  <Box width={200}>
                    <Typography variant='h6' paragraph> {item._id.title} </Typography>
                  </Box>
                  <Box width={200}>
                    <Typography variant='h6' paragraph> {item._id.price}$ </Typography>
                  </Box>
                  <Box width={200}>
                    <Typography variant='h6' paragraph> {item.quantity} </Typography>
                  </Box>
                </Box >
              )
            })}
          </Box>
        </Box>
      </Box>}
      <Box display='flex' justifyContent='space-between' alignItems='center'>
        <Box sx={{ width: 900 }}>
          {order.status && <Slider
            value={marks.filter(item => item.label === order.status)[0].value}
            step={25}
            valueLabelDisplay="off"
            onChange={onStatusChange}
            marks={marks}
          />}
        </Box>

        <Button variant='filled'
          size='large'
          style={{ backgroundColor: '#007300', color: '#ffffff' }}
          onClick={() => confirm(true)}>Update status</Button>
      </Box>
      {isMessageShown && <SuccessSnackbar successMessage={successMessage} setIsMessageShown={setIsMessageShown} />}
      {isErrorShown && <ErrorSnackbar errorMessage={error} setIsErrorShown={setIsErrorShown} />}
    </Container >

  )

}

export default OrderInfo