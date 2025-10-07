import React from "react";
import { FormRadio, LoadingSpinner } from "@/components";
import { useFilterSearchContext } from "../contexts";

export const InstitutionTypesSection = () => {
  const { options } = useFilterSearchContext();

  return (
    <div className="institution-types-section">
      <FormRadio
        name="institutionTypeId"
        label=""
        value=""
        options={options.institutionTypes.data}
        multi={true}
        direction="horizontal"
        col={6}
      />
      {options.institutionTypes.loading && (
        <LoadingSpinner
          message="Kurum türleri yükleniyor..."
          size="sm"
          variant="dots"
        />
      )}
      {options.institutionTypes.error && (
        <div className="text-center py-2">
          <small className="text-danger">
            Kurum türleri yüklenirken hata oluştu
          </small>
        </div>
      )}
    </div>
  );
};
