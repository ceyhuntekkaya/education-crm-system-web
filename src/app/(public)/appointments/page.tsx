"use client";

import React, { useState } from "react";
import { DataGrid } from "@/components/ui/data-grid";
import { Breadcrumb, Loading } from "@/components";
import { Icon } from "@/components/ui/icon";
import { AppointmentDto } from "@/types/dto/appointment/AppointmentDto";
import { useAppointments } from "./hooks/use-appointments";
import { createAppointmentColumns, ColumnHandlers } from "./config";
import { AppointmentTableError } from "./sections/appointment-table-error";
import { AppointmentDetail } from "./sections/appointment-detail";
import { useModal } from "@/hooks";
import { AppointmentTableProps } from "./types";

const Appointments: React.FC<AppointmentTableProps> = () => {
  // Hook kullanarak verileri al - sabit değerlerle
  const { appointments, loading, error } = useAppointments({
    schoolId: 1, // Sabit okul ID
    limit: 50, // Sabit limit
  });

  // Modal state yönetimi
  const detailModal = useModal();
  const [selectedAppointment, setSelectedAppointment] =
    useState<AppointmentDto | null>(null);

  // Event handler'lar
  const handlers: ColumnHandlers = {
    onViewDetails: (appointment: AppointmentDto) => {
      console.log("View appointment details:", appointment);
      setSelectedAppointment(appointment);
      detailModal.open();
    },
    onEdit: (appointment: AppointmentDto) => {
      console.log("Edit appointment:", appointment);
      // Burada edit modal açılabilir
    },
    onCancel: (appointment: AppointmentDto) => {
      console.log("Cancel appointment:", appointment);
      // Burada cancel modal açılabilir
    },
    onComplete: (appointment: AppointmentDto) => {
      console.log("Complete appointment:", appointment);
      // Burada randevu tamamlama işlemi yapılabilir
    },
    onReschedule: (appointment: AppointmentDto) => {
      console.log("Reschedule appointment:", appointment);
      // Burada randevu erteleme modal açılabilir
    },
  };

  // Kolonları oluştur
  const columns = createAppointmentColumns(handlers);

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
    <div>
      {/* Main Content Section */}
      <section className="appointments-section py-60 bg-neutral-10">
        <div className="container">
          {/* Compact Statistics Row */}
          <div className="row mb-32">
            <div className="col-12">
              <div className="stats-overview bg-white rounded-12 p-24 shadow-sm">
                <div className="d-flex align-items-center">
                  {statsData.map((stat, index) => (
                    <React.Fragment key={stat.key}>
                      <div className="stat-item d-flex align-items-center flex-fill">
                        <div className="me-12">
                          <Icon
                            icon={stat.icon}
                            size="sm"
                            className={`${stat.bgColor} ${stat.textColor}`}
                            animate={false}
                          />
                        </div>
                        <div>
                          <div className="stat-number h5 text-heading mb-0">
                            {stat.value}
                          </div>
                          <div className="stat-label text-neutral-500 fs-14">
                            {stat.label}
                          </div>
                        </div>
                      </div>
                      {index < statsData.length - 1 && (
                        <div className="stat-divider mx-20"></div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Appointments Table */}
          <div>
            {/* Error Display */}
            {error && (
              <div className="p-24 border-bottom border-neutral-30">
                <AppointmentTableError error={error} />
              </div>
            )}

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
              disableRowSelectionOnClick
            />
          </div>
        </div>
      </section>

      {/* Enhanced Appointment Detail Modal */}
      <AppointmentDetail
        isOpen={detailModal.isOpen}
        onClose={() => {
          detailModal.close();
          setSelectedAppointment(null);
        }}
        appointment={selectedAppointment}
      />
    </div>
  );
};

export default Appointments;
