import cultureIcon from '@/assets/images/지구 1.svg';
import sportIcon from '@/assets/images/운동 아이콘 1.svg';
import foodIcon from '@/assets/images/햄버거 1.svg';
import studyIcon from '@/assets/images/측면 하트 1.svg';
import gameIcon from '@/assets/images/게임기 아이콘 1.svg';
import travelIcon from '@/assets/images/여행 1.svg';
import artIcon from '@/assets/images/붓 1.svg';
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

interface RelatedTagsProps {
  selected: string | null;
  onSelect: (category: string | null) => void;
}

export default function RelatedTags({ selected, onSelect }: RelatedTagsProps) {
  return (
    <div className="flex flex-wrap justify-center gap-8">
      {TAGS.map(({ label, icon, category }) => (
        <div
          key={label}
          className={`relative h-[100px] w-[100px] rounded-[5px] bg-[#2f2f2f] p-2 text-white border border-[#2F2F2F] cursor-pointer
          ${selected === category ? 'border-[#7f74ff]' : 'border-[#2F2F2F]'}
          `}
          onClick={() => onSelect(selected === category ? null : category)}
        >
          {/* 이모지 (왼쪽 위) */}
          <div className="absolute left-2 top-2 h-6 w-6">
            <Image src={icon} alt={label} className="h-full w-full object-contain" />
          </div>

          {/* 태그 버튼 (왼쪽 아래) */}
          <div className="absolute bottom-2 left-2">
            <button className="text-[16px] font-semibold text-gray-sub">
              {label}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}