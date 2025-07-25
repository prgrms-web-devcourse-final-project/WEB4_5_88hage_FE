import Image from 'next/image';
import Tag from './common/Tag';
import mapIcon from '@/assets/images/map_icon.svg';
import testMap from '@/assets/images/testmap.png';
import MainPostHeader from './common/MainPostHeader';
import { getCategoryDisplayName } from '@/lib/utils/categoryMapping';
import { completeGroup, deleteGroup } from '@/lib/api/group';

interface GatheringMainProps {
  selectedGathering: GroupDetail | null;
}

export default function GatheringMain({
  selectedGathering,
}: GatheringMainProps) {
  console.log('🔍 selectedGathering:', selectedGathering);
  if (!selectedGathering) {
    return (
      <div className="bg-gray-7 lg:border-gray-5 mt-5 flex h-full w-full flex-col items-center justify-center rounded-[15px] p-5 lg:border">
        <p className="text-white">모임을 선택해주세요.</p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-gray-7 lg:border-gray-5 mt-5 flex h-full w-full flex-col rounded-[15px] p-5 lg:border">
        <MainPostHeader
          groupId={selectedGathering.id}
          title={selectedGathering.title || ''}
          category={getCategoryDisplayName(selectedGathering.category) || ''}
          memberCount={selectedGathering.nowPeople || 0}
          groupImageUrl={selectedGathering.imageUrl || ''}
          onComplete={completeGroup}
          onDelete={deleteGroup}
          isLeader={selectedGathering.isLeader}
        />
        <div className="mt-5 flex gap-5">
          {selectedGathering.hashTags &&
            selectedGathering.hashTags.map((tag, index) => (
              <Tag key={index} name={tag} />
            ))}
        </div>

        <p className="t3 mt-5 text-white">{selectedGathering.explain}</p>

        <div className="mt-5 flex">
          <Image
            src={mapIcon}
            alt="mapicon"
            width={51}
            height={50}
            className="cursor-pointer"
          />
          <div className="h-[50px] rounded-r border border-[#393939] px-2 text-white">
            <div className="t2">{selectedGathering.address}</div>
            <div className="t3 text-[#a3a3a3]">
              {selectedGathering.placeName}
            </div>
          </div>
        </div>
        <Image src={testMap} alt="map" className="mt-5" />
      </div>
    </>
  );
}
