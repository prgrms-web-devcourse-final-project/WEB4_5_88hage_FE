"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import AIrecommendButton from "@/components/common/AIrecommendButton";
import EventCard from "@/components/common/EventCard";
import SearchBar from "@/components/common/SearchBar";
import { ChevronDown } from "lucide-react";
import CategoryDropdown from "@/components/ui/CategoryDropdown";
import MoreRecommendButton from "@/components/common/MoreRecommendButton";

const SORT_OPTIONS = [
  { label: "인기순", value: "bookmarkCount" },
  { label: "마감일순", value: "endDate" },
  { label: "거리순", value: "distance" },
];

const CATEGORY_OPTIONS = [
  { label: "카테고리", value: "" },
  { label: "연극", value: "THEATER" },
  { label: "무용(서양/한국무용)", value: "DANCE" },
  { label: "대중무용", value: "POP_DANCE" },
  { label: "서양음악(클래식)", value: "CLASSIC" },
  { label: "한국음악(국악)", value: "GUKAK" },
  { label: "대중음악", value: "POP_MUSIC" },
  { label: "복합", value: "MIX" },
  { label: "서커스/마술", value: "MAGIC" },
  { label: "뮤지컬", value: "MUSICAL" },
  { label: "관광지", value: "TOUR" },
  { label: "문화시설", value: "CULTURE" },
  { label: "레포츠", value: "SPORTS" }
];

type EventApiResponse = {
  id: number;
  contentTitle: string;
  fee: string;
  startDate: string;
  endDate: string;
  poster: string;
  address?: string;
  reason?: string;
};

function mapEventToCard(event: EventApiResponse) {
  return {
    id: event.id,
    title: event.contentTitle,
    simpleExplain: event.fee,
    during: `${event.startDate || "-"} ~ ${event.endDate || "-"}`,
    imageUrl: event.poster,
    address: event.address,
  };
}

