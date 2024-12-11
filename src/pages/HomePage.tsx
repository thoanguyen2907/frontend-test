import Card from '@/components/commons/Card'
import { useAppDispatch, useAppSelector } from '@/hooks/hooks'
import { fetchAllProductAsync } from '@/redux/reducers/productsReducer'
import React, { useEffect } from 'react'

export default function HomePage() {
  const { isLoading, error, products } = useAppSelector((state) => state.productReducer)
  const dispatch = useAppDispatch()

  console.log('products ', products)

  useEffect(() => {
    dispatch(fetchAllProductAsync({ offset: 0, limit: 10 }))
  }, [])

  const showDetail = () => {
    alert('show detail of item')
  }

  if (isLoading) {
    return <p>Loading ...</p>
  }
  if (error) {
    return <p>Error happens !!!</p>
  }

  return (
    <div>
      <h1 className="text-4xl font-extrabold text-blue-600 text-center mb-8 shadow-md">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products &&
          products.map((item) => {
            return (
              <Card
                title={item.model}
                description={item.brand}
                price={item.price}
                model={item.model}
                button={{ type: 'button', label: 'More Details', onClick: showDetail }}
              />
            )
          })}
      </div>
    </div>
  )
}
