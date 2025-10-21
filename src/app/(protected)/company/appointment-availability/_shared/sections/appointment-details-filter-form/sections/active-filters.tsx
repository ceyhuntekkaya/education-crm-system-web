import React from "react";
import { getFieldLabel, getEnumLabel } from "../utils/filter-utils";
import { useAppointment } from "../../../context/appointment-context";

/**
 * Aktif filtreleri chip/badge formatında gösteren component
 * Context'ten direkt veri alır - props'a gerek yok
 */
export const ActiveFilters: React.FC = () => {
  // Context'ten veri ve fonksiyonları al
  const { appointmentFilters, removeAppointmentFilter } = useAppointment();

  if (!appointmentFilters || Object.keys(appointmentFilters).length === 0) {
    return null;
  }

  return (
    <div className="mb-24">
      <div className="d-flex flex-wrap gap-2 align-items-center">
        <small className="text-muted fw-medium">Aktif Filtreler:</small>
        {Object.entries(appointmentFilters).map(([key, value]) => {
          if (!value) return null;

          // Değer tipine göre görüntüleme
          let displayValue = value;
          if (typeof value === "boolean") {
            displayValue = value ? "Evet" : "Hayır";
          } else if (Array.isArray(value)) {
            // Array değerler için her birini enum'a çevirip join et
            displayValue = value
              .map((item) => getEnumLabel(key, String(item)))
              .join(", ");
          } else {
            // Tek değerler için enum karşılığını kontrol et
            displayValue = getEnumLabel(key, String(value));
          }

          return (
            <span
              key={key}
              className="badge bg-primary-subtle text-primary px-8 py-4 d-inline-flex align-items-center gap-4"
              style={{ fontSize: "11px" }}
            >
              <strong>{getFieldLabel(key)}:</strong> {String(displayValue)}
              {removeAppointmentFilter && (
                <button
                  type="button"
                  className="btn-close"
                  style={{ fontSize: "8px" }}
                  onClick={() => removeAppointmentFilter(key)}
                  aria-label={`${getFieldLabel(key)} filtresini kaldır`}
                />
              )}
            </span>
          );
        })}
      </div>
    </div>
  );
};
