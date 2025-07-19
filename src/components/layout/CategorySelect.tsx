'use client';
import { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

type CategorySelectProps = {
  name: string;
  isRequired?: boolean;
  options: { key: string; value: string }[];
};

export default function CategorySelect({
  name,
  isRequired = false,
  options,
}: CategorySelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const componentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        componentRef.current &&
        !componentRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [componentRef]);

  return (
    <div className="relative w-full" ref={componentRef}>
      <label
        htmlFor={name}
        className="text-main mb-3 block text-[16px] font-semibold lg:text-[24px]"
      >
        카테고리
        {isRequired && (
          <span className="t4 ml-2 font-medium text-[#cecece]">필수</span>
        )}
      </label>
      <div className="relative h-fit w-full">
        <select
          id={name}
          name={name}
          defaultValue="default"
          className="t3 bg-bg-color text-gray-disabled flex w-full appearance-none items-center justify-between rounded border border-[#343434] bg-[url()] p-4 text-left"
        >
          <option value="default" disabled className="hidden">
            카테고리를 골라주세요
          </option>

          {options.map((opt) => (
            <option
              value={opt.key}
              key={opt.key}
              className="border-t-gray-4 border-b-gray-4 border-t last:border-b"
            >
              {opt.value}
            </option>
          ))}
        </select>
        <label htmlFor={name} className="absolute top-4 right-2.5">
          <ChevronDown
            className="transform transition-transform duration-200"
            color="#5e5e5e"
          />
        </label>
      </div>
      {/* {isOpen && (
        <div className="absolute z-10 mt-2 w-full rounded border border-[#343434] bg-[#242424] p-4 text-white">
          <div className="flex-wrap gap-2">
            {options.map((option) => (
              <button
                key={option}
                type="button"
                className="t3 px-4 py-2"
                onClick={() => handleSelect(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )} */}
    </div>
  );
}
