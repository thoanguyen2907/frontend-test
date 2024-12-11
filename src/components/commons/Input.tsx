import React from "react";

type InputProps = {
  label: string;
  name: string;
  type?: string;
  value: string | number;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
};

export default function Input({
  label,
  name,
  type = "text",
  value,
  placeholder = "",
  onChange,
}: InputProps) {
  return (
    <div className="flex flex-col space-y-2">
      <label htmlFor={name} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
      />
    </div>
  );
}
