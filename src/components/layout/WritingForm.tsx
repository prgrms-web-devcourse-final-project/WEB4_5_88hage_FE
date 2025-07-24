'use client';
import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import DatepickerComponent from '../common/DatepickerComponent';

export default function WritingForm({
  title,
  name,
  isRequired,
  placeholder,
  isLongForm,
  addressValue,
  handleModal,
  sendDate,
}: {
  title: string;
  name?: string;
  isRequired: boolean;
  placeholder: string;
  isLongForm: boolean;
  addressValue?: string;
  handleModal?: (showModal: boolean) => void;
  sendDate?: (date: Date) => void;
}) {
  const [value, setValue] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    if (sendDate && selectedDate) sendDate(selectedDate);
  }, [selectedDate]);

  return (
    <>
      <div className="w-full">
        <div className="text-main text-[16px] font-semibold lg:text-[24px]">
          {title}
          {isRequired && (
            <span className="t5 t4 ml-2 font-medium text-[#cecece]">필수</span>
          )}
        </div>
        <div className="relative">
          {!isLongForm && title === '모임 위치' && (
            <button
              type="button"
              onClick={() => {
                if (handleModal) handleModal(true);
              }}
              className="absolute inset-y-0 right-0 flex items-center pt-2 pr-4"
            >
              <Search size={20} color="#5e5e5e" />
            </button>
          )}
          {isLongForm && (
            <textarea
              name={name}
              className="placeholder-gray-disabled t3 mt-3 h-64 w-full resize-none rounded border border-[#343434] p-4 text-white"
              placeholder={placeholder}
              value={value}
              onChange={handleChange}
              maxLength={1000}
            />
          )}
          {!isLongForm && title !== '모임 날짜' && (
            <input
              type="text"
              name={name}
              className={`placeholder-gray-disabled t3 mt-3 w-full rounded border border-[#343434] p-4 text-white ${
                title === '모임 위치' ? 'pr-12' : ''
              }`}
              placeholder={placeholder}
              value={addressValue || addressValue === '' ? addressValue : value}
              onChange={handleChange}
              onKeyDown={(e) => {
                if (e.key === 'Enter') e.preventDefault();
              }}
            />
          )}
          {!isLongForm && title === '모임 날짜' && (
            <DatepickerComponent
              placeholder="모임 시작일을 알려주세요"
              sendDate={(date) => setSelectedDate(date)}
            />
          )}
          {isLongForm && (
            <div className="t3 absolute right-3 bottom-3 text-[#595858]">
              {value.length} / 1000
            </div>
          )}
        </div>
      </div>
    </>
  );
}
