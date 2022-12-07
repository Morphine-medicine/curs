import React from 'react'
import { render } from '@testing-library/react'
import Spinner from '.'

describe('Spinner tests', () => {

  it('Renders properly', () => {
    const { container } = render(<Spinner />)
    expect(container.getElementsByClassName('spinner-container')).toHaveLength(1)
  })



})
