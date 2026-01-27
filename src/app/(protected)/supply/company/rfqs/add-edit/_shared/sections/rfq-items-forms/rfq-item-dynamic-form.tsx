"use client";

import React, { useState, forwardRef, useImperativeHandle } from "react";
import { CustomCard } from "@/components";
import { FormProvider } from "@/contexts/form-context";
import {
  Form,
  FormInput,
  FormTextarea,
  FormAutocomplete,
} from "@/components/forms";
import { useForm } from "@/contexts/form-context";
import { Button } from "@/components/ui/button";
import type { RFQItemFormData } from "../../../../items/[id]/add-edit/_shared/sections/item-form/types";
import {
  validationSchema,
  initialValues,
} from "../../../../items/[id]/add-edit/_shared/sections/item-form/schemas";
import type { RFQItemCreateDto } from "@/types";
import { useRFQAddEdit } from "../../context";

// Birim seçenekleri
const UNIT_OPTIONS = [
  { value: "ADET", label: "Adet" },
  { value: "KG", label: "Kilogram" },
  { value: "LT", label: "Litre" },
  { value: "M", label: "Metre" },
  { value: "M2", label: "Metrekare" },
  { value: "M3", label: "Metreküp" },
  { value: "PAKET", label: "Paket" },
  { value: "KUTU", label: "Kutu" },
];

interface RFQItemDynamicFormProps {
  index: number;
  onRemove: () => void;
}

export interface RFQItemFormHandle {
  submitForm: (rfqId: number) => Promise<void>;
}

/**
 * RFQ Item Dynamic Form - Her kalem için bir form
 */
export const RFQItemDynamicForm = forwardRef<
  RFQItemFormHandle,
  RFQItemDynamicFormProps
>(({ index, onRemove }, ref) => {
  return (
    <CustomCard
      title={`Kalem ${index + 1}`}
      subtitle="Kalem bilgilerini girin"
      headerAction={
        index > 0 ? (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onRemove}
            className="text-red-500 hover:text-red-700"
          >
            Kaldır
          </Button>
        ) : undefined
      }
    >
      <FormProvider
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        <ItemFormContent ref={ref} index={index} />
      </FormProvider>
    </CustomCard>
  );
});

RFQItemDynamicForm.displayName = "RFQItemDynamicForm";

/**
 * Form content component
 */
interface ItemFormContentProps {
  index: number;
}

const ItemFormContent = forwardRef<RFQItemFormHandle, ItemFormContentProps>(
  ({ index }, ref) => {
    const { values, reset, validate } = useForm();
    const [submitError, setSubmitError] = useState<string | null>(null);
    const { postRFQItem, selectedCategoryId } = useRFQAddEdit();

    // Expose submitForm to parent
    useImperativeHandle(ref, () => ({
      submitForm: async (rfqId: number) => {
        try {
          setSubmitError(null);

          const formValues = values as RFQItemFormData;

          // Check if form has required data - eğer tamamen boşsa skip et
          if (!formValues.itemName && !formValues.quantity && !formValues.unit) {
            return; // Skip completely empty forms
          }

          // Validate form - Dolu veya kısmen dolu form için validasyon yap
          const isValid = await validate();
          if (!isValid) {
            throw new Error(`Kalem ${index + 1}: Lütfen form hatalarını düzeltin`);
          }

          // Map form data to DTO - use selectedCategoryId from context
          const dto: RFQItemCreateDto = {
            categoryId:
              selectedCategoryId && selectedCategoryId !== ""
                ? parseInt(selectedCategoryId, 10)
                : undefined,
            itemName: formValues.itemName,
            specifications: formValues.specifications || undefined,
            quantity: formValues.quantity,
            unit: formValues.unit || undefined,
          };

          // Post item to API
          await postRFQItem(rfqId, dto);
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : `Kalem ${index + 1} gönderilirken hata oluştu`;
          setSubmitError(errorMessage);
          console.error(`❌ Kalem ${index + 1} hatası:`, error);
          throw error;
        }
      },
    }));

    return (
      <Form onSubmit={(e) => e.preventDefault()}>
        <div className="row row-gap-16 mt-12">
          {/* Sol Taraf - Ürün Bilgileri */}
          <div className="col-md-6">
            <div className="row row-gap-16">
              {/* Ürün Adı */}
              <div className="col-12">
                <FormInput
                  name="itemName"
                  label="Ürün Adı"
                  type="text"
                  placeholder="Ürün adını girin"
                  isRequired
                />
              </div>

              {/* Miktar */}
              <div className="col-6">
                <FormInput
                  name="quantity"
                  label="Miktar"
                  type="number"
                  placeholder="Miktar girin"
                  min={1}
                  isRequired
                />
              </div>

              {/* Birim */}
              <div className="col-6">
                <FormAutocomplete
                  name="unit"
                  label="Birim"
                  options={UNIT_OPTIONS}
                  placeholder="Birim seçiniz"
                  isRequired
                />
              </div>
            </div>
          </div>

          {/* Sağ Taraf - Özellikler */}
          <div className="col-md-6">
            <FormTextarea
              name="specifications"
              label="Özellikler"
              placeholder="Ürün özelliklerini girin"
              rows={8}
            />
          </div>
        </div>

        {submitError && (
          <div className="alert alert-danger mt-3" role="alert">
            {submitError}
          </div>
        )}
      </Form>
    );
  },
);

ItemFormContent.displayName = "ItemFormContent";
