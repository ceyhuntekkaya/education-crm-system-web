import React from "react";
import { FormRadio } from "@/components/forms";
import { appointmentTypeOptions } from "../mock/appointment-create-mock";

interface AppointmentTypeStepProps {
  className?: string;
}

export const AppointmentTypeStep: React.FC<AppointmentTypeStepProps> = ({
  className = "",
}) => {
  return (
    <div className={`step-content ${className}`}>
      <h4 className="mb-24">Randevu Türünü Seçiniz</h4>
      <div className="appointment-type-options">
        <FormRadio
          name="appointmentType"
          label="Randevu Türü"
          value=""
          options={appointmentTypeOptions.map((option) => ({
            value: option.value,
            label: option.label,
          }))}
          multi={true}
        />
      </div>
    </div>
  );
};
