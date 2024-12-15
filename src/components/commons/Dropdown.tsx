import React, { forwardRef } from 'react'
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

type Options = {
    id: string, 
    name: string
}
type DropdownProps = {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Options[];
  error: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
  placeholder?: string;
};

const Dropdown = forwardRef<HTMLSelectElement, DropdownProps>(
  ({ label, name, value, onChange, error, options }: DropdownProps, ref) => {

  return (
    <div className="mb-4">
      {label && <label className="block text-sm font-medium mb-2">{label}</label>}
      <select
        name={name}
        value={value}
        onChange={onChange}
        ref={ref}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
      >
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {value}
          </option>
        ))}
      </select>
         {error && (
          <p className="text-red-500 text-sm mt-1">
            {typeof error === "string" ? error : (error as FieldError).message}
          </p>
        )}
    </div>
  )
}
)
export default Dropdown; 