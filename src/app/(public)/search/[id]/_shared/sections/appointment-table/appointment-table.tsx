"use client";

import React, { useState } from "react";
import { DataGrid } from "@/components/ui/data-grid";
import { AppointmentDto } from "@/types/dto/appointment/AppointmentDto";
import { useAppointments } from "./hooks/use-appointments";
import { createAppointmentColumns, ColumnHandlers } from "./config";
import { AppointmentTableHeader } from "./sections/appointment-table-header";
import { AppointmentTableError } from "./sections/appointment-table-error";
import { AppointmentDetail } from "./sections/appointment-detail";
import { useModal } from "@/hooks";
import { AppointmentTableProps } from "./types";

const AppointmentTable: React.FC<AppointmentTableProps> = () => {
  // Hook kullanarak verileri al - sabit değerlerle
  const { appointments, loading, error } = useAppointments({
    schoolId: 1, // Sabit okul ID
    limit: 50, // Sabit limit
  });

  // Modal state yönetimi
  const detailModal = useModal();
  const [selectedAppointment, setSelectedAppointment] =
    useState<AppointmentDto | null>(null);

  // Sabit title
  const title = "Okul Randevuları";

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

  return (
    <div className="tutor-details__content">
      <div className="border border-neutral-30 rounded-12 bg-white p-8 mt-24">
        <div className="appointment-table-enhanced border border-neutral-30 rounded-12 bg-white">
          {/* Enhanced Header */}
          <div className="table-header">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h4 className="h4 text-heading mb-8">{title}</h4>
                <p className="text-neutral-500 mb-0">
                  Randevu yönetimi ve detay görüntüleme
                </p>
              </div>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="p-24 pb-0">
            <div className="table-stats">
              <div className="stat-card">
                <span className="stat-number">{stats.total}</span>
                <span className="stat-label">Toplam Randevu</span>
              </div>
              <div className="stat-card">
                <span className="stat-number text-warning-600">
                  {stats.pending}
                </span>
                <span className="stat-label">Bekleyen</span>
              </div>
              <div className="stat-card">
                <span className="stat-number text-success-600">
                  {stats.confirmed}
                </span>
                <span className="stat-label">Onaylanan</span>
              </div>
              <div className="stat-card">
                <span className="stat-number text-info-600">
                  {stats.completed}
                </span>
                <span className="stat-label">Tamamlanan</span>
              </div>
            </div>
          </div>

          {/* Error Display */}
          <div className="px-24">
            <AppointmentTableError error={error} />
          </div>

          {/* Data Grid */}
          <div className="p-24 pt-0">
            <div className="bg-white rounded-8 border border-neutral-30 overflow-hidden">
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
        </div>
      </div>

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

export default AppointmentTable;
