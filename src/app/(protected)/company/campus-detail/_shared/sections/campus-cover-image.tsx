import React from "react";
import { useCampusDetail } from "../context";
import { CoverImage } from "@/components/ui";

/**
 * Kampüs kapak resmi bileşeni
 */
export const CampusCoverImage: React.FC = () => {
  const { currentCampus: campus } = useCampusDetail();

  // Subtitle için brand bilgisi ve description'ı birleştir
  const getSubtitle = () => {
    const parts: string[] = [];

    if (campus?.brand?.name) {
      parts.push(campus.brand.name);
    }

    if (campus?.description) {
      parts.push(campus.description);
    }

    return parts.join(" • ");
  };

  return (
    <CoverImage
      coverImageUrl={campus?.coverImageUrl}
      title={campus?.name || "Kampüs Adı"}
      subtitle={getSubtitle()}
      height="250px"
      useCard={true}
      borderRadius="rounded-12"
      emptyStateMessage="Kampüs kapak görseli mevcut değil"
      emptyStateIcon="ph ph-buildings"
      contentPosition="bottom-left"
      showGradient={true}
    />
  );
};
