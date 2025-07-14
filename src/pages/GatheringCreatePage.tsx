import GrayButton from '@/components/button/GrayButton';
import Tag from '@/components/common/Tag';
import CategorySelect from '@/components/layout/CategorySelect';
import WritingForm from '@/components/layout/WritingForm';
import AddPhotoButton from '@/components/ui/AddPhotoButton';

export default function GatheringCreatePage() {
  return (
    <>
      <div className='w-full h-[200px] mb-[50px] bg-gray-7 flex justify-center items-center'>
        <div className="from-main to-text mt-10 mb-10 inline bg-gradient-to-r bg-clip-text text-[24px] font-semibold text-transparent md:text-[30px] lg:text-[32px] text-center w-fit h-fit">
          모임글 작성
        </div>
      </div>
      <div className="mx-auto mb-10 flex w-full max-w-[1220px] flex-col px-6 gap-[20px]">
        <WritingForm
          title="제목"
          placeholder="제목을 입력해 주세요."
          isRequired
          isLongForm={false}
        />

        <div className="flex w-full flex-col items-baseline lg:flex-row lg:gap-6 gap-[20px]">
          <div className="w-full lg:w-1/2">
            <WritingForm
              title="모임 위치"
              placeholder="모임 위치를 정해주세요."
              isRequired
              isLongForm={false}
            />
          </div>
          <div className="w-full lg:w-1/2">
            <WritingForm
              title="최대 인원"
              placeholder="최대 인원을 작성해주세요."
              isRequired
              isLongForm={false}
            />
          </div>
        </div>

        <div className="flex w-full flex-col items-baseline lg:flex-row lg:gap-6 gap-[20px]">
          <div className="w-full lg:w-1/2">
            <WritingForm
              title="모임 날짜"
              placeholder="모임 위치를 정해주세요."
              isRequired
              isLongForm={false}
            />
          </div>
          <div className="w-full lg:w-1/2">
            <WritingForm
              title="소요 시간"
              placeholder="최대 인원을 작성해주세요."
              isRequired
              isLongForm={false}
            />
          </div>
        </div>

        <div className="flex w-full flex-col items-baseline lg:flex-row lg:gap-6 gap-[20px]">
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

        <WritingForm
          title="모임 소개"
          placeholder="모임에 관한 소개를 작성 해주세요."
          isRequired
          isLongForm
        />

        <AddPhotoButton className='lg:mt-0 mb-[60px]'/>

        <GrayButton className="fixed w-[calc(100%-40px)] lg:static lg:left-0 lg:bottom-0 left-[20px] text-[20px] font-medium lg:w-full bottom-[20px] lg:mt-10 lg:mb-[70px] h-[52px] lg:h-[80px] text-gray-disabled bg-gray-6 lg:font-semibold lg:text-[32px] hover:bg-main hover:text-gray-8 hover:font-semibold">작성하기</GrayButton>
      </div>
    </>
  );
}
