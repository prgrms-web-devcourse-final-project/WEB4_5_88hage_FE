'use client';

import { useAuthStore } from '@/stores/UseAuthStore';
import {
  followUser,
  unfollowUser,
  checkFollowingStatus,
} from '@/lib/api/follow';
import { useEffect, useState } from 'react';
import { toast } from "react-toastify";

type Props = {
  hostName: string;
  hostEmail: string;
  tags: string[];
  hostExplain: string;
};
export default function GatheringHostBox({
  hostName,
  hostEmail,
  tags,
  hostExplain,
}: Props) {
  const user = useAuthStore((s) => s.user);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const checkStatus = async () => {
      if (user?.email && hostEmail !== user.email) {
        const status = await checkFollowingStatus(hostEmail);
        setIsFollowing(status);
      }
    };
    checkStatus();
  }, [hostEmail, user?.email]);

  const handleFollow = async () => {
    try {
      await followUser(hostEmail);
      toast.success(`${hostName} 님을 팔로우했습니다.`);
      setIsFollowing(true);
    } catch (error) {
      console.error('Failed to follow user:', error);
      toast.error('팔로우에 실패했습니다.');
    }
  };

  const handleUnfollow = async () => {
    if (window.confirm(`${hostName} 님을 언팔로우하시겠습니까?`)) {
      try {
        await unfollowUser(hostEmail);
        toast.success(`${hostName} 님이 언팔로우되었습니다.`);
        setIsFollowing(false);
      } catch (error) {
        console.error('Failed to unfollow user:', error);
        aletoast.errorrt('언팔로우에 실패했습니다.');
      }
    }
  };

  return (
    <div className="flex w-full gap-[20px] rounded-[5px] border border-[#393939] p-[20px]">
      <div className="bg-gray-3 size-[100px] rounded-full"></div>
      <div className="flex grow-1 flex-col">
        <div className="text-[18px] text-white">{hostName}</div>
        <div className="pt-[11.33px] pb-[14.33px] text-[#ababab]">
          {hostExplain}
        </div>
        <div className="flex gap-[10px] text-[14px]">
          {tags.map((data) => (
            <div
              key={data}
              className="bg-gray-4 rounded-full px-[17px] py-[4px] text-white"
            >
              {data}
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-end">
        {hostEmail === user?.email ? (
          ''
        ) : isFollowing ? (
          <button
            onClick={handleUnfollow}
            className="bg-gray-4 rounded-full px-[16px] py-[6px] text-white"
          >
            언팔로우
          </button>
        ) : (
          <button
            onClick={handleFollow}
            className="bg-gray-4 rounded-full px-[16px] py-[6px] text-white"
          >
            팔로우
          </button>
        )}
      </div>
    </div>
  );
}
