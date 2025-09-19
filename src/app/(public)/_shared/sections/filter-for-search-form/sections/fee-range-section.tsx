import React from "react";
import { FormRange } from "@/components";

export const FeeRangeSection = () => (
  <div className="fee-range-section">
    <FormRange name="feeRange" min={1} max={1000000} step={1000} prefix="₺" />
  </div>
);
