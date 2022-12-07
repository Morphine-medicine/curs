import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import ProductInfo from '.'
import { Provider } from 'react-redux'
import store from '../../redux/store'
import { BrowserRouter } from 'react-router-dom'

describe('Product Info tests', () => {


  it('Renders container properly', () => {
    const { container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <ProductInfo />
        </BrowserRouter>
      </Provider>
    )

    expect(container.getElementsByClassName('spinner-container')).toHaveLength(1)
  })

  it('Renders properly with values(request isn`t sent)', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter >
          <ProductInfo />
        </BrowserRouter>
      </Provider>
    )

    const container = await waitFor(() => screen.findByText(/Bad Request/), {
      timeout: 2000
    })
    expect(container).toBeInTheDocument()
  })



})
