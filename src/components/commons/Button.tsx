import React from 'react'

const variantStyles = {
  primary: 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-400',
  secondary: 'bg-gray-300 text-gray-800 hover:bg-gray-400 focus:ring-gray-200',
  danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-400',
  black: "bg-black text-white hover:bg-gray-900"
} as const

const sizeStyles = {
  small: 'px-3 py-1 text-sm',
  medium: 'px-4 py-2 text-base',
  large: 'px-6 py-3 text-lg'
} as const

type VariantType = keyof typeof variantStyles
type SizeType = keyof typeof sizeStyles

type ButtonProps = {
  label: string
  onClick?: () => void
  type: "button" | "submit"
  variant?: VariantType
  size?: SizeType
}
export default function Button({
  label = 'More details',
  onClick,
  type = "button",
  variant = "black",
  size = "medium"
} : ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`mt-3 ${variantStyles[variant]} ${sizeStyles[size]}`}>
      {label}
    </button>
  )
}
