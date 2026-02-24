"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useOrganizerDetailContext } from "../context/organizer-detail-context";
import { useOrganizersContext } from "../../../../_shared/contexts/organizers-context";
import { ActionButton } from "@/components/layouts/detail-layout/components";

/**
 * Organizer Detail Header Section
 * - Geri Dön butonu (liste sayfasına)
 * - Düzenle butonu (add-edit sayfasına)
 */
export const OrganizerDetailHeaderSection: React.FC = () => {
  const router = useRouter();
  const { organizer, isLoading, organizerId } = useOrganizerDetailContext();
  const { setSelectedOrganizer } = useOrganizersContext();

  const handleEdit = () => {
    if (!organizer) return;
    setSelectedOrganizer(organizer);
    router.push(`/individual/instructor/organizers/add-edit/${organizerId}`);
  };

  const actionButtons = [
    {
      id: "back",
      label: "Geri Dön",
      href: "/individual/instructor/organizers",
    },
    {
      id: "edit",
      label: "Düzenle",
      onClick: handleEdit,
      disabled: isLoading || !organizer,
      icon: "ph-pencil",
    },
  ];

  return (
    <div className="detail-layout-header">
      <div className="organizer-detail-page__header">
        {actionButtons.length > 0 && (
          <div className="organizer-detail-page__header-actions d-flex justify-content-between align-items-center w-100">
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
