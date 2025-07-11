export default function NoticeContent() {
  const notices = Array.from({ length: 1 }).map(() => ({
    category: "특정 사용자 신고",
    content: "안녕하세요. 특정 악질 사용자 신고 문의 넣었는데 대응이 잘될까요?",
    date: "2025년06월28일",
  }));

  return (
    <section className="bg-[#121212] text-white px-6 lg:px-24 pt-10 lg:pt-12 pb-32">
      <div className="max-w-7xl mx-auto">
        {/* 제목 */}
        <h2 className="text-xl lg:text-2xl text-white text-center mb-8">
          문의내역
        </h2>

        {/* 상단 가로선 */}
        <div className="border-t-2 border-[#383838] lg:mb-4 mb-1" />

        {/* 테이블 */}
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <tbody>
              {notices.map((n, idx) => (
                <tr
                  key={idx}
                  className="flex flex-col lg:table-row border-b border-[#383838] mb-1"
                >
                  <td className="px-8 lg:py-6 py-2 lg:align-top text-[#06CE9E] font-semibold whitespace-nowrap">
                    {n.category}
                  </td>
                  <td className="text-sm lg:text-base px-8 lg:py-6 py-1 lg:align-top text-white overflow-hidden text-ellipsis">
                    {n.content}
                  </td>
                  <td className="text-xs lg:text-base px-8 lg:py-6 py-3 lg:align-top text-[#ffffff] lg:text-right whitespace-nowrap overflow-visible lg:whitespace-nowrap lg:overflow-hidden lg:text-ellipsis">
                    {n.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}