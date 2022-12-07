import React from 'react'
import { render } from '@testing-library/react'
import LoadingContainer from '.'
describe('Loading container tests', () => {

  it('Renders properly when loading=true', () => {
    const {container} = render(<LoadingContainer loading={true} />)
    expect(container.getElementsByClassName('spinner-container')).toHaveLength(1)
  })

  it('Renders properly when loading=false', () => {
    const {container} = render(<LoadingContainer loading={false} />)
    expect(container.getElementsByClassName('spinner-container')).toHaveLength(0)
  })



})
