declare interface ContentPreference {
  id: number;
  activated: boolean;
  created_at: string;
  modified_at: string;
  category: 'THEATER' | 'DANCE' | 'POP_DANCE' | 'CLASSIC' | 'GUKAK' | 'POP_MUSIC' | 'MIX' | 'MAGIC' | 'MUSICAL' | 'TOUR' | 'CULTURE' | 'SPORTS';
  user_id: string;
}
