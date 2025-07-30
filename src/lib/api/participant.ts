import { GroupStat, ServiceResponse } from '@/types/api';
import { get, post } from './fetchInstance';

// 모임 참여 신청자 거절
export const rejectParticipants = async (
  groupId: number,
  userIds: string[],
) => {
  return post(`/api/participants/${groupId}/reject`, { userIds });
};

// 특정 모임에서 나가기
export const leaveGroup = async (groupId: number) => {
  return post(`/api/participants/${groupId}/leave`, null);
};

// 모임 참여자 강퇴
export const kickoutParticipant = async (
  groupId: number,
  targetEmail: string,
) => {
  await post(
    `/api/participants/${groupId}/kickout?targetEmail=${targetEmail}`,
    null,
  );
};

// groupID의 승인된 사용자 목록 확인
export const getApprovedParticipants = async (
  groupId: number,
): Promise<ApiResponse<ApprovedParticipantInfo[]>> => {
  return await get(`/api/participants/${groupId}/approve`);
};

// 모임 신청 사용자 조회: 특정 GROUP 의 TRUE/PENDING 상태의 사용자 조회
export const getPendingParticipants = async (groupId: number) => {
  return await get(`/api/participants/${groupId}/pending`);
};

// groupId의 참여 신청을 승인
export const approveParticipants = async (
  groupId: number,
  userIds: string[],
) => {
  await post(`/api/participants/${groupId}/approve`, { userIds });
};

// groupId에 사용자가 모임 신청
export const applyToGroup = async (groupId: number): Promise<void> => {
  await post(`/api/participants/${groupId}/apply`, null);
};

// 모임 완료 통계: 유저가 완료한 모임을 카테고리별로 카운트합니다. (즐겨 찾는 여가 생활)
export const getGroupCompletedStats = async (): Promise<
  ServiceResponse<GroupStat[]>
> => {
  return await get<ServiceResponse<GroupStat[]>>(
    `/api/participants/stats/group-completed`,
  );
};
