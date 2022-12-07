import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import AllUsers from '.'
import { Provider } from 'react-redux'
import store from '../../redux/store'
import { postData } from '../../requests/requests'
import { BrowserRouter } from 'react-router-dom'

describe('All users tests', () => {

  beforeAll(async () => {
    const response = await postData('/api/login', { username: 'admin1', password: 'adminpass1' })
    localStorage.setItem('roles', response.roles)
  }),

  it('Renders container properly', () => {
    const { container } = render(
      <Provider store={store}>
        <AllUsers />
      </Provider>
    )

    expect(container.getElementsByClassName('spinner-container')).toHaveLength(1)
  })

  it('Renders properly with values', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <AllUsers />
        </BrowserRouter>
      </Provider>
    )

    const username = await waitFor(() => screen.findByText(/Username/i), {
      timeout: 2000
    })
    expect(username).toBeInTheDocument()
  })



})
