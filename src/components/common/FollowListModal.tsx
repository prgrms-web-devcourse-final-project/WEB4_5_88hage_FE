'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import { unfollowUser } from '@/lib/api/follow';

interface FollowListModalProps {
  users: { nickname: string; imageUrl: string; email: string }[];
  onClose: () => void;
  title: string;
  onUnfollowSuccess?: () => void;
}

export default function FollowListModal({
  users,
  onClose,
  title,
  onUnfollowSuccess,
}: FollowListModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleUnfollow = async (email: string, nickname: string) => {
    if (window.confirm(`${nickname} 님을 언팔로우하시겠습니까?`)) {
      try {
        await unfollowUser(email);
        alert(`${nickname} 님이 언팔로우되었습니다.`);
        if (onUnfollowSuccess) {
          onUnfollowSuccess();
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
            {users.map((user, index) => (
              <li
                key={index}
                className="flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full">
                    <Image
                      src={user.imageUrl || '/hip-girl-thinking.svg'}
                      alt={user.nickname}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <span className="text-[16px] text-white">
                    {user.nickname}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    className="bg-gray-4 rounded px-3 py-1 text-sm text-white"
                    onClick={() => alert(`메시지 보내기: ${user.nickname}`)}
                  >
                    메시지
                  </button>
                  <button
                    className="bg-gray-4 rounded px-3 py-1 text-sm text-white"
                    onClick={() => handleUnfollow(user.email, user.nickname)}
                  >
                    언팔로우
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
