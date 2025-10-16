"use client";

import React from "react";

import { CustomCard, LoadingSpinner } from "@/components/ui";
import { useAppointmentDetail } from "./_shared/context";
import { useAppointmentSections } from "./_shared/hooks";

/**
 * Appointment detay bilgilerini gösteren kart bileşeni
 */
const AppointmentDetailPage: React.FC = () => {
  const { appointment, isLoading, error } = useAppointmentDetail();

  // Ana section'ları oluştur - hook'u en üstte çağırıyoruz
  const allSections = useAppointmentSections(appointment);

  if (isLoading) {
    return (
      <CustomCard title="Randevu Detayı">
        <LoadingSpinner message="Randevu bilgisi yükleniyor..." />
      </CustomCard>
    );
  }

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

  return (
    <div className="row g-4">
      <div className="col-6">
        <CustomCard
          title="Randevu Detayı"
          subtitle="Randevu bilgilerini detaylı olarak görüntüleyin"
          multiItems={allSections}
          itemDirection="column"
        />
      </div>
      <div className="col-6">
        <CustomCard
          title="Sağ Panel"
          subtitle="Buraya sağ taraftaki içerik gelecek"
        >
          <div className="text-center py-8">
            <i className="ph ph-info text-neutral-500 fs-2 mb-3"></i>
            <p className="text-neutral-600 mb-0">
              Sağ taraf içeriği buraya eklenecek.
            </p>
          </div>
        </CustomCard>
      </div>
    </div>
  );
};

export default AppointmentDetailPage;
