import React from 'react'
import { render, screen } from '@testing-library/react'
import ProductCard from '.'
import { Provider } from 'react-redux'
import store from '../../redux/store'


const item = {
  _id: 'someId',
  title: 'title',
  description: 'desc',
  imageKey: 'key',
  price: 1,
  quantity: 0
}

const itemInCart = { ...item, quantity: 1 }

describe('Product card tests', () => {

  it('Renders properly with item', () => {
    render(
      <Provider store={store}>
        <ProductCard item={item} />
      </Provider>
    )
    expect(screen.getByText(/title/)).toBeInTheDocument()
    expect(screen.getByText(/desc/)).toBeInTheDocument()
    expect(screen.getAllByRole('button')).toHaveLength(2)
  })

  it('Renders properly and is in cart', () => {
    render(
      <Provider store={store}>
        <ProductCard item={itemInCart} inCart={true} />
      </Provider>
    )
    expect(screen.getByText(/quantity/i)).toBeInTheDocument()
  })

})
