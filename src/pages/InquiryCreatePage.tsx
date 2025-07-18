import GrayButton from '@/components/button/GrayButton';
import CategorySelect from '@/components/layout/CategorySelect';
import WritingForm from '@/components/layout/WritingForm';
import AddPhotoButton from '@/components/ui/AddPhotoButton';

export default function InquiryCreatePage() {
  return (
    <>
    <section className='w-full h-[145px] lg:h-[200px] bg-[#0D0D0D] flex justify-center'>
      <div className="from-main to-text bg-gradient-to-r bg-clip-text text-[24px] font-semibold text-transparent md:text-[30px] lg:text-[32px] flex items-center">
          문의글 작성
        </div>
    </section>
    <section className="mx-auto mb-[20px] flex w-full max-w-[1220px] flex-col px-6 gap-[20px] lg:gap-[45px] mt-[40px] lg:mt-[50px] lg:mb-[80px]">
        <WritingForm
          title="제목"
          placeholder="제목을 입력해 주세요."
          isRequired
          isLongForm={false}
        />

        <CategorySelect isRequired options={['신고', '버그', '기타 문의']} />

        <WritingForm
                  title="문의 내용"
                  placeholder="문의에 관한 내용을 자세히 적어주세요."
                  isRequired
                  isLongForm
        />

        <AddPhotoButton/>

        <div className='h-[1px] w-full bg-[#343434]'></div>

        <div>
          <h3 className='text-[#fff] font-semibold text-[16px]'>안내사항</h3>
          <ul className="list-disc pl-5 text-[#959595]">
            <li>고객센터 운영시간은 10:00 ~ 19:00 예요.</li>
            <li>답변에는 시간이 소요됩니다. 조금만 기다려주세요.</li>
            <li>문의 내용을 자세하게 남겨주시면 빠른 답변에 도움이 됩니다.</li>
            <li>문의하기 버튼을 누르시면 개인정보 수집에 동의하신 것으로 간주합니다.</li>
          </ul>
        </div>


        <GrayButton className="mt-[20px] lg:mt-[30px] h-[52px] lg:h-[80px] text-[20px] font-semibold lg:text-[36px] bg-[#1F1F1F] text-[#5E5E5E]">작성하기</GrayButton>
    </section>
    </>
  );
}
