import React from 'react'
import { render, screen } from '@testing-library/react'
import Cart from '.'
import { Provider } from 'react-redux'
import store from '../../redux/store'


describe('Cart tests', () => {

  it('Renders properly', () => {
    render(
      <Provider store={store}>
        <Cart />
      </Provider>
    )
    expect(screen.getByText(/no/i)).toBeInTheDocument()
  })


})
