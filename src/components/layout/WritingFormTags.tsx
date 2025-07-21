'use client';
import { useEffect, useState } from 'react';

export default function WritingFormTags({
  title,
  name,
  isRequired,
  placeholder,
  onTagsAdd,
}: {
  title: string;
  name?: string;
  isRequired: boolean;
  placeholder: string;
  onTagsAdd: (tags: string) => void;
}) {
  const [value, setValue] = useState('');

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (value.length > 0) {
        onTagsAdd(value);
        setValue('');
      }
    }
  };

  return (
    <div className="w-full">
      <div className="text-main text-[16px] font-semibold lg:text-[24px]">
        {title}
        {isRequired && (
          <span className="t5 t4 ml-2 font-medium text-[#cecece]">필수</span>
        )}
      </div>
      <div className="relative">
        <input
          type="text"
          name={name}
          className="placeholder-gray-disabled t3 mt-3 w-full rounded border border-[#343434] p-4 text-white"
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleEnter}
        />
      </div>
    </div>
  );
}
