'use client';

import Link from 'next/link';
import { useState } from 'react';

const NAV_ITEMS = [
  { label: '행사', value: 'event' },
  { label: '모임', value: 'gathering' },
  { label: '도움', value: 'help' },
];

export default function Navigation() {
  const [active, setActive] = useState('');

  return (
    <nav>
      <ul className="flex gap-8">
        {NAV_ITEMS.map((item) => (
          <li key={item.value} className="mt-[5px] flex flex-col items-center">
            <button
              className={`text-lg font-semibold transition-colors ${active === item.value ? 'text-main' : 'text-white'} hover:text-main`}
              onClick={() => setActive(item.value)}
              type="button"
            >
              <Link href={`/${item.value}`}>{item.label}</Link>
            </button>
            {/* 아래 점 표시 */}
            <span
              className={`mt-1 h-1 w-1 rounded-full ${active === item.value ? 'bg-main' : 'bg-transparent'} transition-all`}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
}
