"use client";
import { useEffect } from "react";
import { useAuthStore } from "@/stores/UseAuthStore";

export default function SessionInit() {
  useEffect(() => {
    useAuthStore.getState().checkSession();
  }, []);
  return null;
}