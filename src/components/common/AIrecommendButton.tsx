import { useState } from "react";

type Props = {
  onRecommend: (address: string, start: string, end: string) => void;
  loading?: boolean;
  className?: string;
  disabled?: boolean;
};

export default function AIrecommendButton({
  onRecommend,
  loading,
  className,
  disabled,
}: Props) {
  const [showModal, setShowModal] = useState(false);
  const [address, setAddress] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSubmit = () => {
    setShowModal(false);
    onRecommend(address, startDate, endDate);
    setAddress("");
    setStartDate("");
    setEndDate("");
  };

  return (
    <>
      <button
        className={className || "h2 from-main to-text rounded-[4px] lg:text-[16px] bg-gradient-to-r font-semibold flex justify-center items-center w-[145px] h-[35px] text-white"}
        onClick={() => setShowModal(true)}
        disabled={disabled || loading}
      >
        {loading ? "로딩중..." : "빠른 AI 추천 ✨"}
      </button>
      {showModal && (
  <div className="fixed z-50 inset-0 flex items-center justify-center bg-black/40">
    <div className="bg-white rounded-lg p-6 w-full max-w-sm">
      <h2 className="mb-3 font-bold">추천 조건 입력</h2>
      <input
        className="mb-2 w-full p-2 border rounded"
        placeholder="장소(예: 서울시 송파구 문정동)"
        value={address}
        onChange={e => setAddress(e.target.value)}
      />
      <div className="mb-1 text-sm text-gray-700">원하시는 시작기간을 선택해주세요</div>
      <input
        className="mb-2 w-full p-2 border rounded"
        type="date"
        value={startDate}
        onChange={e => setStartDate(e.target.value)}
      />
      <div className="mb-1 text-sm text-gray-700">원하시는 종료기간을 선택해주세요</div>
      <input
        className="mb-4 w-full p-2 border rounded"
        type="date"
        value={endDate}
        onChange={e => setEndDate(e.target.value)}
      />
      <button
        className="w-full bg-[#383838] text-white py-2 rounded"
        onClick={handleSubmit}
        disabled={!address || !startDate || !endDate}
      >
        추천받기
      </button>
    </div>
  </div>
)}
    </>
  );
}