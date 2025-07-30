declare interface Content {
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

interface GetContentsParams {
  category?:
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
  gugunName?: string;
  startDate?: string;
  endDate?: string;
  keyword?: string;
  sortBy?: 'bookmarkCount' | 'endDate' | 'distance';
  page?: number;
  size?: number;
  sort?: string[];
}

declare interface ImagesArray {
  id: number;
  imageUrl: string
}

interface UrlsArray {
  id: number;
  siteName: string;
  url: string;
}

declare interface ContentItem {
  id: number;
  externalId: string | null;
  contentTitle: string;
  age: string;
  fee: string;
  startDate: string;    
  endDate: string;
  address: string;
  area: string;
  guname: string;
  time: string;
  runTime: string;
  startTime: string;
  poster: string;
  description: string | null;
  category: string;      
  images: ImagesArray[];          
  urls: UrlsArray[];            
  eventType: string;      
  bookmarkCount: number;
  latitude: number;
  longitude: number;
}

declare interface EventData {
  content: ContentItem;
  related: ContentItem[];
  nearby: ContentItem[];
}
