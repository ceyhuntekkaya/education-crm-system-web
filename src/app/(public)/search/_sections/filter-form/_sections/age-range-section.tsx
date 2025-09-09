import React from "react";
import { FormRange } from "@/components";

export const AgeRangeSection = {
  id: "ageRange",
  title: null,
  component: (
    <FormRange
      name="ageRange"
      label="Yaş Aralığı"
      min={1}
      max={80}
      step={1}
      suffix=" yaş"
    />
  ),
};
