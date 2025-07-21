'use client';
import { useState } from 'react';
import { Calendar, Search } from 'lucide-react';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function WritingForm({
  title,
  name,
  isRequired,
  placeholder,
  isLongForm,
  handleModal,
  addressValue,
}: {
  title: string;
  name?: string;
  isRequired: boolean;
  placeholder: string;
  isLongForm: boolean;
  handleModal?: (showModal: boolean) => void;
  addressValue?: string;
}) {
  const [value, setValue] = useState('');

  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setValue(e.target.value);
  };

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
          {!isLongForm && title === '모임 날짜' && (
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pt-2 pr-4"
            >
              <Calendar size={20} color="#5e5e5e" />
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
            <DatePicker
              dateFormat="yyyy-MM-dd hh:mm TT"
              shouldCloseOnSelect
              showTimeSelect
              minDate={new Date()}
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              className="placeholder-gray-disabled t3 mt-3 w-full rounded border border-[#343434] p-4 text-white"
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
