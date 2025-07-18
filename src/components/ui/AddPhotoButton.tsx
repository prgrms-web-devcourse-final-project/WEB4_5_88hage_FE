'use client';
import { CircleX } from 'lucide-react';
import { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import { FaCamera } from 'react-icons/fa';
import { twMerge } from 'tailwind-merge';

export default function AddPhotoButton({
  className,
  onDataChange,
}: {
  className?: string;
  onDataChange?: (data: File[]) => void;
}) {
  const [imageList, setImageList] = useState<File[]>([]);
  const [previewList, setPreviewList] = useState<string[]>([]);

  // const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files) {
  //     setPostImgList([]);
  //     for (let i = 0; i < e.target.files.length; i++) {
  //       const currentImgUrl = URL.createObjectURL(e.target.files[i]);
  //       setPostImgList((prev: any) => [...prev, currentImgUrl].slice(0, 5));
  //     }
  //     if (onDataChange) onDataChange(e.target.files);
  //   }
  // };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      for (let i = 0; i < e.target.files.length; i++) {
        setImageList((prev) => [...prev, e.target.files![i]].slice(0, 5));
      }
    }
  };

  const handleDelete = (file: File) => {
    setImageList(imageList.filter((v) => v !== file));
  };

  useEffect(() => {
    if (onDataChange) onDataChange(imageList);
  }, [imageList]);

  return (
    <>
      <div className={twMerge('lg:mt-[-20px] lg:mb-[-5px]', className)}>
        <h3 className="text-main mb-[13px] text-[16px] font-semibold lg:text-[24px]">
          사진
        </h3>
        <div className="flex gap-2.5 lg:gap-5.5">
          <label
            htmlFor="images"
            className="flex size-[50px] cursor-pointer items-center justify-center gap-3 rounded-[5px] border border-[#343434] lg:size-[80px]"
          >
            <FaCamera color="#343434" size={35} />
          </label>
          {imageList &&
            imageList.length > 0 &&
            imageList.map((item, index) => (
              <div className="relative" key={index}>
                <img
                  src={URL.createObjectURL(item)}
                  alt=""
                  key={index}
                  className="size-[50px] rounded-[5px] border border-[#343434] object-cover object-center p-1.5 lg:size-[80px]"
                />
                <div className="bg-bg-color absolute top-1.5 left-1.5 size-[38px] opacity-50 lg:size-[68px]"></div>
                <button
                  type="button"
                  onClick={() => handleDelete(item)}
                  className="absolute -top-1.5 -right-1.5 z-1"
                >
                  <CircleX className="size-[18px] text-white lg:size-[24px]" />
                </button>
              </div>
            ))}
        </div>
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
