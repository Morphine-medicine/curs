import React from 'react'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import LinearUserInfo from '.'
import { ROLE } from '../../clientConfig'
const emptyUser = {
  _id: '',
  id: 0,
  username: '',
  roles: []
}
const user = {
  _id: 'someId',
  id: 1,
  username: 'someUsername',
  roles: [ROLE.USER, ROLE.ADMIN]
}
describe('Linear User Info tests', () => {

  it('Renders properly with user prop', () => {
    render(
      <BrowserRouter>
        <LinearUserInfo user={user} />
      </BrowserRouter>)
    expect(screen.getByText(/some/)).toBeInTheDocument()
  })

  it('Renders with an empty user prop', () => {
    render(
      <BrowserRouter>
        <LinearUserInfo user={emptyUser} />
      </BrowserRouter>)
    expect(screen.getByRole('link')).toBeInTheDocument()
  })

})
