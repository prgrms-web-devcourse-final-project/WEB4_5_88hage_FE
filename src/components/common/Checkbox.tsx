import { LucideCheck, LucideCheckCheck } from 'lucide-react';
import { ChangeEvent, InputHTMLAttributes, useState } from 'react';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  box?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function Checkbox({
  id,
  box,
  children,
  checked,
  className,
  onChange,
}: CheckboxProps) {
  return (
    <>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        className="hidden"
        onChange={onChange}
      />
      <label htmlFor={id}>
        {box ? (
          <div
            className={`flex size-7 items-center justify-center rounded-[5px] bg-[#313131] ${checked && 'border border-[#1CEBB9]'}`}
          >
            {checked && <LucideCheck color="#1CEBB9" />}
          </div>
        ) : (
          <LucideCheck color={checked ? '#1CEBB9' : 'currentColor'} />
        )}
      </label>
      <label
        htmlFor={id}
        className={`${className} ${checked && 'text-[#1CEBB9]'}`}
      >
        {children}
      </label>
    </>
  );
}
