"use client";

import { useState } from "react";
import TabToggle from "./TabToggle";
import FaqContent from "./FaqContent";

type Tab = "FAQ" | "공지사항";

export default function FaqSection() {
  const [activeTab, setActiveTab] = useState<Tab>("FAQ");

  return (
    <>
      <div className="flex justify-center pt-4 pb-8 bg-[#1d1d1d]">
        <TabToggle active={activeTab} onChange={setActiveTab} />
      </div>

      <FaqContent activeTab={activeTab} />
    </>
  );
}