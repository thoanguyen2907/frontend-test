import React, { forwardRef } from "react";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

type InputProps = {
  label: string;
  name: string;
  type?: string;
  value?: string | number;
  placeholder?: string;
  error?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, name, type = "text", value, placeholder = "", error, onChange }: InputProps, ref) => {
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
          ref={ref} 
          className={`bg-gray-50 border ${
            error ? "border-red-500" : "border-gray-300"
          } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
        />
        {error && (
          <p className="text-red-500 text-sm mt-1">
            {typeof error === "string" ? error : (error as FieldError).message}
          </p>
        )}
      </div>
    );
  }
);
export default Input; 