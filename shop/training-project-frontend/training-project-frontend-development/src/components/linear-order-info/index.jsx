import React, { useState } from 'react'
import { PropTypes } from 'prop-types'
import { Box, Typography, Divider, Select, MenuItem, OutlinedInput, Button } from '@material-ui/core'
import './styles.scss'
import { Link } from 'react-router-dom'
import { orderStatus } from '../../clientConfig'
import { putData } from '../../requests/requests'
import SuccessSnackbar from '../success-snackbar'
import ErrorSnackbar from '../error-snackbar'

const LinearOrderInfo = ({ order }) => {


  const [status, setStatus] = useState(order.status)

  //error handling
  const [error, setError] = useState('')
  const [isErrorShown, setIsErrorShown] = useState(false)

  //success handling
  const [successMessage, setSuccessMessage] = useState('')
  const [isMessageShown, setIsMessageShown] = useState(false)


  const onStatusChange = (e) => {
    setStatus(e.target.value)
  }

  const updateOrder = (id) => {
    putData(`/api/orders/changeStatus/${id}`, { status })
      .then(() => {
        setSuccessMessage('Successfully updated!')
        setIsMessageShown(true)
      })
      .catch(e => {
        setError(e.statusText)
        setIsErrorShown(true)
      })
  }
  return (
    <>
      <Box className='order-info-container' sx={{ bgcolor: '#e2d0c3' }}>
        <Box p={2} sx={{ mx: 'auto' }}>
          <Link to={`order-info/${order._id}`} className='field'>
            <Typography>{order.email}</Typography>
          </Link>

        </Box>
        <Box p={2} className='field'>
          <Typography variant='body1' >{order.phone}</Typography>
        </Box>
        <Box p={2} className='field'>
          <Typography variant='body1' >{order.cart.totalPrice}$</Typography>
        </Box>
        <Box p={2} width={250} display='flex' alignItems='center' justifyContent='space-between'>
          <Select
            fullWidth
            value={status}
            onChange={onStatusChange}
            input={<OutlinedInput label="Role" />}
            variant='outlined'
          >
            {Object.values(orderStatus).map((item) => {
              return (<MenuItem
                selected={true}
                key={item}
                value={item}
              >
                {item}
              </MenuItem>
              )
            })}
          </Select>

          <Box ml={3} >
            <Button
              variant='contained'
              style={{ backgroundColor: '#007300', color: '#ffffff' }}
              onClick={() => updateOrder(order._id)}>
              Update
            </Button>
          </Box>
        </Box>
      </Box>
      <Divider />
      {isMessageShown && <SuccessSnackbar successMessage={successMessage} setIsMessageShown={setIsMessageShown} />}
      {isErrorShown && <ErrorSnackbar errorMessage={error} setIsErrorShown={setIsErrorShown} />}
    </>
  )
}


LinearOrderInfo.propTypes = {
  order: PropTypes.shape({
    _id: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    status: PropTypes.string,
    cart: PropTypes.shape({
      items: PropTypes.array,
      totalPrice: PropTypes.number
    })
  })
}


export default LinearOrderInfo