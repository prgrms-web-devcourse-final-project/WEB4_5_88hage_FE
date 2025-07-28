'use client'

import FaqContent from "./Faq";
import NoticeContent from "./Notice";

export default function FaqSection() {
  return (
    <>
      <div className="flex flex-col items-center pt-8 pb-3 bg-[#1d1d1d]">
        <span className="text-[14px] lg:text-[24px] font-semibold text-white mb-1 tracking-tight">
          고객지원
        </span>
        <h1 className="text-[24px] lg:text-[32px] font-extrabold text-center mb-2">
          <span className="bg-gradient-to-r from-[#1cebb9] to-[#7f74ff] bg-clip-text text-transparent">
            무엇을 도와드릴까요?
          </span>
        </h1>
      </div>
      <div className="bg-[#1d1d1d] py-8 flex flex-col">
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