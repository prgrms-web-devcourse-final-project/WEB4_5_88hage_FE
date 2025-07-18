import axios from './axiosInstance';

// 모임 참여 신청자 거절
export const rejectParticipants = async (
  groupId: number,
  user_id: string[],
) => {
  return axios.post(`/api/participants/${groupId}/reject`, user_id);
};

// 특정 모임에서 나가기
export const leaveGroup = async (groupId: number) => {
  return axios.post(`/api/participants/${groupId}/leave`);
};

// 모임 참여자 강퇴
export const kickoutParticipant = async (
  groupId: number,
  targetEmail: string,
) => {
  await axios.post(`/api/participants/${groupId}/kickout`, null, {
    params: { targetEmail },
  });
};

// groupID의 승인된 사용자 목록 확인
export const getApprovedParticipants = async (
  groupId: number,
): Promise<string[]> => {
  return await axios.get(`/api/participants/${groupId}/approve`);
};

// 모임 신청 사용자 조회: 특정 GROUP 의 TRUE/PENDING 상태의 사용자 조회
export const getPendingParticipants = async (groupId: number) => {
  return await axios.get(`/api/participants/${groupId}/pending`);
};

// groupId의 참여 신청을 승인
export const approveParticipants = async (
  groupId: number,
  user_id: string[],
) => {
  await axios.post(`/api/participants/${groupId}/approve`, user_id);
};

// groupId에 사용자가 모임 신청
export const applyToGroup = async (groupId: number): Promise<void> => {
  await axios.post(`/api/participants/${groupId}/apply`);
};

// 모임 완료 통계: 유저가 완료한 모임을 카테고리별로 카운트합니다. (즐겨 찾는 여가 생활)
export const getGroupCompletedStats = async () => {
  return await axios.get(`/api/participants/stats/group-completed`);
};
