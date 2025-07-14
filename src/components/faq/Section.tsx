'use client'

import { useState } from "react";
import TabToggle from "./TabToggle";
import FaqContent from "./Faq";
import NoticeContent from "./Notice";

type Tab = "FAQ" | "공지사항";

export default function FaqSection() {
  const [activeTab, setActiveTab] = useState<Tab>("FAQ");

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
      <div className="flex justify-center pt-2 pb-8 bg-[#1d1d1d]">
        <TabToggle active={activeTab} onChange={setActiveTab} />
      </div>
      {activeTab === "FAQ" ? <FaqContent /> : <NoticeContent />}
    </>
  );
}