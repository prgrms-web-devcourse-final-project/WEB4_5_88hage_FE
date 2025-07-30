"use client";
import { useState } from "react";
import ChatbotButton from "./ChatbotButton";
import ChatbotModal from "./ChatbotModal";
import { useAuthStore } from "@/stores/UseAuthStore";

export default function ChatbotButtonWrapper() {
  const [showChatbot, setShowChatbot] = useState(false);

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <>
      <ChatbotButton
        onClick={() => setShowChatbot(true)}
        isLoggedIn={isAuthenticated}
      />
      {showChatbot && <ChatbotModal onClose={() => setShowChatbot(false)} />}
    </>
  );
}