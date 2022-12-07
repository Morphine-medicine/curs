import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import UserInfo from '.'
import { Provider } from 'react-redux'
import store from '../../redux/store'
import { BrowserRouter } from 'react-router-dom'
import { postData } from '../../requests/requests'
describe('User Info tests', () => {

  beforeAll(async () => {
    const response = await postData('/api/login', { username: 'admin1', password: 'adminpass1' })
    localStorage.setItem('roles', response.roles)
  }),

  it('Renders container properly', () => {
    const { container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <UserInfo />
        </BrowserRouter>
      </Provider>
    )

    expect(container.getElementsByClassName('spinner-container')).toHaveLength(1)
  })

  it('Renders properly with values (request isn`t sent)', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <UserInfo />
        </BrowserRouter>
      </Provider>
    )

    const container = await waitFor(() => screen.findByText(/Bad Request/), {
      timeout: 2000
    })
    expect(container).toBeInTheDocument()
  })


})
