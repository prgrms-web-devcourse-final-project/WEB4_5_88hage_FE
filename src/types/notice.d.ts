export interface NoticeDetail {
  id: number;
  title: string;
  content: string;
  // Add other fields as per API response for GET /api/notices/{id}
}

export interface NoticeCreateRequest {
  id: number;
  message: string;
}

export interface NoticeListItem {
  id: number;
  message: string;
}
