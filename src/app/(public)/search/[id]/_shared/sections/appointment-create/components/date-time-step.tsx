import React, { useEffect, useState } from "react";
import { FormInput, FormRadio } from "@/components/forms";
import { useFormField } from "@/contexts";
import { mockAvailableSlots } from "../mock/appointment-create-mock";
import { AvailableSlotDto } from "@/types/dto/appointment/AvailableSlotDto";

export const DateTimeStep = () => {
  const { value: appointmentDate } = useFormField("appointmentDate");
  const [availableSlots, setAvailableSlots] = useState<AvailableSlotDto[]>([]);

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
    <div>
      <h4 className="mb-24">Tarih ve Saat Seçiniz</h4>

      <FormInput
        name="appointmentDate"
        type="date"
        label="Randevu Tarihi"
        variant="inline"
        min={new Date().toISOString().split("T")[0]}
      />

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
