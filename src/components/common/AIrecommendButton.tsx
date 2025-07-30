import { useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '@/assets/styles/datepicker.css';
import { ko } from 'date-fns/locale/ko';
import { toast } from 'react-toastify';

registerLocale('ko', ko);

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

  //const [selectedDate, setSelectedDate] = useState<Date | null>(null);

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
        {loading ? '로딩중...' : '빠른 AI 추천 ✨'}
      </button>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="flex w-[380px] flex-col items-center rounded-2xl bg-white px-8 py-8 shadow-xl">
            <h2 className="mb-6 text-lg font-bold text-gray-900">
              추천 조건 입력
            </h2>

            <div className="mb-5 flex w-full gap-2">
              <input
                className="focus:ring-main flex-1 rounded-lg border border-gray-300 bg-gray-100 p-3 text-gray-700 focus:ring-2 focus:outline-none"
                value={address}
                readOnly
                placeholder="주소를 선택해주세요"
                onClick={() => setShowAddrModal(true)}
                style={{ cursor: 'pointer' }}
              />
              <button
                type="button"
                className="bg-text rounded-lg px-4 font-semibold text-white"
                onClick={() => setShowAddrModal(true)}
              >
                검색
              </button>
            </div>

            {showAddrModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                <div className="rounded-lg bg-white p-5">
                  <DaumPostcode onComplete={handleComplete} />
                  <button
                    className="mt-2 text-sm text-gray-600"
                    onClick={() => setShowAddrModal(false)}
                  >
                    닫기
                  </button>
                </div>
              </div>
            )}

            <div className="mb-3 w-full">
              <label className="mb-1 block text-sm text-gray-800">
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
                className="focus:ring-main w-full rounded-lg border border-gray-300 bg-gray-100 p-3 text-gray-700 placeholder-gray-400 focus:ring-2 focus:outline-none"
              />
            </div>
            <div className="mb-5 w-full">
              <label className="mb-1 block text-sm text-gray-800">
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
                className="focus:ring-main w-full rounded-lg border border-gray-300 bg-gray-100 p-3 text-gray-700 placeholder-gray-400 focus:ring-2 focus:outline-none"
              />
            </div>
            <button
              className="bg-text hover:bg-main-dark mt-2 w-full rounded-lg py-3 text-base font-bold text-white transition"
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
