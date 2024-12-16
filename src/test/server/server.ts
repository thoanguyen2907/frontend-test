import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'

import { productsData } from '../data/productsData'
import { Product, ProductEdit } from '@/types/Product'
import { API_URL } from '../../utils/constant'

export const handlers = [
  http.patch(`${API_URL}/products/:id`, async ({ request, params }) => {
    const update = (await request.json()) as ProductEdit
    const { id } = params
    const index = productsData.findIndex((p) => p.id === id)
    if (index > -1) {
      return HttpResponse.json({ ...productsData[index], ...update })
    } else {
      return HttpResponse.json({
        status: 404
      })
    }
  }),
  http.get(`${API_URL}/products/:id`, async ({ request, params }) => {
    const { id } = params
    if(id === "a90f6a68-ac3f-48a6-95a8-31825dbfeae7"){
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
    }

   return HttpResponse.json(
    {
      code: 404,
      success: false,
      details: {
        status: 'NOT_FOUND',
        error: null,
        message: 'Could not find the Id',
      },
      message: 'Could not find the Id',
      error: [
        {
          message: 'Could not find the Id',
        },
      ],
    },
    { status: 404 }
  );
  })
]

const server = setupServer(...handlers)

export default server
