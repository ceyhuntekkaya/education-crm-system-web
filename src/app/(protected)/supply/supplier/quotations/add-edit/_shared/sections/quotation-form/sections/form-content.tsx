"use client";

import React from "react";
import {
  Form,
  FormInput,
  FormTextarea,
  FormAutocomplete,
} from "@/components/forms";
import { Button } from "@/components/ui/button";
import { Divider } from "@/components";
import { useFormHook } from "@/hooks";
import { useForm } from "@/contexts/form-context";
import { useQuotationAddEdit } from "../../../context";
import { QuotationFormData } from "../types/form-data";

/**
 * Quotation form content component
 */
export const QuotationFormContent: React.FC = () => {
  // Form hook - validation ve error kontrolü için
  const { hasErrors } = useFormHook();

  // Form reset hook'u
  const { reset } = useForm();

  // Context'ten Quotation işlemlerini al
  const {
    isEditing,
    postQuotation,
    putQuotation,
    quotationSubmitLoading,
    quotationError,
  } = useQuotationAddEdit();

  // Currency options
  const currencyOptions = [
    { value: "TRY", label: "TRY - Türk Lirası" },
    { value: "USD", label: "USD - Amerikan Doları" },
    { value: "EUR", label: "EUR - Euro" },
    { value: "GBP", label: "GBP - İngiliz Sterlini" },
    { value: "CHF", label: "CHF - İsviçre Frangı" },
    { value: "CAD", label: "CAD - Kanada Doları" },
    { value: "AUD", label: "AUD - Avustralya Doları" },
    { value: "JPY", label: "JPY - Japon Yeni" },
    { value: "CNY", label: "CNY - Çin Yuanı" },
    { value: "RUB", label: "RUB - Rus Rublesi" },
    { value: "SAR", label: "SAR - Suudi Arabistan Riyali" },
    { value: "AED", label: "AED - Birleşik Arap Emirlikleri Dirhemi" },
    { value: "QAR", label: "QAR - Katar Riyali" },
    { value: "KWD", label: "KWD - Kuveyt Dinarı" },
    { value: "BHD", label: "BHD - Bahreyn Dinarı" },
  ];

  const handleSubmit = async (values: any) => {
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
        await putQuotation(updateData);
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
        await postQuotation(createData);
      }
    } catch (error) {
      console.error("❌ Form submit hatası:", error);
    }
  };

  const handleCancel = () => {
    reset();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div className="row row-gap-24">
        {/* FİYATLANDIRMA BİLGİLERİ */}
        <div className="col-12">
          <h5 className="mb-16">Fiyatlandırma Bilgileri</h5>
        </div>

        <div className="col-6">
          <FormInput
            name="totalAmount"
            label="Toplam Tutar"
            type="number"
            placeholder="Toplam tutarı giriniz..."
            step="0.01"
            min="0"
          />
        </div>

        <div className="col-6">
          <FormAutocomplete
            name="currency"
            label="Para Birimi"
            options={currencyOptions}
            placeholder="Para birimi seçiniz..."
          />
        </div>

        <Divider />

        {/* TESLİMAT VE GEÇERLİLİK */}
        <div className="col-12">
          <h5 className="mb-16">Teslimat ve Geçerlilik</h5>
        </div>

        <div className="col-6">
          <FormInput
            name="validUntil"
            label="Geçerlilik Tarihi"
            type="date"
            placeholder="Geçerlilik tarihini seçiniz..."
          />
        </div>

        <div className="col-6">
          <FormInput
            name="deliveryDays"
            label="Teslimat Süresi (Gün)"
            type="number"
            placeholder="Teslimat süresini giriniz..."
            min="0"
          />
        </div>

        <Divider />

        {/* KOŞULLAR VE NOTLAR */}
        <div className="col-12">
          <h5 className="mb-16">Koşullar ve Notlar</h5>
        </div>

        <div className="col-12">
          <FormTextarea
            name="paymentTerms"
            label="Ödeme Koşulları"
            placeholder="Ödeme koşullarını giriniz..."
            rows={4}
          />
        </div>

        <div className="col-12">
          <FormTextarea
            name="warrantyTerms"
            label="Garanti Koşulları"
            placeholder="Garanti koşullarını giriniz..."
            rows={4}
          />
        </div>

        <div className="col-12">
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

        <Divider />

        {/* BUTONLAR */}
        <div className="col-12">
          <div className="d-flex gap-12 justify-content-end me-32">
            <Button
              type="button"
              onClick={handleCancel}
              className="btn-md btn-outline-secondary"
              disabled={quotationSubmitLoading}
            >
              İptal
            </Button>
            <Button
              type="submit"
              className="btn-md btn-primary"
              disabled={hasErrors || quotationSubmitLoading}
              loading={quotationSubmitLoading}
            >
              {isEditing ? "Güncelle" : "Oluştur"}
            </Button>
          </div>
        </div>
      </div>
    </Form>
  );
};
