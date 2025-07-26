export interface ApiResponse<T> {
  code: string;
  message: string;
  reason: null;
  data: {
    content: T[];
    pageable: any;
    totalElements: number;
    totalPages: number;
    last: boolean;
    size: number;
    number: number;
    sort: any[];
    numberOfElements: number;
    first: boolean;
    empty: boolean;
  };
}