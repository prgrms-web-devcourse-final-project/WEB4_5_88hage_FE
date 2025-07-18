"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import AIrecommendButton from '@/components/common/AIrecommendButton';
import PostCard from '@/components/common/Card';
import RelatedTags from '@/components/common/RelatedTags';
import SearchBar from '@/components/common/SearchBar';
import { ChevronDown } from 'lucide-react';

type Group = {
  id: number;
  title: string;
  simpleExplain: string;
};

const SORT_OPTIONS = [
  { label: "최신순", value: "recent" },
  { label: "조회순", value: "viewCount" },
  { label: "거리순", value: "distance" }
];

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

  const [aiGroups, setAIGroups] = useState<Group[]>([]);
  const [aiShowCount, setAIShowCount] = useState(4);
  const [aiClick, setAIClick] = useState(0);
  const [aiReason, setAIReason] = useState("");

  const handleAIRecommend = (groups: Group[], reason?: string) => {
    setAIGroups(groups);
    setAIReason(reason || "");
    setAIShowCount(4);
    setAIClick(prev => prev + 1);
  };

  const handleShowMore = () => {
    if (aiShowCount + 4 <= 12) setAIShowCount(aiShowCount + 4);
    else alert("최대 3번(12개)까지만 추천됩니다!");
  };

  const resetAI = () => {
    setAIGroups([]);
    setAIReason("");
    setAIShowCount(4);
    setAIClick(0);
  };

  useEffect(() => {
    setData([]);
    setPage(0);
    setHasMore(true);
  }, [selectedCategory, sortBy]);

  useEffect(() => {
    if (aiGroups.length > 0) return;
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
  }, [selectedCategory, sortBy, page, aiGroups.length]);

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

  return (
    <div className="w-full">
      <div className="meetingPage-gradient lg:h-[450px] lg:pt-[115px] h-fit pt-[70px] pb-[25px]">
        <SearchBar value={search} onChange={setSearch} />
        <RelatedTags selected={selectedCategory} onSelect={setSelectedCategory} />
      </div>
      <div className="mx-auto max-w-[1440px] lg:my-[30px] px-[20px]">
        <div className="flex items-center justify-between my-[20px] lg:my-[32px]">
          <AIrecommendButton
            className="mr-4"
            onRecommend={(groups, reason) => handleAIRecommend(groups, reason)}
            recommendClick={aiClick}
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

        {aiGroups.length > 0 ? (
          <>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {aiGroups.slice(0, aiShowCount).map((group) => (
                <PostCard key={group.id} group={group} />
              ))}
            </div>
            {aiGroups.length > aiShowCount && (
              <div className="flex justify-center my-5">
                <button
                  onClick={handleShowMore}
                  className="rounded bg-[#383838] px-8 py-2 text-white"
                >
                  더 추천 보기
                </button>
              </div>
            )}
            <div className="gradient-box mt-[51.45px] mb-[100px] flex flex-col rounded-[5px] px-[40px] text-white">
              <div className="mt-[33px] mb-[29px] text-[24px] font-semibold">
                추천 이유👍
              </div>
              <div className="mb-[39px]">{aiReason || "추천 이유 없음"}</div>
              <div>
                <button
                  className="from-main to-text mb-[30px] rounded-[3px] bg-gradient-to-r px-[16px] py-[10px] font-semibold"
                  onClick={resetAI}
                >
                  다른 추천 받기 ✨
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {filtered.map((group, idx) =>
              idx === filtered.length - 1 ? (
                <div key={`${group.id}-${idx}`} ref={lastCardRef}>
                  <PostCard group={group} />
                </div>
              ) : (
                <PostCard key={`${group.id}-${idx}`} group={group} />
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}