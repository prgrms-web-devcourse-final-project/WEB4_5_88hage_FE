"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function NotiDetail () {
  const params = useParams();
  console.log('params:', params);
  const id = params.noticeId;
  const [notice, setNotice] = useState(null);

  useEffect(() => {
    console.log("useEffect 동작, id:", id);
    if (!id) return;
    fetch(`https://funfun.cloud/api/admin/notices/${id}`)
      .then(res => res.json())
      .then(data => {
        console.log("fetch 결과:", data);
        setNotice(data.data);
      });
  }, [id]);

  if (!notice) return <div className="text-white">로딩 중...</div>;
  return (
    <>
    <div className="flex flex-col bg-[#121212]">
    <div className="flex flex-col items-center pt-8 pb-3 bg-[#1d1d1d]">
        <span className="text-lg font-semibold text-white mb-1 tracking-tight">
          고객지원
        </span>
        <h1 className="text-3xl font-extrabold text-center mb-2">
          <span className="bg-gradient-to-r from-[#1cebb9] to-[#7f74ff] bg-clip-text text-transparent">
            공지사항
          </span>
        </h1>
      </div>
      <main className="flex justify-center bg-[#121212] mb-20">
        <div className="w-full max-w-[1220px] mx-auto px-6 mt-[46px]">
            <p className="text-base lg:text-lg text-white font-semibold">{notice.title}</p>
            <p className="text-xs lg:text-sm text-white mt-[20px] mb-[20px]">{notice.createdAt.slice(0, 10)}</p>
            <div className="border-y-1 border-[#4d4d4d]">
</div>
<p className="text-xs lg:text-sm text-[#ababab] mt-[50px]">{notice.content}</p>
        </div>
        </main>
    </div></>
  );
}