import React from 'react'
import { Box, AppBar, Toolbar, IconButton, Container } from '@material-ui/core'
import { Menu, Person, ShoppingCart } from '@material-ui/icons'
import PropTypes from 'prop-types'
import { NavLink, useHistory } from 'react-router-dom'
import './styles.scss'
import { putData } from '../../requests/requests'
import { useSelector, useDispatch } from 'react-redux'
import { ROLE } from '../../clientConfig'
import { clearCart } from '../../redux/reducers/cartReducer'

const Header = ({ roles }) => {
  const dispatch = useDispatch()
  const items = useSelector(state => state.cart.addedItems)
  const totalPrice = useSelector(state => state.cart.totalPrice)
  const history = useHistory()
  const logout = () => {
    const userId = localStorage.getItem('userId')
    localStorage.clear()
    putData(`/api/shoppingCart/${userId}`, {
      cart: {
        items,
        totalPrice
      }
    })
      .then(() => {
        dispatch(clearCart())
        history.push('/')
      })
      .finally(() => window.location.reload())
  }

  return (
    <header>
      <AppBar position='static' style={{ background: '#2E3B55' }}>
        <Container maxWidth='lg'>
          <Toolbar className='toolbar-container'>
            <Box width='35%'>
              <IconButton
                size='medium'
                edge='start'
                color='inherit'
                sx={{ mr: 2 }}
              >
                <Menu />
              </IconButton>
            </Box>
            <NavLink className='link' activeClassName='link-active' exact to='/'>
              Home
            </NavLink>
            <NavLink className='link' activeClassName='link-active' exact to='/about'>
              About us?
            </NavLink>
            {roles.includes(ROLE.MODER) &&
              <>
                <NavLink className='link' activeClassName='link-active' exact to='/add-item'>
                  Add item
                </NavLink>
                <NavLink className='link' activeClassName='link-active' exact to='/all-orders'>
                  All orders
                </NavLink>
              </>
            }

            {roles.includes(ROLE.ADMIN) &&
              <NavLink className='link' activeClassName='link-active' exact to='/admin/all-users'>
                Admin
              </NavLink>}

            {!roles ?
              <NavLink exact to='/login' className='link' activeClassName='link-active'>
                Login
              </NavLink> :
              <a className='link' onClick={logout}>
                Logout
              </a>
            }

            <NavLink exact to='/cart' className='link' activeClassName='link-active'>
              <IconButton
                size='medium'
                edge='end'
                color='inherit'
              >
                <ShoppingCart />
              </IconButton>
            </NavLink>

            {roles.includes(ROLE.USER) && <NavLink exact to='/personal-cabinet' className='link' activeClassName='link-active'>
              <IconButton
                size='medium'
                edge='start'
                color='inherit'
              >
                <Person />
              </IconButton>
            </NavLink>}

          </Toolbar>
        </Container>
      </AppBar>
    </header>)
}

Header.propTypes = { roles: PropTypes.string }

export default Header