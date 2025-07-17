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
  images?: string[]; // array of binary
  imagesChanged: boolean;
}

export interface GetContactsParams {
  status?: 'all' | 'pending' | 'complete';
  page?: number;
  size?: number;
  sort?: string[];
}