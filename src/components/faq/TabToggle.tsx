"use client";

import { useRef, useEffect } from "react";

type Tab = "FAQ" | "공지사항";

interface TabToggleProps {
  active: Tab;
  onChange: (tab: Tab) => void;
}

const tabs: Tab[] = ["FAQ", "공지사항"];

export default function TabToggle({ active, onChange }: TabToggleProps) {
  const btnRefs = useRef<Record<Tab, HTMLButtonElement | null>>({
    FAQ: null,
    공지사항: null,
  });
  const highlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const btn = btnRefs.current[active];
    const hl = highlightRef.current;
    if (!btn || !hl) return;
    hl.style.width = btn.offsetWidth + "px";
    hl.style.transform = `translateX(${btn.offsetLeft}px)`;
  }, [active]);

  return (
    <div className="relative inline-flex bg-[#222222] rounded-full p-[4px]">
      <div
        ref={highlightRef}
        className="absolute inset-y-1 left-0 bg-[#06D6A0] rounded-full border-[3px] border-[#343434] transition-all duration-300"
      />
      {tabs.map((tab) => (
        <button
          key={tab}
          ref={(el) => (btnRefs.current[tab] = el)}
          onClick={() => onChange(tab)}
          className={`
            relative z-10 px-6 py-2 text-[14px] lg:text-[16px] font-medium
            ${active === tab ? "text-black font-semibold" : "text-[#606060]"}
          `}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}