"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { usePageTitle, useModal } from "@/hooks";
import { DetailLayout } from "@/components/layouts";
import { useSnackbar } from "@/contexts";
import { useOrganizerDetailContext } from "./_shared/context/organizer-detail-context";
import { useOrganizersContext } from "../../_shared/contexts/organizers-context";
import { createOrganizerDetailColumns } from "./_shared/config/organizer-detail-columns";
import { DeleteOrganizerModal } from "./_shared/sections";

/**
 * Organizatör detay sayfası - DetailLayout kullanarak
 * Organizatör bilgilerini görüntüler
 */
const OrganizerDetailPage: React.FC = () => {
  const router = useRouter();
  const { showSnackbar } = useSnackbar();
  const { isOpen, open: openDeleteModal, close: closeDeleteModal } = useModal();

  const { organizer, isLoading, organizerId, deleteOrganizer, isDeleting } =
    useOrganizerDetailContext();
  const { setSelectedOrganizer, refetch: refetchOrganizers } =
    useOrganizersContext();

  usePageTitle(organizer?.name || "Organizatör Detayı");

  const hasValidId = organizerId > 0;

  const handleEdit = () => {
    if (!organizer) return;
    setSelectedOrganizer(organizer);
    router.push(`/individual/instructor/organizers/add-edit/${organizerId}`);
  };

  const handleDelete = async () => {
    if (!organizerId) return;
    const success = await deleteOrganizer();
    if (success) {
      showSnackbar("Düzenleyen başarıyla silindi", "success");
      closeDeleteModal();
      refetchOrganizers();
      router.push("/individual/instructor/organizers");
    } else {
      showSnackbar("Düzenleyen silinirken bir hata oluştu", "error");
    }
  };

  return (
    <>
      <DetailLayout
        containerClass="organizer-detail-page"
        spacing="lg"
        header={{
          backButton: {
            label: "Geri Dön",
            href: "/individual/instructor/organizers",
          },
          actionButtons: [
            {
              id: "edit",
              label: "Düzenle",
              icon: "ph ph-pencil-simple",
              variant: "primary",
              disabled: !organizer || isLoading,
              onClick: handleEdit,
            },
            {
              id: "delete",
              label: "Düzenleyeni Sil",
              icon: "ph ph-trash",
              variant: "danger",
              disabled: !organizer || isLoading || isDeleting,
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
          isEmpty: !organizer && !isLoading && hasValidId,
          emptyTitle: "Organizatör Bulunamadı",
          emptyDescription: "Aradığınız organizatör bulunamadı.",
        }}
        columns={
          organizer
            ? {
                data: organizer,
                columns: createOrganizerDetailColumns(),
              }
            : undefined
        }
      />

      <DeleteOrganizerModal
        isOpen={isOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDelete}
      />
    </>
  );
};

export default OrganizerDetailPage;
