// import { getContent } from '@/lib/api/content';
import GatheringDetail from '@/pages/GatheringDetail';

export default async function page({ params }: { params: { gatheringId: string } }) {
  const { gatheringId } = params;
  const getGatheringDetail = async () => {
    try {
      const response = await fetch(`https://funfun.cloud/api/groups/${gatheringId}`,{
        method: 'GET',
        headers: {
          accept: 'application/json',
        },
        // cache: 'force-cache',
      });
      const {data} = await response.json();
      console.log(data)
      return data;
    } catch (error) {
      console.log('모임 정보를 불러오는데 실패했습니다 :', error)
    }
  }
  const data = await getGatheringDetail();
  return (
    <>
    <GatheringDetail data={data}/>
    </>
  );
}
