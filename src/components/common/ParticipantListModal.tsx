'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import { ApprovedParticipantInfo } from '@/types/participant';
import { kickoutParticipant } from '@/lib/api/participant';
import { useAuthStore } from '@/stores/UseAuthStore';

interface ParticipantListModalProps {
  participants: ApprovedParticipantInfo[];
  onClose: () => void;
  isLeader?: boolean;
  groupId: number;
}

export default function ParticipantListModal({
  participants,
  onClose,
  isLeader,
  groupId,
}: ParticipantListModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const { user } = useAuthStore();

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
        <h2 className="mb-4 text-center text-[20px] text-white">모임 유저</h2>
        <hr className="text-gray-disabled py-4" />
        {participants.length === 0 ? (
          <p className="text-gray-4">참여자가 없습니다.</p>
        ) : (
          <ul className="max-h-80 space-y-5 overflow-y-auto">
            {participants.map((participant, index) => (
              <li
                key={index}
                className="flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full">
                    <Image
                      src={participant.userImageUrl || '/hip-girl-thinking.svg'}
                      alt={participant.userNickname}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <span className="text-[16px] text-white">
                    {participant.userNickname}
                  </span>
                </div>
                <div className="flex gap-2">
                  {user?.email !== participant.userEmail && (
                    <>
                      <button
                        className="bg-gray-4 rounded px-3 py-1 text-sm text-white"
                        onClick={() =>
                          alert(`메시지 보내기: ${participant.userNickname}`)
                        }
                      >
                        메시지
                      </button>
                      <button
                        className="bg-gray-4 rounded px-3 py-1 text-sm text-white"
                        onClick={() =>
                          alert(`팔로우: ${participant.userNickname}`)
                        }
                      >
                        팔로우
                      </button>
                    </>
                  )}
                  {isLeader && user?.email !== participant.userEmail && (
                    <button
                      className="bg-red-500 rounded px-3 py-1 text-sm text-white"
                      onClick={() => handleKickout(participant.userEmail)}
                    >
                      추방
                    </button>
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
