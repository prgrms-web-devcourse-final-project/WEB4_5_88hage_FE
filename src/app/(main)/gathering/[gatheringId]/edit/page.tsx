import GatheringEditPage from '@/pages/GatheringEditPage';

interface GatheringEditPageProps {
  params: Promise<{ gatheringId: number }>;
}

export default function page({ params }: GatheringEditPageProps) {
  return (
    <>
      <GatheringEditPage params={params} />
    </>
  );
}
