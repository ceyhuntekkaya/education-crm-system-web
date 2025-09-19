import React from "react";
import { FormRadio } from "@/components";
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
        <div className="d-flex align-items-center justify-content-center py-2">
          <div className="spinner-border spinner-border-sm me-2" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <small className="text-muted">Kurum türleri yükleniyor...</small>
        </div>
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
