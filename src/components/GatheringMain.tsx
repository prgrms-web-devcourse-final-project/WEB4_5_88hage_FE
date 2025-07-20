import Image from 'next/image';
import Tag from './common/Tag';
import mapIcon from '@/assets/images/map_icon.svg';
import testMap from '@/assets/images/testmap.png';
import MainPostHeader from './common/MainPostHeader';
import { Group } from '@/types/group';

interface GatheringMainProps {
  group: Group;
}

export default function GatheringMain({ group }: GatheringMainProps) {
  return (
    <>
      <div className="bg-gray-7 lg:border-gray-5 mt-5 flex h-full w-full flex-col rounded-[15px] p-5 lg:border">
        <MainPostHeader />
        <div className="mt-5 flex gap-5">
          {group.hashTags.map((tag) => (
            <Tag key={tag.id} name={tag.tag} />
          ))}
        </div>

        <p className="t3 mt-5 text-white">{group.explain}</p>

        <div className="mt-5 flex">
          <Image src={mapIcon} alt="mapicon" width={51} height={50} />
          <div className="h-[50px] rounded-r border border-[#393939] px-2 text-white">
            <div className="t2">{group.placeName}</div>
            <div className="t3 text-[#a3a3a3]">{group.address}</div>
          </div>
        </div>
        {group.image && (
          <Image
            src={group.image}
            alt={group.title}
            className="mt-5"
            width={500}
            height={300}
            objectFit="cover"
          />
        )}
        {!group.image && <Image src={testMap} alt="map" className="mt-5" />}
      </div>
    </>
  );
}
