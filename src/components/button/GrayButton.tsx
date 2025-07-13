'use client';

import { ButtonHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

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
      className={twMerge(`py-3 bg-gray-default text-gray-6 flex items-center justify-center w-full rounded font-semibold`, className)}
      {...props}
    >
      {children}
    </button>
  );
}
