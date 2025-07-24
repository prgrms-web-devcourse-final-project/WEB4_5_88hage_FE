'use client';

import { useState } from 'react';
import GatheringChatting from '@/components/GatheringChatting';
import GatheringMain from '@/components/GatheringMain';
import GatheringSide from '@/components/GatheringSide';

export default function MyGathering() {
  const [selectedGathering, setSelectedGathering] =
    useState<GroupDetail | null>(null);

  const handleSelectGathering = (gathering: GroupDetail) => {
    setSelectedGathering(gathering);
    console.log(gathering.id);
  };

  return (
    <div className="mb-50">
      <h2 className="h3 text-white">모임</h2>
      <div className="lg:flex lg:items-center lg:justify-center">
        {/* 고정 너비 사이드 */}
        <div className="flex-shrink-0 lg:h-[740px] lg:w-[330px]">
          <GatheringSide onSelectGathering={handleSelectGathering} />
        </div>
        {/* 유동 너비 메인 */}
        <div className="max-w-[1050px] flex-grow lg:ml-5 lg:h-[740px]">
          <GatheringMain selectedGathering={selectedGathering} />
          {/* <GatheringChatting /> */}
        </div>
      </div>
    </div>
  );
}
