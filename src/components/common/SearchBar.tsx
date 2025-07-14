import { Search, SlidersHorizontal } from 'lucide-react';

export default function SearchBar() {
  return (
    <div className="flex flex-col items-center justify-center mb-[30px]">
      <div className="t4 from-main to-text lg:mb-[15px] inline-block bg-gradient-to-r bg-clip-text text-[24px] text-transparent">
        24시간 언제든지 심심할 때 찾아보세요
      </div>

      <div className="relative w-[900px]">
        <input
          type="text"
          placeholder="빠르게 축제를 추천 해 드릴게요"
          className="bg-gray-7 h-[80px] w-full rounded-[5px] border-[2px] border-[#393939] p-5 pr-12 font-semibold text-white"
        />
        <Search className="text-gray-3 absolute top-1/2 right-5 h-[27px] w-[27px] -translate-y-1/2" />
        <SlidersHorizontal className="text-gray-3 absolute top-1/2 right-15 h-[25px] w-[25px] -translate-y-1/2" />
      </div>
    </div>
  );
}
