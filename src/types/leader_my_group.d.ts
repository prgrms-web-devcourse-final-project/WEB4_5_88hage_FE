interface LeaderMyGroupData {
  groupId: number;
  groupTitle: string;
  explain: string;
  simpleExplain: string;
  groupImageUrl: string;
  groupDate: string;
  groupStatus: 'RECRUITING' | 'COMPLETED' | 'IN_PROGRESS'; // Assuming these are the possible statuses
  category: 'FOOD' | 'TRAVEL' | string; // Assuming these are some categories, and allowing for others
}

interface GetLeaderMyGroupsResponse {
  code: string;
  message: string;
  reason: string | null;
  data: LeaderMyGroupData[];
}
