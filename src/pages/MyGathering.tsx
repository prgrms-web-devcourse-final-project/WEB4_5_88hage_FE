import GatheringMain from '@/components/GatheringMain';
import GatheringSide from '@/components/GatheringSide';

export default function MyGathering() {
  return (
    <>
      <div className="p-5">
        <h1 className="h2 mb-5 text-white">안녕하세요, 홍길동님 🖐️</h1>
        <h2 className="h3 text-white">모임</h2>
        <GatheringSide />
        <div className="">
          <GatheringMain />
        </div>
      </div>
    </>
  );
}
