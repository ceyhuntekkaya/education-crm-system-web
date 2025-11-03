"use client";

import React from "react";
import { Icon } from "@/components/ui/icon";
import { Popover } from "@/components/ui/popover";
import { AppointmentDto } from "@/types/dto/appointment/AppointmentDto";

export interface ActionButtonsProps {
  appointment: AppointmentDto;
  onViewDetails?: (appointment: AppointmentDto) => void;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  appointment,
  onViewDetails,
}) => {
  const handleViewDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    onViewDetails?.(appointment);
  };

  return (
    <div className="w-50 d-flex align-items-center justify-content-center">
      <Popover
        content={
          <div className="dropdown-menu-container">
            <div className="dropdown-menu-item" onClick={handleViewDetails}>
              <Icon icon="ph-eye" size="sm" className="text-primary" />
              <span className="text-sm">Detayları Görüntüle</span>
            </div>
          </div>
        }
        trigger="click"
        placement="bottom-end"
      >
        <div className="action-button-wrapper">
          <Icon icon="ph-dots-three-vertical" size="sm" />
        </div>
      </Popover>
    </div>
  );
};

export default ActionButtons;
