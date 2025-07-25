// import { getContent } from '@/lib/api/content';
import GatheringDetail from '@/pages/GatheringDetail';

export default async function page({params}: {params: Promise<{gatheringId: string}>}) {
  const {gatheringId} = await params;
  const response = await fetch(`https://funfun.cloud/api/groups/${gatheringId}`,{
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
    cache: 'force-cache',
  });
  const {data} = await response.json();
  console.log(data)
  return (
    <>
    <GatheringDetail data={data}/>
    </>
  );
}