export default function EventPage() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState<EventApiResponse[]>([]);
  const [sortBy, setSortBy] = useState("distance");
  const [showSort, setShowSort] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [recommendedEvents, setRecommendedEvents] = useState<EventApiResponse[]>([]);
  const [recommendReasons, setRecommendReasons] = useState<string[]>([]);
  const [recommendClick, setRecommendClick] = useState(0);

  const sortRef = useRef<HTMLDivElement>(null);

  function getApiUrl() {
    let url = `https://funfun.cloud/api/contents?sortBy=${sortBy}&page=${page}&size=16`;
    if (selectedCategory) url += `&category=${selectedCategory}`;
    if (search) url += `&keyword=${encodeURIComponent(search)}`;
    return url;
  }

  const handleEventRecommend = async (address: string, start: string, end: string) => {
    setLoading(true)
    console.log("AI 행사 추천 요청:", address, start, end);
    try {
      const res = await fetch("https://funfun.cloud/api/recommend/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          startTime: start,
          endTime: end,
          address,
        }),
      });
      if (!res.ok) {
        alert("추천 결과를 불러오지 못했습니다.");
        setLoading(false)
        return;
      }
      const json = await res.json();
      setRecommendedEvents(json.data.events || []);
      console.log(recommendedEvents.length) 
      setRecommendReasons(
        (json.data.events || []).map((e: EventApiResponse) => e.reason || "추천 이유 없음")
      );
      setRecommendClick(0);
      console.log("행사 추천 응답:", json);
    } catch (e) {
      console.error("AI 행사 추천 fetch error:", e);
      alert("에러가 발생했습니다.");
    }
    setLoading(false)
  };

  useEffect(() => {
    setData([]);
    setPage(0);
    setHasMore(true);
    setRecommendedEvents([]);
    setRecommendReasons([]);
    setRecommendClick(0);
  }, [sortBy, search, selectedCategory]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const url = getApiUrl();
      const res = await fetch(url).then(r => r.json());
      const list = res.data?.content || res.data?.contents || [];
      setData(prev => (page === 0 ? list : [...prev, ...list]));
      setHasMore(res.data && typeof res.data.last !== "undefined" ? !res.data.last : false);
      setLoading(false);
    };
    fetchData();
    // eslint-disable-next-line
  }, [sortBy, page, search, selectedCategory]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) setShowSort(false);
    };
    if (showSort) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [showSort]);

  const observer = useRef<IntersectionObserver>();
  const lastCardRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new window.IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) setPage((prev) => prev + 1);
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <div className="w-full">
      {loading && (
  <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-[9999]">
    <span className="text-white text-2xl font-bold">로딩중...</span>
  </div>
)}
      <div className="meetingPage-gradient lg:h-[350px] lg:pt-[115px] h-fit pt-[70px] pb-[25px]">
        <SearchBar value={search} onChange={setSearch} />
      </div>
      <div className="mx-auto max-w-[1440px] lg:my-[30px] px-[20px]">
        <div className="flex items-center justify-between my-[20px] lg:my-[32px]">
          <AIrecommendButton 
            onRecommend={handleEventRecommend}
            className="mr-4"
          />
          <div className="flex items-center gap-5">
            <CategoryDropdown
              options={CATEGORY_OPTIONS}
              selected={selectedCategory}
              setSelected={setSelectedCategory}
            />
            <div className="relative" ref={sortRef}>
              <button
                className="t1 flex items-center text-[#cecece]"
                onClick={() => setShowSort(v => !v)}
              >
                {SORT_OPTIONS.find(o => o.value === sortBy)?.label || "정렬"}
                <ChevronDown className="ml-2 h-5 w-5" />
              </button>
              {showSort && (
                <ul className="absolute right-0 mt-2 w-[100px] bg-[#222] rounded-[4px] shadow z-10 text-sm border border-[#393939]">
                  {SORT_OPTIONS.map(option => (
                    <li key={option.value}>
                      <button
                        className={`w-full text-left px-4 py-2 hover:bg-[#7f74ff]/30 ${sortBy === option.value ? "text-[#7f74ff]" : "text-[#cecece]"}`}
                        onClick={() => {
                          setSortBy(option.value);
                          setShowSort(false);
                        }}
                      >
                        {option.label}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {recommendedEvents.length > 0 ? (
            recommendedEvents
              .slice(recommendClick * 4, recommendClick * 4 + 4)
              .map((event) => (
                <EventCard key={event.id} event={mapEventToCard(event)} />
              ))
          ) : (
            data.map((event, idx) =>
              idx === data.length - 1 ? (
                <div key={`${event.id}-${idx}`} ref={lastCardRef}>
                  <EventCard event={mapEventToCard(event)} />
                </div>
              ) : (
                <EventCard key={`${event.id}-${idx}`} event={mapEventToCard(event)} />
              )
            )
          )}
        </div>
        {recommendedEvents.length > 0 && (
          <div className="gradient-box mt-[51.45px] mb-[100px] flex flex-col rounded-[5px] px-[40px] text-white">
            <div className="mt-[33px] mb-[29px] text-[24px] font-semibold">
              추천 이유👍
            </div>
            <div className="mb-[24px] min-h-[44px] whitespace-pre-line">
  {(recommendReasons || [])
    .slice(recommendClick * 4, recommendClick * 4 + 4)
    .map((reason, idx) => (
      <div key={idx} className="mb-3 flex items-start">
        <span className=" mr-2">{idx + 1}.</span>
        <span className="text-[16px] leading-relaxed">{reason || "추천 이유 없음"}</span>
      </div>
    ))}
</div>

              <div className="w-[153px] text-[16px] text-white self-start mb-[30px]">
                <MoreRecommendButton
                  onRecommend={() => {
                    if ((recommendClick + 1) * 4 >= recommendedEvents.length) {
                      alert("AI추천 결과는 여기까지입니다.");
                      return;
                    }
                    setRecommendClick(prev => prev + 1);
                  }}
                  disabled={loading}
                  loading={loading}
                />
              </div>
          </div>
        )}
      </div>
    </div>
  );
}