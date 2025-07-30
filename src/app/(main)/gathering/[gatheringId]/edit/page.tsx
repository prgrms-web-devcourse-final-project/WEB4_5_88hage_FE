import GateringEditPageComponent from '@/components/GateringEditPageComponent';

interface GatheringEditPageProps {
  params: Promise<{ gatheringId: string }>;
}

export default async function page({ params }: GatheringEditPageProps) {
  const { gatheringId } = await params;

  return <GateringEditPageComponent gatheringId={Number(gatheringId) || 1} />;
}
