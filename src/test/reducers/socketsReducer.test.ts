import { fetchAllSocketAsync } from '../../redux/reducers/socketsReducer'
import { createStore } from '../../redux/store'

import server from '../server/server'

beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }))
afterAll(() => server.close())
afterEach(() => server.resetHandlers())

let store = createStore()

beforeEach(() => {
  store = createStore({
    socketReducer: {
      sockets: [
        {
          id: '48397058-216e-4e09-9821-952e9ecfbdea',
          name: 'TRX4'
        }
      ]
    }
  })
})
describe('test normal action in socketsReducer', () => {
  test('shoudl return initial state', () => {
    expect(store.getState().socketReducer.sockets).toMatchObject([
      {
        id: '48397058-216e-4e09-9821-952e9ecfbdea',
        name: 'TRX4'
      }
    ])
  })
})
describe('test async thunk actions in socketsReducer', () => {
  test('Should fetch all sockets with pagination', async () => {
    const controller = new AbortController()
    const { signal } = controller
    await store.dispatch(fetchAllSocketAsync({ limit: 3, offset: 0, signal }))
    expect(store.getState().socketReducer.sockets.length).toBe(3)
  })
})
