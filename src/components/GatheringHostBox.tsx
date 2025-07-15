export default function GatheringHostBox() {
  return (
    <div className="flex w-full gap-[20px] rounded-[5px] border border-[#393939] p-[20px]">
      <div className="bg-gray-3 size-[100px] rounded-full"></div>
      <div className="flex grow-1 flex-col">
        <div className="text-[18px] text-white">홍길동</div>
        <div className="pt-[11.33px] pb-[14.33px] text-[#ababab]">
          안녕하세요 홍길동 입니다. 반가워요!
        </div>
        <div className="flex gap-[10px] text-[14px]">
          <div className="bg-gray-4 rounded-full px-[17px] py-[4px] text-white">
            음식
          </div>
          <div className="bg-gray-4 rounded-full px-[17px] py-[4px] text-white">
            운동
          </div>
          <div className="bg-gray-4 rounded-full px-[17px] py-[4px] text-white">
            문화
          </div>
        </div>
      </div>
      <div className="flex items-center justify-end">
        <button className="bg-gray-4 rounded-full px-[16px] py-[6px] text-white">
          팔로우
        </button>
      </div>
    </div>
  );
}
