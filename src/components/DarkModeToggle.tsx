'use client';

import { useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function DarkModeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // You can add logic here to change the theme
  };

  return (
    <div
      className="bg-gray-default relative flex w-17 cursor-pointer items-center rounded-full py-1 transition-colors duration-300"
      onClick={toggleDarkMode}
    >
      <div
        className={`bg-gray-8 absolute flex transform items-center justify-center rounded-full p-1 transition-transform duration-300 ${
          isDarkMode ? 'translate-x-7' : 'translate-x-[-2px]'
        }`}
      >
        {isDarkMode ? (
          <Moon className="text-main h-8 w-8" />
        ) : (
          <Sun className="text-main h-8 w-8" />
        )}
      </div>
    </div>
  );
}
