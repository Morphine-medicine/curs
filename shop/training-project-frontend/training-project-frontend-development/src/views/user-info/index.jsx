import { Button, Container, Box, Typography, Select, OutlinedInput, MenuItem } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { ROLE } from '../../clientConfig'
import ErrorSnackbar from '../../components/error-snackbar'
import { getData, patchData } from '../../requests/requests'
import './styles.scss'
import avatarPlaceholder from '../../assets/avatar-placeholder.jpg'
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '../../redux/reducers/userReducer'
import SuccessSnackbar from '../../components/success-snackbar'
import LoadingContainer from '../../components/loading-container'

const UserInfo = () => {

  const { id } = useParams()

  const rolesArray = Object.keys(ROLE)
  const user = useSelector(state => state.userInfo.user)
  const dispatch = useDispatch()

  //error handling
  const [error, setError] = useState('')
  const [isErrorShown, setIsErrorShown] = useState(false)

  //success handling
  const [successMessage, setSuccessMessage] = useState('')
  const [isMessageShown, setIsMessageShown] = useState(false)

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    getData(`/api/roles/${id}`)
      .then(response => {
        dispatch(setUser({ user: response }))
      })
      .catch(e => {
        setError(e.statusText)
        setIsErrorShown(true)
      })
      .finally(() => setTimeout(() => setLoading(false), 1000))
  }, [])

  const onRoleChange = (e) => {
    const {
      target: { value },
    } = e
    dispatch(setUser({ user: { ...user, roles: typeof value === 'string' ? value.split(',') : value } }))
  }

  const update = () => {
    patchData(`/api/roles/${id}`, user)
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
    <Container component='main' maxWidth='lg'>
      <LoadingContainer loading={loading}>
        <Box m={10} sx={{ textAlign: 'center' }}>
          <Box display='flex' alignItems='center'>
            <img src={avatarPlaceholder} className='user-info-avatar' alt="No-avatar image" />
            <p className='user-info-biography'>Some info: Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reiciendis magnam ipsa ipsum sit corporis pariatur voluptate quaerat perspiciatis vitae quo consectetur doloremque, quibusdam consequatur nemo aliquam quis porro, sint eligendi!</p>
          </Box>

          <Box display='flex' alignItems='center' justifyContent='space-between' mt={5}>
            <Box p={3} width={250}>
              <Typography variant='h6' paragraph> Username: {user.username}</Typography>
            </Box>
            <Box p={3} width={400} display='flex' alignItems='center' justifyContent='space-between'>
              <Select
                fullWidth
                labelId="role-label"
                multiple
                value={user.roles}
                onChange={onRoleChange}
                input={<OutlinedInput label="Role" />}
                variant='outlined'
              >
                {rolesArray.map((role) => {
                  return (<MenuItem
                    selected={true}
                    key={role}
                    value={role}
                  >
                    {role}
                  </MenuItem>
                  )
                })}
              </Select>
              <Box mx={5} >
                <Button variant='outlined' size='large' onClick={() => update()}>Update</Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </LoadingContainer>
      {isMessageShown && <SuccessSnackbar successMessage={successMessage} setIsMessageShown={setIsMessageShown} />}
      {isErrorShown && <ErrorSnackbar errorMessage={error} setIsErrorShown={setIsErrorShown} />}
    </Container>

  )

}

export default UserInfo
