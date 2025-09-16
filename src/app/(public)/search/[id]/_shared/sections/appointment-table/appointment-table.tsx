"use client";

import React from "react";
import { DataGrid } from "@/components/ui/data-grid";
import { AppointmentTableProps } from "./types/appointment-table-types";
import { AppointmentDto } from "@/types/dto/appointment/AppointmentDto";
import { useAppointments } from "./hooks/use-appointments";
import { createAppointmentColumns, ColumnHandlers } from "./config";
import { AppointmentTableHeader } from "./sections/appointment-table-header";
import { AppointmentTableError } from "./sections/appointment-table-error";

const AppointmentTable: React.FC<AppointmentTableProps> = () => {
  // Hook kullanarak verileri al - sabit değerlerle
  const { appointments, loading, error } = useAppointments({
    schoolId: 1, // Sabit okul ID
    limit: 50, // Sabit limit
  });

  // Sabit title
  const title = "Okul Randevuları";

  // Event handler'lar
  const handlers: ColumnHandlers = {
    onViewDetails: (appointment: AppointmentDto) => {
      console.log("View appointment details:", appointment);
      // Burada detail modal açılabilir
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

  const handleSelectionChange = (selectedRows: AppointmentDto[]) => {
    console.log("Selected appointments:", selectedRows);
    // Burada seçilen randevularla işlem yapılabilir
  };

  // Kolonları oluştur
  const columns = createAppointmentColumns(handlers);

  return (
    <div className="tutor-details__content">
      <div className="border border-neutral-30 rounded-12 bg-white p-8 mt-24">
        <div className="border border-neutral-30 rounded-12 bg-main-25 p-32">
          <AppointmentTableHeader title={title} />
          <AppointmentTableError error={error} />

          <div className="bg-white rounded-8">
            <DataGrid
              rows={appointments}
              columns={columns}
              loading={loading}
              checkboxSelection
              onRowSelectionChange={handleSelectionChange}
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
  );
};

export default AppointmentTable;
