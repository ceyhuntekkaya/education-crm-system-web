import React from "react";
import { FormInput, FormSelect } from "@/components/forms";

interface PersonalInfoStepProps {
  className?: string;
}

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
          />
        </div>

        <div className="col-md-6">
          <FormInput
            name="parentEmail"
            type="email"
            label="Veli E-posta *"
            placeholder="Veli e-posta adresini girin"
          />
        </div>

        <div className="col-md-6">
          <FormInput
            name="parentPhone"
            type="tel"
            label="Veli Telefon *"
            placeholder="Veli telefon numarasını girin"
          />
        </div>

        <div className="col-12">
          <FormSelect
            name="communicationPreference"
            label="İletişim Tercihi"
            options={communicationOptions}
          />
        </div>
      </div>
    </div>
  );
};
