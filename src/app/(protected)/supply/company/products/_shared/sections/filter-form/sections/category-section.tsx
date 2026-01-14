import React from "react";
import { FormAutocomplete } from "@/components";
import { useProductsContext } from "../../../contexts";
import { useFormHook } from "@/hooks";

export const CategorySection = () => {
  const { values } = useFormHook();
  const { categories, categoriesLoading } = useProductsContext();

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
          options={categories}
          noOptionsText="Kategori bulunamadı"
          isLoading={categoriesLoading}
        />
      </div>
    ),
  };
};
