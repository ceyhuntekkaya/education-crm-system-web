import React from "react";
import type { BasicInfoItemConfig } from "../types";

/**
 * Notlar ve özel istekler konfigürasyonu
 */
export const notesConfig: BasicInfoItemConfig[] = [
  {
    label: "Notlar",
    value: (appointment) => (
      <div className="border-start border-3 border-info ps-3">
        <p className="mb-0 text-muted fst-italic">
          {appointment?.notes || "Not bulunmuyor"}
        </p>
      </div>
    ),
    isShowing: (appointment) => !!appointment?.notes,
  },
  {
    label: "İç Notlar",
    value: (appointment) => (
      <div className="border-start border-3 border-warning ps-3">
        <p className="mb-0 text-muted fst-italic">
          <i className="ph ph-lock me-8"></i>
          {appointment?.internalNotes || "İç not bulunmuyor"}
        </p>
      </div>
    ),
    isShowing: (appointment) => !!appointment?.internalNotes,
  },
  {
    label: "Özel İstekler",
    value: (appointment) => (
      <div className="border-start border-3 border-success ps-3">
        <p className="mb-0 text-muted fst-italic">
          <i className="ph ph-star me-8"></i>
          {appointment?.specialRequests || "Özel istek bulunmuyor"}
        </p>
      </div>
    ),
    isShowing: (appointment) => !!appointment?.specialRequests,
  },
  {
    label: "Randevu Özeti",
    value: (appointment) => (
      <div className="border-start border-3 border-primary ps-3">
        <p className="mb-0 text-muted fst-italic">
          <i className="ph ph-file-text me-8"></i>
          {appointment?.appointmentSummary || "Özet bulunmuyor"}
        </p>
      </div>
    ),
    isShowing: (appointment) => !!appointment?.appointmentSummary,
  },
];
