'use client';

type GrayButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
};

export default function GrayButton({
  children,
  onClick,
  className = '',
}: GrayButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`bg-gray-default text-gray-6 rounded py-3 text-[16px] font-semibold ${className}`}
    >
      {children}
    </button>
  );
}
