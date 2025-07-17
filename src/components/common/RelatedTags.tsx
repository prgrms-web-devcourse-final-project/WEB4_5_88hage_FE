const TAGS = [
  { label: '문화', emoji: '🌏', category: 'CULTURE' },
  { label: '운동', emoji: '🏃', category: 'SPORT' },
  { label: '푸드', emoji: '🍔', category: 'FOOD' },
  { label: '자기 개발', emoji: '📚', category: 'STUDY' },
  { label: '게임', emoji: '🎮', category: 'GAME' },
  { label: '여행', emoji: '✈️', category: 'TRAVEL' },
  { label: '예술', emoji: '🎨', category: 'ART' },
];

export default function RelatedTags({selected,onSelect}) {
  return (
    <div className="flex flex-wrap justify-center gap-8">
      {TAGS.map(({ label, emoji,category }) => (
        <div
          key={label}
          className={`relative h-[100px] w-[100px] rounded-[5px] bg-[#2f2f2f] p-2 text-white border border-[#2F2F2F] cursor-pointer
          ${selected === category ? 'border-[#7f74ff]' : 'border-[#2F2F2F]'}
          `}
          onClick={()=>onSelect(selected===category?null:category)}
        >
          {/* 이모지 (왼쪽 위) */}
          <div className="absolute top-2 left-2 text-[18px]">{emoji}</div>

          {/* 태그 버튼 (왼쪽 아래) */}
          <div className="absolute bottom-2 left-2">
            <button className="text-[16px] font-semibold text-gray-sub">{label}</button>
          </div>
        </div>
      ))}
    </div>
  );
}
