'use client';
import { useState } from 'react';
import { Search } from 'lucide-react';

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
      <div className="w-full">
        <div className="text-main text-[16px] font-semibold lg:text-[24px]">
          {title}
          {isRequired && (
            <span className="t5 t4 ml-2 font-medium text-[#cecece]">필수</span>
          )}
        </div>
        <div className="relative">
          {!isLongForm && title === '모임 위치' && (
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pt-2 pr-4">
              <Search size={20} color="#9CA3AF" />
            </div>
          )}
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
              className={`placeholder-gray-4 t3 mt-3 w-full rounded border border-[#343434] p-4 text-white ${
                title === '모임 위치' ? 'pr-12' : ''
              }`}
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
