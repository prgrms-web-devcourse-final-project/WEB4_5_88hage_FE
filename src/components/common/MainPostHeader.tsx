import { EllipsisVertical, Users2 } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getApprovedParticipants, leaveGroup } from '@/lib/api/participant';
import ParticipantListModal from './ParticipantListModal';

interface MainPostHeaderProps {
  title: string;
  category: string;
  memberCount: number;
  groupImageUrl: string;
  groupId: number;
  onComplete: (groupId: number) => Promise<void>;
  onDelete: (groupId: number) => Promise<void>;
  isLeader?: boolean;
}

export default function MainPostHeader({
  title,
  category,
  memberCount,
  groupImageUrl,
  groupId,
  onComplete,
  onDelete,
  isLeader,
}: MainPostHeaderProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showParticipantsModal, setShowParticipantsModal] = useState(false);
  const [participantsList, setParticipantsList] = useState<
    ApprovedParticipantInfo[]
  >([]);
  const router = useRouter();

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const fetchApprovedParticipants = async () => {
    try {
      const response = await getApprovedParticipants(groupId);
      setParticipantsList(response.data);
      setShowParticipantsModal(true);
    } catch (error) {
      console.error('Failed to fetch participants:', error);
      alert('참여자 정보를 불러오는 데 실패했습니다.');
    }
  };

  const handleComplete = async () => {
    if (window.confirm('모임을 완료하시겠습니까?')) {
      await onComplete(groupId);
      setIsModalOpen(false);
      router.refresh();
    }
  };

  const handleDelete = async () => {
    if (
      window.confirm(
        '모임을 정말 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.',
      )
    ) {
      await onDelete(groupId);
      setIsModalOpen(false);
      router.refresh();
    }
  };

  const handleLeaveGroup = async () => {
    if (window.confirm('모임을 정말 탈퇴하시겠습니까?')) {
      try {
        await leaveGroup(groupId);
        alert('모임에서 탈퇴되었습니다.');
        setIsModalOpen(false);
        router.push('/user/gathering'); // Redirect to my gatherings page after leaving
      } catch (error) {
        console.error('Failed to leave group:', error);
        alert('모임 탈퇴에 실패했습니다.');
      }
    }
  };

  return (
    <>
      <div className="flex items-start lg:items-center">
        <div className="relative h-12 w-12 overflow-hidden rounded-full">
          <Image
            src={groupImageUrl || '/hip-girl-thinking.svg'}
            alt="group image"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="ml-4 lg:flex lg:items-center">
          <h1 className="gradient-text h2 mb-2 text-[16px] lg:mb-0 lg:text-[24px]">
            {title}
          </h1>
          <div className="bg-gray-4 t3 flex w-fit items-center gap-2 rounded-[30px] px-3 py-1 text-white lg:ml-5">
            {category}
          </div>
        </div>

        <div className="text-gray-disabled relative ml-auto flex items-center gap-3">
          <button className="flex gap-2" onClick={fetchApprovedParticipants}>
            <div className="t3 hidden lg:block">{memberCount}명</div>
            <Users2 className="h-[20px] w-[20px]" />
          </button>
          <button onClick={toggleModal}>
            <EllipsisVertical className="h-[20px] w-[20px]" />
          </button>
          {isModalOpen && (
            <div className="bg-gray-6 border-gray-disabled absolute top-full right-[-10px] z-10 mt-2 rounded-md border px-7">
              {isLeader ? (
                <>
                  <button className="py-2 text-white" onClick={handleComplete}>
                    완료
                  </button>
                  <button
                    className="py-2 text-white"
                    onClick={() => router.push(`/gathering/${groupId}/edit`)}
                  >
                    수정
                  </button>
                  <button className="py-2 text-white" onClick={handleDelete}>
                    삭제
                  </button>
                </>
              ) : (
                <button className="py-2 text-white" onClick={handleLeaveGroup}>
                  탈퇴
                </button>
              )}
            </div>
          )}
        </div>
      </div>
      <hr className="text-gray-disabled mt-5" />
      {showParticipantsModal && (
        <ParticipantListModal
          participants={participantsList}
          onClose={() => setShowParticipantsModal(false)}
          isLeader={isLeader}
          groupId={groupId}
        />
      )}
    </>
  );
}
