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
    <div className="d-flex gap-3 align-items-center justify-content-center">
      <Popover
        content="Randevu detaylarını görüntüle"
        trigger="hover"
        placement="top"
        size="sm"
        delay={300}
      >
        <Icon
          icon="ph-eye"
          variant="inline"
          size="sm"
          onClick={handleViewDetails}
          className="cursor-pointer"
        />
      </Popover>

      {appointment.canReschedule && (
        <Popover
          content="Randevuyu ertele"
          trigger="hover"
          placement="top"
          size="sm"
          delay={300}
        >
          <Icon
            icon="ph-calendar-x"
            variant="inline"
            size="sm"
            onClick={handleReschedule}
            className="cursor-pointer text-warning"
          />
        </Popover>
      )}

      <Popover
        content="Randevuyu düzenle"
        trigger="hover"
        placement="top"
        size="sm"
        delay={300}
      >
        <Icon
          icon="ph-pencil-simple"
          variant="inline"
          size="sm"
          onClick={handleEdit}
          className="cursor-pointer"
        />
      </Popover>

      {appointment.canComplete && (
        <Popover
          content="Randevuyu tamamla"
          trigger="hover"
          placement="top"
          size="sm"
          delay={300}
        >
          <Icon
            icon="ph-check-circle"
            variant="inline"
            size="sm"
            onClick={handleComplete}
            className="cursor-pointer text-success"
          />
        </Popover>
      )}

      {appointment.canCancel && (
        <Popover
          content="Randevuyu iptal et"
          trigger="hover"
          placement="top"
          size="sm"
          delay={300}
        >
          <Icon
            icon="ph-x"
            variant="outline"
            size="sm"
            onClick={handleCancel}
            className="cursor-pointer text-danger"
          />
        </Popover>
      )}
    </div>
  );
};

export default ActionButtons;
