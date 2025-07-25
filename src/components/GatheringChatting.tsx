'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { CompatClient, Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { MdAddPhotoAlternate } from 'react-icons/md';
import { LuSend } from 'react-icons/lu';

import MainPostHeader from './common/MainPostHeader';
import profileImg from '@/assets/images/thinking.svg';
import { useAuthStore } from '@/stores/UseAuthStore';
import { get as fetchGet } from '@/lib/api/fetchInstance';
import { deleteGroup, completeGroup } from '@/lib/api/group';
import { getCategoryDisplayName } from '@/lib/utils/categoryMapping';

// Type for the full gathering object
interface GroupDetail {
  id: number;
  title: string;
  category: string;
  nowPeople: number;
  groupImageUrl: string;
  isLeader?: boolean;
}

interface GatheringChattingProps {
  gathering: GroupDetail | null;
}

// Backend message format
interface ChatMessage {
  roomId: number;
  roomType: string; // Changed to string
  senderEmail: string;
  senderNickname: string;
  message: string;
  time: string;
  senderImageUrl?: string; // Added
}

// UI message format
interface DisplayMessage {
  type: 'sent' | 'received';
  sender: string; // senderEmail
  name: string; // senderNickname
  text: string;
  time?: string;
  senderImageUrl?: string; // Added for sender's profile image
}

