import { Box, Typography, Modal, IconButton, TextField, Button } from '@material-ui/core'
import { CloseOutlined } from '@material-ui/icons'
import { PropTypes } from 'prop-types'
import React, { useState } from 'react'
import { postData } from '../../requests/requests'
import ErrorSnackbar from '../error-snackbar'
import SuccessSnackbar from '../success-snackbar'
const OrderModal = ({ isModalOpen, setIsModalOpen, orderData, setOrderData, setLoading }) => {


  const [error, setError] = useState('')
  const [isErrorShown, setIsErrorShown] = useState(false)


  const [successMessage, setSuccessMessage] = useState('')
  const [isMessageShown, setIsMessageShown] = useState(false)


  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid blue',
    boxShadow: 24,
    py: 2,
    px: 10
  }

  const onModalClose = () => setIsModalOpen(false)

  const postOrderData = () => {
    postData('/api/orders/placeOrder', orderData)
      .then(() => {

        setOrderData({
          email: '',
          phone: '',
          cart: {
            items: [],
            totalPrice: 0
          }
        })

        localStorage.removeItem('persist:root')
        setSuccessMessage('Order created! Page will reload now.')
        setIsMessageShown(true)
        setIsModalOpen(false)
      })
      .then(() => {
        setTimeout(() => {
          setLoading(true)
          window.location.reload()
        }, 5000)
      })
      .catch(e => {
        setError(e.statusText)
        setIsErrorShown(true)
      })
      .finally(() => {
        setLoading(false)
      })
  }
  return (
    <>
      <Modal
        open={isModalOpen}
        onClose={onModalClose}
      >
        <Box sx={style}>
          <Box display='flex' justifyContent='end' mb={2}>
            <IconButton
              size='small'
              aria-label='close'
              color='inherit'
              onClick={onModalClose}
            >
              <CloseOutlined fontSize='small' />
            </IconButton>
          </Box>
          <Typography variant='h6' component='p' align='center'>
            Enter your data
          </Typography>
          <TextField
            value={orderData.email}
            onChange={(e) => setOrderData({ ...orderData, email: e.target.value })}
            margin='normal'
            required
            fullWidth
            label='Email'
            autoFocus
            size='small'
            type='email'
          />
          <TextField
            value={orderData.phone}
            onChange={(e) => setOrderData({ ...orderData, phone: e.target.value })}
            margin='normal'
            required
            fullWidth
            label='Phone Number'
            size='small'
            type='tel'
            mb={5}
          />
          <Box mt={5}>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              onClick={() => postOrderData()}
            >
              Place an order
            </Button>
          </Box>

        </Box>

      </Modal>
      {isMessageShown && <SuccessSnackbar successMessage={successMessage} setIsMessageShown={setIsMessageShown} />}
      {isErrorShown && <ErrorSnackbar errorMessage={error} setIsErrorShown={setIsErrorShown} />}
    </>
  )
}

OrderModal.propTypes = {
  isModalOpen: PropTypes.bool,
  setIsModalOpen: PropTypes.func,
  orderData: PropTypes.shape({
    userId: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
  }),
  setOrderData: PropTypes.func,
  setLoading: PropTypes.func,

}
export default OrderModal

