import GrayButton from '@/components/button/GrayButton';
import CategorySelect from '@/components/layout/CategorySelect';
import WritingForm from '@/components/layout/WritingForm';
import AddPhotoButton from '@/components/ui/AddPhotoButton';

export default function GatheringCreate() {
  return (
    <>
      <section className='w-full h-[145px] lg:h-[200px] bg-[#0D0D0D] flex justify-center items-center'>
        <div className="bg-gradient-to-r from-[#1cebb9] to-[#7f74ff] bg-clip-text text-transparent text-[24px] font-semibold md:text-[30px] lg:text-[32px]">
          모임글 작성
        </div>
      </section>
      <section className="mx-auto w-full max-w-[950px] flex flex-col px-6 gap-[28px] mt-[32px] lg:mt-[36px] mb-[48px]">
        <WritingForm
          title="제목"
          placeholder="제목을 입력해 주세요."
          isRequired
          isLongForm={false}
        />
        <div className="flex flex-col lg:flex-row gap-6">
          <WritingForm
            title="모임 위치"
            placeholder="모임 위치를 정해 주세요."
            isRequired
            isLongForm={false}
            className="flex-1"
            icon="search"
          />
          <WritingForm
            title="최대 인원"
            placeholder="최대 인원을 입력하세요."
            isRequired
            isLongForm={false}
            className="flex-1"
          />
        </div>
        <div className="flex flex-col lg:flex-row gap-6">
          <WritingForm
            title="모임 날짜"
            placeholder="모임 시작일을 알려주세요."
            isRequired
            isLongForm={false}
            className="flex-1"
            icon="calendar"
          />
          <WritingForm
            title="소요 시간"
            placeholder="모임의 소요 시간을 작성해 주세요."
            isRequired
            isLongForm={false}
            className="flex-1"
          />
        </div>
        <div className="flex flex-col lg:flex-row gap-6">
          <WritingForm
            title="태그"
            placeholder="태그를 작성해 주세요."
            isLongForm={false}
            className="flex-1"
          />
          <CategorySelect
            title="카테고리"
            placeholder="카테고리를 골라주세요."
            isRequired
            options={['친목', '운동', '취미', '스터디']}
            className="flex-1"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {['#태그1', '#태그2', '#태그3', '#태그4'].map(tag => (
            <span
              key={tag}
              className="inline-block bg-[#232323] px-3 py-1 text-[#ababab] rounded-full text-[14px]"
            >{tag}</span>
          ))}
        </div>
        <WritingForm
          title="모임 소개"
          placeholder="모임에 관한 소개를 작성해 주세요."
          isRequired
          isLongForm
          maxLength={1000}
        />
        <div>
          <AddPhotoButton />
        </div>
        <div className="h-[1px] w-full bg-[#343434]" />
        <div>
          <h3 className='text-[#fff] font-semibold text-[16px] mb-1'>안내사항</h3>
          <ul className="list-disc pl-5 text-[#959595] text-[15px] leading-relaxed">
            <li>고객센터 운영시간은 10:00 ~ 19:00 예요.</li>
            <li>답변에는 시간이 소요됩니다. 조금만 기다려주세요.</li>
            <li>문의 내용을 자세하게 남겨주시면 빠른 답변에 도움이 됩니다.</li>
            <li>문의하기 버튼을 누르시면 개인정보 수집에 동의하신 것으로 간주합니다.</li>
          </ul>
        </div>
        <GrayButton className="mt-[20px] h-[52px] text-[20px] font-semibold lg:text-[22px]">
          작성하기
        </GrayButton>
      </section>
    </>
  );
}