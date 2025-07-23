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
