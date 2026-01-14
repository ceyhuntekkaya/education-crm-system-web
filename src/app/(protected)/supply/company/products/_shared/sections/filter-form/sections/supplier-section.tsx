import React from "react";
import { FormAutocomplete } from "@/components";
import { useProductsContext } from "../../../contexts";
import { useFormHook } from "@/hooks";

export const SupplierSection = () => {
  const { values } = useFormHook();
  const { suppliers, suppliersLoading } = useProductsContext();

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
          options={suppliers}
          noOptionsText="Tedarikçi bulunamadı"
          isLoading={suppliersLoading}
        />
      </div>
    ),
  };
};
