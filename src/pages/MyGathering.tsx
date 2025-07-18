'use client';

import { useEffect, useState } from 'react';
import GatheringChatting from '@/components/GatheringChatting';
import GatheringMain from '@/components/GatheringMain';
import GatheringSide from '@/components/GatheringSide';
import { getMyGroups } from '@/lib/api/group';
import { Group } from '@/types/group';

export default function MyGathering() {
  const [myGroups, setMyGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMyGroups = async () => {
      try {
        const data = await getMyGroups();
        setMyGroups(data);
      } catch (err) {
        setError('Failed to fetch groups.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyGroups();
  }, []);

  if (loading) {
    return <div className="text-white">Loading your gatherings...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="mb-50">
      <h2 className="h3 text-white">모임</h2>
      <div className="lg:flex lg:items-center lg:justify-center">
        {/* 고정 너비 사이드 */}
        <div className="flex-shrink-0 lg:h-[740px] lg:w-[330px]">
          <GatheringSide />
        </div>
        {/* 유동 너비 메인 */}
        <div className="max-w-[1050px] flex-grow lg:ml-5 lg:h-[740px]">
          {myGroups.length > 0 ? (
            <GatheringMain group={myGroups[0]} />
          ) : (
            <div className="text-white">No gatherings found.</div>
          )}
          <GatheringChatting />
        </div>
      </div>
    </div>
  );
}

