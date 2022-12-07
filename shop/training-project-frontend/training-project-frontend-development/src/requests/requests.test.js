import { getData, postData, putData, deleteData, patchData } from './requests'
import { ROLE } from '../clientConfig'

const product = {
  title: 'Test product',
  description: 'description blabla',
  price: 231,
}

const userId = '613b3238f73c75f3cf394cfe'
describe('Requests tests', () => {

  beforeAll(async () => {
    const response = await postData('/api/login', { username: 'admin1', password: 'adminpass1' })
    localStorage.setItem('roles', response.roles)
  }),

  it('Post request is done correctly', async () => {
    const response = await postData('/api/products', product)

    product._id = response._id
    expect(response.title).toBe(product.title)
  })

  it('Get request is done correctly', async () => {

    const response = await getData(`/api/products/${product._id}`)
    expect(response.title).toBe(product.title)
  })

  it('Put request is done correctly', async () => {

    const response = await putData(`/api/products/${product._id}`, product)
    expect(response.title).toBe(product.title)
  })


  it('Delete request is done correctly', async () => {

    const response = await deleteData(`/api/products/${product._id}`)
    expect(response.message).toBe('Successfully deleted')
  })

  it('Patch request is done correctly', async () => {

    const response = await patchData(`/api/roles/${userId}`, { roles: [ROLE.USER, ROLE.ADMIN] })
    expect(response.roles).toContain(ROLE.USER)
  })






})
