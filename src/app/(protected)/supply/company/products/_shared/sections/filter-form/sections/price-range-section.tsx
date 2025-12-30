import React from "react";
import { FormRange } from "@/components";

export const PriceRangeSection = {
  id: "priceRange",
  title: "Fiyat Aralığı",
  component: (
    <FormRange name="priceRange" min={1} max={1000000} step={1} prefix="₺" />
  ),
};
