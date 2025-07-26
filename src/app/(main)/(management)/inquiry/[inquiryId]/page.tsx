import InquiryDetail from '@/pages/InquiryDetail';

export default async function page({
  params,
}: {
  params: Promise<{ inquiryId: string }>;
}) {
  const { inquiryId } = await params;
  return (
    <>
      <InquiryDetail id={inquiryId} />
    </>
  );
}
