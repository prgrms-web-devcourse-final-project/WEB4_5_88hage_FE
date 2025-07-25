'use client';

import { useState } from 'react';
import GatheringChatting from '@/components/GatheringChatting';
import GatheringMain from '@/components/GatheringMain';
import GatheringSide from '@/components/GatheringSide';

export default function MyGathering() {
  const [selectedGathering, setSelectedGathering] =
    useState<GroupDetail | null>(null);
  const [activeTab, setActiveTab] = useState<'my-gathering' | 'chat'>('my-gathering'); // 'my-gathering' 또는 'chat'

  const handleSelectGathering = (gathering: GroupDetail) => {
    setSelectedGathering(gathering);
    // 모임 아이템을 선택하면 해당 탭으로 자동 전환
    if (activeTab === 'my-gathering') {
      // GatheringMain을 보여줘야 함
    } else if (activeTab === 'chat') {
      // GatheringChatting을 보여줘야 함
    }
    console.log(gathering.id);
  };

  const handleTabChange = (tab: 'my-gathering' | 'chat') => {
    setActiveTab(tab);
    setSelectedGathering(null); // 탭 변경 시 선택된 모임 초기화
  };

  return (
    <div className="mb-50">
      <h2 className="h3 text-white">모임</h2>
      <div className="lg:flex lg:items-center lg:justify-center">
        {/* 고정 너비 사이드 */}
        <div className="flex-shrink-0 lg:h-[740px] lg:w-[330px]">
          <GatheringSide
            onSelectGathering={handleSelectGathering}
            activeTab={activeTab}
            onTabChange={handleTabChange}
          />
        </div>
        {/* 유동 너비 메인 */}
        <div className="max-w-[1050px] flex-grow lg:ml-5 lg:h-[740px]">
          {activeTab === 'my-gathering' && selectedGathering ? (
            <GatheringMain selectedGathering={selectedGathering} />
          ) : activeTab === 'chat' && selectedGathering ? (
            <GatheringChatting gathering={selectedGathering} />
          ) : (
            <div className="bg-gray-7 lg:border-gray-5 flex h-full w-full items-center justify-center rounded-[15px] p-4 text-white lg:border lg:p-10">
              <p>
                {activeTab === 'my-gathering'
                  ? '왼쪽에서 모임을 선택해주세요.'
                  : '왼쪽에서 채팅방을 선택해주세요.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
