'use client';
import { ChangeEvent, useState } from 'react';
import { FaCamera } from 'react-icons/fa';
import { twMerge } from 'tailwind-merge';

export default function AddPhotoButton({
  className,
  onDataChange,
}: {
  className?: string;
  onDataChange?: (data: FileList) => void;
}) {
  const [postImgList, setPostImgList] = useState<any>([]);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPostImgList([]);
      for (let i = 0; i < e.target.files.length; i++) {
        const currentImgUrl = URL.createObjectURL(e.target.files[i]);
        setPostImgList((prev: any) => [...prev, currentImgUrl].slice(0, 5));
      }
      if (onDataChange) onDataChange(e.target.files);
    }
  };

  return (
    <>
      <div className={twMerge('lg:mt-[-20px] lg:mb-[-5px]', className)}>
        <h3 className="text-main mb-[13px] text-[16px] font-semibold lg:text-[24px]">
          사진
        </h3>
        {postImgList && postImgList.length === 0 && (
          <label
            htmlFor="images"
            className="flex size-[50px] cursor-pointer items-center justify-center gap-3 rounded-[5px] border border-[#343434] lg:h-[80px] lg:w-[80px]"
          >
            <FaCamera color="#343434" size={35} />
          </label>
        )}
        {postImgList && postImgList.length > 0 && (
          <label
            htmlFor="images"
            className="flex cursor-pointer items-center justify-start gap-3"
          >
            {postImgList.map((src: any, index: number) => (
              <img
                src={src}
                alt=""
                key={index}
                className="max-h-30 rounded-[5px] border border-[#343434] p-2 lg:max-h-40"
              />
            ))}
          </label>
        )}
        <input
          type="file"
          name="images"
          id="images"
          multiple
          className="hidden"
          accept="image/*"
          onChange={handleImageUpload}
        />
      </div>
    </>
  );
}
