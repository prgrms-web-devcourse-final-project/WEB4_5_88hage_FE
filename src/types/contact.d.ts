declare interface Contact {
  id: number;
  activated: boolean;
  answered_at: string | null;
  created_at: string;
  modified_at: string;
  answer: string | null;
  category: 'GENERAL' | 'REPORT';
  content: string | null;
  status: 'PENDING' | 'COMPLETE';
  title: string | null;
  user_id: string;
}