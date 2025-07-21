declare interface FaqUpdateRequest {
  question: string;
  answer: string;
}

declare interface FaqCreateRequest {
  question: string;
}

declare interface FAQ {
  id: number;
  question: string;
  answer: string;
}