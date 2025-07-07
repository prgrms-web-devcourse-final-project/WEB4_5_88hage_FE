const TAGS = [
  { label: '문화', emoji: '🌏' },
  { label: '운동', emoji: '🏃' },
  { label: '푸드', emoji: '🍔' },
  { label: '자기 계발', emoji: '📚' },
  { label: '게임', emoji: '🎮' },
  { label: '여행', emoji: '✈️' },
  { label: '예술', emoji: '🎨' },
];

export default function RelatedTags() {
  return (
    <div className="flex flex-wrap justify-center gap-8">
      {TAGS.map(({ label, emoji }) => (
        <div
          key={label}
          className="relative h-[100px] w-[100px] rounded bg-[#2f2f2f] p-2 text-white"
        >
          {/* 이모지 (왼쪽 위) */}
          <div className="absolute top-2 left-2 text-[18px]">{emoji}</div>

          {/* 태그 버튼 (왼쪽 아래) */}
          <div className="absolute bottom-2 left-2">
            <button className="text-[14px] text-white">{label}</button>
          </div>
        </div>
      ))}
    </div>
  );
}
