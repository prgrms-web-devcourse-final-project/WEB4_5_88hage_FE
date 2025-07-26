declare interface Contact {
  id: number;
  activated: boolean;
  answered_at: string | null;
  created_at: string;
  modified_at: string;
  answer: string | null;
  category: 'GENERAL' | 'REPORT';
  content: string | null;
  status: 'PENDING' | 'COMPLETE';
  title: string | null;
  user_id: string;
}

declare namespace ContentAPI {
  interface ImageItem {
    url: string;
    description?: string;
  }

  interface UrlItem {
    type: string;   // 예: 'homepage', 'ticket'
    url: string;
  }

  interface ContentItem {
    id: number;
    externalId: string | null;
    contentTitle: string;
    age: string;
    fee: string;
    startDate: string; // YYYY-MM-DD
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
    images: ImageItem[];
    urls: UrlItem[];
    eventType: string;
    bookmarkCount: number;
    latitude: number;
    longitude: number;
  }

  interface ContentResponse {
    content: ContentItem;
    related: ContentItem[];
    nearby: ContentItem[];
  }
}