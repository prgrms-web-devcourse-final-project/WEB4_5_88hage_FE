import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FaqSection from "@/components/faq/Section";

export default function FaqPage() {
  return (
    <>
      <Header
        headerBgClass="bg-[#1d1d1d]"
        pageTitle={{ subtitle: "고객지원", title: "무엇을 도와드릴까요?" }}
      >
      </Header>

      <FaqSection />

      <Footer />
    </>
  );
}