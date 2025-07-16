import GrayButton from '@/components/button/GrayButton';

export default function AdminAnswer() {
  return (
    <>
      <div className="flex min-h-[1220px] max-w-[1440px] flex-col">
        <div className="flex min-h-screen w-full flex-col lg:pt-[14px]">
          <div></div>
          <div className="flex flex-col items-start justify-center pb-4 lg:pb-10">
            <h1 className="mb-3 w-full text-left text-[20px] font-semibold lg:mb-2 lg:text-center lg:text-[32px]">
              <span className="bg-gradient-to-r from-[#1cebb9] to-[#7f74ff] bg-clip-text text-transparent">
                문의 내역
              </span>
            </h1>
          </div>

          {/* 문의 요약 */}
          <div className="mb-4 flex flex-col gap-1 border-t-2 border-b border-[#444] py-3 lg:mb-3 lg:flex-row lg:items-center lg:gap-6 lg:py-6">
            <span className="text-[12px] font-semibold text-white lg:min-w-[140px] lg:text-[16px]">
              특정 사용자 신고
            </span>
            <span className="flex-1 text-left text-[12px] text-[#d2d2d2] lg:text-[16px] lg:text-[#ffffff]">
              안녕하세요. 특정 악질 사용자 신고 문의 넣었는데 대처가 잘
              됐을까요?
            </span>
            <span className="mt-1 min-w-fit self-start text-[11px] text-[#A5A5A5] lg:mt-0 lg:self-auto lg:text-[16px]">
              2025년 06월 28일
            </span>
          </div>

          {/* Q */}
          <div className="mt-3 mb-4">
            <div className="flex flex-col gap-1">
              <div className="mb-2 flex items-center gap-1">
                <span className="text-[15px] text-[#00e6ae] lg:text-[18px]">
                  Q. 안녕하세요. 특정 악의적 사용자 신고 문의 넣었는데 대처가 잘
                  됐을까요?
                </span>
              </div>
              <p className="ml-0 text-[13px] leading-relaxed text-[#f6f6f6] lg:ml-[25px] lg:text-[16px]">
                국회는 정부의 동의없이 정부가 제출한 지출예산 각항의 금액을
                증가하거나 새 비목을 설치할 수 없다. 모든 국민은 직업선택의
                자유를 가진다. 모든 국민은 보건에 관하여 국가의 보호를 받는다.
                국민경제자문회의의 조직·직무범위 기타 필요한 사항은 법률로
                정한다. 국회의원은 국가이익을 우선하여 양심에 따라 직무를
                행한다. 행정각부의 설치·조직과 직무범위는 법률로 정한다.
                재산권의 행사는 공공복리에 적합하도록 하여야 한다. 법원은
                최고법원인 대법원과 각급법원으로 조직된다. 대법원장과 대법관이
                아닌 법관은 대법관회의의 동의를 얻어 대법원장이 임명한다. 재판의
                심리와 판결은 공개한다. 다만, 심리는 국가의 안전보장 또는
                안녕질서를 방해하거나 선량한 풍속을 해할 염려가 있을 때에는
                법원의 결정으로 공개하지 아니할 수 있다.
              </p>
            </div>
            <h2 className="text-main h2 mt-[30px]">답변하기</h2>
            <input className="bg-gray-6 t2 mt-10 h-[240px] w-full max-w-[1440px] rounded text-white" />
            <GrayButton className="text-main mt-15 text-[30px] font-semibold">
              답변 하기
            </GrayButton>
          </div>
        </div>
      </div>
    </>
  );
}
