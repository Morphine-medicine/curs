import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Header from '.'
import { ROLE } from '../../clientConfig'
import { Provider } from 'react-redux'
import store from '../../redux/store'


describe('Header tests', () => {


  it('Renders correct text for admin', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Header roles={ROLE.ADMIN} />
        </Provider>

      </BrowserRouter>
    )

    expect(screen.getByText(/admin/i)).toBeInTheDocument()
    expect(screen.getByText(/logout/i)).toBeInTheDocument()
  })

  it('Renders correct text for moder', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Header roles={ROLE.MODER} />
        </Provider>
      </BrowserRouter>
    )

    expect(screen.getByText(/add/i)).toBeInTheDocument()
    expect(screen.getByText(/logout/i)).toBeInTheDocument()
  })

  it('Renders correct text for user', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Header roles={ROLE.USER} />
        </Provider>
      </BrowserRouter>
    )

    expect(screen.getByText(/logout/i)).toBeInTheDocument()
  })

  it('Renders with empty string', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Header roles='' />
        </Provider>
      </BrowserRouter>
    )

    expect(screen.getByText(/login/i)).toBeInTheDocument()
  })

  it('Tests logout function', () => {
    jest.spyOn(window.localStorage.__proto__, 'clear')
    window.localStorage.__proto__.clear = jest.fn()

    render(
      <BrowserRouter>
        <Provider store={store}>
          <Header roles={ROLE.ADMIN} />
        </Provider>
      </BrowserRouter>
    )

    fireEvent.click(screen.getByText('Logout'))
    expect(window.localStorage.clear).toHaveBeenCalledTimes(1)

  })

})

