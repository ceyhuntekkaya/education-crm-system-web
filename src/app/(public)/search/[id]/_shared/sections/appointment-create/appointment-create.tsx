"use client";

import React from "react";
import { FormProvider } from "@/contexts";
import { useAuth } from "@/contexts";
import { AppointmentProvider, useAppointment } from "./contexts";
import { AppointmentFormContent } from "./components/appointment-form-content";
import { AppointmentCreateProps } from "./types";
import { createInitialValues } from "./schemas/initial-values-schema";
import { CustomCard, Icon } from "@/components";

/**
 * AppointmentCreate içerik komponenti
 * Mevcut randevu varsa uyarı gösterir
 */
const AppointmentCreateContent: React.FC = () => {
  const { hasFutureAppointment, currentAppointment } = useAppointment();

  // Mevcut randevu varsa uyarı göster
  if (hasFutureAppointment && currentAppointment?.appointment) {
    // API'den gelen appointment.appointmentDate kullan
    const dateString = currentAppointment.appointment.appointmentDate;
    const timeString = currentAppointment.appointment.startTime;

    let formattedDate = "";
    if (dateString) {
      const dateTimeString = timeString
        ? `${dateString}T${timeString}`
        : dateString;
      const dateObj = new Date(dateTimeString);

      formattedDate = timeString
        ? dateObj.toLocaleString("tr-TR", {
            day: "2-digit",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })
        : dateObj.toLocaleString("tr-TR", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          });
    }

    return (
      <CustomCard
        title="Mevcut Randevunuz Var"
        className="bg-warning-50 border-warning-300"
      >
        <div className="d-flex flex-column align-items-center justify-content-center py-32">
          <Icon
            icon="ph-bold ph-calendar-check"
            variant="inline"
            size="lg"
            className="text-warning-600 mb-24"
            style={{ width: "80px", height: "80px", fontSize: "48px" }}
          />
          <h5 className="text-neutral-800 mb-12">
            Bu kurum için aktif randevunuz bulunmaktadır
          </h5>
          <p className="text-neutral-600 mb-8 text-center">
            Randevu Tarihi: <strong>{formattedDate}</strong>
          </p>
          <p
            className="text-neutral-500 text-center"
            style={{ maxWidth: "500px" }}
          >
            Yeni bir randevu oluşturmadan önce mevcut randevunuzu iptal etmeniz
            veya randevu tarihinizin geçmesini beklemeniz gerekmektedir.
          </p>
        </div>
      </CustomCard>
    );
  }

  // Mevcut randevu yoksa form göster
  return <AppointmentFormContent />;
};

/**
 * Main AppointmentCreate component with providers
 * This component serves as the entry point for appointment creation
 */
export const AppointmentCreate: React.FC<AppointmentCreateProps> = ({
  schoolId,
  isOnline = false,
}) => {
  // Get user from auth context for parentUserId
  const { user } = useAuth();

  // Schema'dan initial values oluştur ve parentUserId ekle
  const initialValues = createInitialValues(schoolId, isOnline, user?.id);

  return (
    <CustomCard title="Randevu Oluştur" className="mt-20">
      <FormProvider initialValues={initialValues}>
        <AppointmentProvider schoolId={schoolId} isOnline={isOnline}>
          <AppointmentCreateContent />
        </AppointmentProvider>
      </FormProvider>
    </CustomCard>
  );
};