export default function GatheringChatting({
  gathering,
}: GatheringChattingProps) {
  const [messages, setMessages] = useState<DisplayMessage[]>([]);
  const [messageInput, setMessageInput] = useState('');
  const client = useRef<CompatClient | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const { user, token } = useAuthStore();

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  // Fetch chat history when gathering changes
  useEffect(() => {
    if (!gathering || !token || !user) {
      setMessages([]); // Clear messages if no gathering is selected
      return;
    }

    const fetchHistory = async () => {
      try {
        const response = await fetchGet<{ data: ChatMessage[] }>(
          `/api/chats/${gathering.id}/GROUP_CHAT/history`,
        );

        if (response.data) {
          const historyMessages = response.data.map((msg): DisplayMessage => {
            return {
              type: msg.senderEmail === user.email ? 'sent' : 'received',
              sender: msg.senderEmail,
              name: msg.senderNickname,
              text: msg.message,
              time: msg.time,
              senderImageUrl: msg.senderImageUrl, // Add this line
            };
          });
          setMessages(historyMessages);
        }
      } catch (error) {
        console.error('Failed to fetch chat history:', error);
      }
    };

    fetchHistory();
  }, [gathering, token, user]);

  // Connect to WebSocket when gathering changes
  useEffect(() => {
    if (!gathering || !user) return;

    const sock = new SockJS(`${process.env.NEXT_PUBLIC_API_URL}/ws`);
    const stompClient = Stomp.over(sock);
    stompClient.debug = () => {};

    stompClient.connect({}, () => {
      client.current = stompClient;
      stompClient.subscribe(`/group/${gathering.id}`, (message) => {
        const received: ChatMessage = JSON.parse(message.body);

        const displayMessage: DisplayMessage = {
          type: received.senderEmail === user.email ? 'sent' : 'received',
          sender: received.senderEmail,
          name: received.senderNickname,
          text: received.message,
          time: received.time,
          senderImageUrl: received.senderImageUrl, // Add this line
        };
        setMessages((prevMessages) => [...prevMessages, displayMessage]);
      });
    });

    return () => {
      if (client.current?.connected) {
        client.current.disconnect();
      }
    };
  }, [gathering, user]);

  // Auto-scroll on new messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (client.current?.connected && messageInput.trim() && user && gathering) {
      const chatData: Partial<ChatMessage> = {
        roomId: gathering.id,
        roomType: 'GROUP_CHAT',
        senderEmail: user.email,
        senderNickname: user.nickname,
        message: messageInput.trim(),
      };

      client.current.send('/send/message', {}, JSON.stringify(chatData));
      setMessageInput('');
    }
  };

  const handleCompleteGroup = async (groupId: number) => {
    try {
      await completeGroup(groupId);
      alert('모임이 완료 처리되었습니다.');
      // Optionally, refresh or redirect
    } catch (error) {
      console.error('Failed to complete group:', error);
      alert('모임 완료 처리에 실패했습니다.');
    }
  };

  const handleDeleteGroup = async (groupId: number) => {
    try {
      await deleteGroup(groupId);
      alert('모임이 삭제되었습니다.');
      // Optionally, refresh or redirect
    } catch (error) {
      console.error('Failed to delete group:', error);
      alert('모임 삭제에 실패했습니다.');
    }
  };

  if (!gathering) {
    return (
      <div className="bg-gray-7 lg:border-gray-5 flex h-full w-full items-center justify-center rounded-[15px] p-4 text-white lg:border lg:p-10">
        <p>왼쪽에서 대화할 모임을 선택해주세요.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-7 lg:border-gray-5 mt-5 flex h-full w-full flex-col rounded-[15px] p-4 lg:border lg:p-10">
      <MainPostHeader
        title={gathering.title}
        category={getCategoryDisplayName(gathering.category)}
        memberCount={gathering.nowPeople}
        groupImageUrl={gathering.groupImageUrl}
        groupId={gathering.id}
        isLeader={gathering.isLeader}
        onComplete={handleCompleteGroup}
        onDelete={handleDeleteGroup}
      />
      <div
        ref={chatContainerRef}
        className="my-5 flex min-h-[400px] flex-1 flex-col gap-2 overflow-y-auto"
      >
        {messages.map((msg, index) => {
          const previousMessage = messages[index - 1];
          const shouldShowProfilePic =
            !previousMessage || previousMessage.sender !== msg.sender;

          return msg.type === 'sent' ? (
            <div
              key={`sent-${index}`}
              className={`flex items-end justify-end ${
                shouldShowProfilePic ? 'mt-4' : ''
              }`}
            >
              <div className="text-gray-disabled t4 mr-2">{msg?.time}</div>
              <div className="bg-main t3 inline-block max-w-[220px] rounded-[14px] px-3 py-2 text-black lg:max-w-[350px]">
                {msg.text}
              </div>
            </div>
          ) : (
            <div
              key={`received-${index}`}
              className={`flex items-start gap-2 ${
                shouldShowProfilePic ? 'mt-4' : ''
              }`}
            >
              {shouldShowProfilePic ? (
                <Image
                  src={msg.senderImageUrl || profileImg}
                  width={28}
                  height={28}
                  alt="상대 프로필"
                  className="rounded-full"
                />
              ) : (
                <div className="h-[28px] w-[28px]" />
              )}
              <div>
                {shouldShowProfilePic && (
                  <div className="t3 mb-1 font-semibold text-white">
                    {msg.name}
                  </div>
                )}
                <div className="flex items-end">
                  <div className="bg-gray-5 t3 inline-block max-w-[200px] rounded-lg px-3 py-2 text-white lg:max-w-[350px]">
                    {msg.text}
                  </div>
                  <div className="t4 text-gray-disabled ml-2">{msg.time}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 입력창 */}
      <div className="relative mt-auto w-full">
        <MdAddPhotoAlternate className="text-gray-disabled absolute top-1/2 left-3 h-[20px] w-[20px] -translate-y-1/2" />
        <input
          type="text"
          placeholder="메세지를 입력해 주세요"
          className="border-gray-disabled t3 placeholder:text-gray-disabled bg-gray-5 w-full rounded-[10px] border p-3 pr-10 pl-10 text-white"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
        />
        <LuSend
          className="text-gray-disabled absolute top-1/2 right-3 h-[20px] w-[20px] -translate-y-1/2 cursor-pointer"
          onClick={handleSendMessage}
        />
      </div>
    </div>
  );
}
