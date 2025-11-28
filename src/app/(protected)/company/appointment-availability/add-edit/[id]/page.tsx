"use client";

import React from "react";
import { LoadingSpinner, CustomCard } from "@/components";
import { SlotForm } from "../_shared/sections";
import { useSlotAddEdit } from "../_shared/context";
import { AppointmentType } from "@/enums";
import { usePageTitle } from "@/hooks";

interface AppointmentAddEditPageProps {}

const AppointmentAddEditPage: React.FC<AppointmentAddEditPageProps> = () => {
  usePageTitle("Müsaitlik Düzenle");
  const { slot, slotLoading, isEditing } = useSlotAddEdit();

  const pageTitle = isEditing
    ? "Müsait Randevu Saati Düzenle"
    : "Yeni Müsait Randevu Saati Ekle";

  // Edit modunda slot yüklendikten sonra form data'sını hazırla
  const formData = React.useMemo(() => {
    if (!isEditing || !slot) return undefined;

    return {
      schoolId: slot.schoolId || 0,
      staffUserId: slot.staffUserId?.toString() || "",
      durationMinutes: slot.durationMinutes?.toString() || "30",
      appointmentType:
        slot.appointmentType || AppointmentType.INFORMATION_MEETING,
      onlineMeetingAvailable: slot.onlineMeetingAvailable || false,
      slotDate: slot.slotDate
        ? new Date(slot.slotDate).toISOString().slice(0, 16)
        : "",
    };
  }, [slot, isEditing]);

  return (
    <CustomCard
      title={pageTitle}
      subtitle={
        isEditing
          ? "Mevcut müsait randevu saati bilgilerini düzenleyin"
          : "Yeni bir müsait randevu saati oluşturun"
      }
      isBack
      mb="mb-24"
    >
      {/* Form Content */}
      {slotLoading && isEditing ? (
        <LoadingSpinner
          message="Slot bilgileri yükleniyor..."
          size="md"
          variant="dots"
          className="py-5"
        />
      ) : (
        <SlotForm initialData={formData} />
      )}
    </CustomCard>
  );
};

export default AppointmentAddEditPage;
