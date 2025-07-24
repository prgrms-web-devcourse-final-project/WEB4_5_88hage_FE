declare interface Participant {
  id: number;
  activated: boolean;
  created_at: string;
  group_id: number;
  modified_at: string;
  role: 'LEADER' | 'MEMBER';
  status:
    | 'PENDING'
    | 'APPROVED'
    | 'REJECTED'
    | 'LEAVE'
    | 'GROUP_COMPLETE'
    | 'GROUP_KICKOUT'
    | 'GROUP_DELETED'
    | 'GROUP_CANCELED';
  user_id: string;
}

declare interface ApprovedParticipantInfo {
  id: number;
  userNickname: string;
  userImageUrl: string;
  userEmail: string;
}
