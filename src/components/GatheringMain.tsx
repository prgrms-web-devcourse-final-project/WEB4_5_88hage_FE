import Image from 'next/image';
import Tag from './common/Tag';
import mapIcon from '@/assets/images/map_icon.svg';
import testMap from '@/assets/images/testmap.png';
import MainPostHeader from './common/MainPostHeader';

export default function GatheringMain() {
  return (
    <>
      <div className="bg-gray-7 lg:border-gray-5 mt-5 flex h-full w-full flex-col rounded-[15px] p-5 lg:border">
        <MainPostHeader />
        <div className="mt-5 flex gap-5">
          <Tag name="힙한" />
          <Tag name="젊은" />
        </div>

        <p className="t3 mt-5 text-white">
          안녕하세요. 다가오는 여름 7월 27일에 열리는 2025 그린 페스티벌에 함께
          가실 분을 찾고 있습니다. 티켓은 각자 구매하는 조건이며, 현장에서 만나
          함께 페스티벌을 즐기는 것을 목표로 합니다. 빡빡한 계획보다는 자유롭게
          다니면서 보고 싶은 공연을 같이 보고, 맛있는 것도 먹으며 편하게 즐기실
          분들이면 좋겠습니다. <br />
          <br />
          모집 대상: <br /> 그린 페스티벌을 기다려오신 20-30대 누구나 <br />
          긍정적이고 새로운 사람들과 잘 어울리시는 분 <br />
          기본적인 매너와 배려를 갖추신 분 <br />
          <br />
          모임 일자 2025년 07월 27일 월요일
        </p>

        <div className="mt-5 flex">
          <Image src={mapIcon} alt="mapicon" width={51} height={50} />
          <div className="h-[50px] rounded-r border border-[#393939] px-2 text-white">
            <div className="t2">서울시 봉천동 1-32길 20로</div>
            <div className="t3 text-[#a3a3a3]">서울시 봉천동 1021번지</div>
          </div>
        </div>
        <Image src={testMap} alt="map" className="mt-5" />
      </div>
    </>
  );
}
