import GrayButton from '@/components/button/GrayButton';
import Tag from '@/components/common/Tag';
import CategorySelect from '@/components/layout/CategorySelect';
import WritingForm from '@/components/layout/WritingForm';
import AddPhotoButton from '@/components/ui/AddPhotoButton';

export default function GatheringCreatePage() {
  return (
    <>
      <div className="bg-gray-7 mb-[50px] flex h-[200px] w-full items-center justify-center">
        <div className="from-main to-text mt-10 mb-10 inline h-fit w-fit bg-gradient-to-r bg-clip-text text-center text-[24px] font-semibold text-transparent md:text-[30px] lg:text-[32px]">
          모임글 작성
        </div>
      </div>
      <div className="mx-auto mb-10 flex w-full max-w-[1220px] flex-col gap-[20px] px-6">
        <WritingForm
          name="title"
          title="제목"
          placeholder="제목을 입력해 주세요."
          isRequired
          isLongForm={false}
        />

        <div className="flex w-full flex-col items-baseline gap-[20px] lg:flex-row lg:gap-6">
          <div className="w-full lg:w-1/2">
            <WritingForm
              name="address"
              title="모임 위치"
              placeholder="모임 위치를 정해주세요."
              isRequired
              isLongForm={false}
            />
          </div>
          <div className="w-full lg:w-1/2">
            <WritingForm
              name="maxPeople"
              title="최대 인원"
              placeholder="최대 인원을 작성해주세요."
              isRequired
              isLongForm={false}
            />
          </div>
        </div>

        <div className="flex w-full flex-col items-baseline gap-[20px] lg:flex-row lg:gap-6">
          <div className="w-full lg:w-1/2">
            <WritingForm
              name="groupDate"
              title="모임 날짜"
              placeholder="모임 위치를 정해주세요."
              isRequired
              isLongForm={false}
            />
          </div>
          <div className="w-full lg:w-1/2">
            <WritingForm
              name="during"
              title="소요 시간"
              placeholder="최대 인원을 작성해주세요."
              isRequired
              isLongForm={false}
            />
          </div>
        </div>

        <div className="flex w-full flex-col items-baseline gap-[20px] lg:flex-row lg:gap-6">
          {/* 태그 입력 영역 */}
          <div className="w-full lg:w-1/2">
            <WritingForm
              // name='hashTags'
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
              name="category"
              isRequired
              options={[
                { key: 'CULTURE', value: '문화' },
                { key: 'SPORT', value: '운동' },
                { key: 'FOOD', value: '푸드' },
                { key: 'STUDY', value: '자기개발' },
                { key: 'GAME', value: '게임' },
                { key: 'TRAVEL', value: '여행' },
                { key: 'ART', value: '예술' },
              ]}
            />
          </div>
        </div>

        <WritingForm
          name="explain"
          title="모임 소개"
          placeholder="모임에 관한 소개를 작성 해주세요."
          isRequired
          isLongForm
        />

        <AddPhotoButton className="mb-[60px] lg:mt-0" />

        <GrayButton className="text-gray-disabled bg-gray-6 hover:bg-main hover:text-gray-8 fixed bottom-[20px] left-[20px] h-[52px] w-[calc(100%-40px)] text-[20px] font-medium hover:font-semibold lg:static lg:bottom-0 lg:left-0 lg:mt-10 lg:mb-[70px] lg:h-[80px] lg:w-full lg:text-[32px] lg:font-semibold">
          작성하기
        </GrayButton>
      </div>
    </>
  );
}
