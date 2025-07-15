'use client';

import { Eye, EyeOff } from 'lucide-react';
import { forwardRef, useState } from 'react';
import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  showToggleIcon?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type = 'text',
      placeholder = '',
      className = '',
      showToggleIcon = true,
      value,
      onChange,
      onBlur,
      ...props
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';
    const inputType =
      isPassword && showToggleIcon
        ? showPassword
          ? 'text'
          : 'password'
        : type;

    return (
      <div className="relative w-full">
        <input
          type={inputType}
          placeholder={placeholder}
          className={`w-full p-3 font-semibold text-white ${
            isPassword && showToggleIcon ? 'pr-10' : ''
          } bg-gray-5 rounded text-sm placeholder-[#8d8d8d] transition outline-none focus:ring-2 focus:ring-[#00FFD1] focus:outline-none ${className}`}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          ref={ref}
          {...props}
        />

        {isPassword && showToggleIcon && (
          <button
            type="button"
            className="absolute top-1/2 right-3 -translate-y-1/2 text-[#8d8d8d]"
            onClick={() => setShowPassword((prev) => !prev)}
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
