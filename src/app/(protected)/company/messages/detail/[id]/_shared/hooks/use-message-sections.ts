import { useMemo } from "react";
import { createSections } from "../utils";
import { MESSAGE_SECTIONS } from "../config";
import { MessageDto } from "@/types/dto/content/MessageDto";

/**
 * Message sections hook'u
 * Tüm section işleme mantığını kapsüller
 */
export const useMessageSections = (message: MessageDto | null) => {
  return useMemo(() => {
    // Message null ise boş array döndür
    if (!message) return [];

    // Ana section'ları oluştur
    const messageSections = createSections(MESSAGE_SECTIONS, message);

    return messageSections;
  }, [message]);
};
