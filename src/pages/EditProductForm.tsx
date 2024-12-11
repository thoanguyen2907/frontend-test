import Button from '@/components/commons/Button'
import Input from '@/components/commons/Input'
import { useAppDispatch, useAppSelector } from '@/hooks/hooks'
import { fetchOneProductAsync } from '@/redux/reducers/productDetailReducer'
import { editProductAsync } from '@/redux/reducers/productsReducer'
import { ProductEdit } from '@/types/Product'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

export default function EditProductForm() {
  const [product, setProduct] = useState<ProductEdit>({
    brand: '',
    model: '',
    socket: '',
    fanSize: 0,
    fanSpeed: 0,
    fanNoiseLevel: 0,
    numberOfFans: 0,
    price: 0
  })
    const { isLoading } = useAppSelector((state) => state.productReducer)
  const {state} = useLocation();
  const dispatch = useAppDispatch()
  const { id } = useParams<string>()
  const navigate = useNavigate();
 
  useEffect(() => {
     if(state) {
    setProduct(state)
  }
  }, [state])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target
    setProduct({
      ...product,
      [name]: value
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(editProductAsync({editProduct: product, id}))
    navigate("/")
  }
 if(isLoading) {
  return <p>Loading ...</p>
 }
  return (
    <div>
      <h2>Edit Product Form</h2>
      
      <form onSubmit={handleSubmit}>
        <Input label={'Model'} name={'model'} value={product.model} onChange={handleChange} />
        <Input label={'Brand'} name={'brand'} value={product.brand} onChange={handleChange} />
        <Input
          label={'Socket'}
          name={'socket'}
          value={product.socket}
          onChange={handleChange}
        />
        <Input
          label={'Fan Size'}
          name={'fanSize'}
          value={product.fanSize}
          onChange={handleChange}
        />
        <Input
          label={'Fan Speed'}
          name={'fanSpeed'}
          value={product.fanSpeed}
          onChange={handleChange}
        />
        <Input
          label={'Fan Noise Level'}
          name={'fanNoiseLevel'}
          value={product.fanNoiseLevel}
          onChange={handleChange}
        />
        <Input
          label={'Number of fans'}
          name={'numberOfFans'}
          value={product.numberOfFans}
          onChange={handleChange}
        />
        <Input label={'Price'} name={'price'} value={product.price} onChange={handleChange} />
        <Button label={'submit'} type={'submit'} />
      </form>
    </div>
  )
}