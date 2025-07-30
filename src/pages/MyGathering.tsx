'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import GatheringChatting from '@/components/GatheringChatting';
import GatheringMain from '@/components/GatheringMain';
import GatheringSide from '@/components/GatheringSide';
import { getGroupById, getMyGroups } from '@/lib/api/group';
import { getLastChatHistory } from '@/lib/api/chat';
import { HashLoader } from 'react-spinners';

export default function MyGathering() {
  // const router = useRouter();
  const [selectedGathering, setSelectedGathering] =
    useState<GroupDetail | null>(null);
  const [activeTab, setActiveTab] = useState<'my-gathering' | 'chat'>(
    'my-gathering',
  ); // 'my-gathering' 또는 'chat'
  const [myGatherings, setMyGatherings] = useState<GroupDetail[]>([]);
  const [lastMessages, setLastMessages] = useState<
    Record<number, LastChatHistory>
  >({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const myGroupsResponse = await getMyGroups();

      const myGroupDetails = await Promise.all(
        myGroupsResponse.map(async (group) => {
          const detail = await getGroupById(group.groupId);
          return {
            ...detail,
            isLeader: group.groupLeaderEmail === group.currentUserEmail,
            type: group.type, // MyGroupData의 type 필드 추가
            currentUserImageUrl: group.currentUserImageUrl, // MyGroupData의 currentUserImageUrl 필드 추가
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
  }, [setLoading, setMyGatherings, setLastMessages, setError]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const searchParams = useSearchParams();

  useEffect(() => {
    if (!searchParams) {
      return;
    }
    const groupId = searchParams.get('groupId');
    if (groupId) {
      const fetchSpecificGroup = async () => {
        try {
          const groupDetail = await getGroupById(Number(groupId));
          setSelectedGathering(groupDetail);
        } catch (err) {
          console.error('Failed to fetch specific group:', err);
        }
      };
      fetchSpecificGroup();
    }
  }, [searchParams]);

  const handleSelectGathering = (gathering: GroupDetail) => {
    setSelectedGathering(gathering);
    console.log('MyGathering: selectedGathering', gathering);
    // 모임 아이템을 선택하면 해당 탭으로 자동 전환
    if (activeTab === 'my-gathering') {
      // GatheringMain을 보여줘야 함
    } else if (activeTab === 'chat') {
      // GatheringChatting을 보여줘야 함
    }
    console.log(gathering.id);
  };

  const handleParticipantUpdate = async () => {
    if (selectedGathering) {
      try {
        const updatedGroupDetail = await getGroupById(selectedGathering.id);
        setSelectedGathering(updatedGroupDetail);
      } catch (err) {
        console.error('Failed to re-fetch selected group details:', err);
      }
    }
  };

  const handleTabChange = (tab: 'my-gathering' | 'chat') => {
    setActiveTab(tab);
    setSelectedGathering(null); // 탭 변경 시 선택된 모임 초기화
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <HashLoader color="#36d7b7" size={50} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="mb-50">
        <div className="lg:flex lg:items-center lg:justify-center">
          <div className="flex-shrink-0 lg:h-screen lg:w-[330px]">
            <h2 className="h3 text-white">모임</h2>
            <div
              className={`bg-gray-7 lg:border-gray-5 mt-5 flex h-full w-full flex-col items-center rounded-[15px] p-2 lg:w-[330px] lg:border`}
            >
              <p>에러: {error}</p>
            </div>
          </div>
          <div className="mt-10 max-w-[1050px] flex-grow lg:ml-5 lg:h-[740px]">
            <div className="bg-gray-7 lg:border-gray-5 mt-7 flex h-full w-full items-center justify-center rounded-[15px] p-4 text-white lg:border lg:p-10">
              <p>에러: {error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-50">
      <div className="lg:flex lg:items-center lg:justify-center">
        {/* 고정 너비 사이드 */}
        <div className="flex-shrink-0 lg:h-[740px] lg:w-[330px]">
          <h2 className="h3 text-white">모임</h2>
          <GatheringSide
            onSelectGathering={handleSelectGathering}
            activeTab={activeTab}
            onTabChange={handleTabChange}
            myGatherings={myGatherings}
            lastMessages={lastMessages}
          />
        </div>
        {/* 유동 너비 메인 */}
        <div className="mt-15 max-w-[1050px] flex-grow lg:ml-5 lg:h-[740px]">
          {activeTab === 'my-gathering' && selectedGathering ? (
            <GatheringMain
              selectedGathering={selectedGathering}
              onParticipantUpdate={handleParticipantUpdate}
              onGroupUpdate={fetchData}
            />
          ) : activeTab === 'chat' && selectedGathering ? (
            <GatheringChatting
              gathering={selectedGathering}
              myGatherings={myGatherings}
              lastMessages={lastMessages}
            />
          ) : (
            <div className="bg-gray-7 lg:border-gray-5 mt-5 flex h-full w-full items-center justify-center rounded-[15px] p-4 text-white lg:border lg:p-10">
              <p className="">
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
