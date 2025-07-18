'use client';
import { KeyboardEvent, useState } from 'react';
import { Search } from 'lucide-react';

export default function WritingForm({
  title,
  name,
  isRequired,
  placeholder,
  isLongForm,
  onKeyUp,
}: {
  title: string;
  name?: string;
  isRequired: boolean;
  placeholder: string;
  isLongForm: boolean;
  onKeyUp?: (e: KeyboardEvent<HTMLInputElement>) => void;
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
            <button className="absolute inset-y-0 right-0 flex items-center pt-2 pr-4">
              <Search size={20} color="#5e5e5e" />
            </button>
          )}
          {isLongForm ? (
            <textarea
              name={name}
              className="placeholder-gray-disabled t3 mt-3 h-64 w-full resize-none rounded border border-[#343434] p-4 text-white"
              placeholder={placeholder}
              value={value}
              onChange={handleChange}
              maxLength={1000}
            />
          ) : (
            <input
              type="text"
              name={name}
              className={`placeholder-gray-disabled t3 mt-3 w-full rounded border border-[#343434] p-4 text-white ${
                title === '모임 위치' ? 'pr-12' : ''
              }`}
              placeholder={placeholder}
              value={value}
              onChange={handleChange}
              onKeyUp={onKeyUp}
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
