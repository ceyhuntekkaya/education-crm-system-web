"use client";

import React from "react";
import { useApplicationDetailContext } from "../context";
import { Badge, CustomCard } from "@/components";

/**
 * ================================================================================
 * APPLICATION STATUS SECTION
 * ================================================================================
 * Başvuru durumu gösterimi (salt okunur)
 * - Durum badge'i
 * - Geri çekildi badge'i (eğer geri çekildiyse)
 */

export const ApplicationStatusSection: React.FC = () => {
  const { application } = useApplicationDetailContext();

  if (!application) return null;

  const getStatusLabel = (status: string) => {
    const statusMap: Record<string, string> = {
      RECEIVED: "Alındı",
      UNDER_REVIEW: "İnceleniyor",
      INTERVIEW_SCHEDULED: "Mülakat Planlandı",
      OFFER_MADE: "Teklif Yapıldı",
      ACCEPTED: "Kabul Edildi",
      REJECTED: "Reddedildi",
    };
    return statusMap[status] || status;
  };

  const getStatusVariant = (status: string) => {
    const variantMap: Record<
      string,
      "primary" | "warning" | "success" | "danger" | "info"
    > = {
      RECEIVED: "info",
      UNDER_REVIEW: "warning",
      INTERVIEW_SCHEDULED: "primary",
      OFFER_MADE: "success",
      ACCEPTED: "success",
      REJECTED: "danger",
    };
    return variantMap[status] || "info";
  };

  const getStatusIcon = (status: string) => {
    const iconMap: Record<string, string> = {
      RECEIVED: "ph-check",
      UNDER_REVIEW: "ph-hourglass",
      INTERVIEW_SCHEDULED: "ph-calendar",
      OFFER_MADE: "ph-handshake",
      ACCEPTED: "ph-check-circle",
      REJECTED: "ph-x-circle",
    };
    return iconMap[status] || "ph-info";
  };

  return (
    <CustomCard
      title="Başvuru Durumu"
      subtitle="Başvurunuzun güncel durumu"
      className="mb-24"
    >
      <div className="d-flex align-items-center gap-12 flex-wrap">
        <Badge
          variant={getStatusVariant(application.status)}
          className="fw-semibold px-12 py-6 fs-6"
        >
          <i className={`${getStatusIcon(application.status)} me-2`}></i>
          {getStatusLabel(application.status)}
        </Badge>

        {application.isWithdrawn && (
          <Badge variant="secondary" className="fw-semibold px-12 py-6">
            <i className="ph-arrow-counter-clockwise me-2"></i>
            Geri Çekildi
          </Badge>
        )}
      </div>
    </CustomCard>
  );
};
