"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import AIrecommendButton from "@/components/common/AIrecommendButton";
import PostCard from "@/components/common/Card";
import SearchBar from "@/components/common/SearchBar";
import { ChevronDown } from "lucide-react";

const SORT_OPTIONS = [
  { label: "최신순", value: "recent" },
  { label: "조회순", value: "viewCount" },
  { label: "거리순", value: "distance" },
];

type EventApiResponse = {
  id: number;
  contentTitle: string;
  fee: string;
  startDate: string;
  endDate: string;
  poster: string;
  address?: string;
  // 필요한 필드 추가
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
  const [sortBy, setSortBy] = useState("recent");
  const [showSort, setShowSort] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const sortRef = useRef<HTMLDivElement>(null);

  function getApiUrl() {
    let url = `https://funfun.cloud/api/contents?sortBy=${sortBy}&page=${page}&size=16`;
    //if (selectedCategory) url += `&category=${selectedCategory}`;
    if (search) url += `&keyword=${encodeURIComponent(search)}`;
    return url;
  }

  // 데이터 리셋
  useEffect(() => {
    setData([]);
    setPage(0);
    setHasMore(true);
  }, [sortBy, search]);

  // 데이터 fetch
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const url = getApiUrl();
      const res = await fetch(url).then(r => r.json());
      const list = res.data?.content || res.data?.contents || [];
      setData(prev => (page === 0 ? list : [...prev, ...list]));
      setHasMore(!(res.data.last ?? true));
      setLoading(false);
    };
    fetchData();
    // eslint-disable-next-line
  }, [ sortBy, page, search]);

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
        <div className="flex items-center justify-between my-[20px] lg:my-[32px]">
          <AIrecommendButton className="mr-4" />
          <div className="relative" ref={sortRef}>
            <button
              className="t1 flex items-center text-[#cecece]"
              onClick={() => setShowSort((v) => !v)}
            >
              {SORT_OPTIONS.find((o) => o.value === sortBy)?.label || "정렬"}
              <ChevronDown className="ml-2 h-5 w-5" />
            </button>
            {showSort && (
              <ul className="absolute right-0 mt-2 w-[100px] bg-[#222] rounded-[4px] shadow z-10 text-sm border border-[#393939]">
                {SORT_OPTIONS.map((option) => (
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
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {data.map((event, idx) =>
            idx === data.length - 1 ? (
              <div key={`${event.id}-${idx}`} ref={lastCardRef}>
                <PostCard group={mapEventToCard(event)} />
              </div>
            ) : (
              <PostCard key={`${event.id}-${idx}`} group={mapEventToCard(event)} />
            )
          )}
        </div>
      </div>
    </div>
  );
}