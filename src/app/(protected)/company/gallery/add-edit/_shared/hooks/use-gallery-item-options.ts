"use client";

import { useMemo } from "react";
import { MediaType } from "@/enums";
import { SelectOption } from "../types";

/**
 * Gallery item seçeneklerini sağlayan hook
 */
export const useGalleryItemOptions = () => {
  // Media type options
  const mediaTypeOptions = useMemo<SelectOption[]>(
    () => [
      { label: "Görsel", value: MediaType.IMAGE },
      { label: "Video", value: MediaType.VIDEO },
      { label: "Ses", value: MediaType.AUDIO },
      { label: "Döküman", value: MediaType.DOCUMENT },
      { label: "Arşiv", value: MediaType.ARCHIVE },
      { label: "Diğer", value: MediaType.OTHER },
    ],
    []
  );

  return {
    mediaTypeOptions,
  };
};
