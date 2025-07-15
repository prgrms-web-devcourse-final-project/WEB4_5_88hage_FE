import { twMerge } from "tailwind-merge";

export default function AIrecommendButton({className}:{className?:string}) {
  return (
    <>
      <button className={twMerge("h2 from-main to-text rounded-[4px] lg:text-[16px] bg-gradient-to-r font-semibold lg:flex justify-center items-center lg:w-[145px] lg:h-[35px] text-white",className)}>
        빠른 AI 추천 ✨
      </button>
    </>
  );
}
