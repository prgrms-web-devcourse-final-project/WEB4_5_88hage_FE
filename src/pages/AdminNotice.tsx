import GrayButton from '@/components/button/GrayButton';
import WritingForm from '@/components/layout/WritingForm';
import AddPhotoButton from '@/components/ui/AddPhotoButton';

export default function InquiryCreatePage() {
  return (
    <>
    <section className="mx-auto mb-[20px] flex w-full max-w-[1220px] flex-col px-6 gap-[20px] lg:gap-[45px] mt-[40px] lg:mt-[50px] lg:mb-[80px]">
        <WritingForm
          title="제목"
          placeholder="제목을 입력해 주세요."
          isRequired={false}
          isLongForm={false}
        />

        <WritingForm
                  title="공지 내용"
                  placeholder="공지에 관한 내용을 자세히 작성해주세요."
                  isRequired={false}
                  isLongForm
        />

        <AddPhotoButton/>

        <GrayButton className="mt-[20px] lg:mt-[30px] h-[52px] lg:h-[80px] text-[20px] font-semibold lg:text-[36px] bg-[#1F1F1F] text-[#5E5E5E]">작성하기</GrayButton>
    </section>
    </>
  );
}