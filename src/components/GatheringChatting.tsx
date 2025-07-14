import Image from 'next/image';
import MainPostHeader from './common/MainPostHeader';
import profileImg from '@/assets/images/thinking.svg';

import { MdAddPhotoAlternate } from 'react-icons/md';
import { LuSend } from 'react-icons/lu';

export default function GatheringChatting() {
  const messages = [
    {
      id: 1,
      type: 'received',
      sender: 'UserA',
      name: '김이박',
      text: '심심하다 오늘 만날 사람?',
    },
    {
      type: 'received',
      sender: 'UserA',
      name: '김이박',
      text: '같이 재즈 칵테일 바 가실 분 내가 삼',
      time: '오후 12:32',
    },
    {
      id: 2,
      type: 'sent',
      sender: 'UserB',
      name: '최박이',
      text: '나 갈래! 나 갈래! 너가 사는거얌? 개꿀이다 ㅋㅋㅋ 오늘 월급 날이야?',
      time: '오후 12:32',
    },
    {
      type: 'received',
      sender: 'UserA',
      name: '김이박',
      text: 'ㄱㄱ',
      time: '오후 12:32',
    },
  ];
  return (
    <>
      <div className="bg-gray-7 lg:border-gray-5 mt-5 flex h-full w-full flex-col rounded-[15px] p-4 lg:border lg:p-10">
        <MainPostHeader />
        <div className="my-5 flex min-h-[400px] flex-col gap-2 overflow-y-auto">
          {messages.map((msg, index) => {
            const previousMessage = messages[index - 1];
            const shouldShowProfilePic =
              !previousMessage || previousMessage.sender !== msg.sender;

            return msg.type === 'sent' ? (
              <div
                key={msg.id}
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
                key={msg.id}
                className={`flex items-start gap-2 ${
                  shouldShowProfilePic ? 'mt-4' : ''
                }`}
              >
                {shouldShowProfilePic ? (
                  <Image
                    src={profileImg}
                    width={28}
                    height={28}
                    alt="상대 프로필"
                    className="rounded-full"
                  />
                ) : (
                  <div className="h-[28px] w-[28px]" />
                )}
                <div className="">
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
        {/* 입력창 */}
        <div className="relative w-full lg:mt-auto">
          {/* 왼쪽 아이콘 */}
          <MdAddPhotoAlternate className="text-gray-disabled absolute top-1/2 left-3 h-[20px] w-[20px] -translate-y-1/2" />

          <input
            type="text"
            placeholder="메세지를 입력해 주세요"
            className="border-gray-disabled t3 placeholder:text-gray-disabled bg-gray-5 w-full rounded-[10px] border p-3 pr-10 pl-10 text-white"
          />

          {/* 오른쪽 아이콘 */}
          <LuSend className="text-gray-disabled absolute top-1/2 right-3 h-[20px] w-[20px] -translate-y-1/2 cursor-pointer" />
        </div>
      </div>
    </>
  );
}
