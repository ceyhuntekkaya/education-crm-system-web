"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { usePageTitle } from "@/hooks";
import { DetailLayout } from "@/components/layouts";
import { Modal, Button } from "@/components/ui";
import { useApplicationDetailContext } from "./_shared/context";
import {
  createApplicationDetailColumns,
  ApplicationNotesSection,
  ApplicationDocumentsSection,
} from "./_shared";

/**
 * ================================================================================
 * APPLICATION DETAIL PAGE
 * ================================================================================
 * Başvuru detay sayfası
 * - Başvuru bilgileri
 * - Pozisyon bilgileri
 * - Okul bilgileri
 * - Durum yönetimi
 * - Belgeler
 * - Notlar
 */

const ApplicationDetailPage: React.FC = () => {
  const router = useRouter();
  const {
    application,
    isLoading,
    applicationId,
    withdrawApplication,
    isWithdrawing,
  } = useApplicationDetailContext();
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);

  usePageTitle(
    application?.jobPosting?.positionTitle
      ? `${application.jobPosting.positionTitle} - Başvuru Detayı`
      : "Başvuru Detayı",
  );

  const hasValidId = applicationId > 0;

  const handleWithdraw = async () => {
    await withdrawApplication();
    setShowWithdrawModal(false);
  };

  // Başvuruyu geri çekme butonu - sadece uygun durumlarda göster
  const canWithdraw =
    application &&
    !application.isWithdrawn &&
    application.status !== "ACCEPTED" &&
    application.status !== "REJECTED";

  return (
    <>
      {/* Detail Info with Header */}
      <DetailLayout
        containerClass="application-detail-page"
        spacing="lg"
        header={{
          backButton: {
            label: "Geri Dön",
            href: "/individual/teacher/applications",
          },
          actionButtons: canWithdraw
            ? [
                {
                  id: "withdraw",
                  label: "Başvuruyu Geri Çek",
                  icon: "ph ph-arrow-counter-clockwise",
                  variant: "danger",
                  disabled: isWithdrawing,
                  onClick: () => setShowWithdrawModal(true),
                },
              ]
            : [],
        }}
        loading={{
          isLoading: isLoading && hasValidId,
        }}
        error={{
          error: null,
        }}
        empty={{
          isEmpty: !application && !isLoading && hasValidId,
          emptyTitle: "Başvuru Bulunamadı",
          emptyDescription: "Aradığınız başvuru bulunamadı.",
        }}
        columns={
          application
            ? {
                data: application,
                columns: createApplicationDetailColumns(),
              }
            : undefined
        }
      />

      {/* Documents Section */}
      {application && <ApplicationDocumentsSection />}

      {/* Notes Section */}
      {application && <ApplicationNotesSection />}

      {/* Geri Çekme Onay Modal'ı */}
      <Modal
        isOpen={showWithdrawModal}
        onClose={() => !isWithdrawing && setShowWithdrawModal(false)}
        title="Başvuruyu Geri Çek"
        size="md"
      >
        <div className="modal-body">
          <div className="text-center mb-16">
            <div className="mb-12">
              <i
                className="ph ph-warning-circle text-warning"
                style={{ fontSize: "4rem" }}
              ></i>
            </div>
            <h5 className="mb-8 text-dark">
              Başvuruyu geri çekmek istediğinize emin misiniz?
            </h5>
            <p className="text-muted mb-0">
              Bu işlem geri alınamaz. Başvurunuz iptal edilecek ve tekrar
              başvuru yapmanız gerekecektir.
            </p>
          </div>
        </div>
        <div className="modal-footer d-flex gap-8">
          <Button
            variant="outline"
            onClick={() => setShowWithdrawModal(false)}
            disabled={isWithdrawing}
            className="flex-fill"
          >
            İptal
          </Button>
          <Button
            variant="error"
            onClick={handleWithdraw}
            loading={isWithdrawing}
            className="flex-fill"
          >
            Evet, Geri Çek
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default ApplicationDetailPage;
