"use client";

import React from "react";
import { useParams } from "next/navigation";
import {
  CurrentAppointmentProvider,
  useCurrentAppointmentContext,
} from "./context/current-appointment-context";
import {
  AppointmentContent,
  AppointmentDetails,
  AppointmentReschedule,
} from "./sections";
import { CustomCard } from "@/components";

const CurrentAppointmentContent: React.FC = () => {
  const { currentAppointment, isLoading, error, refetch } =
    useCurrentAppointmentContext();

  return (
    <CustomCard
      title="Mevcut Randevum"
      subtitle="Kurum için mevcut randevu bilgilerinizi görüntüleyin"
      isLoading={isLoading}
      loadingMessage="Randevu bilgisi yükleniyor..."
      loadingVariant="spinner"
      isError={!!error}
      errorMessage={error || "Randevu bilgisi yüklenirken bir hata oluştu"}
      isEmpty={!currentAppointment?.appointment}
      emptyMessage="Aktif randevunuz bulunmamaktadır"
      emptyDescription="Henüz bu kurum için aktif bir randevunuz yok."
      emptyIcon="ph-calendar-x"
      className="my-20"
    >
      {currentAppointment?.appointment && (
        <>
          {/* Appointment Reschedule Section */}
          <AppointmentReschedule />

          <AppointmentContent appointment={currentAppointment.appointment} />
        </>
      )}
    </CustomCard>
  );
};

const CurrentAppointment: React.FC = () => {
  // URL'den schoolId'yi al
  const params = useParams();
  const schoolId = params.id as string;

  return (
    <CurrentAppointmentProvider schoolId={schoolId}>
      <CurrentAppointmentContent />
    </CurrentAppointmentProvider>
  );
};

export default CurrentAppointment;
