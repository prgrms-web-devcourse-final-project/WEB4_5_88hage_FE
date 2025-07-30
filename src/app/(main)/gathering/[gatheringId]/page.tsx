import GatheringDetail from '@/pages/GatheringDetail';

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

type PageProps = {
  params: {
    gatheringId: string;
  };
};

export default async function Page({ params }: PageProps) {
  const { gatheringId } = params;
  const getGatheringDetail = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/groups/${gatheringId}`,{
        method: 'GET',
        headers: {
          accept: 'application/json',
        },
      });

      if(!response.ok){
        const errorData = await response.json();
        throw new Error(`HTTP ${response.status}: ${errorData.message || '오류 발생'}`);
      }

      const {data} = await response.json();
      return data;

    } catch (error) {
      console.log('모임 정보를 불러오는데 실패했습니다 :', error)
    }
  }
  const data = await getGatheringDetail();
  console.log(data)
  return (
    <>
    <GatheringDetail data={data}/>
    </>
  );
}
