import { useState } from 'react';

type CheckboxProps = {
  id: string;
  children?: string;
  className?: string;
  onChange?: any;
};

export default function Checkbox({
  id,
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
        onChange={(e) => {
          setChecked(e.target.checked);
        }}
      />
      <label htmlFor={id} className="hiddenLabel" />
      <label
        htmlFor={id}
        className={`${className} ${checked && 'text-[#1CEBB9]'}`}
      >
        {children}
      </label>
    </>
  );
}
