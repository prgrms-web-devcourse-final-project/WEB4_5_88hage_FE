import EventDetail from '@/pages/EventDetail';

export default async function page({params}: {params: Promise<{eventId: string}>}) {
  const {eventId} = await params;
  // const {data} = await getContent(Number(eventId));
  const getEventDetail = async (eventId:string) => {
    try {
      const response = await fetch(`https://funfun.cloud/api/contents/${eventId}`,{
        method: 'GET',
        headers: {
          accept: 'application/json',
        },
        cache: 'force-cache',
      });
      const {data} = await response.json();
      return data;
    }catch(error){
      console.log('이벤트 데이터를 불러오는데 실패했습니다. :', error);
    }
  }
  const data = await getEventDetail(eventId);
  return (
    <>
      <EventDetail data={data} />
    </>
  );
}
