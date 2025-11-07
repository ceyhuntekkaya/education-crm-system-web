"use client";

import React from "react";
import { Button, FormAutocomplete, FormTextarea } from "@/components";
import { Form } from "@/components/forms";
import { useAppointment } from "../../../context/appointment-context";
import { canceledByTypeOptions } from "../options";

export const CancelFormContent: React.FC = () => {
  const {
    selectedAppointment,
    cancelAppointment,
    cancelLoading,
    closeCancelModal,
    filters,
    fetchAvailabilities,
  } = useAppointment();

  const handleSubmit = async (values: any) => {
    if (selectedAppointment && cancelAppointment) {
      const response = await cancelAppointment({
        appointmentId: selectedAppointment.id,
        cancellationReason: values.cancellationReason,
        canceledByType: values.canceledByType,
      });
      if (response?.success && closeCancelModal) {
        closeCancelModal();
        if (filters.schoolId && fetchAvailabilities) {
          fetchAvailabilities(filters);
        }
      }
    }
  };

  const handleClose = () => {
    if (closeCancelModal) {
      closeCancelModal();
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div className="d-flex flex-column gap-16">
        <FormTextarea
          name="cancellationReason"
          label="İptal Nedeni"
          variant="inline"
          placeholder="İptal nedenini açıklayın (en az 10 karakter)"
          rows={4}
          helperText="Lütfen iptal nedenini detaylı bir şekilde açıklayınız"
        />

        <div className="d-flex justify-content-end gap-12 pt-16 border-top">
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={cancelLoading}
          >
            Vazgeç
          </Button>
          <Button
            type="submit"
            variant="error"
            loading={cancelLoading}
            disabled={cancelLoading}
            leftIcon="ph-x-circle"
          >
            İptal Et
          </Button>
        </div>
      </div>
    </Form>
  );
};
