declare interface ChatBot {
  id: number;
  activated: boolean;
  created_at: string;
  modified_at: string;
  content_summary: string | null;
  email: string | null;
  group_summary: string | null;
  type: 'CONTENT' | 'GROUP';
}
