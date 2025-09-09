import React from "react";
import { FormRange } from "@/components";

export const AgeRangeSection = {
  id: "ageRange",
  title: "Yaş Aralığı",
  component: (
    <FormRange name="ageRange" min={1} max={80} step={1} suffix=" yaş" />
  ),
};
