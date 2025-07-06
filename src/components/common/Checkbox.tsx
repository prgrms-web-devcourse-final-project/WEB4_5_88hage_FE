import { LucideCheck, LucideCheckCheck } from 'lucide-react';
import { useState } from 'react';

type CheckboxProps = {
  id: string;
  box?: boolean;
  children?: string;
  className?: string;
  onChange?: any;
};

export default function Checkbox({
  id,
  box,
  children,
  className,
  onChange,
}: CheckboxProps) {
  const [checked, setChecked] = useState(false);

  return (
    <>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        className="hidden"
        onChange={(e) => {
          setChecked(e.target.checked);
        }}
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
