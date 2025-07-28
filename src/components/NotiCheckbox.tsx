import { Check } from 'lucide-react';
import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

type NotiCheckboxProps = {
  children?: string;
  disabled?: boolean;
  checked?: boolean;
  className?: string;
  onChange: (checked: boolean) => void;
};

export default function NotiCheckbox({
  children,
  disabled,
  checked,
  className,
  onChange,
}: NotiCheckboxProps) {
  return (
    <label className={twMerge('flex gap-2 lg:ml-2.5', className)}>
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={({ target: { checked } }) => onChange(checked)}
        className="hidden"
      />
      <div className="flex size-5 items-center justify-center rounded-[5px] border border-[#fff]">
        {checked && <Check size={16} />}
      </div>
      {children}
    </label>
  );
}
