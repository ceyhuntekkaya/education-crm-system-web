import React, { useEffect, useState } from "react";
import { FormInput, FormRadio } from "@/components/forms";
import { useFormHook } from "@/hooks/use-form-hook";
import { mockAvailableSlots } from "../mock/appointment-create-mock";
import { AvailableSlotDto } from "@/types/dto/appointment/AvailableSlotDto";

export const DateTimeStep = () => {
  const { getFieldValue, updateField } = useFormHook();
  const [availableSlots, setAvailableSlots] = useState<AvailableSlotDto[]>([]);
  const appointmentDate = getFieldValue("appointmentDate");

  // Load available slots when date changes
  useEffect(() => {
    if (appointmentDate) {
      // In real implementation, call API with date
      setAvailableSlots(mockAvailableSlots);
    } else {
      setAvailableSlots([]);
    }
  }, [appointmentDate]);

  const slotOptions = availableSlots
    .filter((slot) => slot.slotId)
    .map((slot) => ({
      value: slot.slotId!.toString(),
      label: `${slot.timeRange} - ${slot.location} (${slot.staffUserName})`,
    }));

  return (
    <div className={`step-content`}>
      <h4 className="mb-24">Tarih ve Saat Seçiniz</h4>

      <div className="row gy-3">
        <div className="col-md-6">
          <label className="form-label">Randevu Tarihi</label>
          <input
            type="date"
            name="appointmentDate"
            className="form-control"
            value={getFieldValue("appointmentDate") || ""}
            onChange={(e) => updateField("appointmentDate", e.target.value)}
            min={new Date().toISOString().split("T")[0]}
          />
        </div>
      </div>

      {appointmentDate && availableSlots.length > 0 && (
        <div className="mt-24">
          <FormRadio
            name="selectedSlotId"
            label="Müsait Saatler"
            value=""
            options={slotOptions}
            multi
          />
        </div>
      )}
    </div>
  );
};
