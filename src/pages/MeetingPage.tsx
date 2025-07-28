"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import AIrecommendButton from '@/components/common/AIrecommendButton';
import MoreRecommendButton from '@/components/common/MoreRecommendButton';
import PostCard from '@/components/common/Card';
import RelatedTags from '@/components/common/RelatedTags';
import SearchBar from '@/components/common/SearchBar';
import { ChevronDown } from 'lucide-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SORT_OPTIONS = [
  { label: "최신순", value: "recent" },
  { label: "조회순", value: "viewCount" },
  { label: "거리순", value: "distance" }
];

type Group = {
  id: number;
  title: string;
  simpleExplain: string;
};

export default function MeetingPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [data, setData] = useState<Group[]>([]);
  const [sortBy, setSortBy] = useState<string>("distance");
  const [showSort, setShowSort] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  // AI 추천 관련
  const [groups, setGroups] = useState<Group[]>([]);
  //const [reason, setReason] = useState("");
  const [recommendClick, setRecommendClick] = useState(0);
//const [visibleCount, setVisibleCount] = useState(4);

const startIdx = recommendClick * 4;
const endIdx = startIdx + 4;
const currentGroups = groups.slice(startIdx, endIdx);

  const handleRecommend = async (address: string, start: string, end: string) => {
    console.log("AI 추천 요청:", address, start, end);
    if (recommendClick >= 3) {
      toast.warning("AI 추천 기능은 총 3번만 가능합니다.");
      return;
    }
    setLoading(true);
    try {
  const res = await fetch("https://funfun.cloud/api/recommend/group", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      startTime: start,
      endTime: end,
      address,
    }),
  });
  console.log('응답상태:', res.status);
  const text = await res.text();
  console.log('응답 본문:', text);
  if (!res.ok) {
    toast.error("추천 결과를 불러오지 못했습니다.");
    setLoading(false);
    return;
  }
  const json = JSON.parse(text);
  console.log("groups 응답:", json.data.groups);
  setGroups(json.data.groups ?? []);
  //setVisibleCount(4);
  //setReason(json.data.groups?.[0]?.reason ?? "");
  setRecommendClick(0);
  //setUserAddress(address);
  //setUserStart(start);
  //setUserEnd(end);
} catch (e) {
  console.error("AI 추천 fetch error:", e);
  toast.error("에러가 발생했습니다.");
}
setLoading(false);

  };

  const resetRecommend = () => {
    setGroups([]);
    //setReason("");
    setRecommendClick(0);
  };

  useEffect(() => {
    resetRecommend();
    setData([]);
    setPage(0);
    setHasMore(true);
  }, [selectedCategory, sortBy]);

  useEffect(() => {
    if (groups.length > 0) return;
    const fetchData = async () => {
      setLoading(true);
      let url = `https://funfun.cloud/api/groups/search?sortBy=${sortBy}&page=${page}&size=16`;
      if (selectedCategory) {
        url += `&category=${selectedCategory}`;
      }
      const res = await fetch(url, { credentials: 'include' }).then(r => r.json());
      const list: Group[] = res.data.content || [];
      setData(prev => {
        if (page === 0) return list;
        const newUnique = list.filter(newItem => !prev.some(prevItem => prevItem.id === newItem.id));
        return [...prev, ...newUnique];
      });
      setHasMore(!res.data.last);
      setLoading(false);
    };
    fetchData();
  }, [selectedCategory, sortBy, page, groups.length]);

  useEffect(() => {
    setSearch("");
  }, [selectedCategory]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) setShowSort(false);
    };
    if (showSort) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [showSort]);

  const filtered = data.filter(
    group =>
      group.title.includes(search) ||
      group.simpleExplain.includes(search)
  );

  const currentSortLabel =
    SORT_OPTIONS.find(option => option.value === sortBy)?.label || "정렬";

  const observer = useRef<IntersectionObserver>();
  const lastCardRef = useCallback((node: HTMLDivElement | null) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new window.IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prev => prev + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  const allReasons = currentGroups
  .map((g, idx) => `${idx + 1}. ${g.reason}`)
  .filter(Boolean)
  .join('\n\n');

  return (
    <div className="w-full">
      {loading && (
  <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-[9999]">
    <span className="text-white text-2xl font-bold">로딩중...</span>
  </div>
)}
      <div className="meetingPage-gradient lg:h-[450px] lg:pt-[115px] h-fit pt-[70px] pb-[25px]">
        <SearchBar value={search} onChange={setSearch} />
        <RelatedTags selected={selectedCategory} onSelect={setSelectedCategory} />
      </div>
      <div className="mx-auto max-w-[1440px] lg:my-[30px] px-[20px]">
        <div className="flex items-center justify-between my-[20px] lg:my-[32px]">
          <AIrecommendButton
            onRecommend={handleRecommend}
            disabled={recommendClick > 0}
          />
          <div className="relative" ref={sortRef}>
            <button
              className="t1 flex items-center text-[#cecece]"
              onClick={() => setShowSort(v => !v)}
            >
              {currentSortLabel}
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

        {groups.length > 0 ? (
          <>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {currentGroups.map((group) => (
        <PostCard key={group.id} group={group} />
      ))}
    </div>
    <div className="gradient-box mt-[51.45px] mb-[100px] flex flex-col rounded-[5px] px-[40px] text-white">
      <div className="mt-[33px] mb-[29px] text-[24px] font-semibold">
        추천 이유👍
      </div>
      <div className="mb-[24px] min-h-[44px] whitespace-pre-line">
        {allReasons || "추천 이유 없음"}
      </div>
      {recommendClick < Math.ceil(groups.length / 4) && (
        <div className="w-[153px] text-[16px] text-white self-start mb-[30px]">
          <MoreRecommendButton
  onRecommend={() => {
    if ((recommendClick + 1) * 4 >= groups.length) {
      toast.info("AI추천 결과는 여기까지입니다.");
      return;
    }
    setRecommendClick(prev => prev + 1);
  }}
  disabled={loading}
  loading={loading}
/>
        </div>
      )}
            </div>
          </>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 min-h-[600px]">
    {filtered.length > 0 ? (
      filtered.map((group, idx) =>
        idx === filtered.length - 1 ? (
          <div key={`${group.id}-${idx}`} ref={lastCardRef}>
            <PostCard group={group} />
          </div>
        ) : (
          <PostCard key={`${group.id}-${idx}`} group={group} />
        )
      )
    ) : (
      <div className="col-span-4 text-center text-[#aaa] py-10">
        검색 결과가 없습니다.
      </div>
    )}
  </div>
        )}
      </div>
    </div>
  );
}