import WritingForm from '@/components/layout/WritingForm';

export default function GatheringCreatePage() {
  return (
    <>
      <div className="x-[1220px] flex flex-col items-center">
        <div className="from-main to-text inline bg-gradient-to-r bg-clip-text text-[24px] font-semibold text-transparent md:text-[30px] lg:text-[32px]">
          모임글 작성
        </div>

        <WritingForm
          title="제목"
          placeholder="제목을 입력해 주세요."
          isRequired
          isLongForm={false}
        />
      </div>
    </>
  );
}
