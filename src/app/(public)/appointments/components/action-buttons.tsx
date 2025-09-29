"use client";

import React from "react";
import { Icon } from "@/components/ui/icon";
import { Popover } from "@/components/ui/popover";
import { AppointmentDto } from "@/types/dto/appointment/AppointmentDto";

export interface ActionButtonsProps {
  appointment: AppointmentDto;
  onViewDetails?: (appointment: AppointmentDto) => void;
  onEdit?: (appointment: AppointmentDto) => void;
  onCancel?: (appointment: AppointmentDto) => void;
  onComplete?: (appointment: AppointmentDto) => void;
  onReschedule?: (appointment: AppointmentDto) => void;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  appointment,
  onViewDetails,
  onEdit,
  onCancel,
  onComplete,
  onReschedule,
}) => {
  const handleViewDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    onViewDetails?.(appointment);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit?.(appointment);
  };

  const handleCancel = (e: React.MouseEvent) => {
    e.stopPropagation();
    onCancel?.(appointment);
  };

  const handleComplete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onComplete?.(appointment);
  };

  const handleReschedule = (e: React.MouseEvent) => {
    e.stopPropagation();
    onReschedule?.(appointment);
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

            {appointment.canReschedule && (
              <div className="dropdown-menu-item" onClick={handleReschedule}>
                <Icon icon="ph-calendar-x" size="sm" className="text-warning" />
                <span className="text-sm">Randevuyu Ertele</span>
              </div>
            )}

            <div className="dropdown-menu-item" onClick={handleEdit}>
              <Icon icon="ph-pencil-simple" size="sm" className="text-info" />
              <span className="text-sm">Düzenle</span>
            </div>

            {appointment.canComplete && (
              <div className="dropdown-menu-item" onClick={handleComplete}>
                <Icon
                  icon="ph-check-circle"
                  size="sm"
                  className="text-success"
                />
                <span className="text-sm">Tamamla</span>
              </div>
            )}

            {appointment.canCancel && (
              <>
                <hr className="dropdown-divider" />
                <div className="dropdown-menu-item" onClick={handleCancel}>
                  <Icon icon="ph-x" size="sm" className="text-danger" />
                  <span className="text-sm">İptal Et</span>
                </div>
              </>
            )}
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
