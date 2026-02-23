"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { usePageTitle, useModal } from "@/hooks";
import { DetailLayout } from "@/components/layouts";
import { useRegistrationDetailContext } from "./_shared/context/registration-detail-context";
import { createRegistrationDetailColumns } from "./_shared/config/registration-detail-columns";
import {
  UpdateStatusModal,
  AttendanceModal,
  DeleteRegistrationModal,
} from "../_shared/sections/registration-modals";

/**
 * Kayıt detay sayfası - DetailLayout kullanarak
 * Etkinlik kaydı bilgilerini görüntüler.
 * Durum güncelleme, katılım işaretleme ve silme işlemleri dahildir.
 */
const RegistrationDetailPage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const eventId = Number(params?.id) || 0;

  const {
    isOpen: statusOpen,
    open: openStatusModal,
    close: closeStatusModal,
  } = useModal();
  const {
    isOpen: attendanceOpen,
    open: openAttendanceModal,
    close: closeAttendanceModal,
  } = useModal();
  const {
    isOpen: deleteOpen,
    open: openDeleteModal,
    close: closeDeleteModal,
  } = useModal();

  const { registration, isLoading, registrationId, refetch } =
    useRegistrationDetailContext();

  usePageTitle(
    registration?.teacherName
      ? `${registration.teacherName} — Kayıt Detayı`
      : "Kayıt Detayı",
  );

  const hasValidId = registrationId > 0;

  const backHref =
    eventId > 0
      ? `/individual/instructor/events/detail/${eventId}/registrations`
      : "/individual/instructor/events";

  return (
    <>
      <DetailLayout
        containerClass="registration-detail-page"
        spacing="lg"
        header={{
          backButton: {
            label: "Kayıtlara Dön",
            href: backHref,
          },
          actionButtons: [
            {
              id: "update-status",
              label: "Durumu Güncelle",
              icon: "ph ph-arrows-counter-clockwise",
              variant: "secondary",
              disabled: !registration || isLoading,
              onClick: openStatusModal,
            },
            {
              id: "attendance",
              label: "Katılım İşaretle",
              icon: "ph ph-check-square",
              variant: "primary",
              disabled: !registration || isLoading,
              onClick: openAttendanceModal,
            },
            {
              id: "delete",
              label: "Kaydı Sil",
              icon: "ph ph-trash",
              variant: "danger",
              disabled: !registration || isLoading,
              onClick: openDeleteModal,
            },
          ],
        }}
        loading={{
          isLoading: isLoading && hasValidId,
        }}
        error={{
          error: null,
        }}
        empty={{
          isEmpty: !registration && !isLoading && hasValidId,
          emptyTitle: "Kayıt Bulunamadı",
          emptyDescription: "Aradığınız kayıt bulunamadı.",
        }}
        columns={
          registration
            ? {
                data: registration,
                columns: createRegistrationDetailColumns(),
              }
            : undefined
        }
      />

      <UpdateStatusModal
        isOpen={statusOpen}
        onClose={closeStatusModal}
        registration={registration}
        onSuccess={refetch}
      />

      <AttendanceModal
        isOpen={attendanceOpen}
        onClose={closeAttendanceModal}
        registration={registration}
        onSuccess={refetch}
      />

      <DeleteRegistrationModal
        isOpen={deleteOpen}
        onClose={closeDeleteModal}
        registration={registration}
        onSuccess={() => router.push(backHref)}
      />
    </>
  );
};

export default RegistrationDetailPage;
