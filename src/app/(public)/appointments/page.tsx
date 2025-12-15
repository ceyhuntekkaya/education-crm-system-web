"use client";

import React from "react";
import { DataGrid } from "@/components/ui/data-grid";
import { CustomCard } from "@/components";
import { useAppointments } from "./hooks/use-appointments";
import { createAppointmentColumns } from "./config";
import { usePageTitle } from "@/hooks";
import { AppointmentStatistics } from "./sections";

const Appointments: React.FC = () => {
  usePageTitle("Randevularım");
  // Hook kullanarak API'den verileri al
  const { appointments, loading, error } = useAppointments();

  // Kolonları oluştur
  const columns = createAppointmentColumns();

  // İstatistik hesaplamaları
  const stats = {
    total: appointments.length,
    pending: appointments.filter((apt) => apt.status === "PENDING").length,
    confirmed: appointments.filter((apt) => apt.status === "CONFIRMED").length,
    completed: appointments.filter((apt) => apt.status === "COMPLETED").length,
  };

  // İstatistik kartları array'i
  const statsData = [
    {
      key: "total",
      icon: "ph-calendar",
      bgColor: "bg-primary-50",
      textColor: "text-primary-600",
      value: stats.total,
      label: "Toplam",
    },
    {
      key: "pending",
      icon: "ph-clock",
      bgColor: "bg-warning-50",
      textColor: "text-warning-600",
      value: stats.pending,
      label: "Bekleyen",
    },
    {
      key: "confirmed",
      icon: "ph-check-circle",
      bgColor: "bg-success-50",
      textColor: "text-success-600",
      value: stats.confirmed,
      label: "Onaylanan",
    },
    {
      key: "completed",
      icon: "ph-calendar-check",
      bgColor: "bg-info-50",
      textColor: "text-info-600",
      value: stats.completed,
      label: "Tamamlanan",
    },
  ];

  return (
    <div className="container py-40">
      <CustomCard
        title="Randevularım"
        subtitle="Randevu istatistikleriniz"
        isLoading={loading}
        isError={error !== null}
      >
        {/* Appointment Statistics Section */}
        <AppointmentStatistics statsData={statsData} />

        <div>
          <DataGrid
            rows={appointments}
            columns={columns}
            loading={loading}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            pageSizeOptions={[5, 10, 25, 50]}
          />
        </div>
      </CustomCard>
    </div>
  );
};

export default Appointments;
