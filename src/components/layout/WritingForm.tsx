'use client';
import { useEffect, useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Search } from 'lucide-react';

import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '@/assets/styles/datepicker.css';
import { ko } from 'date-fns/locale/ko';

export default function WritingForm({
  title,
  name,
  isRequired,
  placeholder,
  isLongForm,
  addressValue,
  handleModal,
  sendDate,
  value,
  onChange,
  type = 'text',
}: {
  title: string;
  name?: string;
  isRequired: boolean;
  placeholder: string;
  isLongForm: boolean;
  addressValue?: string;
  handleModal?: (showModal: boolean) => void;
  sendDate?: (date: Date) => void;
  value?: string | number;
  onChange?: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
  type?: string;
}) {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Update selectedDate when value (groupDate) changes from parent
  useEffect(() => {
    if (type === 'date' && value) {
      setSelectedDate(new Date(value));
    }
  }, [value, type]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    onChange(e);
  };

  const handleDate = (date: Date | null) => {
    setSelectedDate(date);
    if (date && sendDate) sendDate(date);
    // Also call the main onChange for consistency
    onChange({
      target: {
        name: name,
        value: date ? date.toISOString().split('T')[0] : '',
      },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  registerLocale('ko', ko);

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
              value={value as string}
              onChange={handleChange}
              maxLength={1000}
            />
          )}
          {!isLongForm && type !== 'date' && (
            <input
              type={type}
              name={name}
              className={`placeholder-gray-disabled t3 mt-3 w-full rounded border border-[#343434] p-4 text-white ${
                title === '모임 위치' ? 'pr-12' : ''
              }`}
              placeholder={placeholder}
              value={value}
              onChange={handleChange}
              onKeyDown={(e) => {
                if (e.key === 'Enter') e.preventDefault();
              }}
            />
          )}
          {!isLongForm && type === 'date' && (
            <DatePicker
              locale="ko"
              dateFormat="yyyy-MM-dd a h:mm"
              shouldCloseOnSelect
              showTimeSelect
              minDate={new Date()}
              selected={selectedDate}
              onChange={(date) => handleDate(date)}
              placeholderText="모임 시작일을 알려주세요"
              className="placeholder-gray-disabled t3 mt-3 w-full cursor-pointer rounded border border-[#343434] p-4 text-white"
              renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => (
                <div className="flex items-center justify-center gap-2">
                  <button type="button" onClick={decreaseMonth}>
                    <ChevronLeft color="#a8a8a8" size={16} />
                  </button>
                  <div className="w-30 font-bold text-[#a8a8a8]">
                    {`${months[date.getMonth()]}, ${date.getFullYear()}`}
                  </div>
                  <button type="button" onClick={increaseMonth}>
                    <ChevronRight color="#a8a8a8" size={16} />
                  </button>
                </div>
              )}
            />
          )}
          {isLongForm && (
            <div className="t3 absolute right-3 bottom-3 text-[#595858]">
              {String(value).length} / 1000
            </div>
          )}
        </div>
      </div>
    </>
  );
}
