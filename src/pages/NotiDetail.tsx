export default function NotiDetail () {
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
            <p className="text-base lg:text-lg text-white font-semibold">[공지] 문토 VOD 가이드</p>
            <p className="text-xs lg:text-sm text-white mt-[20px] mb-[20px]">2025년 7월 24일</p>
            <div className="border-y-1 border-[#4d4d4d]">
</div>
<p className="text-xs lg:text-sm text-[#ababab] mt-[50px]">안녕하세요. 문지기입니다!<br></br>
문토를 이용하고 계시는 멤버님들에게 안내드릴 내용이 있어 공지사항으로 인사드려요.<br></br><br></br>

6월 3일(월)은 대통령 선거일로, 문토 고객센터(CS) 운영이 하루 동안 중단될 예정인데요.<br></br>
관련하여 불편함이 없도록 하단 내용을 꼭 확인해주세요!<br></br>
멤버님들의 양해에 깊이 감사드리며, 더 나은 서비스로 보답하겠습니다.<br></br><br></br>

{"<고객센터 미운영 공지 안내>"}<br></br>
고객센터 미운영 일시: 6/3(월) 하루<br></br>
해당 기간 접수된 문의는 6/4(화)부터 순차적으로 답변드릴 예정이에요.<br></br>
서비스 이용은 정상적으로 가능하며, CS 응대만 일시적으로 중단됩니다.<br></br><br></br>

문의 처리는 선거일 이후 최대한 빠르게 도와드릴게요.<br></br>
감사합니다!</p>
        </div>
        </main>
    </div></>
  );
}