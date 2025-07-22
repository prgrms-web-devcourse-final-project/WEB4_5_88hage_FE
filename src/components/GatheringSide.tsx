'use client';

import { useState, useEffect } from 'react';
import GatheringTabButton from './button/GatheringTabButton';
import { Search, Users } from 'lucide-react';
import { BiSolidChat } from 'react-icons/bi';
import ChatItem from './common/ChatItem';
import GatheringItem from './common/GatheringItem';
import { getMyGroups, getLeaderMyGroups } from '@/lib/api/group';
import { getMyPersonalChatRooms, getLastChatHistory } from '@/lib/api/chat';
import { MyGroupData } from '@/types/my_group';
import { LeaderMyGroupData } from '@/types/leader_my_group';
import { ChatRoom } from '@/types/chat_room';
import { LastChatHistory } from '@/types/last_chat_history';
import { Group } from '@/types/group'; // Import Group type

interface GatheringSideProps {
  onSelectGathering: (gathering: Group) => void;
}

export default function GatheringSide({
  onSelectGathering,
}: GatheringSideProps) {
  const [activeTab, setActiveTab] = useState('my-gathering');
  const [myGatherings, setMyGatherings] = useState<MyGroupData[]>([]);
  const [leaderGatherings, setLeaderGatherings] = useState<LeaderMyGroupData[]>(
    [],
  );
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [lastMessages, setLastMessages] = useState<
    Record<number, LastChatHistory>
  >({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [myGroupsData, leaderGroupsData, chatRoomsData] =
          await Promise.all([
            getMyGroups(),
            getLeaderMyGroups(),
            getMyPersonalChatRooms(),
          ]);
        setMyGatherings(myGroupsData);
        setLeaderGatherings(leaderGroupsData);
        setChatRooms(chatRoomsData);

        if (chatRoomsData && chatRoomsData.length > 0) {
          const lastMessagesData = await Promise.all(
            chatRoomsData.map((room) =>
              getLastChatHistory(room.id, 'PERSONAL_CHAT'),
            ),
          );
          const lastMessagesMap = lastMessagesData.reduce(
            (acc, msg, index) => {
              if (msg) {
                acc[chatRoomsData[index].id] = msg;
              }
              return acc;
            },
            {} as Record<number, LastChatHistory>,
          );
          setLastMessages(lastMessagesMap);
        }
      } catch (err) {
        setError('데이터를 불러오는 데 실패했습니다.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const allGatherings = [
    ...myGatherings.map((g) => ({
      id: `my-${g.groupId}`,
      title: g.groupTitle,
      description: g.simpleExplain,
      imageUrl: g.groupImageUrl,
      fullGroup: g, // Add the full group object
    })),
    ...leaderGatherings.map((g) => ({
      id: `leader-${g.id}`,
      title: g.title,
      description: g.simpleExplain,
      imageUrl: g.imageUrl,
      fullGroup: g, // Add the full group object
    })),
  ];

  if (loading) {
    return (
      <div
        className={`bg-gray-7 lg:border-gray-5 mt-5 flex h-full w-full flex-col items-center rounded-[15px] p-2 lg:w-[330px] lg:border`}
      >
        <p>로딩 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`bg-gray-7 lg:border-gray-5 mt-5 flex h-full w-full flex-col items-center rounded-[15px] p-2 lg:w-[330px] lg:border`}
      >
        <p>에러: {error}</p>
      </div>
    );
  }

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
          />
        </div>
        <div className="w-full flex-grow overflow-y-auto px-2">
          {activeTab === 'my-gathering' ? (
            <div className="space-y-2">
              {allGatherings.length > 0 ? (
                allGatherings.map((gathering) => (
                  <GatheringItem
                    key={gathering.id}
                    name={gathering.title}
                    description={gathering.description}
                    imageUrl={gathering.imageUrl}
                    onClick={() => onSelectGathering(gathering.fullGroup)}
                  />
                ))
              ) : (
                <p className="text-gray-4 text-center">
                  참여 중인 모임이 없습니다.
                </p>
              )}
            </div>
          ) : (
            <div className="space-y-2">
              {chatRooms.length > 0 ? (
                chatRooms.map((room) => (
                  <ChatItem
                    key={room.id}
                    lastMessage={
                      lastMessages[room.id]?.message || '메시지 없음'
                    }
                    name={room.name || '알 수 없는 채팅방'}
                    time={
                      lastMessages[room.id]?.created_at
                        ? new Date(
                            lastMessages[room.id]?.created_at,
                          ).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })
                        : ''
                    }
                    profileUrl={
                      room.chatRoomImageUrl || '/hip-girl-thinking.svg'
                    }
                  />
                ))
              ) : (
                <p className="text-gray-4 text-center">
                  참여 중인 채팅방이 없습니다.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
