import React from 'react'
import { render, screen } from '@testing-library/react'
import Footer from '.'


describe('Footer tests', () => {

  it('Renders with correct year', () => {
    render(<Footer />)
    expect(screen.getByText(/2021/)).toBeInTheDocument()
  })
})
