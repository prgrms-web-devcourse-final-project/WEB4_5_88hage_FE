"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import AIrecommendButton from "@/components/common/AIrecommendButton";
import EventCard from "@/components/common/EventCard";
import SearchBar from "@/components/common/SearchBar";
import { ChevronDown } from "lucide-react";
import CategoryDropdown from "@/components/ui/CategoryDropdown";

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
};

function mapEventToCard(event: EventApiResponse) {
  return {
    id: event.id,
    title: event.contentTitle,
    simpleExplain: event.fee,
    during: `${event.startDate} ~ ${event.endDate}`,
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


  const sortRef = useRef<HTMLDivElement>(null);

  function getApiUrl() {
    let url = `https://funfun.cloud/api/contents?sortBy=${sortBy}&page=${page}&size=16`;
    if (selectedCategory) url += `&category=${selectedCategory}`;
    if (search) url += `&keyword=${encodeURIComponent(search)}`;
    return url;
  }

  // 데이터 리셋
  useEffect(() => {
    setData([]);
    setPage(0);
    setHasMore(true);
  }, [sortBy, search,selectedCategory]);

  // 데이터 fetch
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const url = getApiUrl();
      console.log("요청되는 API 주소:", url);
      const res = await fetch(url).then(r => r.json());
      const list = res.data?.content || res.data?.contents || [];
      console.log("받아온 데이터(정렬값 확인):", list);
      setData(prev => (page === 0 ? list : [...prev, ...list]));
      setHasMore(res.data && typeof res.data.last !== "undefined" ? !res.data.last : false);
      setLoading(false);
    };
    fetchData();
    // eslint-disable-next-line
  }, [ sortBy, page, search,selectedCategory]);

  // 바깥 클릭 시 정렬창 닫기
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) setShowSort(false);
    };
    if (showSort) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [showSort]);

  // 무한 스크롤
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
      <div className="meetingPage-gradient lg:h-[350px] lg:pt-[115px] h-fit pt-[70px] pb-[25px]">
        <SearchBar value={search} onChange={setSearch} />
      </div>
      <div className="mx-auto max-w-[1440px] lg:my-[30px] px-[20px]">
        <div className="text-white flex items-center justify-between my-[20px] lg:my-[32px]">
  <AIrecommendButton className="mr-4" />
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
          {data.map((event, idx) =>
            idx === data.length - 1 ? (
              <div key={`${event.id}-${idx}`} ref={lastCardRef}>
                <EventCard event={mapEventToCard(event)} />
              </div>
            ) : (
              <EventCard key={`${event.id}-${idx}`} event={mapEventToCard(event)} />
            )
          )}
        </div>
      </div>
    </div>
  );
}