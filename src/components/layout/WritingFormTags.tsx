'use client';
import { useEffect, useRef, useState } from 'react';

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
  const [tagsDropMenu, setTagsDropMenu] = useState(false);
  const [hashTagsList, setHashTagsList] = useState<string[]>([]);
  const API = process.env.NEXT_PUBLIC_API_URL;
  const inputRef = useRef<HTMLDivElement>(null);

  const fetchHashtags = async () => {
    const response = await fetch(
      `${API}/api/groupHashtags/complete?prefix=${value}`,
    );
    const { data } = await response.json();
    setHashTagsList(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    fetchHashtags();
  }, [value]);

  useEffect(() => {
    const handleOutsideClose = (e: { target: any }) => {
      if (tagsDropMenu && !inputRef.current!.contains(e.target)) {
        setTagsDropMenu(false);
      }
    };
    document.addEventListener('click', handleOutsideClose);
    return () => document.removeEventListener('click', handleOutsideClose);
  }, [tagsDropMenu]);

  const handleKeyEventinInput = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') e.preventDefault();
    handleUpDownKey(e);
  };

  const handleKeyEventinButton = (e: React.KeyboardEvent, v: string) => {
    handleUpDownKey(e);
    if (e.key === 'Enter') {
      e.preventDefault();
      onTagsAdd(v);
    }
  };

  const handleUpDownKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      // 추후 구현 예정 (너무 어려워요;;)
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      // 추후 구현 예정 (너무 어려워요;;)
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
      <div id="hashTagContainer" className="relative" ref={inputRef}>
        <input
          type="text"
          name={name}
          className="placeholder-gray-disabled t3 mt-3 w-full rounded border border-[#343434] p-4 text-white"
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyEventinInput}
          onFocus={() => setTagsDropMenu(true)}
          // onBlur={() => setFocused(false)}
        />
        {tagsDropMenu && (
          <ul className="placeholder-gray-disabled t3 absolute z-2 mt-3 flex w-full flex-col rounded border border-[#343434] bg-[#121212] p-2 text-white">
            {hashTagsList.length === 0 && (
              <div className="p-2">현재 검색 결과가 없습니다.</div>
            )}
            {hashTagsList.map((tag) => (
              <li key={tag} className="w-full">
                <button
                  type="button"
                  onClick={() => {
                    onTagsAdd(tag);
                    setValue('');
                    setTagsDropMenu(false);
                  }}
                  onKeyDown={(e) => handleKeyEventinButton(e, tag)}
                  className="hover:bg-gray-5 w-full p-2 text-left"
                >
                  {tag}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
