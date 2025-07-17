export interface NoticeDTO {
  id: number;
  message: string;
}

export interface NoticeCreateRequest {
  message: string;
}

export interface NoticeDetail {
  id: number;
  title: string;
  content: string;
}

export interface NoticeListItem {
  id: number;
  message: string;
}
