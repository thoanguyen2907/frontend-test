import React, { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

import Button from '@/components/commons/Button'
import Dropdown from '@/components/commons/Dropdown'
import Input from '@/components/commons/Input'

import { useAppDispatch, useAppSelector } from '@/hooks/hooks'
import { editProductAsync } from '@/redux/reducers/productsReducer'
import { fetchAllSocketAsync } from '@/redux/reducers/socketsReducer'
import { ProductEdit } from '@/types/Product'
import { API_URL } from '@/utils/constant'
import { stat } from 'fs'

const validationSchema = Yup.object({
  model: Yup.string().required('Model is required'),
  brand: Yup.string().required('Brand is required'),
  fanSize: Yup.number()
    .required('Fan Size is required')
    .positive('Fan Size must be a positive number'),
  fanSpeed: Yup.number()
    .required('Fan Speed is required')
    .positive('Fan Speed must be a positive number'),
  fanNoiseLevel: Yup.number()
    .required('Fan Noise Level is required')
    .positive('Fan Noise Level must be a positive number'),
  socket: Yup.string().required('Socket type is required'),
  numberOfFans: Yup.number()
    .required('Number of fans is required')
    .positive('Number of fans must be greater than zero')
    .integer('Number of fans must be an integer'),
  price: Yup.number().required('Price is required').positive('Price must be a positive number')
})

export default function EditProductForm() {
  const { isLoading } = useAppSelector((state) => state.productReducer)
  const { sockets } = useAppSelector((state) => state.socketReducer)

  const { state } = useLocation()
  const { id } = useParams<string>()

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const controller = new AbortController()
    const { signal } = controller
    dispatch(fetchAllSocketAsync({ offset: 0, limit: 10, signal }))

    return () => {
      controller.abort()
    }
  }, [])

  // key socket return as string value not id, need to map to shape: key - value pair
  // and run for loop to check key existed? convert to socketId
  const converNameToId = useMemo(() => {
    const mapSocketData = new Map()
    sockets.forEach((socket) => {
      mapSocketData.set(socket.name, socket.id)
    })
    return mapSocketData
  }, [sockets])

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    defaultValues: state,
    resolver: yupResolver(validationSchema)
  })

  const onSubmit = (data: ProductEdit) => {
    let socketId = data.socket
    if (socketId) {
      if (converNameToId.has(socketId)) {
        socketId = converNameToId.get(socketId)
      }
      const updatedData = { ...data, socket: socketId }
      dispatch(editProductAsync({ editProduct: updatedData, id }))
      navigate('/')
    }
  }

  if (isLoading) {
    return <p>Loading ...</p>
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg px-4">
        <h2 className="text-center font-bold text-xl">Edit Product Form</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="model"
            control={control}
            render={({ field: { ref, ...field } }) => (
              <Input
                {...field}
                name={'model'}
                label="Model"
                value={field.value}
                onChange={field.onChange}
                error={errors.model?.message}
              />
            )}
          />
          <Controller
            name="brand"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label="Brand"
                name={'brand'}
                value={field.value}
                onChange={field.onChange}
                error={errors.brand?.message}
              />
            )}
          />
          <Controller
            name="fanSize"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label="Fan Size"
                name={'fanSize'}
                value={field.value}
                onChange={field.onChange}
                error={errors.fanSize?.message}
              />
            )}
          />
          <Controller
            name="fanSpeed"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label="Fan Speed"
                name={'fanSpeed'}
                value={field.value}
                onChange={field.onChange}
                error={errors.fanSpeed?.message}
              />
            )}
          />
          <Controller
            name="fanNoiseLevel"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label="Fan Noise Level"
                name={'fanNoiseLevel'}
                value={field.value}
                onChange={field.onChange}
                error={errors.fanNoiseLevel?.message}
              />
            )}
          />
          <Controller
            name="socket"
            control={control}
            render={({ field }) => (
              <Dropdown
                {...field}
                label="Socket Type"
                value={field.value}
                options={sockets}
                onChange={field.onChange}
                name={'socket'}
                error={errors.socket?.message}
              />
            )}
          />
          <Controller
            name="numberOfFans"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label="Number of Fans"
                name={'numberOfFans'}
                value={field.value}
                onChange={field.onChange}
                error={errors.numberOfFans?.message}
              />
            )}
          />
          <Controller
            name="price"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label="Price"
                name={'price'}
                value={field.value}
                onChange={field.onChange}
                error={errors.price?.message}
              />
            )}
          />

          <Button label={'submit'} type={'submit'} />
        </form>
      </div>
    </div>
  )
}
