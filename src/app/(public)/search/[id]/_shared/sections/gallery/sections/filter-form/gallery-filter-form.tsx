"use client";

import React from "react";
import { Form, FormInput, FormSelect, FormCheckbox } from "@/components/forms";
import { Button } from "@/components/ui/button";
import { useFormHook } from "@/hooks";
import { FormProvider } from "@/contexts";
import { useGalleryContext } from "../../context";
import { GallerySearchDto } from "@/types/dto/content/GallerySearchDto";
import {
  galleryFilterInitialValues,
  galleryFilterValidationSchema,
} from "./schema";
import {
  galleryTypeOptions,
  visibilityOptions,
  sortOptions,
  sortDirectionOptions,
} from "./options";

interface GalleryFilterFormProps {
  className?: string;
  initialValues?: Partial<GallerySearchDto>;
}

const GalleryFilterFormContent: React.FC<
  Omit<GalleryFilterFormProps, "initialValues">
> = ({ className }) => {
  const { resetForm, isValid } = useFormHook();
  const { filterSubmit } = useGalleryContext();

  const handleSubmit = async (values: GallerySearchDto) => {
    console.log("Gallery Filter Values:", values);
    filterSubmit(values);
  };

  return (
    <div className={`gallery-filter-form ${className || ""}`}>
      <Form onSubmit={handleSubmit} className="d-flex flex-column gap-20">
        {/* Arama ve Temel Filtreler */}
        <div className="row">
          <div className="col-md-6">
            <FormInput
              name="searchTerm"
              type="text"
              label="Arama"
              placeholder="Galeri başlığı veya açıklama ara..."
              variant="outline"
              iconLeft="ph-magnifying-glass"
            />
          </div>
          <div className="col-md-6">
            <FormInput
              name="tags"
              type="text"
              label="Etiketler"
              placeholder="Etiket ara (virgülle ayırın)"
              variant="outline"
              iconLeft="ph-tag"
            />
          </div>
        </div>

        {/* ID Filtreleri */}
        <div className="row">
          <div className="col-md-4">
            <FormInput
              name="brandId"
              type="number"
              label="Marka ID"
              placeholder="Marka ID girin"
              variant="outline"
            />
          </div>
          <div className="col-md-4">
            <FormInput
              name="campusId"
              type="number"
              label="Kampüs ID"
              placeholder="Kampüs ID girin"
              variant="outline"
            />
          </div>
          <div className="col-md-4">
            <FormInput
              name="schoolId"
              type="number"
              label="Okul ID"
              placeholder="Okul ID girin"
              variant="outline"
            />
          </div>
        </div>

        {/* Galeri Tipi ve Görünürlük */}
        <div className="row">
          <div className="col-md-6">
            <FormSelect
              name="galleryType"
              label="Galeri Tipi"
              variant="outline"
              options={[{ value: "", label: "Tümü" }, ...galleryTypeOptions]}
              iconLeft="ph-images"
            />
          </div>
          <div className="col-md-6">
            <FormSelect
              name="visibility"
              label="Görünürlük"
              variant="outline"
              options={[{ value: "", label: "Tümü" }, ...visibilityOptions]}
              iconLeft="ph-eye"
            />
          </div>
        </div>

        {/* Öne Çıkan Filtresi */}
        <div className="row">
          <div className="col-md-12">
            <FormCheckbox
              name="isFeatured"
              label="Sadece öne çıkan galerileri göster"
            />
          </div>
        </div>

        {/* Sayfalama ve Sıralama */}
        <div className="row">
          <div className="col-md-3">
            <FormInput
              name="page"
              type="number"
              label="Sayfa"
              placeholder="1"
              variant="outline"
              min="1"
            />
          </div>
          <div className="col-md-3">
            <FormInput
              name="size"
              type="number"
              label="Sayfa Boyutu"
              placeholder="12"
              variant="outline"
              min="1"
              max="100"
            />
          </div>
          <div className="col-md-3">
            <FormSelect
              name="sortBy"
              label="Sıralama Ölçütü"
              variant="outline"
              options={sortOptions}
              iconLeft="ph-sort-ascending"
            />
          </div>
          <div className="col-md-3">
            <FormSelect
              name="sortDirection"
              label="Sıralama Yönü"
              variant="outline"
              options={sortDirectionOptions}
              iconLeft="ph-arrow-up-down"
            />
          </div>
        </div>

        {/* Butonlar */}
        <div className="d-flex gap-16 justify-content-end mt-20">
          <Button
            type="button"
            variant="outline"
            onClick={resetForm}
            className="px-24"
          >
            <i className="ph-bold ph-x-circle me-8" />
            Temizle
          </Button>
          <Button
            type="submit"
            variant="inline"
            disabled={!isValid}
            className="px-24"
          >
            <i className="ph-bold ph-funnel me-8" />
            Filtrele
          </Button>
        </div>
      </Form>
    </div>
  );
};

// Ana GalleryFilterForm component'i - Provider'ı kendi içinde sarmalıyor
export const GalleryFilterForm: React.FC<GalleryFilterFormProps> = ({
  className,
  initialValues,
}) => {
  // Merge provided initial values with defaults
  const mergedInitialValues = {
    ...galleryFilterInitialValues,
    ...initialValues,
  };

  return (
    <FormProvider
      initialValues={mergedInitialValues}
      validationSchema={galleryFilterValidationSchema}
    >
      <GalleryFilterFormContent className={className} />
    </FormProvider>
  );
};
