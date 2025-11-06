"use client";

import React from "react";
import { DataGrid } from "@/components/ui/data-grid";
import { useAppointment } from "../context/appointment-context";
import { ConfirmAppointmentModal, CancelAppointmentModal } from "./";

export const AppointmentAvailabilityTable: React.FC = () => {
  // Context'ten tüm hazır verileri al
  const {
    availabilityLoading,
    // Table specific - context'ten hazır geliyor
    dataToDisplay = [],
    emptyStateConfig,
    columns = [],
  } = useAppointment();

  return (
    <>
      <DataGrid
        rows={dataToDisplay}
        columns={columns}
        loading={availabilityLoading}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10, 25, 50]}
        emptyState={emptyStateConfig}
      />

      {/* Modals - Context'ten kendi durumlarını yönetiyorlar */}
      <ConfirmAppointmentModal />
      <CancelAppointmentModal />
    </>
  );
};
