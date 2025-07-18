'use client';
import GrayButton from '@/components/button/GrayButton';
import CategorySelect from '@/components/layout/CategorySelect';
import WritingForm from '@/components/layout/WritingForm';
import AddPhotoButton from '@/components/ui/AddPhotoButton';
import { createInquiry } from '@/lib/api/inquiry';
import { ContactRequest } from '@/types/inquiry';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

export default function InquiryCreatePage() {
  let formData = new FormData();
  const [images, setImages] = useState<File[]>([]);
  const router = useRouter();

  const handleDataChange = (data: File[]) => setImages(data);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // formData 만들기
    formData = new FormData();
    const miniData = new FormData(e.currentTarget);
    for (let [key, value] of miniData.entries()) {
      if (key !== 'images') formData.append(key, value);
    }

    // 데이터 변환
    const newFormData: { [key: string]: any } = {};
    formData.forEach((value, key) => {
      newFormData[key] = value;
    });
    const newData: ContactRequest = {
      title: '',
      content: '',
      category: '',
      imagesChanged: true,
    };
    newData.title = newFormData.title;
    newData.content = newFormData.content;
    newData.category = newFormData.category;
    newData.images = images;

    console.log(newData);

    // API
    try {
      const response = await createInquiry(newData);
      alert(response.data);
      router.push('/user/inquiry');
    } catch (error: any) {
      console.error(error.response);
      const ErrorKeyList = Object.keys(error.response.data.data);
      if (ErrorKeyList.includes('title')) {
        alert(error.response.data.data.title);
      } else if (ErrorKeyList.includes('category')) {
        alert('카테고리를 선정해주세요.');
      } else if (ErrorKeyList.includes('content')) {
        alert(error.response.data.data.content);
      } else alert(error.response.data.message);
    }
  };

  return (
    <>
      <section className="flex h-[145px] w-full justify-center bg-[#0D0D0D] lg:h-[200px]">
        <div className="from-main to-text flex items-center bg-gradient-to-r bg-clip-text text-[24px] font-semibold text-transparent md:text-[30px] lg:text-[32px]">
          문의글 작성
        </div>
      </section>
      <form
        id="inquiryForm"
        onSubmit={handleSubmit}
        className="mx-auto mt-[40px] mb-[20px] flex w-full max-w-[1220px] flex-col gap-[20px] px-6 lg:mt-[50px] lg:mb-[80px] lg:gap-[45px]"
      >
        <WritingForm
          name="title"
          title="제목"
          placeholder="제목을 입력해 주세요."
          isRequired
          isLongForm={false}
        />

        <CategorySelect
          name="category"
          isRequired
          options={[
            { key: 'GENERAL', value: '일반' },
            { key: 'REPORT', value: '신고' },
          ]}
        />

        <WritingForm
          name="content"
          title="문의 내용"
          placeholder="문의에 관한 내용을 자세히 적어주세요."
          isRequired
          isLongForm
        />

        <AddPhotoButton onDataChange={handleDataChange} />

        <div className="h-[1px] w-full bg-[#343434]"></div>

        <div>
          <h3 className="text-[16px] font-semibold text-[#fff]">안내사항</h3>
          <ul className="list-disc pl-5 text-[#959595]">
            <li>고객센터 운영시간은 10:00 ~ 19:00 예요.</li>
            <li>답변에는 시간이 소요됩니다. 조금만 기다려주세요.</li>
            <li>문의 내용을 자세하게 남겨주시면 빠른 답변에 도움이 됩니다.</li>
            <li>
              문의하기 버튼을 누르시면 개인정보 수집에 동의하신 것으로
              간주합니다.
            </li>
          </ul>
        </div>

        <GrayButton className="mt-[20px] h-[52px] bg-[#1F1F1F] text-[20px] font-semibold text-[#5E5E5E] lg:mt-[30px] lg:h-[80px] lg:text-[36px]">
          작성하기
        </GrayButton>
      </form>
    </>
  );
}
