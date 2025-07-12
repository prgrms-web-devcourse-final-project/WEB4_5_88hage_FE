export default function InquiryDetail() {
  return (
    <div className="min-h-screen bg-[#121212] flex flex-col items-center px-2 py-4 lg:px-12 lg:py-12">
      <div className="
        w-full 
        max-w-[400px] 
        lg:max-w-3xl 
        bg-[#181818] 
        rounded-xl 
        shadow-lg 
        px-4 py-6 
        flex flex-col 
        justify-center
        min-h-[calc(100vh-32px)]
        lg:min-h-[calc(100vh-96px)]
        mx-auto
        lg:px-8 lg:py-10
      ">
        <div className="flex flex-col items-center pb-6 lg:pb-10">
          <h1 className="text-xl lg:text-3xl font-extrabold text-center mb-2">
            <span className="bg-gradient-to-r from-[#1cebb9] to-[#7f74ff] bg-clip-text text-transparent">
              문의 내역
            </span>
          </h1>
        </div>

        <div className="border-t border-b border-[#444] py-3 flex flex-col gap-2 mb-5 lg:flex-row lg:items-center lg:py-6 lg:gap-6 lg:mb-3">
          <div className="text-[#ffffff] text-xs font-semibold lg:text-sm min-w-[120px] lg:min-w-[140px]">
            특정 사용자 신고
          </div>
          <div className="text-[#ffffff] text-xs font-medium flex-1 text-left lg:text-sm">
            안녕하세요. 특정 악질 사용자 신고 문의 넣었는데 대처가 잘 됐을까요?
          </div>
          <div className="text-[#A5A5A5] text-[10px] self-end lg:self-auto lg:text-xs min-w-fit">
            2025년 06월 28일
          </div>
        </div>

        <div className="mb-4 mt-3">
          <div className="flex flex-col gap-1">
            <div className="flex gap-2 items-center">
              <span className="text-[#00e6ae] font-bold">Q.</span>
              <span className="text-[#00e6ae] font-semibold text-xs lg:text-base">
                안녕하세요. 특정 악의적 사용자 신고 문의 넣었는데 대처가 잘 됐을까요?
              </span>
            </div>
            <p className="text-[#f6f6f6] text-xs lg:text-sm leading-relaxed ml-5 lg:ml-[25px] mt-4">
              국회는 정부의 동의없이 정부가 제출한 지출예산 각항의 금액을 증가하거나 새 비목을 설치할 수 없다. 모든 국민은 직업선택의 자유를 가진다. 모든 국민은 보건에 관하여 국가의 보호를 받는다. 국민경제자문회의의 조직·직무범위 기타 필요한 사항은 법률로 정한다. 국회의원은 국가이익을 우선하여 양심에 따라 직무를 행한다. 행정각부의 설치·조직과 직무범위는 법률로 정한다. 재산권의 행사는 공공복리에 적합하도록 하여야 한다. 법원은 최고법원인 대법원과 각급법원으로 조직된다. 대법원장과 대법관이 아닌 법관은 대법관회의의 동의를 얻어 대법원장이 임명한다. 재판의 심리와 판결은 공개한다. 다만, 심리는 국가의 안전보장 또는 안녕질서를 방해하거나 선량한 풍속을 해할 염려가 있을 때에는 법원의 결정으로 공개하지 아니할 수 있다.
            </p>
          </div>
        </div>

        <div className="rounded-lg py-1 flex flex-col gap-1">
          <div className="flex gap-2 items-center mb-1">
            <span className="text-[#00e6ae] font-bold">A.</span>
            <span className="text-[#00e6ae] font-semibold text-xs lg:text-base">답변</span>
          </div>
          <p className="text-[#f6f6f6] text-xs lg:text-sm leading-relaxed ml-5 lg:ml-[25px] mt-4">
            국회는 정부의 동의없이 정부가 제출한 지출예산 각항의 금액을 증가하거나 새 비목을 설치할 수 없다. 모든 국민은 직업선택의 자유를 가진다. 모든 국민은 보건에 관하여 국가의 보호를 받는다. 국민경제자문회의의 조직·직무범위 기타 필요한 사항은 법률로 정한다. 국회의원은 국가이익을 우선하여 양심에 따라 직무를 행한다. 행정각부의 설치·조직과 직무범위는 법률로 정한다. 재산권의 행사는 공공복리에 적합하도록 하여야 한다. 법원은 최고법원인 대법원과 각급법원으로 조직된다. 대법원장과 대법관이 아닌 법관은 대법관회의의 동의를 얻어 대법원장이 임명한다. 재판의 심리와 판결은 공개한다. 다만, 심리는 국가의 안전보장 또는 안녕질서를 방해하거나 선량한 풍속을 해할 염려가 있을 때에는 법원의 결정으로 공개하지 아니할 수 있다.
          </p>
        </div>

        <div className="flex justify-center mt-8 border-t-2 border-[#444] pt-6 lg:pt-8">
          <button className="bg-[#303236] text-[#D4D4D4] rounded-md px-4 py-2 lg:px-6 font-medium hover:bg-[#35383b] transition w-full lg:w-auto">
            목록으로 이동
          </button>
        </div>
      </div>
    </div>
  );
}