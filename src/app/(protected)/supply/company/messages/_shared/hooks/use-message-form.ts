"use client";

import { useState } from "react";
import { MessageFormData } from "../types";

/**
 * Hook for managing message input form
 */
export const useMessageForm = () => {
  const [content, setContent] = useState("");

  const reset = () => {
    setContent("");
  };

  const isValid = () => {
    const trimmed = content.trim();
    return trimmed.length >= 1 && trimmed.length <= 1000;
  };

  return {
    content,
    setContent,
    reset,
    isValid,
  };
};
