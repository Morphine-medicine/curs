import React from 'react'
import { render} from '@testing-library/react'
import Router from '.'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from '../redux/store'
import { ROLE } from '../clientConfig'

describe('Router tests', () => {

  beforeAll(() => {
    localStorage.setItem('roles', [ROLE.ADMIN, ROLE.MODER, ROLE.USER].join(','))
  })

  it('Renders properly', () => {
    const { container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </Provider>)


    expect(container.getElementsByClassName('spinner-container')).toHaveLength(1)

  })

})
