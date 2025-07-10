'use client';
import { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

type CategorySelectProps = {
  isRequired?: boolean;
  options: string[];
};

export default function CategorySelect({
  isRequired = false,
  options,
}: CategorySelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState('');
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

  const handleSelect = (option: string) => {
    setSelected(option);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full" ref={componentRef}>
      <label className="text-main mb-3 block text-[16px] font-semibold lg:text-[24px]">
        카테고리
        {isRequired && (
          <span className="t4 ml-2 font-medium text-[#cecece]">필수</span>
        )}
      </label>
      <button
        type="button"
        className="t3 bg-bg-color flex w-full items-center justify-between rounded border border-[#343434] p-4 text-left text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selected || '카테고리를 골라주세요'}</span>
        <ChevronDown
          className={`transform transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
          color="#9CA3AF"
        />
      </button>
      {isOpen && (
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
      )}
    </div>
  );
}
