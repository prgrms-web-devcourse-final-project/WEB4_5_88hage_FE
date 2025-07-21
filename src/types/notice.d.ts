declare interface NoticeDTO {
  id: number;
  message: string;
}

declare interface NoticeCreateRequest {
  message: string;
}

declare interface NoticeDetail {
  id: number;
  title: string;
  content: string;
}

declare interface NoticeListItem {
  id: number;
  message: string;
}
