import { twMerge } from "tailwind-merge";

export interface Group {
  id: number;
  title: string;
  simpleExplain: string;
}

interface AIrecommendButtonProps {
  className?: string;
  onRecommend: (groups: Group[], reason?: string) => void;
  recommendClick: number;
}

const API = "https://funfun.cloud/api/";

export default function AIrecommendButton({
  className,
  onRecommend,
  recommendClick,
}: AIrecommendButtonProps) {
  const handleClick = async () => {
    if (recommendClick >= 3) {
      alert("최대 3번까지 추천 가능합니다!");
      return;
    }
    try {
      const res = await fetch(`${API}chatBots/group`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
        eventType: "GROUP",
        startTime: "2025-07-29T18:00:00",
        endTime: "2024-07-30T18:00:00",
        address: "서울시 강남구 역삼동"
      }),
      });
      if (!res.ok) {
        alert("추천 결과를 불러오지 못했습니다.");
        return;
      }
      const json = await res.json();
      onRecommend(json.data.groups as Group[] ?? [], (json.data.groups && json.data.groups[0]?.reason) ?? "");
    } catch {
      alert("에러가 발생했습니다.");
    }
  };

  return (
    <button
      className={twMerge(
        "h2 from-main to-text rounded-[4px] lg:text-[16px] bg-gradient-to-r font-semibold flex justify-center items-center w-[145px] h-[35px] text-white",
        className
      )}
      onClick={handleClick}
    >
      빠른 AI 추천 ✨
    </button>
  );
}