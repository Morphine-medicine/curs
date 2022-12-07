import React from 'react'
import { render, screen } from '@testing-library/react'
import CustomCarousel from '.'
import slider1 from '../../assets/slider-1.jpg'
import slider2 from '../../assets/slider-2.jpg'
import slider3 from '../../assets/slider-3.jpg'


describe('Carousel tests', () => {

  it('Renders with single image', () => {
    render(<CustomCarousel items={[slider1]} />)
    expect(screen.getByRole('img')).toBeInTheDocument()
  })

  it('Renders with multiple images and displays only one', () => {
    render(<CustomCarousel items={[slider1, slider2, slider3]} />)
    expect(screen.queryAllByRole('img')).toHaveLength(1)
  })

  it('doesn`t render when no images are passed', () => {
    render(<CustomCarousel items={[]} />)
    expect(screen.queryAllByRole('img')).toHaveLength(0)
  })
})
