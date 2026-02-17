"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components";
import { useApplicationDetailContext } from "../context";
import { canWithdrawApplication } from "../../../../_shared/utils";

/**
 * ================================================================================
 * APPLICATION HEADER SECTION
 * ================================================================================
 * Başvuru detay sayfası header section
 * - Geri dön butonu
 * - Geri çek butonu (uygunsa)
 */

export const ApplicationHeaderSection: React.FC = () => {
  const router = useRouter();
  const { application } = useApplicationDetailContext();

  const handleWithdraw = () => {
    if (!application) return;

    if (
      !confirm(
        "Bu başvuruyu geri çekmek istediğinizden emin misiniz? Bu işlem geri alınamaz.",
      )
    ) {
      return;
    }

    // TODO: Implement withdraw API call
  };

  const showWithdrawButton = application && canWithdrawApplication(application);

  return (
    <div className="d-flex align-items-center justify-content-between mb-24 flex-wrap gap-12">
      {/* Geri Dön */}
      <Button
        variant="outline"
        size="md"
        onClick={() => router.push("/individual/teacher/applications")}
        leftIcon="ph-arrow-left"
      >
        Geri Dön
      </Button>

      {/* Geri Çek */}
      {showWithdrawButton && (
        <Button
          size="md"
          onClick={handleWithdraw}
          leftIcon="ph-arrow-u-up-left"
        >
          Başvuruyu Geri Çek
        </Button>
      )}
    </div>
  );
};
