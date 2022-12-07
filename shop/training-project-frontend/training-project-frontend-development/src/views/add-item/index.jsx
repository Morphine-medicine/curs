import React, { useEffect, useState } from 'react'
import { Container, Typography, Box, TextField, Button, Input, IconButton } from '@material-ui/core'
import { deleteData, getData, postData, putData, putImage } from '../../requests/requests'
import ErrorSnackbar from '../../components/error-snackbar'
import SuccessSnackbar from '../../components/success-snackbar'
import { PropTypes } from 'prop-types'
import { useParams } from 'react-router'
import { backendUrl } from '../../clientConfig'
import imagePlaceholder from '../../assets/image-placeholder.jpg'
import { AddAPhoto, Clear } from '@material-ui/icons'

const AddItem = ({ isEditable }) => {

  const { id } = useParams()
  const [item, setItem] = useState({
    title: '',
    description: '',
    price: 0,
    imageKey: ''
  })

  const [error, setError] = useState('')
  const [isErrorShown, setIsErrorShown] = useState(false)

  const [successMessage, setSuccessMessage] = useState('')
  const [isMessageShown, setIsMessageShown] = useState(false)

  const [image, setImage] = useState(null)
  const [imageView, setImageView] = useState(null)



  useEffect(() => {
    if (isEditable) {
      getData(`/api/products/${id}`)
        .then(response => {
          setItem(response)
          response.imageKey && setImageView(`${backendUrl}/api/images/${response.imageKey}`)
        })
        .catch(e => {
          setError(e.statusText)
          setIsErrorShown(true)
        })
    }

  }, [])

  const resetImg = () => {
    setImageView(imagePlaceholder)
    setImage(null)
    setItem({ ...item, imageKey: '' })
  }

  const reset = () => {
    resetImg()
    setItem({
      title: '',
      description: '',
      price: 0,
    })
  }

  const uploadFile = (e) => {
    setImage(e.target.files[0])
    setImageView(URL.createObjectURL(e.target.files[0]))
  }


  const addItem = () => {
    postData(`/api/products`, item)
      .then(response => image && putImage(`/api/images/${response._id}`, image))
      .then(() => {
        setSuccessMessage('Successfully added!')
        setIsMessageShown(true)
        reset()
      })
      .catch(e => {
        setError(e.statusText)
        setIsErrorShown(true)
      })
  }


  const editItem = () => {
    putData(`/api/products/${id}`, item)
      .then(response => image && putImage(`/api/images/${response._id}`, image))
      .then(() => {
        setSuccessMessage('Successfully updated!')
        setIsMessageShown(true)
        reset()
      })
      .catch(e => {
        setError(e.statusText)
        setIsErrorShown(true)
      })
  }

  const deleteItem = () => {
    deleteData(`/api/products/${id}`)
      .then(() => {
        setSuccessMessage('Successfully deleted!')
        setIsMessageShown(true)
        reset()
      })
      .catch(e => {
        setError(e.statusText)
        setIsErrorShown(true)
      })
  }


  return (
    <Container component='main'>

      <Box mb={5}>
        <Typography variant='h5' align='center'>
          Do you want to add/edit an item?
        </Typography>
        <Typography variant='h6' align='center'>
          Please fill in
        </Typography>

      </Box>
      <Box>
        <form>
          <Box display='flex' justifyContent='space-evenly'>
            <Box>

              <Box textAlign='center' display='flex' justifyContent='space-around'>
                <label htmlFor="icon-button-file">
                  <Typography variant='body1' component='span' aria-label="upload picture">Add image</Typography>
                  <Input accept="image/*" id="icon-button-file" type="file" multiple onChange={uploadFile} style={{ display: 'none' }} />
                  <IconButton color="primary" aria-label="upload picture" component="span">
                    <AddAPhoto fontSize='large' />
                  </IconButton>
                </label>

                <Box onClick={() => resetImg()} data-testid='resetImg'>
                  <IconButton color="primary" aria-label="upload picture" component="span">
                    <Clear fontSize='large' />
                  </IconButton>
                </Box>

              </Box>

              <img src={imageView ?? imagePlaceholder}
                alt="product"
                width='500px'
                height='300px'
                style={{ objectFit: 'contain' }} />

            </Box>
            <Box>
              <Box display='flex' justifyContent='space-between' mt={4}>
                <Box width='50%'>
                  <TextField
                    value={item.title}
                    onChange={(e) => setItem({ ...item, title: e.target.value })}
                    variant='filled'
                    helperText='Please enter discount title'
                    label='Title'
                    inputProps={{ 'data-testid': 'title' }}
                    required
                    autoFocus
                  />
                </Box>

                <Box width='50%'>

                  <TextField
                    value={item.price}
                    type='number'
                    onChange={(e) => setItem({ ...item, price: e.target.value })}
                    variant='filled'
                    required
                    inputProps={{ 'data-testid': 'price' }}
                    helperText='Please enter price (for 1 item in $)'
                    label='Price'
                  />
                </Box>
              </Box>

              <Box mx='auto' mt={8}>
                <TextField
                  multiline
                  minRows={4}
                  value={item.description}
                  onChange={(e) => setItem({ ...item, description: e.target.value })}
                  variant='outlined'
                  required
                  fullWidth
                  inputProps={{ 'data-testid': 'desc'}}
                  helperText='Please enter description (full) '
                  label='Description'
                />
              </Box>
            </Box>

          </Box>

          <Box mx='auto' mt={5} display='flex' justifyContent='space-evenly'>
            <Button
              variant='contained'
              color='primary'
              onClick={isEditable ? () => editItem() : () => addItem()}
              size='large'
            >
              Save
            </Button>

            <Button
              variant='contained'
              onClick={reset}
              size='large'
              data-testid='resetBtn'
            >
              Reset
            </Button>

            {isEditable && <Button
              variant='contained'
              onClick={deleteItem}
              size='large'
              style={{ backgroundColor: '#bf2202', color: '#FFFFFF' }}
            >
              Delete
            </Button>}
          </Box>


        </form>
      </Box>
      {isMessageShown && <SuccessSnackbar successMessage={successMessage} setIsMessageShown={setIsMessageShown} />}
      {isErrorShown && <ErrorSnackbar errorMessage={error} setIsErrorShown={setIsErrorShown} />}
    </Container>
  )

}

AddItem.propTypes = {
  isEditable: PropTypes.bool
}



export default AddItem

