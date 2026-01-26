"use client";

import React from "react";
import { useRouter, useParams } from "next/navigation";
import { useSnackbar } from "@/contexts";
import { useRFQById } from "../../../../_shared/hooks/api";
import {
  BackButton,
  ActionButton,
} from "@/components/layouts/detail-layout/components";

/**
 * RFQ Header Section
 * Tüm RFQ sayfalarında ortak kullanılacak header bölümü
 * - DetailLayout'un Header component'lerini kullanır
 * - Geri Dön butonu (detail sayfasına gider)
 * - RFQ detayına özel action buttons (İhtiyaç Listesi, Teklifler, Karşılaştırma, vb.)
 */
export const RFQHeaderSection: React.FC = () => {
  const router = useRouter();
  const { showSnackbar } = useSnackbar();
  const params = useParams();
  const rfqId = params.id as string;

  // RFQ verisini içerde çek
  const { rfq } = useRFQById(parseInt(rfqId));

  // Custom handlers
  const handleEdit = () => {
    if (rfq?.status !== "DRAFT") {
      showSnackbar(
        "Yalnızca taslak durumundaki alım ilanları düzenlenebilir.",
        "warning",
      );
      return;
    }
    router.push(`/supply/company/rfqs/add-edit/${rfqId}`);
  };

  // Default action buttons
  const actionButtons = [
    {
      id: "detail",
      label: "Detay",
      href: `/supply/company/rfqs/detail/${rfqId}`,
    },
    {
      id: "items",
      label: "İhtiyaç Listesi",
      href: `/supply/company/rfqs/items/${rfqId}`,
    },
    {
      id: "quotations",
      label: "Gelen Teklifler",
      href: `/supply/company/rfqs/quotations/${rfqId}`,
    },
    {
      id: "comparison",
      label: "Teklif Karşılaştırma",
      href: `/supply/company/rfqs/comparison/${rfqId}`,
    },
    {
      id: "suppliers",
      label: "Davet Edilen Tedarikçiler",
      href: `/supply/company/rfqs/invited-suppliers/${rfqId}`,
    },
    {
      id: "edit",
      label: "Düzenle",
      onClick: handleEdit,
    },
  ];

  return (
    <div className="detail-layout-header">
      <div className="rfq-detail-page__header">
        {/* Action Buttons */}
        {actionButtons.length > 0 && (
          <div className="rfq-detail-page__header-actions">
            {actionButtons.map((button) => (
              <ActionButton
                key={button.id}
                config={{
                  id: button.id,
                  label: button.label,
                  href: button.href,
                  onClick: button.onClick,
                  variant: button.id === "edit" ? "primary" : "secondary",
                }}
              />
            ))}
          </div>
        )}

        {/* Back Button */}
        <BackButton
          config={{
            label: "Geri Dön",
            href: `/supply/company/rfqs/detail/${rfqId}`,
          }}
        />
      </div>
    </div>
  );
};
