export interface Inquiry {
  id: number;
  activate: boolean;
  answered_at: string;
  created_at: string;
  modified_at: string;
  answer: string;
  category: string;
  status: string;
  title: string;
  user_id: string;
}

export interface ContactRequest {
  title: string;
  content: string;
  category: string;
  images?: File[]; // string[]에서 File[]으로 변경
  imagesChanged: boolean;
}

export interface GetContactsParams {
  status?: 'all' | 'pending' | 'complete';
  page?: number;
  size?: number;
  sort?: string[];
}
