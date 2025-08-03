import { useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '@/assets/styles/datepicker.css';
import { ko } from 'date-fns/locale/ko';
import { toast } from 'react-toastify';
import { HashLoader } from 'react-spinners';

registerLocale('ko', ko);

type Props = {
  onRecommend: (address: string, start: string, end: string) => void;
  loading?: boolean;
  className?: string;
  disabled?: boolean;
  isLoggedIn: boolean;
};

const themeObj = {
   bgColor: "#313131", //바탕 배경색
   searchBgColor: "#313131", //검색창 배경색
   contentBgColor: "#545454", 
   pageBgColor: "#888888", //페이지 배경색
   textColor: "#F2F2F2", //기본 글자색
   queryTextColor: "#D0D0D0", //검색창 글자색
   postcodeTextColor: "#1CEBB9", //우편번호 글자색
   outlineColor: "#D0D0D0" //테두리
};

export default function AIrecommendButton({
  onRecommend,
  loading,
  //className,
  disabled,
  isLoggedIn,
}: Props) {
  const [showModal, setShowModal] = useState(false);
  const [showAddrModal, setShowAddrModal] = useState(false);
  const [address, setAddress] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  function formatDate(date: Date | null) {
    if (!date) return '';
    const pad = (n: number) => n.toString().padStart(2, '0');
    return (
      date.getFullYear() +
      '-' +
      pad(date.getMonth() + 1) +
      '-' +
      pad(date.getDate()) +
      'T' +
      pad(date.getHours()) +
      ':' +
      pad(date.getMinutes()) +
      ':00'
    );
  }

  const handleSubmit = () => {
    setShowModal(false);

    onRecommend(address, formatDate(startDate), formatDate(endDate));
    setAddress('');
    setStartDate(null);
    setEndDate(null);
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
    if (!sido.endsWith('시')) {
      sido += '시';
    }
    const sigungu = data.sigungu;
    const bname = data.bname;

    const apiAddress = `${sido} ${sigungu} ${bname}`;
    setAddress(apiAddress);
    setShowAddrModal(false);
  };

  return (
    <>
      <button
        className={
          'h2 from-main to-text flex h-[35px] w-[145px] items-center justify-center rounded-[4px] bg-gradient-to-r font-semibold text-white lg:text-[16px]'
        }
        onClick={() => {
          if (!isLoggedIn) {
            toast.info('로그인 후 이용하실 수 있습니다.');
            return;
          }
          setShowModal(true);
        }}
        disabled={disabled || loading}
      >
        {loading ? (
          <HashLoader color="#36d7b7" size={18} />
        ) : (
          "빠른 추천 받기 ✨"
        )}
      </button>
      {/* 메인 모달 */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="flex w-[380px] flex-col items-center rounded-2xl bg-[#232323] px-8 py-8 shadow-2xl">
            <h2 className="mb-6 text-lg font-bold text-white">
              추천 조건 입력
            </h2>

            {/* 주소 입력 */}
            <div className="mb-5 flex w-full gap-2">
              <input
                className="focus:ring-main flex-1 rounded-lg border border-gray-700 bg-[#181818] p-3 text-white focus:ring-2 focus:outline-none placeholder:text-gray-400"
                value={address}
                readOnly
                placeholder="주소를 선택해주세요"
                onClick={() => setShowAddrModal(true)}
                style={{ cursor: 'pointer' }}
              />
              <button
                type="button"
                className="bg-main rounded-lg px-4 font-semibold text-black"
                onClick={() => setShowAddrModal(true)}
              >
                검색
              </button>
            </div>

            {/* 주소검색 모달 */}
            {showAddrModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                <div className="rounded-lg bg-[#232323] p-5">
                  <DaumPostcode onComplete={handleComplete} theme={themeObj}/>
                  <button
                    className="mt-2 text-sm text-gray-400"
                    onClick={() => setShowAddrModal(false)}
                  >
                    닫기
                  </button>
                </div>
              </div>
            )}

            {/* 시작일 */}
            <div className="mb-3 w-full">
              <label className="mb-1 block text-sm text-gray-200">
                원하시는 시작기간을 선택하세요
              </label>
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
                className="focus:ring-main w-full rounded-lg border border-gray-700 bg-[#181818] p-3 text-white placeholder-gray-400 focus:ring-2 focus:outline-none"
              />
            </div>
            {/* 종료일 */}
            <div className="mb-5 w-full">
              <label className="mb-1 block text-sm text-gray-200">
                원하시는 종료기간을 선택하세요
              </label>
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
                className="focus:ring-main w-full rounded-lg border border-gray-700 bg-[#181818] p-3 text-white placeholder-gray-400 focus:ring-2 focus:outline-none"
              />
            </div>
            {/* 추천받기 */}
            <button
              className="bg-main hover:bg-main-dark mt-2 w-full rounded-lg py-3 text-base font-bold text-black transition"
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