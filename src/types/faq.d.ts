<<<<<<< HEAD
declare interface FaqUpdateRequest {
  question: string;
  answer: string;
}

declare interface FaqCreateRequest {
  question: string;
}

declare interface FAQ {
=======
export interface Faq {
>>>>>>> 45499223a61c508f1315bed163fb415c001b49fb
  id: number;
  activated: boolean;
  created_at: string;
  modified_at: string;
  answer: string;
  question: string;
}
