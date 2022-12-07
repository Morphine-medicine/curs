import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import ErrorSnackbar from '.'


describe('Error snackbar tests', () => {


  it('Renders without text prop', () => {
    render(<ErrorSnackbar />)

    expect(screen.getByRole('alert')).toBeInTheDocument()
    expect(screen.getByText(/wrong/i)).toBeInTheDocument()
  })

  it('Renders with text prop', () => {
    render(<ErrorSnackbar errorMessage={'Testing'} />)

    expect(screen.getByText(/testing/i)).toBeInTheDocument()
  })

  it('Tests onClose function when user clicks on a cross icon', () => {
    const setShown = jest.fn()
    render(<ErrorSnackbar errorMessage={'Testing'} setIsErrorShown={setShown} />)
    fireEvent.click(screen.getByRole('button'))
    expect(setShown).toHaveBeenCalled()

  })


  /*this one doesn't increase coverage */
  it('Tests onClose function when user clicks anywhere but not on a cross', () => {
    const setShown = jest.fn()
    render(<ErrorSnackbar errorMessage={'Testing'} setIsErrorShown={setShown} />)
    fireEvent.click(screen.getByTestId('test'))
    expect(setShown).not.toHaveBeenCalled()

  })
})
