import React from "react";
import { FormRadio } from "@/components";

interface SektorSectionProps {
  options?: any;
}

export const SektorSection = ({ options }: SektorSectionProps) => {
  return {
    id: "sektor",
    title: "Sektör",
    component: (
      <FormRadio
        name="sektor"
        label=""
        value=""
        options={[
          { value: "ozel", label: "Özel" },
          { value: "devlet", label: "Devlet" },
        ]}
        multi={true}
      />
    ),
  };
};
