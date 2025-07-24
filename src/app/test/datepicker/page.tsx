'use client';
import DatepickerComponent from '@/components/common/DatepickerComponent';
import { useEffect, useState } from 'react';

export default function page() {
  const [test, setTest] = useState('');

  useEffect(() => {
    console.log(test);
  }, [test]);

  return (
    <div className="px-4 py-2">
      <DatepickerComponent
        sendDate={(date) => setTest(date.toISOString())}
        placeholder="테스트입니당"
      />
    </div>
  );
}
