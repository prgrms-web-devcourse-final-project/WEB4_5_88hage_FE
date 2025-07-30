import EventDetail from '@/pages/EventDetail';

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export default async function page({params}: {params: Promise<{eventId: string}>}) {
  
  const {eventId} = await params;

  const getEventDetail = async (eventId:string) => {
    try {
      const response = await fetch(`${baseUrl}/api/contents/${eventId}`,{
        method: 'GET',
        headers: {
          accept: 'application/json',
        },
        cache: 'force-cache',
      });
      
      if(!response.ok){
        const errorData = await response.json();
        throw new Error(`HTTP ${response.status}: ${errorData.message || '오류 발생'}`);
      }

      const {data} = await response.json();
      return data;

    }catch(error){
      console.log('이벤트 데이터를 불러오는데 실패했습니다. :', error);
    }
  }
  const data = await getEventDetail(eventId);
  if(data){
    return (
      <>
        <EventDetail data={data} />
      </>
    );
  } else {
    return <div className='h-[900px] w-full flex items-center justify-center text-[#fff]'> 네트워크 통신에 실패했습니다. </div>
  }
}
