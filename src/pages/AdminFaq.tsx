'use client';
import AdminLayout from '@/components/layout/AdminLayout';
import {
  LucideChevronLeft,
  LucideChevronRight,
  LucidePencilLine,
  LucideTrash2,
} from 'lucide-react';
import { useState } from 'react';

export default function AdminFaq() {
  const [rewrite, setRewrite] = useState(false);
  const [newPost, setNewPost] = useState(false);

  return (
    <AdminLayout>
      <div className="mb-[37px] flex">
        <div className="text-main flex min-w-[151px] flex-col gap-[14px]">
          <div className="text-2xl font-semibold">FAQ 목록</div>
          <hr />
        </div>
      </div>
      <div className="mb-[47px]">
        <button
          type="button"
          onClick={() => setNewPost(true)}
          className="bg-gray-5 rounded-[10px] px-5 py-[13px] text-xl font-semibold text-[#fff]"
        >
          + 새 FAQ 등록
        </button>
      </div>
      <div className="mb-[60px] text-[#fff]">
        <div className="flex border-t border-[#848484] py-[23px] last:border-b">
          <div className="text-main w-[8%] text-center">번호</div>
          <div className="w-[7%]"></div>
          <div className="grow">제목</div>
          <div className="w-[15%] min-w-[125px] text-center">등록일</div>
          <div className="flex w-[7%] justify-center">수정하기</div>
          <div className="flex w-[7%] justify-center">삭제하기</div>
        </div>
        {[1, 1, 1, 1].map((num, index) => (
          <div
            className="flex border-t border-[#848484] py-[33px] font-semibold last:border-b"
            key={index}
          >
            <div className="w-[8%] text-center">{num}</div>
            <div className="w-[7%]"></div>
            <div className="grow">faq 제목입니다.</div>
            <div className="w-[15%] min-w-[125px] text-center text-[#a5a5a5]">
              2025년06월28일
            </div>
            <div className="flex w-[7%] justify-center">
              <button type="button" onClick={() => setRewrite(true)}>
                <LucidePencilLine />
              </button>
            </div>
            <div className="flex w-[7%] justify-center">
              <button>
                <LucideTrash2 />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-[25px] text-xl text-[#fff]">
        <button>
          <LucideChevronLeft />
        </button>
        <div className="flex gap-1">
          <button className="bg-main size-[29px] rounded-full text-black">
            1
          </button>
          <button className="size-[29px]">2</button>
          <button className="size-[29px]">3</button>
          <button className="size-[29px]">4</button>
          <button className="size-[29px]">5</button>
        </div>
        <button>
          <LucideChevronRight />
        </button>
      </div>
      {rewrite && (
        <div className="fixed top-0 left-0 z-100 flex h-screen w-screen items-center justify-center">
          <div className="fixed h-screen w-screen bg-black opacity-80" />
          <div className="bg-gray-5 fixed z-101 flex w-[716px] flex-col rounded-[35px] px-[46px] py-[33px] text-[#fff]">
            <div className="mb-[29px] text-2xl font-semibold">
              자세한 신고 기준을 알고 싶어요.
            </div>
            <textarea
              placeholder="내용을 입력해 주세요"
              className="mb-[43px] h-[180px] w-full resize-none rounded-[10px] border-2 border-[#9d9d9d] px-[18px] py-[14px]"
            >
              {/* 형사피의자 또는 형사피고인으로서 구금되었던 자가 법률이 정하는
              불기소처분을 받거나 무죄판결을 받은 때에는 법률이 정하는 바에
              의하여 국가에 정당한 보상을 청구할 수 있다. 군사법원의 조직·권한
              및 재판관의 자격은 법률로 정한다. 모든 국민은 신체의 자유를
              가진다. 누구든지 법률에 의하지 아니하고는 체포·구속·압수·수색 또는
              심문을 받지 아니하며, 법률과 적법한 절차에 의하지 아니하고는
              처벌·보안처분 또는 강제노역을 받지 아니한다. */}
            </textarea>
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => setRewrite(false)}
                className="bg-gray-4 rounded-[5px] px-16 py-[13px]"
              >
                수정하기
              </button>
            </div>
          </div>
        </div>
      )}
      {newPost && (
        <div className="fixed top-0 left-0 z-100 flex h-screen w-screen items-center justify-center">
          <div className="fixed h-screen w-screen bg-black opacity-80" />
          <div className="bg-gray-5 fixed z-101 flex w-[716px] flex-col rounded-[35px] px-[46px] py-[33px] text-[#fff]">
            <div className="mb-[29px] flex text-2xl font-semibold">
              <input
                placeholder="새 FAQ 제목"
                className="rounded-[10px] border-2 border-[#9d9d9d] px-[18px] py-[14px]"
              ></input>
            </div>
            <textarea
              placeholder="내용을 입력해 주세요"
              className="mb-[43px] h-[180px] w-full resize-none rounded-[10px] border-2 border-[#9d9d9d] px-[18px] py-[14px]"
            >
              {/* 형사피의자 또는 형사피고인으로서 구금되었던 자가 법률이 정하는
              불기소처분을 받거나 무죄판결을 받은 때에는 법률이 정하는 바에
              의하여 국가에 정당한 보상을 청구할 수 있다. 군사법원의 조직·권한
              및 재판관의 자격은 법률로 정한다. 모든 국민은 신체의 자유를
              가진다. 누구든지 법률에 의하지 아니하고는 체포·구속·압수·수색 또는
              심문을 받지 아니하며, 법률과 적법한 절차에 의하지 아니하고는
              처벌·보안처분 또는 강제노역을 받지 아니한다. */}
            </textarea>
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => setNewPost(false)}
                className="bg-gray-4 rounded-[5px] px-16 py-[13px]"
              >
                등록하기
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
