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
      className="bg-gray-default relative flex h-8 w-16 cursor-pointer items-center rounded-full p-1 transition-colors duration-300"
      onClick={toggleDarkMode}
    >
      <div
        className={`bg-gray-8 absolute flex h-8 w-8 transform items-center justify-center rounded-full transition-transform duration-300 ${
          isDarkMode ? 'translate-x-7' : 'translate-x-[-3px]'
        }`}
      >
        {isDarkMode ? (
          <Moon className="text-main h-6 w-6" />
        ) : (
          <Sun className="text-main h-6 w-6" />
        )}
      </div>
    </div>
  );
}
