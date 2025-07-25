'use client';

import { useState, useEffect } from 'react';
import GatheringTabButton from './button/GatheringTabButton';
import { Search, Users } from 'lucide-react';
import { BiSolidChat } from 'react-icons/bi';
import ChatItem from './common/ChatItem';
import GatheringItem from './common/GatheringItem';
import { getGroupById, getMyGroups } from '@/lib/api/group';
import { getLastChatHistory } from '@/lib/api/chat';
import { useAuthStore } from '@/stores/UseAuthStore';

interface GatheringSideProps {
  onSelectGathering: (gathering: GroupDetail) => void;
  activeTab: 'my-gathering' | 'chat';
  onTabChange: (tab: 'my-gathering' | 'chat') => void;
}

export default function GatheringSide({
  onSelectGathering,
  activeTab,
  onTabChange,
}: GatheringSideProps) {
  const { user } = useAuthStore();
  const [myGatherings, setMyGatherings] = useState<GroupDetail[]>([]);
  const [lastMessages, setLastMessages] = useState<
    Record<number, LastChatHistory>
  >({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const myGroupsResponse = await getMyGroups();

        const myGroupDetails = await Promise.all(
          myGroupsResponse.map(async (group) => {
            const detail = await getGroupById(group.groupId);
            return {
              ...detail,
              isLeader: group.groupLeaderEmail === group.currentUserEmail,
            };
          }),
        );
        const validGroups = myGroupDetails.filter(Boolean);
        setMyGatherings(validGroups);

        if (validGroups.length > 0) {
          const lastMessagesData = await Promise.all(
            validGroups.map((group) =>
              getLastChatHistory(group.id, 'GROUP_CHAT'),
            ),
          );
          const lastMessagesMap = lastMessagesData.reduce(
            (acc, msg, index) => {
              if (msg) {
                acc[validGroups[index].id] = msg;
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

  const filteredGatherings = Array.from(
    new Map(myGatherings.map((item) => [item.id, item])).values(),
  ).filter(
    (gathering) =>
      gathering.title &&
      gathering.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

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
            onClick={() => onTabChange('my-gathering')}
          />
          <GatheringTabButton
            icon={<BiSolidChat className="h-[19px] w-[19px]" />}
            label="모임 채팅"
            isActive={activeTab === 'chat'}
            onClick={() => onTabChange('chat')}
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
            onChange={handleSearchChange}
          />
        </div>
        <div className="w-full flex-grow overflow-y-auto px-2">
          {activeTab === 'my-gathering' ? (
            <div className="space-y-2">
              {filteredGatherings.length > 0 ? (
                filteredGatherings.map((gathering) => (
                  <GatheringItem
                    key={gathering.id}
                    name={gathering.title}
                    description={gathering.simpleExplain}
                    imageUrl={gathering.imageUrl}
                    onClick={() => onSelectGathering(gathering)}
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
              {filteredGatherings.length > 0 ? (
                filteredGatherings.map((gathering) => (
                  <ChatItem
                    key={gathering.id}
                    lastMessage={
                      lastMessages[gathering.id]?.message ||
                      '아직 대화중이 아닌 채팅방입니다.'
                    }
                    name={`${gathering.title}` || '알 수 없는 채팅방'}
                    time={lastMessages[gathering.id]?.time}
                    imageUrl={gathering.imageUrl}
                    onClick={() => onSelectGathering(gathering)}
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
