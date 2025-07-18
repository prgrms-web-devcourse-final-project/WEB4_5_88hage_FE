export interface FaqUpdateRequest {
  question: string;
  answer: string;
}

export interface FaqCreateRequest {
  question: string;
}

export interface FAQ {
  id: number;
  question: string;
  answer: string;
}