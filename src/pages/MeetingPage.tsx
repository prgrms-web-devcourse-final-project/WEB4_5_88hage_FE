"use client";
import AIrecommendButton from '@/components/common/AIrecommendButton';
import PostCard from '@/components/common/Card';
import RelatedTags from '@/components/common/RelatedTags';
import SearchBar from '@/components/common/SearchBar';
import { ChevronDown } from 'lucide-react';
import { useEffect, useState, useRef, useCallback } from 'react';

const SORT_OPTIONS = [
  { label: "최신순", value: "recent" },
  { label: "조회순", value: "viewCount" },
  { label: "거리순", value: "distance" }
];

export default function MeetingPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [data, setData] = useState([]);
  const [sortBy, setSortBy] = useState("distance");
  const [showSort, setShowSort] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const sortRef = useRef(null);

  useEffect(() => {
    setData([]);
    setPage(0);
    setHasMore(true);
  }, [selectedCategory, sortBy]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      let url = `https://funfun.cloud/api/groups/search?sortBy=${sortBy}&page=${page}&size=16`;
      if (selectedCategory) {
        url += `&category=${selectedCategory}`;
      }
      const res = await fetch(url, { credentials: 'include' }).then(r => r.json());
      const list = res.data.content || [];
      setData(prev => (page === 0 ? list : [...prev, ...list]));
      setHasMore(!res.data.last);
      setLoading(false);
    };
    fetchData();
  }, [selectedCategory, sortBy, page]);

  useEffect(() => {
    setSearch("");
  }, [selectedCategory]);

  useEffect(() => {
    const handleClick = (e) => {
      if (sortRef.current && !sortRef.current.contains(e.target)) setShowSort(false)
    };
    if (showSort) document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [showSort]);

  const filtered = data.filter(
    group =>
      group.title.includes(search) ||
      group.simpleExplain.includes(search)
  );

  const currentSortLabel =
    SORT_OPTIONS.find(option => option.value === sortBy)?.label || "정렬";

  const observer = useRef();
  const lastCardRef = useCallback(node => {
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
          <AIrecommendButton className="fixed bottom-[15px] left-1/2 translate-x-[-50%] lg:translate-x-0 w-[calc(100%-40px)] z-100 lg:static h2 h-[60px]" />
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
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((group, idx) =>
            idx === filtered.length - 1 ?
              <div key={group.id} ref={lastCardRef}>
                <PostCard group={group} />
              </div>
              :
              <PostCard key={group.id} group={group} />
          )}
        </div>
        <div className="gradient-box mt-[51.45px] mb-[100px] flex flex-col rounded-[5px] px-[40px] text-white">
          <div className="mt-[33px] mb-[29px] text-[24px] font-semibold">
            추천 이유👍
          </div>
          <div className="mb-[39px]">
            홍대(홍익대 앞)는 서울에서 가장 트렌디하고 활기찬 구역 중 하나로,
            낮과 밤 모두 다채로운 매력을 지닌 ‘핫플’의 보고입니다. 산책, 카페,
            쇼핑, 공연, 먹거리까지 모두 즐길 수 있죠. 예전 철길을 공원으로 꾸며
            도심 속 힐링 산책 장소로 사랑받고 있어요. 주변에는 개성 있는 카페와
            상점들도 다양합니다. 토요일에는 프리마켓, 일요일에는 호프마켓이 열려
            창작 문화와 예술을 바로 만날 수 있어요.거리 공연과 스트리트 아트
            중점으로 추천 드렸어요
          </div>
          <div>
            <button className="from-main to-text mb-[30px] rounded-[3px] bg-gradient-to-r px-[16px] py-[10px] font-semibold">
              다른 추천 받기 ✨
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}