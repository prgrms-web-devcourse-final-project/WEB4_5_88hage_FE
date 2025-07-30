type CalendarType = 'CONTENT' | 'GROUP';

declare interface CalendarItem {
  calendarId: number;
  activityId: number;
  title: string;
  type: CalendarType;
  selectedDate: string;
  address: string;
}

declare type SelectDate = {
  date:number,
  month:number,
  year:number,
}

declare type CalendarData = CalendarItem[];

declare interface ApiResponse<T> {
  code: string;               
  message: string;            
  reason: string | null;   
  data: T;
}

type CalendarResponse = ApiResponse<CalendarData>;

declare interface CalendarEvent {
  activityId: string;
  calendarId: string;
  address: string;
  title: string;
  start: Date;
  end: Date;
  type: CalendarType;
}

declare type CalendarEventList = CalendarEvent[];