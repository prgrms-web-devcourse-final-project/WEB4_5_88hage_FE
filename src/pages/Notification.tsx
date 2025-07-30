'use client';
import NotiCheckbox from '@/components/NotiCheckbox';
import { useAuthStore } from '@/stores/UseAuthStore';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { toast } from 'react-toastify';

type NotificationData = {
  id: number;
  email: string;
  message: string;
  link: string;
  isRead: boolean;
  type: string;
  scheduledAt: string;
  sentAt: string;
  calendarId: null;
  applicantEmail: string | null;
};

export default function Notification() {
  const API = process.env.NEXT_PUBLIC_API_URL;
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState<'recent' | 'unread' | 'read'>(
    'recent',
  );
  const [selectedId, setSelectedId] = useState<number[]>([]);
  const [notiList, setNotiList] = useState<NotificationData[]>([]);

  const convertTime = (createdAt: string) => {
    const date = new Date(createdAt);
    // date.setHours(date.getHours() + 9);
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
  };

  const fetchNotification = useCallback(async () => {
    if (user) {
      const response = await fetch(
        `${API}/api/notifications/${activeTab}?email=${user.email}`,
        {
          credentials: 'include',
        },
      );
      const { code, message, data } = await response.json();
      if (code === '0000') setNotiList(data);
      else toast.info(message);
    }
  }, [activeTab, user, API, setNotiList]);

  const readNotification = async () => {
    const response = await fetch(`${API}/api/notifications/read-selected`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(selectedId),
    });
    const { code, message } = await response.json();
    if (code === '0000') {
      toast.info('읽음 처리되었습니다.');
      fetchNotification(); // Call fetchNotification after successful read
    } else toast.info(message);
  };

  const fetchGroupApprove = async (link: string, select: string) => {
    const groupId = link.split('/')[link.split('/').length - 1];
    console.log(groupId, select);
  };

  useEffect(() => {
    fetchNotification();
  }, [user, activeTab, fetchNotification]);

  return (
    <>
      <header className="flex flex-col text-[#fff]">
        <div className="mx-[14px] mt-[13px] mb-[23px] flex justify-between">
          <Link href="/" type="button">
            <ChevronLeft />
          </Link>
          <div className="text-xl font-semibold">알림 센터</div>
          <ChevronLeft color="transparent" />
        </div>
        <div className="flex justify-center gap-[17px] border-b border-[#3c3c3c] font-medium text-[#989898]">
          <button
            type="button"
            disabled={activeTab === 'recent'}
            onClick={() => setActiveTab('recent')}
            className="w-15 border-[#fff] pb-[10px] disabled:border-b-2 disabled:text-[#fff]"
          >
            최신순
          </button>
          <button
            type="button"
            disabled={activeTab === 'unread'}
            onClick={() => setActiveTab('unread')}
            className="w-15 border-[#fff] pb-[10px] disabled:border-b-2 disabled:text-[#fff]"
          >
            안 읽음
          </button>
          <button
            type="button"
            disabled={activeTab === 'read'}
            onClick={() => setActiveTab('read')}
            className="w-15 border-[#fff] pb-[10px] disabled:border-b-2 disabled:text-[#fff]"
          >
            읽음
          </button>
        </div>
      </header>
      <main className="flex w-full flex-col items-center text-[#fff]">
        <div className="flex w-full max-w-360 items-center gap-[19px] border-b border-[#3c3c3c] px-5 pt-[33px] pb-[33px] lg:px-0 lg:py-5">
          <NotiCheckbox
            checked={
              notiList
                .map((v) => v.id)
                .sort()
                .toString() === selectedId.sort().toString() &&
              selectedId.length !== 0
            }
            onChange={() => {
              if (
                notiList
                  .map((v) => v.id)
                  .sort()
                  .toString() !== selectedId.sort().toString()
              ) {
                setSelectedId(notiList.map((v) => v.id));
              } else setSelectedId([]);
            }}
          />
          <button
            type="button"
            onClick={readNotification}
            className="text-sm text-[#ff4e4e]"
          >
            읽음
          </button>
        </div>
        {notiList.map((item) => (
          <div
            key={item.id}
            className={twMerge(
              'mx-[10px] flex w-full max-w-360 items-center gap-[19px] border-b border-[#3c3c3c] px-5 pt-[33px] pb-[33px] lg:mx-0 lg:px-0 lg:py-5',
              `${item.isRead && 'text-[#859199]'}`,
            )}
          >
            <NotiCheckbox
              checked={selectedId.includes(item.id)}
              onChange={() => {
                if (!selectedId.includes(item.id)) {
                  setSelectedId((prev) => [...prev, item.id]);
                } else
                  setSelectedId((prev) => prev.filter((v) => v !== item.id));
              }}
              className="text-[#fff] lg:ml-2.5"
            />
            <div className="flex w-full text-sm lg:text-[16px]">
              <div className="flex w-200/335 flex-col gap-5 lg:grow">
                {item.message}
                <span className="lg:hidden">{convertTime(item.sentAt)}</span>
              </div>
              <div className="grow"></div>
              {item.link.includes('/groups') && (
                <div className="mr-10 flex min-w-24 gap-10 lg:mr-12">
                  <button
                    type="button"
                    onClick={() => fetchGroupApprove(item.link, '수락')}
                  >
                    수락
                  </button>
                  <button
                    type="button"
                    onClick={() => fetchGroupApprove(item.link, '거절')}
                    className="text-[#ff4e4e]"
                  >
                    거절
                  </button>
                </div>
              )}
              <div className="flex items-center gap-10 lg:mr-2.5">
                <div className="hidden lg:block">
                  {convertTime(item.sentAt)}
                </div>
                <div className="w-[54px] text-right">
                  {item.isRead ? '읽음' : '안 읽음'}
                </div>
              </div>
            </div>
          </div>
        ))}
      </main>
    </>
  );
}
