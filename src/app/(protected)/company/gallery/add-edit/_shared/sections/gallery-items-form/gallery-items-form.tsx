"use client";

import React from "react";
import { FormProvider } from "@/contexts/form-context";
import { GalleryItemFormContent, GalleryItemsList } from "./sections";
import {
  validationSchema as galleryItemValidationSchema,
  initialValues as galleryItemInitialValues,
} from "./schemas";
import { GalleryItemFormProps } from "./types/props";
import { transformGalleryItemToFormData } from "../../utils/gallery-item-utils";
import { useGalleryAddEdit } from "../../context";

/**
 * Gallery item form component
 */
export const GalleryItemForm: React.FC<GalleryItemFormProps> = ({
  className,
  initialData,
}) => {
  const { gallery, selectedItem, isAddingNew, handleItemSelect, handleAddNew } =
    useGalleryAddEdit();

  // Form için initial values
  const formInitialValues = selectedItem
    ? {
        ...galleryItemInitialValues,
        ...transformGalleryItemToFormData(selectedItem),
      }
    : galleryItemInitialValues;

  return (
    <div className={className}>
      {/* Items List - Her zaman göster */}
      <div>
        {/* Header */}
        <div className="mb-20">
          <h6 className="mb-4">Mevcut Medya Öğeleri</h6>
          <p className="text-sm text-neutral-600 mb-0">
            Düzenlemek için bir öğe seçin veya yeni ekleyin
          </p>
        </div>

        {/* Divider */}
        <span className="d-block border border-neutral-30 mb-24 border-dashed" />

        <GalleryItemsList
          items={gallery?.items || []}
          selectedItem={selectedItem}
          onItemSelect={handleItemSelect}
          onAddNew={handleAddNew}
        />
      </div>

      {/* Form - Item seçildiğinde veya yeni ekleme modunda göster */}
      {(selectedItem || isAddingNew) && (
        <>
          {/* Divider */}
          <span className="d-block border border-neutral-30 my-32 border-dashed" />

          <div className="gallery-items-form__form-section">
            {/* Header */}
            <div className="mb-20">
              <h6 className="mb-4">
                {selectedItem
                  ? "Medya Öğesini Düzenle"
                  : "Yeni Medya Öğesi Ekle"}
              </h6>
              {selectedItem && (
                <p className="text-sm text-neutral-600 mb-0">
                  Seçili öğeyi düzenleyin veya yeni bir öğe eklemek için
                  &quot;Yeni Ekle&quot; butonuna tıklayın
                </p>
              )}
            </div>

            {/* Divider */}
            <span className="d-block border border-neutral-30 mb-24 border-dashed" />

            <FormProvider
              initialValues={formInitialValues}
              validationSchema={galleryItemValidationSchema}
              key={selectedItem?.id || "new"} // Key ile formu yeniden render et
            >
              <GalleryItemFormContent selectedItem={selectedItem} />
            </FormProvider>
          </div>
        </>
      )}
    </div>
  );
};
