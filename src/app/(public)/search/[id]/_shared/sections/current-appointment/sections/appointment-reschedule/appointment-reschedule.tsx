"use client";

import React from "react";
import { FormProvider } from "@/contexts";
import { useModal } from "@/hooks/use-modal";
import { useCurrentAppointmentContext } from "../../context/current-appointment-context";
import { RescheduleDateTimeStep } from "./reschedule-date-time-step";
import { CancelAppointmentModal } from "./cancel-appointment-modal";
import {
  CustomCard,
  Button,
  Form,
  FormTextarea,
  FormValues,
} from "@/components";
import { CancelledByType } from "@/enums";
import * as yup from "yup";

interface AppointmentRescheduleProps {
  // Props kaldırıldı - context kullanılıyor
}

interface CancelFormValues {
  cancellationReason: string;
  canceledByType: CancelledByType;
}

// Validation schema
const rescheduleValidationSchema = yup.object({
  appointmentDate: yup.string().required("Lütfen randevu tarihi seçin"),
  selectedSlotId: yup
    .number()
    .nullable()
    .required("Lütfen randevu saati seçin"),
  rescheduleReason: yup.string().optional(),
});

// Form initial values
const initialValues = {
  appointmentDate: "",
  selectedSlotId: null as number | null,
  rescheduleReason: "",
};

export const AppointmentReschedule: React.FC<
  AppointmentRescheduleProps
> = () => {
  const cancelModal = useModal();

  const {
    currentAppointment,
    isLoading,
    error,
    rescheduleAppointment,
    isRescheduling,
    rescheduleError,
    cancelAppointment,
    isCancelling,
    cancelError,
  } = useCurrentAppointmentContext();

  // Context'den appointment'ı al
  const appointment = currentAppointment?.appointment;

  if (!appointment) {
    return null;
  }

  const handleFormSubmit = (formValues: any) => {
    if (!formValues.selectedSlotId || !appointment?.id) return;

    rescheduleAppointment({
      appointmentId: appointment.id,
      newAppointmentSlotId: formValues.selectedSlotId,
      rescheduleReason: formValues.rescheduleReason?.trim() || undefined,
    });
  };

  const handleCancelConfirm = (values: CancelFormValues) => {
    if (!appointment?.id) return;

    cancelAppointment({
      appointmentId: appointment.id,
      cancellationReason: values.cancellationReason,
      canceledByType: values.canceledByType,
    });

    cancelModal.close();
  };

  return (
    <>
      <FormProvider
        initialValues={initialValues}
        validationSchema={rescheduleValidationSchema}
      >
        {/* <FormValues /> */}
        <div className="mb-24">
          <CustomCard
            type="accordion"
            title="Randevu Düzenle"
            subtitle="Randevu tarihinizi ve saatinizi değiştirin"
            variant="outline"
            isLoading={isLoading}
            loadingMessage="Randevu bilgileri yükleniyor..."
            isError={!!error}
            errorMessage={
              error || "Randevu bilgisi yüklenirken bir hata oluştu"
            }
            isEmpty={!appointment}
            emptyMessage="Aktif randevunuz bulunmamaktadır"
            emptyDescription="Randevu düzenlemek için aktif bir randevunuz olmalıdır."
            emptyIcon="ph-calendar-x"
          >
            {/* Accordion Content - This will be shown when expanded */}
            <div className="reschedule-accordion-content mt-24">
              <Form onSubmit={handleFormSubmit} className="reschedule-form">
                {/* Date Time Selection */}
                <RescheduleDateTimeStep
                  schoolId={appointment?.schoolId?.toString() || ""}
                />

                {/* Reason Section */}
                <div className="reschedule-reason-section mt-32 mb-32">
                  <FormTextarea
                    name="rescheduleReason"
                    label="Erteleme Nedeni (Opsiyonel)"
                    placeholder="Randevu erteleme nedeninizi belirtebilirsiniz..."
                    variant="inline"
                    rows={3}
                    disabled={isRescheduling || isCancelling}
                  />
                </div>

                {/* Actions */}
                <div className="reschedule-actions d-flex gap-12 justify-content-end">
                  <Button
                    type="button"
                    variant="error"
                    onClick={cancelModal.open}
                    disabled={isRescheduling || isCancelling}
                    loading={isCancelling}
                    leftIcon="ph-x-circle"
                  >
                    {isCancelling ? "İptal Ediliyor..." : "Randevu İptal Et"}
                  </Button>
                  <Button
                    type="submit"
                    variant="success"
                    disabled={isRescheduling || isCancelling}
                    loading={isRescheduling}
                    leftIcon="ph-calendar-plus"
                  >
                    {isRescheduling ? "Erteleniyor..." : "Randevu Ertele"}
                  </Button>
                </div>
              </Form>
            </div>
          </CustomCard>
        </div>
      </FormProvider>

      {/* Cancel Modal */}
      <CancelAppointmentModal
        isOpen={cancelModal.isOpen}
        onClose={cancelModal.close}
        onConfirm={handleCancelConfirm}
        isLoading={isCancelling}
      />
    </>
  );
};
