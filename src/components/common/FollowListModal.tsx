'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';

import {
  followUser,
  unfollowUser,
  checkFollowingStatus,
} from '@/lib/api/follow';
import { useAuthStore } from '@/stores/UseAuthStore';

interface UserData {
  nickname: string;
  imageUrl: string;
  email: string;
  isFollowing?: boolean; // Add isFollowing property
}

interface FollowListModalProps {
  users: UserData[];
  onClose: () => void;
  title: string;
  onUpdate?: () => void; // Callback for when follow/unfollow happens
}

export default function FollowListModal({
  users: initialUsers,
  onClose,
  title,
  onUpdate,
}: FollowListModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const { user } = useAuthStore();
  const [users, setUsers] = React.useState<UserData[]>(initialUsers);

  useEffect(() => {
    const fetchFollowingStatus = async () => {
      const updatedUsers = await Promise.all(
        initialUsers.map(async (u) => {
          if (user?.email && u.email !== user.email) {
            const isFollowing = await checkFollowingStatus(u.email);
            return { ...u, isFollowing };
          }
          return u;
        }),
      );
      setUsers(updatedUsers);
    };

    fetchFollowingStatus();
  }, [initialUsers, user?.email]);

  const handleFollow = async (email: string, nickname: string) => {
    try {
      await followUser(email);
      alert(`${nickname} 님을 팔로우했습니다.`);
      setUsers((prevUsers) =>
        prevUsers.map((u) =>
          u.email === email ? { ...u, isFollowing: true } : u,
        ),
      );
      if (onUpdate) {
        onUpdate();
      }
    } catch (error) {
      console.error('Failed to follow user:', error);
      alert('팔로우에 실패했습니다.');
    }
  };

  const handleUnfollow = async (email: string, nickname: string) => {
    if (window.confirm(`${nickname} 님을 언팔로우하시겠습니까?`)) {
      try {
        await unfollowUser(email);
        setUsers((prevUsers) =>
          prevUsers.map((u) =>
            u.email === email ? { ...u, isFollowing: false } : u,
          ),
        );
        if (onUpdate) {
          onUpdate();
        }
      } catch (error) {
        console.error('Failed to unfollow user:', error);
        alert('언팔로우에 실패했습니다.');
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div
        ref={modalRef}
        className="bg-gray-5 relative w-full rounded p-6 shadow-lg lg:w-[600px]"
      >
        <button
          onClick={onClose}
          className="text-gray-4 absolute top-3 right-3 hover:text-white"
        >
          <X size={24} />
        </button>
        <h2 className="mb-4 text-center text-[20px] text-white">{title}</h2>
        <hr className="text-gray-disabled py-4" />
        {users.length === 0 ? (
          <p className="text-gray-4">목록이 비어있습니다.</p>
        ) : (
          <ul className="max-h-80 space-y-5 overflow-y-auto">
            {users.map((listUser, index) => (
              <li
                key={index}
                className="flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full">
                    <Image
                      src={listUser.imageUrl || '/hip-girl-thinking.svg'}
                      alt={listUser.nickname}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <span className="text-[16px] text-white">
                    {listUser.nickname}
                  </span>
                </div>
                <div className="flex gap-2">
                  {user?.email !== listUser.email && (
                    <>
                      <button
                        className="bg-gray-4 rounded px-3 py-1 text-sm text-white"
                        onClick={() =>
                          alert(`메시지 보내기: ${listUser.nickname}`)
                        }
                      >
                        메시지
                      </button>
                      {listUser.isFollowing ? (
                        <button
                          className="bg-gray-4 rounded px-3 py-1 text-sm text-white"
                          onClick={() =>
                            handleUnfollow(listUser.email, listUser.nickname)
                          }
                        >
                          언팔로우
                        </button>
                      ) : (
                        <button
                          className="bg-gray-4 ml-3.5 rounded px-3 py-1 text-sm text-white"
                          onClick={() =>
                            handleFollow(listUser.email, listUser.nickname)
                          }
                        >
                          팔로우
                        </button>
                      )}
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
