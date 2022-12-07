import React, { useState } from 'react'
import { Snackbar, IconButton } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { PropTypes } from 'prop-types'
import { CloseOutlined } from '@material-ui/icons'
const SuccessSnackbar = ({ successMessage, setIsMessageShown }) => {

  const [shown, setShown] = useState(true)

  const handleClose = (e, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setShown(false)
    setIsMessageShown(false)
  }

  const action = (
    <>
      <IconButton
        size='small'
        aria-label='close'
        color='inherit'
        onClick={handleClose}
      >
        <CloseOutlined fontSize='small' />
      </IconButton>
    </>
  )


  return (
    <Snackbar
      open={shown}
      autoHideDuration={6000}
      onClose={handleClose}
      action={action}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Alert onClose={handleClose}
        severity='success'
        variant='filled'>
        {successMessage}
      </Alert>
    </Snackbar>)
}


SuccessSnackbar.propTypes = {
  successMessage: PropTypes.string,
  setIsMessageShown: PropTypes.func
}


export default SuccessSnackbar