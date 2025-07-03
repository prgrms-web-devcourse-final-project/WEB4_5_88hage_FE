"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

type InputProps = {
  type?: string;
  placeholder?: string;
  className?: string;
  showToggleIcon?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Input({
  type = "text",
  placeholder = "",
  className = "",
  showToggleIcon = true,
  value,
  onChange,
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType =
    isPassword && showToggleIcon ? (showPassword ? "text" : "password") : type;

  return (
    <div className="relative w-full">
      <input
        type={inputType}
        placeholder={placeholder}
        className={`
          w-full p-3
          ${isPassword && showToggleIcon ? "pr-10" : ""}
          rounded-md bg-[#313131] placeholder-[#8d8d8d] text-sm
          outline-none
          focus:outline-none focus:ring-2 focus:ring-[#00FFD1] transition
          ${className}
        `}
        value={value}
        onChange={onChange}
      />

      {isPassword && showToggleIcon && (
        <button
          type="button"
          className="absolute top-1/2 right-3 -translate-y-1/2 text-[#8d8d8d]"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      )}
    </div>
  );
}
