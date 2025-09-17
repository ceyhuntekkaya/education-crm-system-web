import React from "react";
import { FormInput, FormAutocomplete, FormTextarea } from "@/components/forms";
import { FORM_OPTIONS } from "../constants/appointment-constants";

interface StudentInfoStepProps {
  className?: string;
}

export const StudentInfoStep: React.FC<StudentInfoStepProps> = ({
  className = "",
}) => {
  return (
    <div className={`step-content ${className}`}>
      <h4 className="mb-24">Öğrenci Bilgilerini Giriniz</h4>

      <div className="row gy-3">
        <div className="col-12">
          <FormInput
            name="studentName"
            label="Öğrenci Adı Soyadı *"
            placeholder="Öğrenci adını ve soyadını girin"
            variant="inline"
          />
        </div>

        <div className="col-md-6">
          <FormInput
            name="studentAge"
            type="number"
            label="Öğrenci Yaşı *"
            placeholder="Öğrencinin yaşı"
            min={5}
            max={25}
            variant="inline"
          />
        </div>

        <div className="col-md-6">
          <FormInput
            name="studentBirthDate"
            type="text"
            label="Öğrenci Doğum Tarihi"
            placeholder="YYYY-MM-DD"
            variant="inline"
          />
        </div>

        <div className="col-md-6">
          <FormAutocomplete
            name="studentGender"
            label="Öğrenci Cinsiyeti"
            placeholder="Cinsiyet seçiniz"
            options={[...FORM_OPTIONS.GENDER]}
            variant="inline"
          />
        </div>

        <div className="col-md-6">
          <FormAutocomplete
            name="gradeInterested"
            label="İlgilenilen Sınıf *"
            placeholder="Sınıf seçiniz"
            options={[...FORM_OPTIONS.GRADE]}
            variant="inline"
          />
        </div>

        <div className="col-12">
          <FormInput
            name="currentSchool"
            label="Mevcut Okul"
            placeholder="Mevcut okul adını girin"
            variant="inline"
          />
        </div>

        <div className="col-12">
          <FormTextarea
            name="specialRequests"
            label="Özel İstekler"
            placeholder="Özel isteklerinizi belirtin"
            rows={3}
            maxLength={500}
            variant="inline"
          />
        </div>

        <div className="col-12">
          <FormTextarea
            name="notes"
            label="Notlar"
            placeholder="Ek notlar"
            rows={3}
            maxLength={1000}
            variant="inline"
          />
        </div>
      </div>
    </div>
  );
};
