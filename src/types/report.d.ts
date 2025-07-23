declare interface Report {
  id: number;
  activated: boolean;
  resolved: boolean;
  created_at: string;
  modified_at: string;
  resolved_at: string | null;
  target_id: number | null;
  admin_comment: string | null;
  reason: string;
  reported_user_id: string;
  reporting_user_id: string;
  type: 'CHAT' | 'POST';
}
