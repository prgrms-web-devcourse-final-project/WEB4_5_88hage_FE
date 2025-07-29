'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import { kickoutParticipant } from '@/lib/api/participant';
import {
  followUser,
  unfollowUser,
  checkFollowingStatus,
} from '@/lib/api/follow';
import { useAuthStore } from '@/stores/UseAuthStore';
import { toast } from "react-toastify";

interface ParticipantData {
  userNickname: string;
  userImageUrl: string;
  userEmail: string;
  isFollowing?: boolean;
}

interface ParticipantListModalProps {
  participants: ParticipantData[];
  onClose: () => void;
  isLeader?: boolean;
  groupId: number;
  onUpdate?: () => void;
}

export default function ParticipantListModal({
  participants,
  onClose,
  onUpdate,
  isLeader,
  groupId,
}: ParticipantListModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const { user } = useAuthStore();
  const [participantList, setParticipantList] =
    React.useState<ParticipantData[]>(participants);

  const handleKickout = async (targetEmail: string, targetNickname: string) => {
    if (window.confirm(`${targetNickname} 님을 모임에서 추방하시겠습니까?`)) {
      try {
        await kickoutParticipant(groupId, targetEmail);
        toast.success(`${targetNickname} 님이 모임에서 추방되었습니다.`);
        onClose(); // Close modal after kickout
        if (onUpdate) {
          onUpdate();
        }
      } catch (error) {
        console.error('Failed to kick out participant:', error);
        toast.error('참여자 추방에 실패했습니다.');
      }
    }
  };

  const handleFollow = async (email: string, nickname: string) => {
    try {
      await followUser(email);
      toast.success(`${nickname} 님을 팔로우했습니다.`);
      setParticipantList((prevParticipants) =>
        prevParticipants.map((p) =>
          p.userEmail === email ? { ...p, isFollowing: true } : p,
        ),
      );
    } catch (error) {
      console.error('Failed to follow user:', error);
      toast.error('팔로우에 실패했습니다.');
    }
  };

  const handleUnfollow = async (email: string, nickname: string) => {
    if (window.confirm(`${nickname} 님을 언팔로우하시겠습니까?`)) {
      try {
        await unfollowUser(email);
        toast.success(`${nickname} 님이 언팔로우되었습니다.`);
        setParticipantList((prevParticipants) =>
          prevParticipants.map((p) =>
            p.userEmail === email ? { ...p, isFollowing: false } : p,
          ),
        );
      } catch (error) {
        console.error('Failed to unfollow user:', error);
        toast.error('언팔로우에 실패했습니다.');
      }
    }
  };
  useEffect(() => {
    const fetchFollowingStatus = async () => {
      const updatedParticipants = await Promise.all(
        participants.map(async (p) => {
          if (user?.email && p.userEmail !== user.email) {
            const isFollowing = await checkFollowingStatus(p.userEmail);
            return { ...p, isFollowing };
          }
          return p;
        }),
      );
      setParticipantList(updatedParticipants);
    };

    fetchFollowingStatus();
  }, [participants, user?.email]);

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
        {participantList.length === 0 ? (
          <p className="text-gray-4">참여자가 없습니다.</p>
        ) : (
          <ul className="max-h-80 space-y-5 overflow-y-auto">
            {participantList.map((participant, index) => (
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
                      
                      {participant.isFollowing ? (
                        <button
                          className="bg-gray-4 rounded px-3 py-1 text-sm text-white"
                          onClick={() =>
                            handleUnfollow(
                              participant.userEmail,
                              participant.userNickname,
                            )
                          }
                        >
                          언팔로우
                        </button>
                      ) : (
                        <button
                          className="bg-gray-4 mr-2 ml-1.5 rounded px-3 py-1 text-sm text-white"
                          onClick={() =>
                            handleFollow(
                              participant.userEmail,
                              participant.userNickname,
                            )
                          }
                        >
                          팔로우
                        </button>
                      )}
                    </>
                  )}
                  {isLeader && user?.email !== participant.userEmail && (
                    <button
                      className="rounded bg-red-500 px-3 py-1 text-sm text-white"
                      onClick={() =>
                        handleKickout(
                          participant.userEmail,
                          participant.userNickname,
                        )
                      }
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
