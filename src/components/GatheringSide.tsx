'use client';

import { useState } from 'react';
import { Users } from 'lucide-react';
import { BiSolidChat } from 'react-icons/bi';
import GatheringTabButton from './button/GatheringTabButton';
export default function GatheringSide() {
  const [activeTab, setActiveTab] = useState('my-gathering');

  return (
    <>
      <div className="h-full w-full p-2">
        <div className="relative flex items-baseline">
          <GatheringTabButton
            icon={<Users />}
            label="내 모임"
            isActive={activeTab === 'my-gathering'}
            onClick={() => setActiveTab('my-gathering')}
          />
          <GatheringTabButton
            icon={<BiSolidChat className="h-[19px] w-[19px]" />}
            label="모임 채팅"
            isActive={activeTab === 'chat'}
            onClick={() => setActiveTab('chat')}
          />
          <div
            className={`absolute bottom-0 h-0.5 w-[125px] bg-main transition-transform duration-300 ease-in-out ${
              activeTab === 'my-gathering' ? 'translate-x-0' : 'translate-x-full'
            }`}
          />
        </div>
      </div>
    </>
  );
}
