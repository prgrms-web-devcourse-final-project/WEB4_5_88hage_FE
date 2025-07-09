import Tag from '@/components/common/Tag';
import WritingForm from '@/components/layout/WritingForm';

export default function GatheringCreatePage() {
  return (
    <>
      <div className="mx-auto flex w-full max-w-[1220px] flex-col items-center">
        <div className="from-main to-text mb-10 inline bg-gradient-to-r bg-clip-text text-[24px] font-semibold text-transparent md:text-[30px] lg:text-[32px]">
          모임글 작성
        </div>

        <WritingForm
          title="제목"
          placeholder="제목을 입력해 주세요."
          isRequired
          isLongForm={false}
        />

        <WritingForm
          title="모임 위치"
          placeholder="모임 위치를 정해주세요"
          isRequired
          isLongForm={false}
        />

        <WritingForm
          title="모임 소개"
          placeholder="모임에 관한 소개를 작성 해주세요."
          isRequired
          isLongForm
        />

        <WritingForm
          title="태그"
          placeholder="태그를 작성 해주세요."
          isRequired={false}
          isLongForm={false}
        />
        <div className="flex w-full flex-wrap justify-start gap-2 px-6">
          <Tag />
          <Tag />
          <Tag />
          <Tag />
        </div>
      </div>
    </>
  );
}
