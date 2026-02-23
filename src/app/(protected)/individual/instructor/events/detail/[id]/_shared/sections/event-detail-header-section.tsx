"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useEventDetailContext } from "../context/event-detail-context";
import { useEventsContext } from "../../../../_shared/contexts/events-context";
import { ActionButton } from "@/components/layouts/detail-layout/components";

/**
 * Event Detail Header Section
 * - Geri Dön butonu (liste sayfasına)
 * - Düzenle butonu (add-edit sayfasına)
 */
export const EventDetailHeaderSection: React.FC = () => {
  const router = useRouter();
  const { event, isLoading, eventId } = useEventDetailContext();
  const { setSelectedEvent } = useEventsContext();

  const handleEdit = () => {
    if (!event) return;
    setSelectedEvent(event);
    router.push(`/individual/instructor/events/add-edit/${eventId}`);
  };

  const actionButtons = [
    {
      id: "back",
      label: "Geri Dön",
      href: "/individual/instructor/events",
    },
    {
      id: "edit",
      label: "Düzenle",
      onClick: handleEdit,
      disabled: isLoading || !event,
      icon: "ph-pencil",
    },
  ];

  return (
    <div className="detail-layout-header">
      <div className="event-detail-page__header">
        {actionButtons.length > 0 && (
          <div className="event-detail-page__header-actions d-flex justify-content-between align-items-center w-100">
            {actionButtons.map((button) => (
              <ActionButton
                key={button.id}
                config={{
                  id: button.id,
                  label: button.label,
                  href: button.href,
                  onClick: button.onClick,
                  disabled: button.disabled,
                  icon: button.icon,
                  variant:
                    button.id === "back"
                      ? "outline"
                      : button.id === "edit"
                        ? "primary"
                        : "secondary",
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
