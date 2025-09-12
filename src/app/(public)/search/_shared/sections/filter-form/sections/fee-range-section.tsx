import React from "react";
import { FormRange } from "@/components";

export const FeeRangeSection = {
  id: "feeRange",
  title: "Ücret Aralığı",
  component: (
    <FormRange name="feeRange" min={1} max={1000000} step={1} prefix="₺" />
  ),
};
