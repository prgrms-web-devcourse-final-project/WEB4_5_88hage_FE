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
      className={twMerge(
        `bg-gray-4 text-gray-disabled hover:bg-main flex w-full items-center justify-center rounded py-3 font-semibold hover:text-black`,
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
