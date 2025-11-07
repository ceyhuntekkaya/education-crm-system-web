"use client";

import React from "react";
import Modal from "@/components/ui/modal";
import { CustomCard, Icon } from "@/components/ui";
import { ConfirmFormContent } from "./sections";
import { formatDate } from "@/utils/format-date";
import { useAppointment } from "../../context/appointment-context";
import { FormProvider } from "@/contexts";

export const ConfirmAppointmentModal: React.FC = () => {
  const { confirmModalOpen, closeConfirmModal, selectedAppointment } =
    useAppointment();

  if (!confirmModalOpen || !selectedAppointment || !closeConfirmModal) {
    return null;
  }

  const appointment = selectedAppointment.appointment;
  const slotDate = selectedAppointment.slotDate;

  return (
    <FormProvider initialValues={{}}>
      <Modal
        isOpen={confirmModalOpen}
        onClose={closeConfirmModal}
        title="Randevuyu Onayla"
        size="md"
      >
        <div className="d-flex flex-column gap-20 p-16 ">
          {/* Info Card */}
          <CustomCard
            bgColor="bg-info-subtle"
            padding="p-16"
            borderRadius="rounded-8"
          >
            <div className="d-flex align-items-start gap-12">
              <Icon
                icon="ph-info"
                size="lg"
                className="text-info flex-shrink-0"
              />
              <div>
                <h6 className="text-info fw-semibold mb-6 fs-14 lh-sm">
                  Bilgi
                </h6>
                <p className="text-info-emphasis mb-0 fs-13 lh-base">
                  Randevuyu onaylamak üzeresiniz. Onaylanan randevular veli ve
                  öğrenci tarafından görüntülenebilecektir.
                </p>
              </div>
            </div>
          </CustomCard>

          {/* Appointment Details Card */}
          <div>
            {appointment && (
              <CustomCard
                title="Randevu Detayları"
                items={[
                  {
                    label: "Veli",
                    value: appointment.parentName || "-",
                    isShowing: true,
                  },
                  {
                    label: "Öğrenci",
                    value: appointment.studentName || "-",
                    isShowing: true,
                  },
                  {
                    label: "Tarih",
                    value:
                      appointment.formattedDate ||
                      (slotDate ? formatDate(slotDate, "tr-TR") : "-"),
                    isShowing: true,
                  },
                  {
                    label: "Saat",
                    value:
                      appointment.formattedTime ||
                      `${appointment.startTime || "-"} - ${
                        appointment.endTime || "-"
                      }`,
                    isShowing: true,
                  },
                ]}
              />
            )}
          </div>

          <ConfirmFormContent />
        </div>
      </Modal>
    </FormProvider>
  );
};
