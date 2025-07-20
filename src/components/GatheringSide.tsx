'use client';

import { useState } from 'react';
import { Search, Users } from 'lucide-react';
import { BiSolidChat } from 'react-icons/bi';
import GatheringTabButton from './button/GatheringTabButton';
import ChatItem from './common/ChatItem';
import GatheringItem from './common/GatheringItem'; // Import GatheringItem
import test from '@/assets/images/test.png';

export default function GatheringSide() {
  const [activeTab, setActiveTab] = useState('my-gathering');
  const [searchTerm, setSearchTerm] = useState('');

  // Dummy data for demonstration
  const myGatherings = [
    {
      profileUrl: test,
      name: '힙스터 모임',
      info: '2025.07.20 - 강남',
      time: '2시간 전',
    },
    {
      profileUrl: test,
      name: '코딩 스터디',
      info: '2025.07.22 - 온라인',
      time: '1일 전',
    },
  ];

  const chatItems = [
    {
      profileUrl: test,
      name: '01힙스터',
      lastMessage: '다들 뭐해?',
      time: '2시간 전',
    },
    {
      profileUrl: test,
      name: '02힙스터',
      lastMessage: '오늘 저녁 뭐 먹지?',
      time: '1시간 전',
    },
  ];

  const filteredMyGatherings = myGatherings.filter(
    (gathering) =>
      gathering.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      gathering.info.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredChatItems = chatItems.filter(
    (chat) =>
      chat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chat.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div
        className={`bg-gray-7 lg:border-gray-5 mt-5 flex h-full w-full flex-col items-center rounded-[15px] p-2 lg:w-[330px] lg:border`}
      >
        <div className="relative mt-3 flex items-baseline">
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
            className={`bg-main absolute bottom-0 h-0.5 w-[125px] transition-transform duration-300 ease-in-out ${
              activeTab === 'my-gathering'
                ? 'translate-x-0'
                : 'translate-x-full'
            }`}
          />
        </div>
        <div className="relative my-5 w-[300px]">
          <Search
            className="text-gray-disabled absolute top-1/2 left-3 -translate-y-1/2"
            size={20}
          />
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            className="bg-gray-5 t3 placeholder-gray-disabled w-full rounded p-2 pl-10 text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-full flex-grow overflow-y-auto px-2">
          {activeTab === 'my-gathering' && (
            <>
              {filteredMyGatherings.length > 0 ? (
                filteredMyGatherings.map((gathering, index) => (
                  <GatheringItem key={index} {...gathering} />
                ))
              ) : (
                <div className="text-gray-5 py-10 text-center">
                  참여 중인 모임이 없습니다
                </div>
              )}
            </>
          )}
          {activeTab === 'chat' && (
            <>
              {filteredChatItems.length > 0 ? (
                filteredChatItems.map((chat, index) => (
                  <ChatItem key={index} {...chat} />
                ))
              ) : (
                <div className="text-gray-5 py-10 text-center">
                  진행 중인 채팅이 없습니다
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
