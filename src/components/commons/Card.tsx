import React from 'react'
import Button from './Button'

interface CardProps {
  socket: string
  brand: string
  fanSize?: number
  fanSpeed?: number
  fanNoiseLevel?: number
  numberOfFans?: number
  price: number
  model: string
  button: {
    label: string
    type: 'button' | 'submit'
  }
  onHandler: () => void
}

export default function Card({
  socket,
  brand,
  fanSize,
  fanSpeed,
  fanNoiseLevel,
  numberOfFans,
  model,
  price,
  button,
  onHandler
}: CardProps) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 max-w-sm border border-gray-200">
      <h2 className="text-lg font-bold text-gray-800">{model}</h2>
      <p className="text-gray-600 mt-2">Brand: {brand}</p>
      <p className="text-gray-600 mt-2">Socket: {socket}</p>
      {fanSize && <p className="text-gray-600 mt-2">Fan Size: {fanSize} mm</p>}
      {fanSize && <p className="text-gray-600 mt-2">Fan Speed: {fanSpeed} RPM</p>}
      {fanNoiseLevel && <p className="text-gray-600 mt-2">Noise Level: {fanNoiseLevel} dBA</p>}
      {numberOfFans && <p className="text-gray-600 mt-2">Number of Fans: {numberOfFans}</p>}
      <p className="text-gray-600 mt-2">Price: ${price}</p>
      <div className="mt-4">
        <Button onClick={onHandler} type={button.type} label={button.label} />
      </div>
    </div>
  )
}
