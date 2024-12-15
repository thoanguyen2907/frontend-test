import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import Card from '@/components/commons/Card'
import Loading from '@/components/commons/Loading'

import { useAppDispatch, useAppSelector } from '@/hooks/hooks'
import { fetchAllProductAsync } from '@/redux/reducers/productsReducer'

export default function HomePage() {
  const { products, isLoading } = useAppSelector((state) => state.productReducer)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const controller = new AbortController()
    const { signal } = controller

    dispatch(fetchAllProductAsync({ offset: 0, limit: 10, signal }))

    return () => {
      controller.abort()
    }
  }, [])

  const showDetail = (id: string) => {
    navigate(`products/${id}`)
  }

  if (products.length === 0 || isLoading) {
    return <Loading />
  }
  return (
    <div>
      <h1 className="text-4xl font-extrabold text-blue-600 text-center mb-8 shadow-md">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {products.length > 0 &&
          products.map((item) => {
            return (
              <Card
                key={item.id}
                socket={item.socket}
                brand={item.brand}
                price={item.price}
                model={item.socket}
                button={{ type: 'button', label: 'More Details' }}
                onHandler={() => showDetail(item.id)}
              />
            )
          })}
      </div>
    </div>
  )
}
