<<<<<<< HEAD
declare type ContentCategory =
  | 'THEATER'
  | 'DANCE'
  | 'POP_DANCE'
  | 'CLASSIC'
  | 'GUKAK'
  | 'POP_MUSIC'
  | 'MIX'
  | 'MAGIC'
  | 'MUSICAL'
  | 'TOUR'
  | 'CULTURE'
  | 'SPORTS';

declare type ContentSortBy = 'bookmarkCount' | 'endDate' | 'distance';

declare interface GetContentsParams {
  category?: ContentCategory;
  gugunName?: string;
  startDate?: string; // YYYY-MM-DD
  endDate?: string; // YYYY-MM-DD
  keyword?: string;
  sortBy?: ContentSortBy;
  page?: number;
  size?: number;
  sort?: string[]; // property,(asc|desc)
}
=======
export interface Content {
  id: number;
  activated: boolean;
  bookmark_count: number;
  end_date: string | null;
  latitude: number | null;
  longitude: number | null;
  start_date: string | null;
  category_id: number;
  created_at: string;
  modified_at: string;
  address: string | null;
  age: string | null;
  content_title: string;
  description: string | null;
  event_type: 'EVENT' | 'PLACE';
  fee: string | null;
  guname: string | null;
  poster: string | null;
  run_time: string | null;
  start_time: string | null;
  time: string | null;
  area: string | null;
}
>>>>>>> 45499223a61c508f1315bed163fb415c001b49fb
