'use client';

import { useForm } from 'react-hook-form';
import GrayButton from '@/components/button/GrayButton';
import Input from '@/components/common/Input';

type InquiryCreateFormData = {
  title: string;
  content: string;
};

export default function InquiryCreatePage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InquiryCreateFormData>();

  const onSubmit = (data: InquiryCreateFormData) => {
    console.log('문의 글 작성 데이터:', data);
    // 문의 글 작성 API 연동 부분
  };

  return (
    <div className="flex min-h-screen w-screen flex-col items-center bg-black p-8 text-white">
      <div className="w-full max-w-4xl">
        <h1 className="mb-8 text-3xl font-bold">문의하기</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="title" className="mb-2 block text-lg font-semibold">
              제목
            </label>
            <Input
              id="title"
              placeholder="문의 제목을 입력해주세요"
              {...register('title', {
                required: '제목을 입력해주세요',
              })}
              className="w-full"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="content" className="mb-2 block text-lg font-semibold">
              문의 내용
            </label>
            <textarea
              id="content"
              placeholder="문의하실 내용을 자세히 적어주세요"
              {...register('content', {
                required: '내용을 입력해주세요',
              })}
              className="h-60 w-full rounded-md border border-gray-700 bg-gray-900 p-3 text-white placeholder-gray-500 focus:border-main focus:outline-none focus:ring-1 focus:ring-main"
              rows={10}
            />
            {errors.content && (
              <p className="mt-1 text-sm text-red-500">{errors.content.message}</p>
            )}
          </div>

          <div className="flex justify-end">
            <GrayButton type="submit" className="w-full px-6 py-3 text-lg sm:w-auto">
              제출하기
            </GrayButton>
          </div>
        </form>
      </div>
    </div>
  );
}
