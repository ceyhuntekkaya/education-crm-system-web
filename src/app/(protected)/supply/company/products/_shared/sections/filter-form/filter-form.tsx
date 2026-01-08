"use client";
import React from "react";
import {
  Form,
  Button,
  FormInput,
  FormAutocomplete,
  FormRange,
  FormRadio,
} from "@/components";
import { CustomCard, Divider } from "@/components/ui";
import { useFormHook } from "@/hooks";
import { useProductsSearchContext } from "../../contexts";
import { FormValues } from "@/types";
import { createProductsApiParams, cleanProductsApiParams } from "../../utils";
import { SearchProductsStatus } from "../../api";

const statusOptions = [
  { value: SearchProductsStatus.ACTIVE, label: "Aktif" },
  { value: SearchProductsStatus.INACTIVE, label: "Pasif" },
  { value: SearchProductsStatus.OUT_OF_STOCK, label: "Stokta Yok" },
  { value: SearchProductsStatus.DISCONTINUED, label: "Üretimi Durduruldu" },
];

const FilterForm = () => {
  const { resetForm, values } = useFormHook();
  const { search, resetSearch, options } = useProductsSearchContext();

  const onSubmit = (values: FormValues) => {
    const apiParams = createProductsApiParams(values);
    const cleanParams = cleanProductsApiParams(apiParams);
    search(cleanParams);
  };

  return (
    <CustomCard
      title="Arama Kriterleri"
      subtitle="Lütfen arama kriterlerinizi seçin"
      type="accordion"
      size="sm"
    >
      <Form onSubmit={onSubmit}>
        <div className="row g-4">
          <div className="col-12">
            <FormInput
              name="searchTerm"
              variant="outline"
              placeholder="Ürün adı, kodu veya açıklama ile ara..."
              iconLeft="ph-magnifying-glass"
              fullWidth
            />
          </div>

          <div className="col-6">
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

          <div className="col-6">
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

          <div className="col-6">
            <FormRange
              name="priceRange"
              min={1}
              max={1000000}
              step={1}
              prefix="₺"
              direction="horizontal"
            />
          </div>

          <div className="col-6">
            <div className="px-24">
              <FormRadio
                name="status"
                label=""
                value=""
                options={statusOptions}
                multi={true}
                direction="horizontal"
                col={6}
              />
            </div>
          </div>
        </div>

        <Divider size="sm" />

        <div className="d-flex gap-12 justify-content-end">
          <Button
            type="reset"
            variant="outline"
            leftIcon="ph-arrow-clockwise"
            onClick={() => {
              resetForm();
              resetSearch();
            }}
            size="sm"
          >
            Sıfırla
          </Button>
          <Button
            type="submit"
            variant="inline"
            leftIcon="ph-magnifying-glass"
            size="sm"
          >
            Filtrele
          </Button>
        </div>
      </Form>
    </CustomCard>
  );
};

export default FilterForm;
