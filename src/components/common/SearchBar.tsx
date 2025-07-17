import { Search, SlidersHorizontal } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function SearchBar({value,onChange}) {
  const [input, setInput] = useState(value);

  useEffect(() => {
    setInput(value);
  }, [value]);

  const handleKeyDown = e => {
    if (e.key === "Enter") {
      onChange(input);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center mb-[30px]">
      <div className="t3 from-main to-text mb-[15px] inline-block bg-gradient-to-r bg-clip-text lg:text-[24px] text-transparent">
        24시간 언제든지 심심할 때 찾아보세요
      </div>

      <div className="relative lg:w-[900px] w-[335px]">
        <input
          type="text"
          placeholder="빠르게 축제를 추천해 드릴게요"
          value={input}
          onChange={e=>setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="bg-gray-7 h-[50px] lg:h-[80px] w-full rounded-[5px] border-[2px] border-[#393939] p-5 pr-12 font-semibold text-white"
        />
        <Search className="text-gray-3 absolute top-1/2 right-3 h-[20px] w-[20px] -translate-y-1/2" />
        <SlidersHorizontal className="text-gray-3 absolute top-1/2 right-10 h-[20px] w-[20px] -translate-y-1/2" />
      </div>
    </div>
  );
}
