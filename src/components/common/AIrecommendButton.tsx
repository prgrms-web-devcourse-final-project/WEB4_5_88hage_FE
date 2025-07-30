import { useState } from "react";
import DaumPostcode from "react-daum-postcode"
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "@/assets/styles/datepicker.css";
import { ko } from "date-fns/locale/ko";
import { toast } from "react-toastify";

registerLocale("ko", ko);

type Props = {
  onRecommend: (address: string, start: string, end: string) => void;
  loading?: boolean;
  className?: string;
  disabled?: boolean;
  isLoggedIn: boolean;
};

export default function AIrecommendButton({
  onRecommend,
  loading,
  //className,
  disabled,
  isLoggedIn
}: Props) {
  const [showModal, setShowModal] = useState(false);
  const [showAddrModal, setShowAddrModal] = useState(false)
  const [address, setAddress] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
const [endDate, setEndDate] = useState<Date | null>(null);

function formatDate(date: Date | null) {
  if (!date) return "";
  const pad = (n: number) => n.toString().padStart(2, "0");
  return (
    date.getFullYear() +
    "-" +
    pad(date.getMonth() + 1) +
    "-" +
    pad(date.getDate()) +
    "T" +
    pad(date.getHours()) +
    ":" +
    pad(date.getMinutes()) +
    ":00"
  );
}

  const handleSubmit = () => {
    setShowModal(false);
    onRecommend(
      address,
      formatDate(startDate),
      formatDate(endDate)
    );
    setAddress("");
    setStartDate("");
    setEndDate("");
  };
  
type AddressData = {
  address: string;
  addressType: string;
  bname: string;
  buildingName: string;
  zonecode: string;
  sido: string;
  sigungu: string;
};

  const handleComplete = (data: AddressData) => {
  let sido = data.sido;
  if (!sido.endsWith("시")) {
    sido += "시";
  }
  const sigungu = data.sigungu;
  const bname = data.bname;

  const apiAddress = `${sido} ${sigungu} ${bname}`;
  setAddress(apiAddress);
  setShowAddrModal(false);
};

//const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <>
      <button
        className={"h2 from-main to-text rounded-[4px] lg:text-[16px] bg-gradient-to-r font-semibold flex justify-center items-center w-[145px] h-[35px] text-white"}
        onClick={() => {
          if (!isLoggedIn) {
            toast.info("로그인 후 이용하실 수 있습니다.");
            return;
          }
          setShowModal(true);
        }}
        disabled={disabled || loading}
      >
        {loading ? "로딩중..." : "빠른 AI 추천 ✨"}
      </button>
      {showModal && (
  <div className="fixed z-50 inset-0 flex items-center justify-center bg-black/60">
    <div className="bg-white rounded-2xl shadow-xl px-8 py-8 w-[380px] flex flex-col items-center">
      <h2 className="mb-6 text-lg font-bold text-gray-900">추천 조건 입력</h2>

      <div className="flex w-full gap-2 mb-5">
        <input
          className="flex-1 p-3 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-main text-gray-700"
          value={address}
          readOnly
          placeholder="주소를 선택해주세요"
          onClick={() => setShowAddrModal(true)}
          style={{ cursor: "pointer" }}
        />
        <button
          type="button"
          className="bg-text text-white px-4 rounded-lg font-semibold"
          onClick={() => setShowAddrModal(true)}
        >
          검색
        </button>
      </div>

      {showAddrModal && (
        <div className="fixed z-50 inset-0 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg p-5">
            <DaumPostcode onComplete={handleComplete} />
            <button className="mt-2 text-sm text-gray-600" onClick={() => setShowAddrModal(false)}>
              닫기
            </button>
          </div>
        </div>
      )}

      <div className="w-full mb-3">
        <label className="block text-sm text-gray-800 mb-1">원하시는 시작기간을 선택하세요</label>
        <DatePicker
          locale="ko"
          dateFormat="yyyy-MM-dd a h:mm"
          shouldCloseOnSelect
          showTimeSelect
           timeIntervals={60}
          minDate={new Date()}
          selected={startDate}
          onChange={setStartDate}
          placeholderText="시작일"
          className="placeholder-gray-400 w-full p-3 rounded-lg border border-gray-300 bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-main"
        />
      </div>
      <div className="w-full mb-5">
        <label className="block text-sm text-gray-800 mb-1">원하시는 종료기간을 선택하세요</label>
        <DatePicker
          locale="ko"
          dateFormat="yyyy-MM-dd a h:mm"
          shouldCloseOnSelect
          showTimeSelect
           timeIntervals={60}
          minDate={startDate || new Date()}
          selected={endDate}
          onChange={setEndDate}
          placeholderText="종료일"
          className="placeholder-gray-400 w-full p-3 rounded-lg border border-gray-300 bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-main"
        />
      </div>
      <button
        className="w-full bg-text hover:bg-main-dark transition py-3 rounded-lg text-white font-bold text-base mt-2"
        onClick={handleSubmit}
        disabled={!address || !startDate || !endDate}
      >
        추천받기
      </button>
      <button
        className="mt-3 text-sm text-gray-500 underline"
        onClick={() => setShowModal(false)}
      >
        취소
      </button>
    </div>
  </div>
)}

    </>
  );
}