import FaqAccordion from "./FaqAccordion";

export default function FaqContent() {
  return (
    <section className="bg-[#121212] text-white px-6 lg:px-24 pt-12 lg:pt-20 pb-32">
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
            자주 묻는 질문, 필요한 정보를 바로 찾아보세요.
          </p>
        </div>
        <div className="lg:w-2/3 space-y-2">
          <FaqAccordion />
          <div className="flex justify-center space-x-4 mt-8">
            문구 고민중
          </div>
        </div>
      </div>
    </section>
  );
}