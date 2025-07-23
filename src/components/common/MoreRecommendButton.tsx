type Props = {
  onRecommend: () => void;
  disabled?: boolean;
  loading?: boolean;
};

export default function MoreRecommendButton({ onRecommend, disabled, loading }: Props) {
  const handleClick = () => {
    console.log("다른 추천 받기 클릭됨");
    onRecommend();
  };

  return (
    <button
      className="
        w-[153px] h-[40px]
        px-[16px] flex justify-center items-center
        rounded-[3px] font-bold
        bg-gradient-to-r from-main to-text
        text-white text-[16px] 
        whitespace-nowrap
        shadow-none border-none
      "
      onClick={handleClick}
      disabled={disabled || loading}
    >
      {loading ? "로딩중..." : "다른 추천 받기 ✨"}
    </button>
  );
}