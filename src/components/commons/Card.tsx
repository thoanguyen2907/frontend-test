import React from 'react'
import Button from './Button'

interface CardProps {
    title: string
    description: string
    price: number 
    model: string 
    button: {
        label: string, 
        type: "button" | "submit"
    }
    onHandler: () => void;
}

export default function Card({ title, description, model, price, button, onHandler }: CardProps) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 max-w-sm border border-gray-200">
      <h2 className="text-lg font-bold text-gray-800">{title}</h2>
      <p className="text-gray-600 mt-2">{description}</p>
      <p className="text-gray-600 mt-2">{model}</p>
      <div className="text-xl font-semibold text-gray-900 mt-4">${price}</div>
      <div className="mt-4">
        <Button
          onClick={onHandler}
          type={button.type}
          label={button.label}
        />
      </div>
    </div>
  );
}
