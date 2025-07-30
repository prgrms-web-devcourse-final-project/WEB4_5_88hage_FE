import Script from "next/script";
import '../assets/styles/globals.css';
import ChatbotButtonWrapper from "@/components/chatbot/ChatbotButtonWrapper";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '../assets/styles/toast.css';
import SessionInit from "@/components/SessionInit";

export const metadata = {
  title: 'FUNFUN',
  description: 'FUNFUN으로 여가생활 즐기자!',
  icons: {
    icon: '/favicon.png',
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="bg-bg">
        <Script
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&libraries=services,clusterer&autoload=false`}
          strategy="beforeInteractive"
        />

        <SessionInit />
        {children}
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
          theme="dark"
        />

        <ChatbotButtonWrapper />
      </body>
    </html>
  );
}