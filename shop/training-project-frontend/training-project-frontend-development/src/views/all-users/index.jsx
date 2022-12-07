import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Container, Box, Typography, Divider } from '@material-ui/core'
import { getData } from '../../requests/requests'
import LinearUserInfo from '../../components/linear-user-info'
import { setUsers } from '../../redux/reducers/allUsersReducer'
import ErrorSnackbar from '../../components/error-snackbar'
import LoadingContainer from '../../components/loading-container'

const AllUsers = () => {

  const dispatch = useDispatch()

  const [error, setError] = useState('')
  const [isErrorShown, setIsErrorShown] = useState(false)

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    getData('/api/roles')
      .then(response => {
        dispatch(setUsers({ users: response }))
      })
      .catch(e => {
        setError(e.statusText)
        setIsErrorShown(true)
      })
      .finally(() => setTimeout(() => setLoading(false), 1000))

  }, [])

  const users = useSelector(state => state.allUsers.users)

  return (
    <Container component='main' maxWidth='lg'>
      <LoadingContainer loading={loading}>
        <Box mt={10} className='user-info-container' sx={{ bgcolor: '#ceb19c' }}>

          <Box p={3}>
            <Typography variant='h6' >Avatar</Typography>
          </Box>

          <Box p={3}>
            <Typography variant='h6' >User id</Typography>
          </Box>

          <Box p={3}>
            <Typography variant='h6' >Username</Typography>
          </Box>

          <Box p={3}>
            <Typography variant='h6' >Roles</Typography>
          </Box>

        </Box>
        <Divider />
        {users && users.map((user, index) => <LinearUserInfo key={index} user={{ ...user, id: index + 1 }} />)}
      </LoadingContainer>
      {isErrorShown && <ErrorSnackbar errorMessage={error} setIsErrorShown={setIsErrorShown} />}
    </Container>

  )

}

export default AllUsers

