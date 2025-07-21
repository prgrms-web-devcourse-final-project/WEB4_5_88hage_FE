<<<<<<< HEAD
declare interface NoticeDTO {
=======
export interface Notice {
>>>>>>> 45499223a61c508f1315bed163fb415c001b49fb
  id: number;
  activated: boolean;
  created_at: string;
  modified_at: string;
  message: string;
<<<<<<< HEAD
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
=======
}
>>>>>>> 45499223a61c508f1315bed163fb415c001b49fb
