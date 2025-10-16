import React from "react";
import { CustomCard, LoadingSpinner } from "@/components/ui";
import { useAppointmentDetail } from "../context";

interface AppointmentDetailSectionProps {
  direction?: "row" | "column";
}

/**
 * Randevu detay bilgilerini gösteren section bileşeni
 */
export const AppointmentDetailSection: React.FC<
  AppointmentDetailSectionProps
> = ({ direction }) => {
  const { appointment, isLoading, error, allSections } = useAppointmentDetail();
  // Loading durumu
  if (isLoading) {
    return (
      <CustomCard title="Randevu Detayı">
        <LoadingSpinner message="Randevu bilgisi yükleniyor..." />
      </CustomCard>
    );
  }

  // Error durumu
  if (error) {
    return (
      <CustomCard
        title="Hata"
        bgColor="bg-danger-25"
        border="border border-danger-30"
      >
        <div className="text-center py-8">
          <i className="ph ph-warning-circle text-danger fs-2 mb-3"></i>
          <p className="text-danger mb-0">
            Randevu bilgisi yüklenirken hata oluştu: {error}
          </p>
        </div>
      </CustomCard>
    );
  }

  // Empty state durumu
  if (!appointment) {
    return (
      <CustomCard title="Bilgi">
        <div className="text-center py-8">
          <i className="ph ph-info text-neutral-500 fs-2 mb-3"></i>
          <p className="text-neutral-600 mb-0">Randevu bilgisi bulunamadı.</p>
        </div>
      </CustomCard>
    );
  }

  // Normal durum - randevu detayları
  return (
    <CustomCard
      title="Randevu Detayı"
      subtitle="Randevu bilgilerini detaylı olarak görüntüleyin"
      multiItems={allSections}
      itemDirection={direction}
    />
  );
};
