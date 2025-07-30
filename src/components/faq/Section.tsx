'use client';

import FaqContent from './Faq';
import NoticeContent from './Notice';

export default function FaqSection() {
  return (
    <>
      <div className="flex flex-col items-center bg-[#1d1d1d] pt-20 pb-3">
        <span className="mb-1 text-[14px] font-semibold tracking-tight text-white lg:text-[24px]">
          고객지원
        </span>
        <h1 className="mb-2 text-center text-[24px] font-extrabold lg:text-[32px]">
          <span className="bg-gradient-to-r from-[#1cebb9] to-[#7f74ff] bg-clip-text text-transparent">
            무엇을 도와드릴까요?
          </span>
        </h1>
      </div>
      <div className="flex flex-col bg-[#1d1d1d] py-8">
        <section>
          <FaqContent />
        </section>
        <section>
          <NoticeContent />
        </section>
      </div>
    </>
  );
}
