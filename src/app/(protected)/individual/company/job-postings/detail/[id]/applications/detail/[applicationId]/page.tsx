"use client";

import React, { useMemo, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { usePageTitle } from "@/hooks";
import { DetailLayout } from "@/components/layouts";
import { Modal, Button } from "@/components/ui";
import { useApplicationDetailContext } from "./_shared/context";
import {
  createApplicationDetailColumns,
  ApplicationNotesSection,
  ApplicationDocumentsSection,
  TeacherProfileSection,
} from "./_shared";
import { getApplicationStatusDisplay } from "../../_shared/utils";

/**
 * ================================================================================
 * APPLICATION DETAIL PAGE (Company)
 * ================================================================================
 * Başvuru detay sayfası - Company görünümü
 * - Başvuru bilgileri
 * - Aday bilgileri
 * - Durum yönetimi (company tarafından)
 * - Belgeler
 * - Notlar
 */

// Başvuru durumları
const APPLICATION_STATUSES = [
  { value: "RECEIVED", label: "Alındı" },
  { value: "UNDER_REVIEW", label: "İnceleniyor" },
  { value: "INTERVIEW_SCHEDULED", label: "Mülakat Planlandı" },
  { value: "OFFER_MADE", label: "Teklif Yapıldı" },
  { value: "ACCEPTED", label: "Kabul Edildi" },
  { value: "REJECTED", label: "Reddedildi" },
];

const ApplicationDetailPage: React.FC = () => {
  const router = useRouter();
  const params = useParams();

  // params'tan ID'leri al
  const jobPostingId = params?.id as string; // Üst seviye [id]

  const {
    application,
    isLoading,
    applicationId,
    updateStatus,
    isUpdatingStatus,
    documents,
    notes,
  } = useApplicationDetailContext();

  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");

  usePageTitle(
    application?.teacher?.fullName
      ? `${application.teacher.fullName} - Başvuru Detayı`
      : "Başvuru Detayı",
  );

  const hasValidId = applicationId > 0;

  const handleStatusChange = async () => {
    if (selectedStatus) {
      await updateStatus(selectedStatus);
      setShowStatusModal(false);
      setSelectedStatus("");
    }
  };

  // Durum değiştirme butonu - geri çekilmiş veya kabul/red edilmiş başvurularda gösterme
  const canChangeStatus =
    application &&
    !application.isWithdrawn &&
    application.status !== "ACCEPTED" &&
    application.status !== "REJECTED";

  // Action buttons
  const actionButtons = useMemo(() => {
    const buttons = [];

    if (canChangeStatus) {
      buttons.push({
        id: "change-status",
        label: "Durumu Değiştir",
        icon: "ph ph-arrows-clockwise",
        variant: "primary" as const,
        disabled: isUpdatingStatus,
        onClick: () => {
          setSelectedStatus(application?.status || "");
          setShowStatusModal(true);
        },
      });
    }

    return buttons;
  }, [canChangeStatus, isUpdatingStatus, application?.status]);

  return (
    <>
      {/* Teacher Profile Section */}
      {application && <TeacherProfileSection />}

      {/* Detail Info with Header */}
      <DetailLayout
        containerClass="application-detail-page"
        spacing="lg"
        header={{
          backButton: {
            label: "Başvurulara Dön",
            href: `/individual/company/job-postings/detail/${jobPostingId}/applications`,
          },
          actionButtons,
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
                columns: createApplicationDetailColumns(
                  documents?.length,
                  notes?.length,
                ),
              }
            : undefined
        }
      />

      {/* Documents Section */}
      {application && <ApplicationDocumentsSection />}

      {/* Notes Section */}
      {application && <ApplicationNotesSection />}

      {/* Durum Değiştirme Modal */}
      <Modal
        isOpen={showStatusModal}
        onClose={() => !isUpdatingStatus && setShowStatusModal(false)}
        title="Başvuru Durumunu Değiştir"
        size="md"
      >
        <div className="modal-body">
          <div className="mb-16">
            <p className="text-muted mb-12">
              Başvurunun mevcut durumu:{" "}
              <strong>
                {application && getApplicationStatusDisplay(application.status)}
              </strong>
            </p>

            <div className="mb-12">
              <label className="form-label">Yeni Durum</label>
              <select
                className="form-select"
                value={selectedStatus}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setSelectedStatus(e.target.value)
                }
                disabled={isUpdatingStatus}
              >
                <option value="">Durum seçiniz</option>
                {APPLICATION_STATUSES.map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="alert alert-info d-flex align-items-start gap-8">
            <i className="ph-info fs-5 mt-1"></i>
            <div className="text-sm">
              Başvuru durumu değiştirildiğinde, başvuran adaya bildirim
              gönderilecektir.
            </div>
          </div>
        </div>
        <div className="modal-footer d-flex gap-8">
          <Button
            variant="outline"
            onClick={() => setShowStatusModal(false)}
            disabled={isUpdatingStatus}
            className="flex-fill"
          >
            İptal
          </Button>
          <Button
            onClick={handleStatusChange}
            loading={isUpdatingStatus}
            disabled={!selectedStatus || isUpdatingStatus}
            className="flex-fill"
          >
            Durumu Güncelle
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default ApplicationDetailPage;
