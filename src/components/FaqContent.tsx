import FaqAccordion from "./FaqAccordion";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Tab = "FAQ" | "공지사항";

interface FaqContentProps {
  activeTab: Tab;
}

export default function FaqContent({ activeTab }: FaqContentProps) {
  return (
    <div className="bg-[#121212] text-white px-6 lg:px-24">
      {activeTab === "FAQ" && (
        <section className="pt-12 lg:pt-20 pb-32">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-x-20">
            <div className="lg:w-1/3">
              <p className="hidden lg:block text-base font-semibold text-[#06CE9E] mb-2">
                빠른 해결
              </p>
              <h2 className="text-3xl -mt-2 lg:-mt-0 mb-1 whitespace-nowrap">
  <span className="block lg:hidden text-left text-[#06CE9E]">
    FAQs
  </span>

  <span className="hidden lg:inline">
    <span className="text-[#06CE9E]">F</span>requently{" "}
    <span className="text-[#06CE9E]">A</span>sked{" "}
    <span className="text-[#06CE9E]">Q</span>uestions
  </span>
</h2>

             <p className="text-[#b1b1b1] leading-relaxed text-xs lg:text-base mb-6">
                자주 묻는 질문 필요한 정보를 바로 찾아보세요.
              </p>
            </div>

            <div className="lg:w-2/3 space-y-4">
              <FaqAccordion />

              <div className="flex justify-center space-x-4 mt-8">
                문구 고민중
              </div>
            </div>
          </div>
        </section>
      )}

      {activeTab === "공지사항" && <SectionNotice />}
    </div>
  );
}

function SectionNotice() {
  const notices = Array.from({ length: 6 }).map(() => ({
    category: "특정 사용자 신고",
    content: "안녕하세요. 특정 악질 사용자 신고 문의 넣었는데 대응이 잘될까요?",
    date: "2025년06월28일",
  }));

  return (
    <section className="pt-12 pb-32">
      <div className="max-w-7xl mx-auto">
        {/* 제목 */}
        <h2 className="text-2xl text-white text-center mb-8">
          공지사항
        </h2>

        {/* 상단 가로선 */}
<div className="border-t-2 border-[#383838] mb-4" />



{/* 테이블 */}
<div className="overflow-x-auto">
  <table className="w-full table-auto border-collapse">
  <thead>
    <tr className="border-b-2 border-[#383838]">
      <th className="px-15 pt-1 pb-5 align-top leading-none text-left text-[#06ce9e] font-semibold">
        카테고리
      </th>
      <th className="px-8 pt-1 pb-5 align-top leading-none text-center text-white font-medium">
        내용
      </th>
      <th className="px-15 pt-1 pb-5 align-top leading-none text-right text-white font-medium">
        등록일
      </th>
    </tr>
  </thead>
  <tbody>
    {notices.map((n, idx) => (
      <tr key={idx} className="border-b border-[#383838]">
        <td className="px-8 py-6 align-top text-[#06CE9E] font-semibold whitespace-nowrap">
          {n.category}
        </td>
        <td className="px-8 py-6 align-top text-white overflow-hidden text-ellipsis">
          {n.content}
        </td>
        <td className="px-8 py-6 align-top text-[#ffffff] text-right whitespace-nowrap">
          {n.date}
        </td>
      </tr>
    ))}
  </tbody>
</table>

</div>

        {/* 페이징 */}
        <div className="flex justify-center space-x-3 mt-6 text-[#C1C1E0]">
  <button className="p-2 hover:text-white transition">
    <ChevronLeft size={16} />
  </button>
  {[1, 2, 3, 4, 5].map((p) => (
    <button
      key={p}
      className={`
        px-3 py-1 rounded-full transition
        ${p === 1
          ? "bg-[#06CE9E] text-black"
          : "hover:bg-[#3E3E5E] hover:text-white"}
      `}
    >
      {p}
    </button>
  ))}
  <button className="p-2 hover:text-white transition">
    <ChevronRight size={16} />
  </button>
</div>
      </div>
    </section>
  );
}