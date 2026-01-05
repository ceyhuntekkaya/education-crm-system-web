"use client";

import React from "react";
import {
  Form,
  FormInput,
  FormTextarea,
  FormAutocomplete,
  FormValues,
} from "@/components/forms";
import { Button } from "@/components/ui/button";
import { Divider } from "@/components";
import { useFormHook } from "@/hooks";
import { useForm } from "@/contexts/form-context";
import { useRFQAddEdit } from "../../../context";
import { RFQFormData } from "../types/form-data";

/**
 * RFQ form content component
 */
export const RFQFormContent: React.FC = () => {
  // Form hook - validation ve error kontrolü için
  const { hasErrors } = useFormHook();

  // Form reset hook'u
  const { reset } = useForm();

  // Context'ten RFQ işlemlerini al
  const { isEditing, postRFQ, putRFQ, rfqSubmitLoading, rfqError } =
    useRFQAddEdit();

  // RFQ Type options - CREATE ve UPDATE için aynı
  const rfqTypeOptions = [
    { value: "OPEN", label: "Açık" },
    { value: "INVITED", label: "Davetli" },
  ];

  const handleSubmit = async (values: any) => {
    const formData = values as RFQFormData;

    try {
      if (isEditing) {
        // UPDATE - companyId gönderilmez
        await putRFQ(formData);
      } else {
        // CREATE - tüm veriler gönderilir, companyId'yi number'a çevir
        const createData = {
          ...formData,
          companyId: parseInt(formData.companyId as string),
        };
        await postRFQ(createData);
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
        {/* TEMEL BİLGİLER */}
        <div className="col-12">
          <h5 className="mb-16">Temel Bilgiler</h5>
        </div>

        {!isEditing && (
          <div className="col-12">
            <FormInput
              name="companyId"
              label="Şirket ID"
              type="number"
              placeholder="Şirket ID giriniz..."
              isRequired
            />
          </div>
        )}

        <div className="col-12">
          <FormInput
            name="title"
            label="Başlık"
            type="text"
            placeholder="Teklif talebi başlığını giriniz..."
            isRequired
          />
        </div>

        <div className="col-12">
          <FormTextarea
            name="description"
            label="Açıklama"
            placeholder="Teklif talebi açıklamasını giriniz..."
            rows={4}
          />
        </div>

        <div className="col-6">
          <FormAutocomplete
            name="rfqType"
            label="Teklif Türü"
            options={rfqTypeOptions}
            placeholder="Teklif türü seçiniz..."
          />
        </div>

        <Divider />

        {/* TARİHLER VE SÜRELER */}
        <div className="col-12">
          <h5 className="mb-16">Tarihler ve Süreler</h5>
        </div>

        <div className="col-6">
          <FormInput
            name="submissionDeadline"
            label="Son Başvuru Tarihi"
            type="date"
            placeholder="Son başvuru tarihini seçiniz..."
            isRequired={!isEditing}
          />
        </div>

        <div className="col-6">
          <FormInput
            name="expectedDeliveryDate"
            label="Beklenen Teslimat Tarihi"
            type="date"
            placeholder="Beklenen teslimat tarihini seçiniz..."
          />
        </div>

        <Divider />

        {/* KOŞULLAR VE KRİTERLER */}
        <div className="col-12">
          <h5 className="mb-16">Koşullar ve Kriterler</h5>
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
            name="evaluationCriteria"
            label="Değerlendirme Kriterleri"
            placeholder="Değerlendirme kriterlerini giriniz..."
            rows={4}
          />
        </div>

        <div className="col-12">
          <FormTextarea
            name="technicalRequirements"
            label="Teknik Gereksinimler"
            placeholder="Teknik gereksinimleri giriniz..."
            rows={6}
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

        <Divider />

        {/* BUTONLAR */}
        <div className="col-12">
          <div className="d-flex gap-12 justify-content-end me-32">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={rfqSubmitLoading}
            >
              Temizle
            </Button>
            <Button
              type="submit"
              variant="inline"
              disabled={hasErrors || rfqSubmitLoading}
              loading={rfqSubmitLoading}
            >
              {isEditing ? "Güncelle" : "Kaydet"}
            </Button>
          </div>
        </div>
      </div>
    </Form>
  );
};
