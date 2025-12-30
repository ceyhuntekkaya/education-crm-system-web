import React from "react";
import { FormAutocomplete } from "@/components";
import { useProductsSearchContext } from "../../../contexts";
import { useFormHook } from "@/hooks";

export const CategorySection = () => {
  const { values } = useFormHook();
  const { options } = useProductsSearchContext();

  return {
    id: "category",
    title: "Kategori",
    component: (
      <div className="d-flex flex-column gap-16">
        <FormAutocomplete
          key={`category-${values.categoryId || "empty"}`}
          name="categoryId"
          variant="outline"
          placeholder="Kategori ara..."
          options={options.categories.data}
          noOptionsText="Kategori bulunamadı"
          isLoading={options.categories.loading}
        />
      </div>
    ),
  };
};
