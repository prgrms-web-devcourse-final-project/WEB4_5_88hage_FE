export default function InquiryDetail() {
  return (
    <div className="min-h-screen bg-[#121212] flex flex-col items-center px-0 py-0">
      <div className="
        w-full
        min-h-screen
        px-4 pt-8 pb-12
        flex flex-col justify-start
        sm:px-4
        md:px-12
        lg:px-30
      ">
        <div>
          <p className="text-sm lg:text-[32px] font-bold text-[#E2E2E2] mt-1 mb-3 lg:mb-[54]">
            안녕하세요, 홍길동님 👋
          </p>
        </div>
        <div className="flex flex-col items-start lg:items-center pb-4 lg:pb-10">
          <h1 className="text-[20px] font-extrabold text-left mb-3 lg:text-[32px] lg:text-center lg:mb-2 w-full">
            <span className="bg-gradient-to-r from-[#1cebb9] to-[#7f74ff] bg-clip-text text-transparent">
              문의 내역
            </span>
          </h1>
        </div>

        {/* 문의 요약 */}
        <div className="
          border-t-2 border-b border-[#444]
          py-3 flex flex-col gap-1 mb-4
          lg:py-6 lg:mb-3 lg:flex-row lg:items-center lg:gap-6
        ">
          <span className="text-[#ffffff] text-[12px] font-semibold lg:text-sm lg:min-w-[140px]">
            특정 사용자 신고
          </span>
          <span className="text-[#d2d2d2] lg:text-[#ffffff] text-[12px] lg:text-[16px] flex-1 text-left">
            안녕하세요. 특정 악질 사용자 신고 문의 넣었는데 대처가 잘 됐을까요?
          </span>
          <span className="text-[#A5A5A5] text-[11px] mt-1 lg:mt-0 self-start lg:self-auto lg:text-xs min-w-fit">
            2025년 06월 28일
          </span>
        </div>

        {/* Q */}
        <div className="mb-4 mt-3">
          <div className="flex flex-col gap-1">
            <div className="flex gap-1 items-center mb-2">
              <span className="text-[#00e6ae] text-[15px] lg:text-[18px]">
                Q. 안녕하세요. 특정 악의적 사용자 신고 문의 넣었는데 대처가 잘 됐을까요?
              </span>
            </div>
            <p className="text-[#f6f6f6] text-[13px] lg:text-[16px] leading-relaxed ml-0 lg:ml-[25px]">
              국회는 정부의 동의없이 정부가 제출한 지출예산 각항의 금액을 증가하거나 새 비목을 설치할 수 없다. 모든 국민은 직업선택의 자유를 가진다. 모든 국민은 보건에 관하여 국가의 보호를 받는다. 국민경제자문회의의 조직·직무범위 기타 필요한 사항은 법률로 정한다. 국회의원은 국가이익을 우선하여 양심에 따라 직무를 행한다. 행정각부의 설치·조직과 직무범위는 법률로 정한다. 재산권의 행사는 공공복리에 적합하도록 하여야 한다. 법원은 최고법원인 대법원과 각급법원으로 조직된다. 대법원장과 대법관이 아닌 법관은 대법관회의의 동의를 얻어 대법원장이 임명한다. 재판의 심리와 판결은 공개한다. 다만, 심리는 국가의 안전보장 또는 안녕질서를 방해하거나 선량한 풍속을 해할 염려가 있을 때에는 법원의 결정으로 공개하지 아니할 수 있다.
            </p>
          </div>
        </div>

        {/* A */}
        <div className="mb-10">
          <div className="flex gap-1 items-center mb-4">
            <span className="text-[#00e6ae] text-[15px] lg:text-[18px]">A. 답변</span>
          </div>
          <p className="text-[#f6f6f6] text-[13px] lg:text-[16px] leading-relaxed ml-0 lg:ml-[25px]">
            국회는 정부의 동의없이 정부가 제출한 지출예산 각항의 금액을 증가하거나 새 비목을 설치할 수 없다. 모든 국민은 직업선택의 자유를 가진다. 모든 국민은 보건에 관하여 국가의 보호를 받는다. 국민경제자문회의의 조직·직무범위 기타 필요한 사항은 법률로 정한다. 국회의원은 국가이익을 우선하여 양심에 따라 직무를 행한다. 행정각부의 설치·조직과 직무범위는 법률로 정한다. 재산권의 행사는 공공복리에 적합하도록 하여야 한다. 법원은 최고법원인 대법원과 각급법원으로 조직된다. 대법원장과 대법관이 아닌 법관은 대법관회의의 동의를 얻어 대법원장이 임명한다. 재판의 심리와 판결은 공개한다. 다만, 심리는 국가의 안전보장 또는 안녕질서를 방해하거나 선량한 풍속을 해할 염려가 있을 때에는 법원의 결정으로 공개하지 아니할 수 있다.
          </p>
        </div>

        {/* 버튼 */}
        <div className="flex justify-center pt-16 border-t-2 border-[#444]">
          <button className="w-[196px] h-[48px] bg-[#303236] text-[#D4D4D4] rounded-md py-3 text-[15px] hover:bg-[#35383b] transition lg:w-auto lg:px-6 lg:py-2 lg:text-[18px]">
            목록으로 이동
          </button>
        </div>
      </div>
    </div>
  );
}