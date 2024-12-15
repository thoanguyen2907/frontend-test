import React, { ChangeEvent, ChangeEventHandler } from 'react'

type Options = {
    id: string, 
    name: string
}
type DropdownProps = {
    label: string, 
    name: string, 
    value: string, 
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, 
    options: Options[], 
    placeholder?: string
}
export default function Dropdown({
  label,
  name,
  value,
  onChange,
  options,
}: DropdownProps) {
  console.log("value of select ", value)
  return (
    <div className="mb-4">
      {label && <label className="block text-sm font-medium mb-2">{label}</label>}
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
      >
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option?.name}
          </option>
        ))}
      </select>
    </div>
  )
}
