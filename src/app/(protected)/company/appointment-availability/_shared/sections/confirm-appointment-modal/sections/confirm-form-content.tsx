"use client";

import React from "react";
import { Button } from "@/components";
import { Form } from "@/components/forms";
import { useAppointment } from "../../../context/appointment-context";
import { useAuth } from "@/contexts";

export const ConfirmFormContent: React.FC = () => {
  const {
    selectedAppointment,
    confirmAppointment,
    confirmLoading,
    closeConfirmModal,
    filters,
    fetchAvailabilities,
  } = useAppointment();
  const { user } = useAuth();

  const handleSubmit = async () => {
    if (selectedAppointment && user?.id && confirmAppointment) {
      const response = await confirmAppointment({
        appointmentId: selectedAppointment.id,
        confirmedBy: user.id,
      });
      if (response?.success && closeConfirmModal) {
        closeConfirmModal();
        if (filters.schoolId && fetchAvailabilities) {
          fetchAvailabilities(filters);
        }
      }
    }
  };

  const handleClose = () => {
    if (closeConfirmModal) {
      closeConfirmModal();
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div className="d-flex justify-content-end gap-12 pt-16 border-top">
        <Button
          variant="outline"
          onClick={handleClose}
          disabled={confirmLoading}
        >
          İptal
        </Button>
        <Button
          type="submit"
          variant="success"
          loading={confirmLoading}
          disabled={confirmLoading || !user?.id}
          leftIcon="ph-check-circle"
        >
          Onayla
        </Button>
      </div>
    </Form>
  );
};
