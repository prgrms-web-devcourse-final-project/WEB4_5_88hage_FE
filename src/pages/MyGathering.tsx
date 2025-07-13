import GatheringMain from '@/components/GatheringMain';
import GatheringSide from '@/components/GatheringSide';

export default function MyGathering() {
  return (
    <>
      <div className="p-5">
        <h1 className="h2 mb-5 text-white">안녕하세요, 홍길동님 🖐️</h1>
        <h2 className="h3 text-white">모임</h2>
        <div className="lg:flex lg:min-w-[1220px] lg:items-center lg:justify-center">
          {/* 고정 너비 사이드 */}
          <div className="w-[360px] flex-shrink-0 lg:h-[740px]">
            <GatheringSide />
          </div>
          {/* 유동 너비 메인 */}
          <div className="ml-10 max-w-[1050px] flex-grow lg:ml-10 lg:h-[740px]">
            <GatheringMain />
          </div>
        </div>
      </div>
    </>
  );
}
