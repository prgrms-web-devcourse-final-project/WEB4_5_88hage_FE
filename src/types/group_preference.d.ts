export interface GroupPreference {
  id: number;
  activated: boolean;
  created_at: string;
  modified_at: string;
  category: 'ART' | 'TRAVEL' | 'FOOD' | 'GAME' | 'CULTURE' | 'SPORT' | 'STUDY' | 'MOVIE';
  user_id: string;
}
