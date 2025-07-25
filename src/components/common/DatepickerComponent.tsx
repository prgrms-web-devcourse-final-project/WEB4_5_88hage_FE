'use client';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '@/assets/styles/datepicker.css';
import { ko } from 'date-fns/locale/ko';
import { twMerge } from 'tailwind-merge';

export default function DatepickerComponent({
  placeholder,
  sendDate,
  className,
  iconColor = '#5e5e5e',
}: {
  placeholder: string;
  sendDate?: (date: Date) => void;
  className?: string;
  iconColor?: string;
}) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const handleDate = (date: Date | null) => {
    setSelectedDate(date);
    if (date && sendDate) sendDate(date);
  };
  registerLocale('ko', ko);
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

  return (
    <div className="relative">
      <button
        type="button"
        className="absolute inset-y-0 right-0 z-1 flex items-center pt-2 pr-4"
      >
        <Calendar size={20} color={iconColor} />
      </button>
      <DatePicker
        locale="ko"
        dateFormat="yyyy-MM-dd a h:mm"
        shouldCloseOnSelect
        showTimeSelect
        minDate={new Date()}
        selected={selectedDate}
        onChange={(date) => handleDate(date)}
        placeholderText={placeholder}
        className={twMerge(
          'placeholder-gray-disabled t3 mt-3 w-full cursor-pointer rounded border border-[#343434] p-4 text-white',
          className,
        )}
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
    </div>
  );
}
