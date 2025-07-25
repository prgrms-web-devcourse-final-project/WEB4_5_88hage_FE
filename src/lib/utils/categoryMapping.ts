export const categoryMap: Record<string, string> = {
  ART: '예술 🖌️',
  TRAVEL: '여행 ✈️',
  FOOD: '음식 🍔',
  GAME: '게임 🎮',
  CULTURE: '문화 🌏',
  SPORT: '운동 🎾',
  STUDY: '자기 계발 ❤️',
  MOVIE: '영화 🎞️',
};

export function getCategoryDisplayName(category: string | undefined): string {
  if (!category) return '';
  return categoryMap[category] || category;
}
