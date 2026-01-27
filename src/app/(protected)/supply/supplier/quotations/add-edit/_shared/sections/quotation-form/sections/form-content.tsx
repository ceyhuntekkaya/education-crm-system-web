"use client";

import React, { forwardRef, useImperativeHandle, useEffect } from "react";
import { Form, FormInput, FormTextarea } from "@/components/forms";
import { useFormHook } from "@/hooks";
import { useForm } from "@/contexts/form-context";
import { useQuotationAddEdit } from "../../../context";
import { QuotationFormData } from "../types/form-data";

export interface QuotationFormHandle {
  submitForm: () => Promise<number | null>; // Quotation ID döndürür
}

/**
 * Quotation form content component
 */
export const QuotationFormContent = forwardRef<QuotationFormHandle, {}>(
  (props, ref) => {
    // Form reset hook'u
    const { reset, setValue, values } = useForm();

    // Context'ten Quotation işlemlerini al
    const {
      isEditing,
      postQuotation,
      putQuotation,
      quotationError,
      totalItemsAmount, // Tüm itemların toplamı
    } = useQuotationAddEdit();

    // totalItemsAmount değiştiğinde totalAmount'u güncelle
    useEffect(() => {
      if (totalItemsAmount !== undefined && totalItemsAmount !== null) {
        // Sadece değer farklıysa güncelle
        const currentTotal = values?.totalAmount;
        if (currentTotal !== totalItemsAmount) {
          setValue("totalAmount", totalItemsAmount);
        }
      }
    }, [totalItemsAmount, setValue]);

    const handleSubmit = async (values: any): Promise<number | null> => {
      const formData = values as QuotationFormData;

      try {
        if (isEditing) {
          // UPDATE - Sadece QuotationUpdateDto'daki alanları gönder
          const updateData: any = {
            totalAmount: formData.totalAmount
              ? typeof formData.totalAmount === "string"
                ? parseFloat(formData.totalAmount)
                : formData.totalAmount
              : undefined,
            currency: formData.currency || undefined,
            validUntil: formData.validUntil || undefined,
            deliveryDays: formData.deliveryDays
              ? typeof formData.deliveryDays === "string"
                ? parseInt(formData.deliveryDays)
                : formData.deliveryDays
              : undefined,
            paymentTerms: formData.paymentTerms || undefined,
            warrantyTerms: formData.warrantyTerms || undefined,
            notes: formData.notes || undefined,
          };
          // Undefined değerleri temizle
          Object.keys(updateData).forEach(
            (key) => updateData[key] === undefined && delete updateData[key],
          );
          const result = await putQuotation(updateData);
          console.log("✅ putQuotation result:", result);
          const quotationId = (result as any)?.data?.id || result?.id || null;
          console.log("✅ quotationId:", quotationId);
          return quotationId;
        } else {
          // CREATE - Zorunlu alanlar ve opsiyonel alanlar
          const createData: any = {
            rfqId:
              typeof formData.rfqId === "string"
                ? parseInt(formData.rfqId)
                : formData.rfqId,
            supplierId:
              typeof formData.supplierId === "string"
                ? parseInt(formData.supplierId)
                : formData.supplierId,
            totalAmount: formData.totalAmount
              ? typeof formData.totalAmount === "string"
                ? parseFloat(formData.totalAmount)
                : formData.totalAmount
              : undefined,
            currency: formData.currency || undefined,
            validUntil: formData.validUntil || undefined,
            deliveryDays: formData.deliveryDays
              ? typeof formData.deliveryDays === "string"
                ? parseInt(formData.deliveryDays)
                : formData.deliveryDays
              : undefined,
            paymentTerms: formData.paymentTerms || undefined,
            warrantyTerms: formData.warrantyTerms || undefined,
            notes: formData.notes || undefined,
          };
          // Undefined değerleri temizle
          Object.keys(createData).forEach(
            (key) => createData[key] === undefined && delete createData[key],
          );
          const result = await postQuotation(createData);
          console.log("✅ postQuotation result:", result);
          const quotationId = (result as any)?.data?.id || result?.id || null;
          console.log("✅ quotationId:", quotationId);
          return quotationId;
        }
      } catch (error) {
        throw error;
      }
    };

    // Expose submit method to parent
    useImperativeHandle(ref, () => ({
      submitForm: async () => {
        return handleSubmit(values);
      },
    }));

    const handleFormSubmit = async (values: any): Promise<void> => {
      await handleSubmit(values);
    };

    return (
      <Form onSubmit={handleFormSubmit}>
        <div className="row row-gap-24">
          <div className="col-4">
            <FormInput
              name="totalAmount"
              label="Toplam Tutar"
              type="number"
              placeholder="Otomatik hesaplanıyor..."
              step="0.01"
              min="0"
              disabled={true}
              helperText="Tüm kalem toplamlarının toplamıdır"
            />
          </div>

          {/* <div className="col-6">
            <FormAutocomplete
              name="currency"
              label="Para Birimi"
              options={currencyOptions}
              placeholder="Para birimi seçiniz..."
            />
          </div> */}

          <div className="col-4">
            <FormInput
              name="validUntil"
              label="Geçerlilik Tarihi"
              type="date"
              placeholder="Geçerlilik tarihini seçiniz..."
            />
          </div>

          <div className="col-4">
            <FormInput
              name="deliveryDays"
              label="Teslimat Süresi (Gün)"
              type="number"
              placeholder="Teslimat süresini giriniz..."
              min="0"
            />
          </div>

          <div className="col-4">
            <FormTextarea
              name="paymentTerms"
              label="Ödeme Koşulları"
              placeholder="Ödeme koşullarını giriniz..."
              rows={4}
            />
          </div>

          <div className="col-4">
            <FormTextarea
              name="warrantyTerms"
              label="Garanti Koşulları"
              placeholder="Garanti koşullarını giriniz..."
              rows={4}
            />
          </div>

          <div className="col-4">
            <FormTextarea
              name="notes"
              label="Notlar"
              placeholder="Ek notlarınızı giriniz..."
              rows={6}
            />
          </div>

          {/* Hata Mesajı */}
          {quotationError && (
            <div className="col-12">
              <div className="alert alert-danger" role="alert">
                {quotationError}
              </div>
            </div>
          )}
        </div>
      </Form>
    );
  },
);

QuotationFormContent.displayName = "QuotationFormContent";
