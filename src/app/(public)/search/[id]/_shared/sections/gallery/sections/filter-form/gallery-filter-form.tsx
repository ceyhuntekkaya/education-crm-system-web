"use client";

import React from "react";
import {
  Form,
  FormInput,
  FormAutocomplete,
  FormCheckbox,
} from "@/components/forms";
import { Button } from "@/components/ui/button";
import { useFormHook } from "@/hooks";
import { FormProvider } from "@/contexts";
import { useGalleryContext } from "../../context";
import { GallerySearchDto } from "@/types/dto/content/GallerySearchDto";
import {
  galleryFilterInitialValues,
  galleryFilterValidationSchema,
} from "./schema";
import { galleryTypeOptions } from "./options";

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
    // console.log("Gallery Filter Values:", values);
    filterSubmit(values);
  };

  return (
    <div className={`gallery-filter-form ${className || ""}`}>
      <div className="border border-neutral-30 rounded-12 bg-white p-8 my-16">
        <div className="border border-neutral-30 rounded-12 p-20">
          <h4 className="text-neutral-700 text-lg fw-semibold mb-16 d-flex align-items-center">
            <i className="ph-bold ph-funnel me-8" />
            Galeri Filtreleri
          </h4>
          <Form onSubmit={handleSubmit} className="d-flex flex-column">
            {/* Filtreler */}
            <div className="mb-24">
              <div className="row g-3 mb-4">
                <div className="col-lg-4">
                  <FormInput
                    name="searchTerm"
                    type="text"
                    label="Arama"
                    placeholder="Galeri başlığı veya açıklama ara..."
                    variant="inline"
                    iconLeft="ph-magnifying-glass"
                  />
                </div>
                <div className="col-lg-4">
                  <FormInput
                    name="tags"
                    type="text"
                    label="Etiketler"
                    placeholder="Etiket ara (virgülle ayırın)"
                    variant="inline"
                    iconLeft="ph-tag"
                  />
                </div>
                <div className="col-lg-4">
                  <FormAutocomplete
                    name="galleryType"
                    label="Galeri Tipi"
                    placeholder="Galeri tipi seçin..."
                    variant="inline"
                    options={[
                      { value: "", label: "Tüm tipler" },
                      ...galleryTypeOptions,
                    ]}
                    iconLeft="ph-images"
                  />
                </div>
              </div>
            </div>

            {/* Checkbox ve Butonlar */}
            <div className="d-flex justify-content-between align-items-center">
              <FormCheckbox
                name="isFeatured"
                label="Sadece öne çıkan galerileri göster"
                className="mb-0"
              />
              <div className="d-flex gap-16">
                <Button
                  type="button"
                  variant="outline"
                  onClick={resetForm}
                  className="px-24 py-8"
                  leftIcon="ph-x-circle"
                  size="sm"
                >
                  Temizle
                </Button>
                <Button
                  type="submit"
                  variant="inline"
                  disabled={!isValid}
                  className="px-24 py-8"
                  leftIcon="ph-funnel"
                  size="sm"
                >
                  Filtrele
                </Button>
              </div>
            </div>
          </Form>
        </div>
      </div>
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
