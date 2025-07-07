'use client';

import { ButtonHTMLAttributes } from 'react';

type GrayButtonProps = {
  children: React.ReactNode;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function GrayButton({
  children,
  className = '',
  ...props
}: GrayButtonProps) {
  return (
    <button
      className={`bg-gray-default text-gray-6 w-full rounded py-3 text-[16px] font-semibold ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
