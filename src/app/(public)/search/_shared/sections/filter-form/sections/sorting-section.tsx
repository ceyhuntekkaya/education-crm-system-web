import React from "react";
import { FormAutocomplete } from "@/components";
import { sortOptions, sortDirectionOptions } from "../options";

export const SortingSection = {
  id: "sorting",
  title: "Sıralama",
  component: (
    <div className="d-flex flex-column gap-16">
      <FormAutocomplete
        name="sortBy"
        variant="inline"
        placeholder="Sıralama türü seçin..."
        options={sortOptions}
        noOptionsText="Sıralama seçeneği bulunamadı"
      />
      <FormAutocomplete
        name="sortDirection"
        variant="inline"
        placeholder="Sıralama yönü seçin..."
        options={sortDirectionOptions}
        noOptionsText="Yön seçeneği bulunamadı"
      />
    </div>
  ),
};
