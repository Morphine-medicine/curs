import React from 'react'
import { render, waitFor, screen } from '@testing-library/react'
import Home from '.'
import { Provider } from 'react-redux'
import store from '../../redux/store'

describe('Home tests', () => {

  it('Renders container properly', () => {
    const { container } = render(
      <Provider store={store}>
        <Home />
      </Provider>
    )

    expect(container.getElementsByClassName('spinner-container')).toHaveLength(1)
  })

  it('Renders properly with values', async () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    )

    const container = await waitFor(() => screen.findByTestId('grid'), {
      timeout: 2000
    })
    expect(container).toBeInTheDocument()
  })


})
