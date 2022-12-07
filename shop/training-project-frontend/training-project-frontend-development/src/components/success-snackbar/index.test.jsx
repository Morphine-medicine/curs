import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import SuccessSnackbar from '.'

describe('Succes snackbar tests', () => {


  it('Renders without text prop', () => {
    render(<SuccessSnackbar />)

    expect(screen.getByRole('alert')).toBeInTheDocument()
  })

  it('Renders with text prop', () => {
    render(<SuccessSnackbar successMessage={'Testing'} />)

    expect(screen.getByText(/testing/i)).toBeInTheDocument()
  })

  it('Tests onClose function when user clicks on a cross icon', () => {
    const setShown = jest.fn()
    render(<SuccessSnackbar successMessage={'Testing'} setIsMessageShown={setShown} />)
    fireEvent.click(screen.getByRole('button'))
    expect(setShown).toHaveBeenCalled()

  })
})