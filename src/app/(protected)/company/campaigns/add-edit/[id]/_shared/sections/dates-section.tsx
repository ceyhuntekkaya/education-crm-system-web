"use client";

import React from "react";
import { FormInput } from "@/components/forms";

interface DatesSectionProps {}

const DatesSection: React.FC<DatesSectionProps> = () => {
  return (
    <div className="bg-white rounded-8 p-24 mb-24">
      <h4 className="mb-16">Tarih Bilgileri</h4>

      <div className="d-flex flex-column gap-3">
        <FormInput
          name="startDate"
          type="date"
          label="Başlangıç Tarihi"
          variant="inline"
          required
        />

        <FormInput
          name="endDate"
          type="date"
          label="Bitiş Tarihi"
          variant="inline"
          required
        />

        <FormInput
          name="earlyBirdEndDate"
          type="date"
          label="Erken Kayıt Bitiş Tarihi"
          variant="inline"
        />

        <FormInput
          name="registrationDeadline"
          type="date"
          label="Kayıt Son Tarihi"
          variant="inline"
        />

        <FormInput
          name="enrollmentStartDate"
          type="date"
          label="Kayıt Başlangıç Tarihi"
          variant="inline"
        />

        <FormInput
          name="enrollmentEndDate"
          type="date"
          label="Kayıt Bitiş Tarihi"
          variant="inline"
        />
      </div>
    </div>
  );
};

export default DatesSection;
