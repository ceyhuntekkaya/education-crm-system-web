import React from "react";
import { FormInput, FormAutocomplete } from "@/components/forms";
import { PersonalInfoStepProps } from "../types/component-props-types";

const communicationOptions = [
  { value: "EMAIL", label: "E-posta" },
  { value: "SMS", label: "SMS" },
  { value: "PHONE", label: "Telefon" },
];

export const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({
  className = "",
}) => {
  return (
    <div className={`step-content ${className}`}>
      <h4 className="mb-24">Veli Bilgilerinizi Giriniz</h4>

      <div className="row gy-3">
        <div className="col-12">
          <FormInput
            name="parentName"
            label="Veli Adı Soyadı *"
            placeholder="Veli adını ve soyadını girin"
            variant="inline"
          />
        </div>

        <div className="col-md-6">
          <FormInput
            name="parentEmail"
            type="email"
            label="Veli E-posta *"
            placeholder="Veli e-posta adresini girin"
            variant="inline"
          />
        </div>

        <div className="col-md-6">
          <FormInput
            name="parentPhone"
            type="tel"
            label="Veli Telefon *"
            placeholder="Veli telefon numarasını girin"
            variant="inline"
          />
        </div>

        <div className="col-12">
          <FormAutocomplete
            name="communicationPreference"
            label="İletişim Tercihi"
            options={communicationOptions}
            variant="inline"
          />
        </div>
      </div>
    </div>
  );
};
