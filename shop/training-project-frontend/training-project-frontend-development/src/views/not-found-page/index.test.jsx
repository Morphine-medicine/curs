import React from 'react'
import { render, screen } from '@testing-library/react'
import NotFoundPage from '.'

describe('Not Found Page tests', () => {

  it('Renders properly', () => {
    render(<NotFoundPage />)
    expect(screen.getByRole('img')).toBeInTheDocument()
    expect(screen.getByText(/not-found/i)).toBeInTheDocument()
  })


})
