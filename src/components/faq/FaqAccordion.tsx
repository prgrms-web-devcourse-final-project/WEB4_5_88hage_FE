"use client";

import { useState, useEffect } from "react";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

async function fetchFaqs() {
  const res = await fetch("https://funfun.cloud/api/faqs", {
    method: "GET",
    credentials: "include",
  });
  const json = await res.json();
  return json.data || [];
}

export default function FaqAccordion() {
  const [faqs, setFaqs] = useState([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [page, setPage] = useState(0);
  const PAGE_SIZE = 5;

  useEffect(() => {
    fetchFaqs().then(setFaqs);
  }, []);

  const totalPages = Math.ceil(faqs.length / PAGE_SIZE);
  const pagedFaqs = faqs.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  return (
    <div className="space-y-2 flex flex-col items-center">
      {pagedFaqs.length === 0 && (
        <div className="text-gray-300 mt-8">FAQ가 없습니다.</div>
      )}
      {pagedFaqs.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={idx}
            className="relative bg-[#1C1C1C] rounded-xl overflow-hidden w-[327px] mx-auto lg:w-[657px]"
          >
            <span className="absolute inset-y-0 left-0 w-[5px] bg-[#06c29e]" />
            <button
              onClick={() => setOpenIndex(isOpen ? null : idx)}
              className="flex items-center justify-between pl-10 pr-6 py-5 w-[327px] mx-auto lg:w-[657px]"
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

      {/* 페이지네이션 UI */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <button
            onClick={() => setPage((prev) => Math.max(0, prev - 1))}
            disabled={page === 0}
            className="disabled:text-gray-500 p-2"
          >
            <ChevronLeft />
          </button>
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              className={`h-[29px] w-[29px] rounded-full text-[15px] transition ${
                page === i ? "bg-[#1CEBB9] font-bold text-black" : "text-white"
              }`}
              onClick={() => setPage(i)}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setPage((prev) => Math.min(totalPages - 1, prev + 1))}
            disabled={page === totalPages - 1}
            className="disabled:text-gray-500 p-2"
          >
            <ChevronRight />
          </button>
        </div>
      )}
    </div>
  );
}