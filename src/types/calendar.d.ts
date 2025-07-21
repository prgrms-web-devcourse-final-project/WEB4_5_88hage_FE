export interface Calendar {
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
