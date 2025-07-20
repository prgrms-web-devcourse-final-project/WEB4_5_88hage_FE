'use client';

import { useState, useEffect } from 'react';
import { Search, Users } from 'lucide-react';
import { BiSolidChat } from 'react-icons/bi';
import GatheringTabButton from './button/GatheringTabButton';
import ChatItem from './common/ChatItem';
import GatheringItem from './common/GatheringItem';
import { getMyGroups } from '@/lib/api/group';
import { getMyPersonalChatRooms } from '@/lib/api/chat';
import { Group } from '@/types/group';
import { ChatRoom } from '@/types/chat';

export default function GatheringSide() {
  const [activeTab, setActiveTab] = useState('my-gathering');
  const [searchTerm, setSearchTerm] = useState('');
  const [myGatherings, setMyGatherings] = useState<Group[]>([]);
  const [chatItems, setChatItems] = useState<ChatRoom[]>([]);
  const [loadingGatherings, setLoadingGatherings] = useState(true);
  const [loadingChatItems, setLoadingChatItems] = useState(true);
  const [errorGatherings, setErrorGatherings] = useState<string | null>(null);
  const [errorChatItems, setErrorChatItems] = useState<string | null>(null);

  useEffect(() => {
    const fetchMyGatherings = async () => {
      try {
        setLoadingGatherings(true);
        const data = await getMyGroups();
        setMyGatherings(data);
      } catch (error) {
        console.error('Failed to fetch my gatherings:', error);
        setErrorGatherings('모임을 불러오는 데 실패했습니다.');
      } finally {
        setLoadingGatherings(false);
      }
    };

    const fetchChatItems = async () => {
      try {
        setLoadingChatItems(true);
        const data = await getMyPersonalChatRooms();
        setChatItems(data);
      } catch (error) {
        console.error('Failed to fetch chat items:', error);
        setErrorChatItems('채팅 목록을 불러오는 데 실패했습니다.');
      } finally {
        setLoadingChatItems(false);
      }
    };

    fetchMyGatherings();
    fetchChatItems();
  }, []);

  const filteredMyGatherings = myGatherings.filter(
    (gathering) =>
      gathering.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      gathering.placeName.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const filteredChatItems = chatItems.filter(
    (chat) =>
      chat.roomName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chat.lastMessage?.toLowerCase().includes(searchTerm.toLowerCase()),
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
              {loadingGatherings ? (
                <div className="text-gray-5 py-10 text-center">
                  모임을 불러오는 중...
                </div>
              ) : errorGatherings ? (
                <div className="py-10 text-center text-red-500">
                  {errorGatherings}
                </div>
              ) : filteredMyGatherings.length > 0 ? (
                filteredMyGatherings.map((gathering) => (
                  <GatheringItem
                    key={gathering.id}
                    profileUrl={gathering.image || '/default-gathering.png'}
                    name={gathering.title}
                    info={gathering.simpleExplain}
                    time={
                      gathering.createdAt
                        ? new Date(gathering.createdAt).toLocaleDateString()
                        : ''
                    }
                  />
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
              {loadingChatItems ? (
                <div className="text-gray-5 py-10 text-center">
                  채팅 목록을 불러오는 중...
                </div>
              ) : errorChatItems ? (
                <div className="py-10 text-center text-red-500">
                  {errorChatItems}
                </div>
              ) : filteredChatItems.length > 0 ? (
                filteredChatItems.map((chat) => (
                  <ChatItem
                    key={chat.chatRoomId}
                    profileUrl={chat.imageUrl || '/default-chat.png'}
                    name={chat.roomName}
                    lastMessage={chat.lastMessage || '메시지 없음'}
                    time={
                      chat.lastMessageTime
                        ? new Date(chat.lastMessageTime).toLocaleDateString()
                        : ''
                    }
                  />
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
