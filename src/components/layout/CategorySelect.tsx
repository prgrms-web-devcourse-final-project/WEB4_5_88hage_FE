'use client';
import { useState } from 'react';

type CategorySelectProps = {
  title: string;
  isRequired?: boolean;
  options: string[];
};

export default function CategorySelect({
  title,
  isRequired = false,
  options,
}: CategorySelectProps) {
  const [selected, setSelected] = useState('');

  return (
    <div className="mt-6 w-full px-6">
      <label className="text-main mb-2 block text-[16px] font-semibold lg:text-[24px]">
        {title}
        {isRequired && (
          <span className="ml-2 text-[12px] font-medium text-[#cecece]">
            (필수)
          </span>
        )}
      </label>
      <select
        className="t3 w-full rounded border border-[#343434] bg-[#1a1a1a] p-4 text-white"
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
      >
        <option value="" disabled hidden>
          카테고리를 골라주세요
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
