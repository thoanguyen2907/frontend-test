import { ProductEdit } from '@/types/Product'

import {
  editProductAsync,
  fetchAllProductAsync,
  fetchOneProductAsync
} from '../../redux/reducers/productsReducer'
import { createStore } from '../../redux/store'

import server from '../server/server'

beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }))
afterAll(() => server.close())
afterEach(() => server.resetHandlers())

let store = createStore()

beforeEach(() => {
  store = createStore({
    productReducer: {
      products: [
        {
          id: '63bc4393-553a-4777-ab43-935b13fda0e7',
          brand: 'Old Brand',
          model: 'Old Model',
          socket: 'LGA1151',
          fanSize: 100.0,
          fanSpeed: 1500,
          fanNoiseLevel: 30.0,
          numberOfFans: 1,
          price: 49.99
        }
      ], 
      product: null
    }
  })
})
describe('test normal action in productsReducer', () => {
  test('shoudl return initial state', () => {
    expect(store.getState().productReducer.products).toMatchObject([
      {
        id: '63bc4393-553a-4777-ab43-935b13fda0e7',
        brand: 'Old Brand',
        model: 'Old Model',
        socket: 'LGA1151',
        fanSize: 100.0,
        fanSpeed: 1500,
        fanNoiseLevel: 30.0,
        numberOfFans: 1,
        price: 49.99
      }
    ])
  })
})
describe('test async thunk actions in productsReducer', () => {
  test('Should fetch all products with pagination', async () => {
    const controller = new AbortController()
    const { signal } = controller
    await store.dispatch(fetchAllProductAsync({ limit: 5, offset: 0, signal }))
    expect(store.getState().productReducer.products.length).toBe(5)
  })
  test('Should update product with id', async () => {
    const id: string = '63bc4393-553a-4777-ab43-935b13fda0e7'
    const input: ProductEdit = {
      brand: 'Hitech Master',
      model: 'Hyper 212',
      socket: 'LGA1700',
      fanSize: 120.0,
      fanSpeed: 2000,
      fanNoiseLevel: 38.0,
      numberOfFans: 23,
      price: 59.99
    }
    await store.dispatch(editProductAsync({ editProduct: input, id: id }))

    const updatedProduct = store
      .getState()
      .productReducer.products.find((product) => product.id === id)

    expect(updatedProduct).toMatchObject({
      id,
      ...input
    })
    expect(updatedProduct).toBeTruthy()
    expect(updatedProduct?.brand).toBe('Hitech Master')
  })

  test('should fetch a product by ID successfully', async () => {
    const id = 'a90f6a68-ac3f-48a6-95a8-31825dbfeae7'

    const result = await store.dispatch(
      fetchOneProductAsync({ id, signal: new AbortController().signal })
    )

    const updatedProduct = store.getState().productReducer.product
    
    expect(result.type).toBe('fetchOneProductAsync/fulfilled')
    expect(updatedProduct).toEqual({
      id,
      brand: 'Hitech Master',
      model: 'Hyper 212',
      socket: 'LGA1700',
      fanSize: 120.0,
      fanSpeed: 2000,
      fanNoiseLevel: 38.0,
      numberOfFans: 100,
      price: 59.99
    })
  })

})
