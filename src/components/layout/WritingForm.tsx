'use client';
import { useState } from 'react';

export default function WritingForm({
  title,
  isRequired,
  placeholder,
  isLongForm,
}: {
  title: string;
  isRequired: boolean;
  placeholder: string;
  isLongForm: boolean;
}) {
  const [value, setValue] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setValue(e.target.value);
  };

  return (
    <>
      <div className="w-full px-6">
        <div className="text-main text-[16px] font-semibold lg:text-[24px]">
          {title}
          {isRequired && (
            <span className="t5 t4 ml-2 font-medium text-[#cecece]">필수</span>
          )}
        </div>
        <div className="relative mb-4">
          {isLongForm ? (
            <textarea
              className="placeholder-gray-4 t3 mt-3 h-64 w-full resize-none rounded border border-[#343434] p-4 text-white"
              placeholder={placeholder}
              value={value}
              onChange={handleChange}
              maxLength={1000}
            />
          ) : (
            <input
              type="text"
              className="placeholder-gray-4 t3 mt-3 w-full rounded border border-[#343434] p-4 text-white"
              placeholder={placeholder}
              value={value}
              onChange={handleChange}
            />
          )}
          {isLongForm && (
            <div className="t3 absolute right-3 bottom-3 text-[#595858]">
              {value.length} / 1000
            </div>
          )}
        </div>
      </div>
    </>
  );
}
