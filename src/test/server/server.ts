import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { productsData } from '../data/productsData'
import { Product, ProductEdit, UpdateProduct } from '@/types/Product'

export const handlers = [
  http.patch('http://localhost:8080/api/v1/products/:id', async ({ request, params }) => {
    console.log('catch the request')
    const update = (await request.json()) as ProductEdit
    const { id } = params
    const index = productsData.findIndex((p) => p.id === id)
    if (index > -1) {
      return HttpResponse.json({ ...productsData[index], ...update })
    } else {
      return HttpResponse.json({
        status: 400
      })
    }
  }),
  http.get('http://localhost:8080/api/v1/products/:id', async ({ request, params }) => {
    const { id } = params
    const productDetail: Product = {
      id,
      brand: 'Hitech Master',
      model: 'Hyper 212',
      socket: 'LGA1700',
      fanSize: 120.0,
      fanSpeed: 2000,
      fanNoiseLevel: 38.0,
      numberOfFans: 100,
      price: 59.99
    }
    return HttpResponse.json(productDetail)
  })
]

const server = setupServer(...handlers)

export default server