"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { usePageTitle, useModal } from "@/hooks";
import { DetailLayout } from "@/components/layouts";
import { useSnackbar } from "@/contexts";
import { useEventDetailContext } from "./_shared/context/event-detail-context";
import { useEventsContext } from "../../_shared/contexts/events-context";
import { createEventDetailColumns } from "./_shared/config/event-detail-columns";
import { DeleteEventModal } from "./_shared/sections";

/**
 * Etkinlik detay sayfası - DetailLayout kullanarak
 * Etkinlik bilgilerini görüntüler
 * 2.7 Etkinlik Sil özelliği dahildir.
 */
const EventDetailPage: React.FC = () => {
  const router = useRouter();
  const { showSnackbar } = useSnackbar();
  const { isOpen, open: openDeleteModal, close: closeDeleteModal } = useModal();

  const { event, isLoading, eventId, deleteEvent, isDeleting } =
    useEventDetailContext();
  const { setSelectedEvent, refetch: refetchEvents } = useEventsContext();

  usePageTitle(event?.title || "Etkinlik Detayı");

  const hasValidId = eventId > 0;

  const handleEdit = () => {
    if (!event) return;
    setSelectedEvent(event);
    router.push(`/individual/instructor/events/add-edit/${eventId}`);
  };

  const handleDelete = async () => {
    if (!eventId) return;
    const success = await deleteEvent();
    if (success) {
      showSnackbar("Etkinlik başarıyla silindi", "success");
      closeDeleteModal();
      refetchEvents();
      router.push("/individual/instructor/events");
    } else {
      showSnackbar("Etkinlik silinirken bir hata oluştu", "error");
    }
  };

  return (
    <>
      <DetailLayout
        containerClass="event-detail-page"
        spacing="lg"
        header={{
          backButton: {
            label: "Geri Dön",
            href: "/individual/instructor/events",
          },
          actionButtons: [
            {
              id: "registrations",
              label: "Kayıtlar",
              icon: "ph ph-users",
              variant: "secondary",
              disabled: !event || isLoading,
              href: event
                ? `/individual/instructor/events/detail/${eventId}/registrations`
                : undefined,
            },
            {
              id: "edit",
              label: "Düzenle",
              icon: "ph ph-pencil-simple",
              variant: "primary",
              disabled: !event || isLoading,
              onClick: handleEdit,
            },
            {
              id: "delete",
              label: "Etkinliği Sil",
              icon: "ph ph-trash",
              variant: "danger",
              disabled: !event || isLoading || isDeleting,
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
          isEmpty: !event && !isLoading && hasValidId,
          emptyTitle: "Etkinlik Bulunamadı",
          emptyDescription: "Aradığınız etkinlik bulunamadı.",
        }}
        columns={
          event
            ? {
                data: event,
                columns: createEventDetailColumns(),
              }
            : undefined
        }
      />

      <DeleteEventModal
        isOpen={isOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDelete}
      />
    </>
  );
};

export default EventDetailPage;
