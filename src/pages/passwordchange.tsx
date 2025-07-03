"use client";

import { useState } from "react";
import Input from "@/components/common/Input";

export default function PasswordChangePage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleChangeClick = () => {
    console.log("버튼 클릭됨");
    if (password !== confirmPassword) {
      setError("비밀번호를 확인 해주세요");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#232323] text-white px-4 md:px-0">
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="w-full max-w-md flex flex-col items-center gap-6">
          <h1 className="text-3xl font-bold text-[#1CEBB9]">
            <span className="text-white">FU</span>N
            <span className="text-white">FU</span>N
          </h1>

          <div className="w-full flex flex-col gap-4">
            <Input
              type="password"
              placeholder="변경 할 비밀번호를 입력 해주세요."
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
            />
            <Input
              type="password"
              placeholder="변경 할 비밀번호를 확인 해주세요."
              value={confirmPassword}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setConfirmPassword(e.target.value)
              }
            />
            
            <div className="hidden md:block mt-6 w-full">
              <button
  className={`w-full py-3 rounded-md font-bold ${
    confirmPassword
      ? "bg-[#1CEBB9] text-[#232323]"
      : "bg-[#313131] text-[#bdbdbd]"
  }`}
  onClick={handleChangeClick}
>
  변경 하기
</button>

              {error && (
              <p className="text-xs text-red-500 font-medium text-center mt-6">{error}</p>
            )}
            </div>
          </div>
        </div>
      </div>

      <div className="block md:hidden fixed bottom-8 left-0 right-0 px-4">
        {error && (
              <p className="text-xs text-red-500 font-medium text-center mb-3">{error}</p>
            )}
        <button
          className="w-full py-3 rounded-md bg-[#313131] text-[#bdbdbd] font-bold"
          onClick={handleChangeClick}
        >
          변경 하기
        </button>
        
      </div>
    </div>
  );
}