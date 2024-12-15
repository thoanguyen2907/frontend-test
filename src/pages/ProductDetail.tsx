import Card from '@/components/commons/Card'
import Loading from '@/components/commons/Loading'
import { useAppDispatch, useAppSelector } from '@/hooks/hooks'
import { clearProduct, fetchOneProductAsync } from '@/redux/reducers/productsReducer'
import { Product } from '@/types/Product'
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function ProductDetail() {
  const { id } = useParams<string>()
  const { product, isLoading } = useAppSelector((state) => state.productReducer)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const controller = new AbortController()
    const { signal } = controller
    dispatch(clearProduct())
    if (id) {
      dispatch(fetchOneProductAsync({ id, signal }))
    }
    return () => {
      controller.abort()
    }
  }, [id, dispatch])

  const editProduct = (id: string, product: Product) => {
    navigate(`/products/edit/${id}`,  { state: product })
  }

  if (isLoading || !product) {
    return <Loading />
  }

  return (
<div className="flex items-center justify-center min-h-screen">
  <div className="w-96 p-6 bg-white rounded-lg shadow-lg">
    <Card
      model={product.model}
      brand={product.brand}
      price={product.price}
      socket={product.socket}
      fanSize={product.fanSize}
      fanSpeed={product.fanSpeed}
      fanNoiseLevel={product.fanNoiseLevel}
      numberOfFans={product.numberOfFans}
      button={{ type: 'button', label: 'Edit' }}
      onHandler={() => editProduct(product.id, product)}
    />
  </div>
</div>
  )
}
