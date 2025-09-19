import React from "react";
import { FormAutocomplete } from "@/components";
import { useFilterSearchContext } from "../contexts";
import { useFormHook } from "@/hooks";

export const LocationSection = () => {
  const { values } = useFormHook();
  const { options } = useFilterSearchContext();

  return (
    <div>
      {/* Şehir ve İlçe - Row Col Yapısı */}
      <div className="row g-3">
        <div className="col-6">
          <FormAutocomplete
            key={`province-${values.provinceId || "empty"}`}
            name="provinceId"
            variant="inline"
            placeholder="Şehir ara..."
            options={options.location.provinces.data}
            noOptionsText="Şehir bulunamadı"
            isLoading={options.location.provinces.loading}
          />
        </div>
        <div className="col-6">
          <FormAutocomplete
            key={`district-${values.provinceId}-${
              values.districtId || "empty"
            }`}
            name="districtId"
            variant="inline"
            placeholder="İlçe ara..."
            options={options.location.districts.data}
            noOptionsText="İlçe bulunamadı"
            isLoading={options.location.districts.loading}
            disabled={!values.provinceId}
          />
        </div>
      </div>
    </div>
  );
};
