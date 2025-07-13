import { ReactNode } from 'react';

interface TabButtonProps {
  icon: ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export default function GatheringTabButton({
  icon,
  label,
  isActive,
  onClick,
}: TabButtonProps) {
  return (
    <button
      className={`${
        isActive ? 'text-main' : 'text-gray-disabled-opacity'
      } flex w-[125px] flex-col items-center pb-2 transition-colors duration-300`}
      onClick={onClick}
    >
      {icon}
      <div className={'t3 mt-2'}>{label}</div>
    </button>
  );
}
