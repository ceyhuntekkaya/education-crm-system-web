import React from "react";
import { appointmentTypeOptions } from "../mock/appointment-create-mock";
import { useFormHook } from "@/hooks/use-form-hook";
import { AppointmentTypeStepProps } from "../types";

export const AppointmentTypeStep: React.FC<AppointmentTypeStepProps> = ({
  className = "",
}) => {
  const { updateField, values } = useFormHook();
  const selectedType = values.appointmentType || "";

  const handleTypeSelect = (value: string) => {
    updateField("appointmentType", value);
  };

  return (
    <div className={`appointment-type-step ${className}`}>
      {/* Header */}
      <div className="step-header mb-24">
        <h5 className="text-neutral-800 mb-8">Randevu Türünü Seçiniz</h5>
        <p className="text-md text-neutral-600 mb-0">
          Size en uygun randevu türünü seçerek devam edin
        </p>
      </div>

      {/* Type Selection Grid */}
      <div className="appointment-type-grid">
        {appointmentTypeOptions.map((option) => (
          <div
            key={option.value}
            className={`appointment-type-card ${
              selectedType === option.value ? "selected" : ""
            }`}
            onClick={() => handleTypeSelect(option.value)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleTypeSelect(option.value);
              }
            }}
          >
            {/* Icon */}
            <div
              className={`appointment-type-icon ${
                selectedType === option.value ? "selected" : ""
              }`}
            >
              <i className={`ph-bold ${option.icon}`} />
            </div>

            {/* Content */}
            <div className="appointment-type-content">
              <h5 className="appointment-type-title">{option.label}</h5>
              <p className="appointment-type-description">
                {option.description}
              </p>
              {option.duration && (
                <div className="appointment-type-duration">
                  <i className="ph ph-clock" />
                  <span>{option.duration} dakika</span>
                </div>
              )}
            </div>

            {/* Selection Indicator */}
            <div className="appointment-type-selector">
              <div className="appointment-type-check">
                <i className="ph-bold ph-check" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
