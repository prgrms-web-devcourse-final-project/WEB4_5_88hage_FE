import GrayButton from '@/components/button/GrayButton';
import Tag from '@/components/common/Tag';
import CategorySelect from '@/components/layout/CategorySelect';
import WritingForm from '@/components/layout/WritingForm';

export default function GatheringCreatePage() {
  return (
    <>
      <div className="mx-auto mb-10 flex w-full max-w-[1220px] flex-col items-center px-6 gap-[20px]">
        <div className="from-main to-text mt-10 mb-10 inline bg-gradient-to-r bg-clip-text text-[24px] font-semibold text-transparent md:text-[30px] lg:text-[32px]">
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

        <div className="flex w-full flex-col items-baseline lg:flex-row lg:gap-6">
          {/* 태그 입력 영역 */}
          <div className="w-full lg:w-1/2">
            <WritingForm
              title="태그"
              placeholder="태그를 작성 해주세요."
              isRequired={false}
              isLongForm={false}
            />
            <div className="mt-[10px] flex flex-wrap justify-start gap-2 lg:mt-[20px]">
              <Tag name="태그" />
              <Tag name="태그" />
              <Tag name="태그" />
              <Tag name="태그" />
            </div>
          </div>

          {/* 카테고리 선택 영역 */}
          <div className="w-full lg:w-1/2">
            <CategorySelect
              isRequired
              options={[
                '문화',
                '운동',
                '푸드',
                '자기계발',
                '게임',
                '여행',
                '예술',
              ]}
            />
          </div>
        </div>

        <GrayButton className="mt-10 lg:mt-20 h-[80px]">작성하기</GrayButton>
      </div>
    </>
  );
}
