"use client"
import AIrecommendButton from '@/components/common/AIrecommendButton';
import PostCard from '@/components/common/Card';
import RelatedTags from '@/components/common/RelatedTags';
import SearchBar from '@/components/common/SearchBar';
import { ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function MeetingPage() {
  const [search,setSearch]=useState("")
  const [selectedCategory,setSelectedCategory]=useState(null)
  const [data, setData] = useState([]);

  useEffect(() => {
    let url = "https://funfun.cloud/api/groups/search?sortBy=distance&page=0&size=10";
    if (selectedCategory) {
      url += `&category=${selectedCategory}`;
    }
    fetch(url)
      .then(res => res.json())
      .then(res => setData(res.data.content || []));
  }, [selectedCategory]);

  useEffect(()=>{
    setSearch("")
  },[selectedCategory])

  const filtered=data.filter(
    group=>
      group.title.includes(search)||
    group.simpleExplain.includes(search)
  )

  return (
    <div className="w-full">
      <div className="meetingPage-gradient lg:h-[450px] lg:pt-[115px] h-fit pt-[70px] pb-[25px]">
        <SearchBar value={search} onChange={setSearch} />
        <RelatedTags selected={selectedCategory} onSelect={setSelectedCategory} />
      </div>
      <div className="mx-auto max-w-[1440px] lg:my-[30px] px-[20px]">
        <div className="flex items-center justify-between my-[20px] lg:my-[32px]">
          <AIrecommendButton className="fixed bottom-[15px] left-1/2 translate-x-[-50%] lg:translate-x-0 w-[calc(100%-40px)] z-100 lg:static h2 h-[60px]" />
          <button className="t1 flex items-center text-[#cecece]">
            최신순
            <ChevronDown className="ml-2 h-5 w-5" />
          </button>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.slice(0, 4).map(group => (
            <PostCard key={group.id} group={group} />
          ))}
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
