import { getContent } from '@/lib/api/content';
import EventDetail from '@/pages/EventDetail';

export default async function page({params}: {params: Promise<{eventId: string}>}) {
  const {eventId} = await params;
  // const {data} = await getContent(Number(eventId));
  const response = await fetch(`https://funfun.cloud/api/contents/${eventId}`,{
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
    cache: 'force-cache',
  });
  const {data} = await response.json();
  return (
    <>
      <EventDetail data={data} />
    </>
  );
}
