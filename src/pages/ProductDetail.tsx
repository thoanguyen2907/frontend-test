import Card from '@/components/commons/Card'
import { useAppDispatch, useAppSelector } from '@/hooks/hooks'
import { clearProduct, fetchOneProductAsync } from '@/redux/reducers/productDetailReducer'
import { Product } from '@/types/Product'
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function ProductDetail() {
  const { id } = useParams<string>()
  const { isLoading, product } = useAppSelector((state) => state.productDetailReducer)

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

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (!product) {
    return <p>Product not found.</p>
  }

  return (
    <div>
      <Card
        title={product.model}
        description={product.brand}
        price={product.price}
        model={product.model}
        button={{ type: 'button', label: 'Edit' }}
        onHandler={() => editProduct(product.id, product)}
      />
    </div>
  )
}
