"use client";

import React, { forwardRef, useImperativeHandle } from "react";
import {
  Form,
  FormInput,
  FormTextarea,
  FormAutocomplete,
} from "@/components/forms";
import { useForm } from "@/contexts/form-context";
import { useRFQAddEdit } from "../../../context";
import { RFQFormData } from "../types/form-data";

export interface RFQFormHandle {
  submitForm: () => Promise<number | null>;
}

/**
 * RFQ form content component
 */
export const RFQFormContent = forwardRef<RFQFormHandle, {}>((props, ref) => {
  // Form hooks
  const { values, validate, setValue } = useForm();

  // Context'ten RFQ işlemlerini ve veri listelerini al
  const {
    isEditing,
    postRFQ,
    putRFQ,
    rfqError,
    setSelectedCategoryId,
    categoriesData,
    categoriesLoading,
    suppliersData,
    suppliersLoading,
  } = useRFQAddEdit();

  // Sync category ID with context when it changes
  const formData = values as RFQFormData;
  const categoryId = formData.categoryId;
  const rfqType = formData.rfqType;
  
  React.useEffect(() => {
    setSelectedCategoryId(categoryId || null);
  }, [categoryId, setSelectedCategoryId]);

  // Tedarikçiler sadece davetli tipinde aktif
  const isSuppliersEnabled = rfqType === "INVITED";

  // RFQ Type değiştiğinde tedarikçileri temizle (Açık seçilirse)
  React.useEffect(() => {
    if (rfqType === "OPEN" && formData.supplierIds && formData.supplierIds.length > 0) {
      setValue("supplierIds", []);
    }
  }, [rfqType, setValue, formData.supplierIds]);

  // RFQ Type options - CREATE ve UPDATE için aynı
  const rfqTypeOptions = [
    { value: "OPEN", label: "Açık" },
    { value: "INVITED", label: "Davetli" },
  ];

  // Map categories to autocomplete options (veri context'ten geliyor)
  const categories =
    categoriesData?.data?.content?.map((cat: any) => ({
      value: cat.id.toString(),
      label: cat.name,
    })) || [];

  // Map suppliers to autocomplete options (veri context'ten geliyor)
  const suppliers =
    suppliersData?.data?.content?.map((supplier: any) => ({
      value: supplier.id.toString(),
      label: supplier.companyName || supplier.name,
    })) || [];

  // Expose submitForm to parent
  useImperativeHandle(ref, () => ({
    submitForm: async () => {
      try {
        // Validate form first - Bu validasyonu tetikler ve hataları gösterir
        const isValid = await validate();
        
        if (!isValid) {
          throw new Error("Lütfen form hatalarını düzeltin");
        }

        const formData = values as RFQFormData;
        let result = null;

        if (isEditing) {
          // UPDATE - Sadece RFQUpdateDto'daki alanları gönder, boş stringleri undefined yap
          const updateData: any = {
            title: formData.title,
            description: formData.description || undefined,
            rfqType: formData.rfqType,
            submissionDeadline: formData.submissionDeadline,
            expectedDeliveryDate: formData.expectedDeliveryDate,
            paymentTerms: formData.paymentTerms || undefined,
            evaluationCriteria: formData.evaluationCriteria || undefined,
            technicalRequirements: formData.technicalRequirements || undefined,
          };
          // Undefined değerleri temizle
          Object.keys(updateData).forEach(
            (key) => updateData[key] === undefined && delete updateData[key],
          );
          result = await putRFQ(updateData);
        } else {
          // CREATE - Zorunlu alanlar ve opsiyonel alanlar
          const createData: any = {
            companyId:
              typeof formData.companyId === "string"
                ? parseInt(formData.companyId)
                : formData.companyId,
            title: formData.title,
            submissionDeadline: formData.submissionDeadline,
            expectedDeliveryDate: formData.expectedDeliveryDate,
            description: formData.description || undefined,
            rfqType: formData.rfqType,
            paymentTerms: formData.paymentTerms || undefined,
            evaluationCriteria: formData.evaluationCriteria || undefined,
            technicalRequirements: formData.technicalRequirements || undefined,
          };
          // Undefined değerleri temizle
          Object.keys(createData).forEach(
            (key) => createData[key] === undefined && delete createData[key],
          );
          result = await postRFQ(createData);
        }

        // Return the RFQ ID
        return result?.id || null;
      } catch (error) {
        console.error("❌ Form submit hatası:", error);
        throw error;
      }
    },
  }));

  return (
    <Form onSubmit={() => {}}>
      <div className="row row-gap-24">
        {/* Başlık ve Kategori - 2 columns */}
        <div className="col-6">
          <FormInput
            name="title"
            label="Başlık"
            type="text"
            placeholder="Alım ilanı başlığını giriniz..."
            isRequired
          />
        </div>

        <div className="col-6">
          <FormAutocomplete
            name="categoryId"
            label="Kategori"
            options={categories}
            isLoading={categoriesLoading}
            placeholder="Kategori seçiniz..."
          />
        </div>

        {/* Teklif Türü ve Tedarikçiler - 2 columns */}
        <div className="col-6">
          <FormAutocomplete
            name="rfqType"
            label="Teklif Türü"
            options={rfqTypeOptions}
            placeholder="Teklif türü seçiniz..."
          />
        </div>

        <div className="col-6">
          <FormAutocomplete
            name="supplierIds"
            label="Tedarikçiler"
            options={suppliers}
            isLoading={suppliersLoading}
            placeholder={
              isSuppliersEnabled
                ? "Tedarikçi seçiniz..."
                : "Önce teklif türünü 'Davetli' olarak seçiniz"
            }
            disabled={!isSuppliersEnabled}
            multiple
            helperText={
              !isSuppliersEnabled
                ? "Not: Tedarikçiler sadece 'Davetli' teklif türünde seçilebilir"
                : undefined
            }
          />
        </div>

        {/* Tarihler - 2 columns */}
        <div className="col-6">
          <FormInput
            name="submissionDeadline"
            label="Son Başvuru Tarihi"
            type="date"
            placeholder="Son başvuru tarihini seçiniz..."
            isRequired
          />
        </div>

        <div className="col-6">
          <FormInput
            name="expectedDeliveryDate"
            label="Beklenen Teslimat Tarihi"
            type="date"
            placeholder="Beklenen teslimat tarihini seçiniz..."
            isRequired
          />
        </div>

        {/* Açıklama - 1/2 width */}
        <div className="col-6">
          <FormTextarea
            name="description"
            label="Açıklama"
            placeholder="Alım ilanı açıklamasını giriniz..."
            rows={4}
          />
        </div>

        {/* Ödeme Koşulları - 1/2 width */}
        <div className="col-6">
          <FormTextarea
            name="paymentTerms"
            label="Ödeme Koşulları"
            placeholder="Ödeme koşullarını giriniz..."
            rows={4}
          />
        </div>

        {/* Değerlendirme Kriterleri - 1/2 width */}
        <div className="col-6">
          <FormTextarea
            name="evaluationCriteria"
            label="Değerlendirme Kriterleri"
            placeholder="Değerlendirme kriterlerini giriniz..."
            rows={4}
          />
        </div>

        {/* Teknik Gereksinimler - 1/2 width */}
        <div className="col-6">
          <FormTextarea
            name="technicalRequirements"
            label="Teknik Gereksinimler"
            placeholder="Teknik gereksinimleri giriniz..."
            rows={4}
          />
        </div>

        {/* Hata Mesajı */}
        {rfqError && (
          <div className="col-12">
            <div className="alert alert-danger" role="alert">
              {rfqError}
            </div>
          </div>
        )}
      </div>
    </Form>
  );
});

RFQFormContent.displayName = "RFQFormContent";
