import React from "react";
import { FormAutocomplete, FormInput } from "@/components";
import { useSearchContext } from "../../../contexts";
import { useFormHook } from "@/hooks";

export const LocationSection = () => {
  const { values } = useFormHook();
  const { options } = useSearchContext();

  return {
    id: "location",
    title: "Lokasyon",
    component: (
      <div className="d-flex flex-column gap-16">
        {/* <FormAutocomplete
          key={`country-${values.countryId || "empty"}`}
          name="countryId"
          variant="inline"
          placeholder="Ülke ara..."
          options={options.location.countries.data}
          noOptionsText="Ülke bulunamadı"
          isLoading={options.location.countries.loading}
          disabled={true}
        /> */}
        <FormAutocomplete
          key={`province-${values.countryId}-${values.provinceId || "empty"}`}
          name="provinceId"
          variant="inline"
          placeholder="İl ara..."
          options={options.location.provinces.data}
          noOptionsText="İl bulunamadı"
          isLoading={options.location.provinces.loading}
          disabled={!values.countryId}
        />
        <FormAutocomplete
          key={`district-${values.provinceId}-${values.districtId || "empty"}`}
          name="districtId"
          variant="inline"
          placeholder="İlçe ara..."
          options={options.location.districts.data}
          noOptionsText="İlçe bulunamadı"
          isLoading={options.location.districts.loading}
          disabled={!values.provinceId}
        />
        <FormAutocomplete
          key={`neighborhood-${values.districtId}-${
            values.neighborhoodId || "empty"
          }`}
          name="neighborhoodId"
          variant="inline"
          placeholder="Mahalle ara..."
          options={options.location.neighborhoods.data}
          noOptionsText="Mahalle bulunamadı"
          isLoading={options.location.neighborhoods.loading}
          disabled={!values.districtId}
        />
        {/* <FormInput
        name="radiusKm"
        type="number"
        label="Yarıçap (km)"
        variant="inline"
        placeholder="Yarıçap (km)"
        min="1"
        max="100"
        step="1"
      /> */}
      </div>
    ),
  };
};
