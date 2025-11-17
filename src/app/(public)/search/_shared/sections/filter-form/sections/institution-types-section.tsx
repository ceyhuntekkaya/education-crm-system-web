import React from "react";
import { FormRadio } from "@/components";
import { useSearchContext } from "../../../contexts";

export const InstitutionTypesSection = () => {
  // Kurum türleri için radio button seçenekleri

  const { options } = useSearchContext();

  return {
    id: "institutionTypes",
    title: "Kurum Türleri",
    component: (
      <div className="institution-types-section">
        <FormRadio
          name="institutionTypeId"
          label=""
          value=""
          options={options.institution.data}
          multi={true}
          isShowAll
          minShowingValues={5}
        />
      </div>
    ),
  };
};
