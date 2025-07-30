import cultureIcon from '@/assets/images/categoryImg1.png';
import sportIcon from '@/assets/images/categoryImg6.png';
import foodIcon from '@/assets/images/categoryImg2.png';
import studyIcon from '@/assets/images/categoryImg7.png';
import gameIcon from '@/assets/images/categoryImg5.png';
import travelIcon from '@/assets/images/categoryImg4.png';
import artIcon from '@/assets/images/categoryImg3.png';
import Image from 'next/image';

const TAGS = [
  { label: '문화', icon: cultureIcon, category: 'CULTURE' },
  { label: '운동', icon: sportIcon, category: 'SPORT' },
  { label: '푸드', icon: foodIcon, category: 'FOOD' },
  { label: '자기 개발', icon: studyIcon, category: 'STUDY' },
  { label: '게임', icon: gameIcon, category: 'GAME' },
  { label: '여행', icon: travelIcon, category: 'TRAVEL' },
  { label: '예술', icon: artIcon, category: 'ART' },
];

export default function RelatedTags({selected,onSelect}) {
  return (
    <div className="flex flex-wrap justify-center gap-8">
      {TAGS.map(({ label, icon,category }) => (
        <div
          key={label}
          className={`relative h-[100px] w-[100px] rounded-[5px] bg-[#2f2f2f] p-2 text-white border border-[#2F2F2F] cursor-pointer
          ${selected === category ? 'border-[#7f74ff]' : 'border-[#2F2F2F]'}
          `}
          onClick={()=>onSelect(selected===category?null:category)}
        >
          {/* 이모지 (왼쪽 위) */}
          <div className="absolute top-2 left-2 w-6 h-6">
  <Image src={icon} alt={label} className="w-full h-full object-contain" />
</div>


          {/* 태그 버튼 (왼쪽 아래) */}
          <div className="absolute bottom-2 left-2">
            <button className="text-[16px] font-semibold text-gray-sub">{label}</button>
          </div>
        </div>
      ))}
    </div>
  );
}
