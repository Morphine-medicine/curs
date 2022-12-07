import React from 'react'
import { render } from '@testing-library/react'
import App from './App'


describe('App.js tests', () => {
  it('renders learn full App', () => {

    const { container } = render(<App />)
    expect(container.getElementsByClassName('app-wrapper')).toHaveLength(1)

  })
})
