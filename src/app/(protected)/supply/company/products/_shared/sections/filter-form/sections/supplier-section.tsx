import React from "react";
import { FormAutocomplete } from "@/components";
import { useProductsSearchContext } from "../../../contexts";
import { useFormHook } from "@/hooks";

export const SupplierSection = () => {
  const { values } = useFormHook();
  const { options } = useProductsSearchContext();

  return {
    id: "supplier",
    title: "Tedarikçi",
    component: (
      <div className="d-flex flex-column gap-16">
        <FormAutocomplete
          key={`supplier-${values.supplierId || "empty"}`}
          name="supplierId"
          variant="outline"
          placeholder="Tedarikçi ara..."
          options={options.suppliers.data}
          noOptionsText="Tedarikçi bulunamadı"
          isLoading={options.suppliers.loading}
        />
      </div>
    ),
  };
};
