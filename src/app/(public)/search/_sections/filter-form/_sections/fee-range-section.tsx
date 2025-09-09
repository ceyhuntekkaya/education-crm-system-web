import React from "react";
import { FormRange } from "@/components";

export const FeeRangeSection = {
  id: "feeRange",
  title: null,
  component: (
    <FormRange
      name="feeRange"
      label="Ücret Aralığı"
      min={0.1}
      max={10000}
      step={0.1}
      prefix="₺"
    />
  ),
};
