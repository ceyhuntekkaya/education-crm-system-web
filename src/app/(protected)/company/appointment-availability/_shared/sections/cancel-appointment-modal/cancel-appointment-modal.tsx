"use client";

import React from "react";
import Modal from "@/components/ui/modal";
import { CustomCard, Icon } from "@/components/ui";
import { FormProvider } from "@/contexts/form-context";
import { CancelFormContent } from "./sections";
import { validationSchema, initialValues } from "./schemas";
import { formatDate } from "@/utils/format-date";
import { useAppointment } from "../../context/appointment-context";

export const CancelAppointmentModal: React.FC = () => {
  const { cancelModalOpen, closeCancelModal, selectedAppointment } =
    useAppointment();

  if (!cancelModalOpen || !selectedAppointment || !closeCancelModal) {
    return null;
  }

  const appointment = selectedAppointment.appointment;
  const slotDate = selectedAppointment.slotDate;

  return (
    <FormProvider
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      <Modal
        isOpen={cancelModalOpen}
        onClose={closeCancelModal}
        title="Randevuyu İptal Et"
        size="md"
      >
        <div className="d-flex flex-column gap-20 p-16">
          {/* Warning Card */}
          <CustomCard
            bgColor="bg-warning-subtle"
            padding="p-16"
            borderRadius="rounded-8"
          >
            <div className="d-flex align-items-start gap-12">
              <Icon
                icon="ph-warning"
                size="lg"
                className="text-warning flex-shrink-0"
              />
              <div>
                <h6 className="text-warning fw-semibold mb-6 fs-14 lh-sm">
                  Dikkat!
                </h6>
                <p className="text-warning-emphasis mb-0 fs-13 lh-base">
                  Bu randevuyu iptal etmek üzeresiniz. Bu işlem geri alınamaz.
                </p>
              </div>
            </div>
          </CustomCard>

          <CancelFormContent />
        </div>
      </Modal>
    </FormProvider>
  );
};
