'use client';
import { CircleX } from 'lucide-react';
import Image from 'next/image';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { FaCamera } from 'react-icons/fa';
import { twMerge } from 'tailwind-merge';

export default function AddPhotoButton({
  className,
  onDataChange,
  multiple = false,
}: {
  className?: string;
  onDataChange?: (data: File[]) => void;
  multiple?: boolean;
}) {
  const [imageList, setImageList] = useState<File[]>([]);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (multiple && e.target.files) {
      for (let i = 0; i < e.target.files.length; i++) {
        setImageList((prev) => [...prev, e.target.files![i]].slice(0, 5));
      }
    } else if (!multiple && e.target.files) {
      setImageList([e.target.files[0]]);
    }
  };

  const handleDelete = (file: File) => {
    setImageList((prev) => prev.filter((v) => v !== file));
  };

  useEffect(() => {
    if (onDataChange) onDataChange(imageList);
  }, [imageList, onDataChange]);

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
              <div
                className="relative size-[50px] rounded-[5px] border border-[#343434] lg:size-[80px]"
                key={index}
              >
                <Image
                  src={URL.createObjectURL(item)}
                  alt=""
                  className="size-full rounded-[5px] object-cover object-center"
                  fill
                />
                <div className="bg-bg-color absolute top-0 left-0 size-full rounded-[5px] opacity-50"></div>
                <button
                  type="button"
                  onClick={() => handleDelete(item)}
                  className="absolute -top-2 -right-2 z-1 lg:-top-2.5 lg:-right-2.5"
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
