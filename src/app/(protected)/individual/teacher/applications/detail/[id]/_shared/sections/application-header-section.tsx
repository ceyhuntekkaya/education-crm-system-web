"use client";

import React from "react";
import { useSnackbar } from "@/contexts";
import { useApplicationDetailContext } from "../context";
import { canWithdrawApplication } from "../../../../_shared/utils";
import { ActionButton } from "@/components/layouts/detail-layout/components";

/**
 * ================================================================================
 * APPLICATION HEADER SECTION
 * ================================================================================
 * Başvuru detay sayfası header section
 * - Geri dön butonu (liste sayfasına yönlendirir)
 * - Geri çek butonu (uygunsa)
 * - Application verisini context'ten alır
 */
export const ApplicationHeaderSection: React.FC = () => {
  const { showSnackbar } = useSnackbar();
  const { application, isLoading } = useApplicationDetailContext();

  // Geri çek handler
  const handleWithdraw = () => {
    if (!application) return;

    if (!canWithdrawApplication(application)) {
      showSnackbar(
        "Bu başvuru geri çekilemez. Başvuru durumunu kontrol edin.",
        "warning",
      );
      return;
    }

    if (
      !confirm(
        "Bu başvuruyu geri çekmek istediğinizden emin misiniz? Bu işlem geri alınamaz.",
      )
    ) {
      return;
    }

    // TODO: Implement withdraw API call
    showSnackbar("Başvuru geri çekme özelliği yakında eklenecek.", "info");
  };

  // Action buttons
  const actionButtons = [
    {
      id: "back",
      label: "Geri Dön",
      href: "/individual/teacher/applications",
    },
    {
      id: "withdraw",
      label: "Başvuruyu Geri Çek",
      onClick: handleWithdraw,
      disabled: isLoading || !application || !canWithdrawApplication(application),
    },
  ];

  return (
    <div className="detail-layout-header">
      <div className="application-detail-page__header">
        <div className="application-detail-page__header-actions d-flex justify-content-between align-items-center w-100">
          {actionButtons.map((button) => (
            <ActionButton
              key={button.id}
              config={{
                id: button.id,
                label: button.label,
                href: button.href,
                onClick: button.onClick,
                disabled: button.disabled,
                variant:
                  button.id === "back"
                    ? "outline"
                    : button.id === "withdraw"
                      ? "primary"
                      : "secondary",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
