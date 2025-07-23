declare interface MyGroupData {
  groupId: number;
  groupTitle: string;
  userEmail: string;
  groupImageUrl: string;
  userImageUrl: string;
  userNickname: string;
  participantCount: number;
  status: string;
  type: string;
  simpleExplain: string;
}

declare interface MyGroupResponse {
  code: string;
  message: string;
  reason: string | null;
  data: MyGroupData[];
}
