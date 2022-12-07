import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import AddItem from '.'
import { BrowserRouter } from 'react-router-dom'
import imagePlaceholder from '../../assets/image-placeholder.jpg'
import userEvent from '@testing-library/user-event'
describe('Add item tests', () => {


  it('Renders properly', () => {
    render(
      <BrowserRouter>
        <AddItem />
      </BrowserRouter>
    )
    expect(screen.getByText(/please fill in/i)).toBeInTheDocument()
  })

  it('Tests resetImg func', () => {
    render(
      <BrowserRouter>
        <AddItem />
      </BrowserRouter>
    )
    fireEvent.click(screen.getByTestId('resetBtn'))
    expect(screen.getByRole('img')).toHaveProperty('src', 'http://localhost/' + imagePlaceholder)
    expect(screen.getByTestId('title')).toHaveProperty('value', '')
  })

  it('Tests reset func', () => {
    render(
      <BrowserRouter>
        <AddItem />
      </BrowserRouter>
    )
    fireEvent.click(screen.getByTestId('resetImg'))
    expect(screen.getByRole('img')).toHaveProperty('src', 'http://localhost/' + imagePlaceholder)
  })

  it('Tests inputs and setStates func', () => {
    const checkInput = (testId, expectedValue, initialValue) => {
      const input = screen.getByTestId(testId)
      expect(input.value).toBe(initialValue)
      userEvent.type(input, expectedValue)
      expect(input.value).toBe(expectedValue)
      expect(screen.getByDisplayValue(expectedValue)).toBeInTheDocument()
    }

    render(
      <BrowserRouter>
        <AddItem />
      </BrowserRouter>
    )


    checkInput('title', 'title', '')
    checkInput('desc', 'desc', '')


    const priceInput = screen.getByTestId('price')
    expect(priceInput.value).toBe('0')
    userEvent.type(priceInput, '111')
    expect(screen.getByDisplayValue(/0111/)).toBeInTheDocument()
  })


  it('Renders properly when isEditable={true}', async () => {
    render(
      <BrowserRouter>
        <AddItem isEditable={true}/>
      </BrowserRouter>
    )
    expect(screen.getByText(/please fill in/i)).toBeInTheDocument()
  })
})
