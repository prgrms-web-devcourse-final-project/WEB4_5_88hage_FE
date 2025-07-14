"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "이건 FAQ 제목 입니다.",
    answer: `형사피의자 또는 형사피고인으로서 구금되었던 자가 변호인이 있는 
상태에서 조사를 받은 경우에는 법률이 정하는 바에 의하여 법정형의 감경 또는 
면제를 받을 수 있다. 그러나 구금된 사실이 없었던 경우에는 이를 적용받지 
못한다.`,
  },
  {
    question: "이건 FAQ 제목 입니다.",
    answer: `형사피의자 또는 형사피고인으로서 구금되었던 자가 변호인이 있는 
상태에서 조사를 받은 경우에는 법률이 정하는 바에 의하여 법정형의 감경 또는 
면제를 받을 수 있다. 그러나 구금된 사실이 없었던 경우에는 이를 적용받지 
못한다.`,
  },
  {
    question: "이건 FAQ 제목 입니다.",
    answer: `형사피의자 또는 형사피고인으로서 구금되었던 자가 변호인이 있는 
상태에서 조사를 받은 경우에는 법률이 정하는 바에 의하여 법정형의 감경 또는 
면제를 받을 수 있다. 그러나 구금된 사실이 없었던 경우에는 이를 적용받지 
못한다.`,
  },
  {
    question: "이건 FAQ 제목 입니다.",
    answer: `형사피의자 또는 형사피고인으로서 구금되었던 자가 변호인이 있는 
상태에서 조사를 받은 경우에는 법률이 정하는 바에 의하여 법정형의 감경 또는 
면제를 받을 수 있다. 그러나 구금된 사실이 없었던 경우에는 이를 적용받지 
못한다.`,
  },
  {
    question: "이건 FAQ 제목 입니다.",
    answer: `형사피의자 또는 형사피고인으로서 구금되었던 자가 변호인이 있는 
상태에서 조사를 받은 경우에는 법률이 정하는 바에 의하여 법정형의 감경 또는 
면제를 받을 수 있다. 그러나 구금된 사실이 없었던 경우에는 이를 적용받지 
못한다.`,
  },
];

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-2 flex flex-col items-center">
      {faqs.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div key={idx} className="relative bg-[#1C1C1C] rounded-xl overflow-hidden w-[327px] mx-auto lg:w-[657px]">
            <span className="absolute inset-y-0 left-0 w-[5px] bg-[#06c29e]" />
            <button
              onClick={() => setOpenIndex(isOpen ? null : idx)}
              className="flex items-center justify-between pl-10 pr-6 py-5 w-[327px] mx-auto lg:w-[657px]"
            >
                 <span className="text-white text-[16px] lg:text-[24px] font-semibold">
     {item.question}
   </span>
              <ChevronDown
  className={`
    w-6 h-6 text-white transform transition-transform
    ${isOpen ? "rotate-180" : ""}
  `}
/>

            </button>
            <div
              className={`
                overflow-hidden
                transition-[max-height] duration-300 ease-in-out
                ${isOpen ? "max-h-96 py-2 mb-4" : "max-h-0"}
              `}
            >
              <p className="pl-10 pr-6 text-[#e4e4e4] text-[14px] lg:text-[16px] leading-relaxed whitespace-pre-line">
                {item.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
