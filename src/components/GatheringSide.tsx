import { Users } from 'lucide-react';
import { BiSolidChat } from 'react-icons/bi';

export default function GatheringSide() {
  return (
    <>
      <div className="h-full w-full p-2">
        <div className="text-gray-disabled-opacity flex items-baseline">
          <button className="flex flex-col items-center">
            <Users />
            <div className="t3 mt-2">내 모임</div>
            <hr className="w-[125px]" />
          </button>
          <button className="flex flex-col items-center">
            <BiSolidChat className="h-[19px] w-[19px]" />
            <div className="t3 mt-2">모임 채팅</div>
            <hr className="w-[125px]" />
          </button>
        </div>
      </div>
    </>
  );
}
