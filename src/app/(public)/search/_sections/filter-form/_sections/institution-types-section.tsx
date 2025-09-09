import React from "react";
import { FormCheckbox } from "@/components";

interface InstitutionTypesSectionProps {
  options: any;
}

export const InstitutionTypesSection = ({
  options,
}: InstitutionTypesSectionProps) => ({
  id: "institutionTypes",
  title: "Kurum Türü",
  component: (
    <FormCheckbox
      name="institutionTypeIds"
      label=""
      options={options.institution.data}
      multi={true}
    />
  ),
});
