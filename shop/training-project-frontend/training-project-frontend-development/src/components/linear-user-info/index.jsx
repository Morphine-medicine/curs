import React from 'react'
import { PropTypes } from 'prop-types'
import { Box, Typography, Avatar, Divider } from '@material-ui/core'
import './styles.scss'
import { Link } from 'react-router-dom'

const LinearUserInfo = ({ user }) => {

  return (
    <>
      <Box className='user-info-container' sx={{ bgcolor: '#e2d0c3' }}>
        <Box p={2} sx={{ mx: 'auto' }}>
          <Link to={`user-info/${user._id}`} className='avatar'>
            <Avatar>{user.username.split('')[0]}</Avatar>
          </Link>

        </Box>

        <Box p={2} className='field'>
          <Typography variant='body1' >{user.id}</Typography>
        </Box>

        <Box p={2} className='field'>
          <Typography variant='body1' >{user.username}</Typography>
        </Box>

        <Box p={2} className='field'>
          <Typography variant='body1' >{user.roles.join(' | ')}</Typography>
        </Box>
      </Box>
      <Divider />
    </>
  )

}

LinearUserInfo.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string,
    id: PropTypes.number,
    username: PropTypes.string,
    roles: PropTypes.arrayOf(PropTypes.string),
    /*can be extended */
  })
}


export default LinearUserInfo

