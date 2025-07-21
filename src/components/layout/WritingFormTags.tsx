'use client';
import { useEffect, useState } from 'react';

export default function WritingFormTags({
  title,
  name,
  placeholder,
  onTagsChange,
}: {
  title: string;
  name?: string;
  placeholder: string;
  onTagsChange: (tags: string[]) => void;
}) {
  const [value, setValue] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setTags((prev) => [...prev, value]);
      setValue('');
    }
  };

  useEffect(() => {
    onTagsChange(tags);
  }, [tags]);

  return (
    <div className="w-full">
      <div className="text-main text-[16px] font-semibold lg:text-[24px]">
        {title}
      </div>
      <div className="relative">
        <input
          type="text"
          name={name}
          className={`placeholder-gray-disabled t3 mt-3 w-full rounded border border-[#343434] p-4 text-white ${
            title === '모임 위치' ? 'pr-12' : ''
          }`}
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyUp={handleEnter}
        />
      </div>
    </div>
  );
}
