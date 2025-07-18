export type ContentCategory =
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

export type ContentSortBy = 'bookmarkCount' | 'endDate' | 'distance';

export interface GetContentsParams {
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
