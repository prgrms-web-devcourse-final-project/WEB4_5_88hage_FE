"use client";

import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_URL;

type FaqItem = {
  id: number;
  title: string;
  content: string;
};

async function fetchFaqs(): Promise<FaqItem[]> {
  const res = await fetch(`${API}/api/faqs`, {
    method: "GET",
    credentials: "include",
  });
  const json = await res.json();
  return json.data || [];
}

export default function FaqAccordion() {
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    fetchFaqs().then(setFaqs);
  }, []);

  return (
    <div className="space-y-2 flex flex-col items-center">
      {faqs.length === 0 && (
        <div className="text-gray-300 mt-8">FAQ가 없습니다.</div>
      )}
      {faqs.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={item.id}
            className="relative bg-[#1C1C1C] rounded-xl overflow-hidden w-[327px] mx-auto lg:w-[900px]"
          >
            <span className="absolute inset-y-0 left-0 w-[5px] bg-[#06c29e]" />
            <button
              onClick={() => setOpenIndex(isOpen ? null : idx)}
              className="flex items-center justify-between pl-10 pr-6 py-5 w-[327px] mx-auto lg:w-[900px]"
            >
              <span className="text-white text-[16px] lg:text-[24px] font-semibold">
                {item.title}
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
                ${isOpen ? "py-2 mb-4" : "max-h-0"}
              `}
            >
              <p className="pl-10 pr-6 text-[#e4e4e4] text-[14px] lg:text-[16px] leading-relaxed whitespace-pre-line">
                {item.content}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}