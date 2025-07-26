"use client";
import { useState } from "react";
import ChatbotButton from "./ChatbotButton";
import ChatbotModal from "./ChatbotModal";

export default function ChatbotButtonWrapper() {
  const [showChatbot, setShowChatbot] = useState(false);

  return (
    <>
      <ChatbotButton onClick={() => setShowChatbot(true)} />
      {showChatbot && <ChatbotModal onClose={() => setShowChatbot(false)} />}
    </>
  );
}