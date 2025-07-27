declare interface Calendar {
  id: number;
  activated: boolean;
  content_id: number | null;
  created_at: string;
  group_id: number | null;
  modified_at: string;
  selected_date: string;
  email: string | null;
  type: 'CONTENT' | 'GROUP';
}

declare type SelectDate = {
  date:number,
  month:number,
  year:number,
}

declare type CalendarData = {
  id:string,
  calendarId:string,
  activityId:string,
  address:string,
  title: string,
  start:Date,
  end:Date,
  type:string,
}