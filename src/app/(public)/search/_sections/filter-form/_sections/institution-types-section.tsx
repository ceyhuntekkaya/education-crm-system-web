import React from "react";
import { FormRadio } from "@/components";
import { mockSearchFilterParams } from "../../../_mock";

export const InstitutionTypesSection = () => {
  // Kurum türleri için radio button seçenekleri
  const institutionTypeOptions = mockSearchFilterParams
    .filter(
      (item) =>
        item.institutionTypeDto?.id && item.institutionTypeDto?.displayName
    )
    .map((item) => ({
      value: item.institutionTypeDto!.id!.toString(),
      label: item.institutionTypeDto!.displayName!,
    }));

  return {
    id: "institutionTypes",
    title: "Kurum Türleri",
    component: (
      <div className="institution-types-section">
        <FormRadio
          name="institutionTypeId"
          label=""
          value=""
          options={institutionTypeOptions}
          multi={true}
        />
      </div>
    ),
  };
};
