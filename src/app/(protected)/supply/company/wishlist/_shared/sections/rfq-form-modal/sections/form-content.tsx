"use client";

import React from "react";
import {
  Form,
  FormInput,
  FormTextarea,
  FormSelect,
  FormAutocomplete,
} from "@/components/forms";
import { Button } from "@/components/ui/button";
import { RFQFormData } from "../types/form-data";
import { RFQCreateDto } from "../../../hooks/api";
import { rfqTypeOptions } from "../options";
import { useForm } from "@/contexts/form-context";
import { useWishlistContext } from "../../../contexts";

/**
 * RFQ Form content component
 */
export const RFQFormContent: React.FC = () => {
  const { closeRFQModal, submitRFQ, selectedProductIds, isCreateLoadingRFQ } =
    useWishlistContext();

  // TODO: CompanyId'yi AuthContext'ten al
  const companyId = 1; // Geçici olarak 1

  // Form reset hook'u
  const { reset } = useForm();

  const handleSubmit = async (values: any) => {
    const formValues = values as RFQFormData;

    if (!formValues.title.trim()) {
      return;
    }

    try {
      // companyId ekleyerek RFQCreateDto oluştur
      const rfqData: RFQCreateDto = {
        companyId,
        title: formValues.title,
        description: formValues.description,
        rfqType: formValues.rfqType,
        submissionDeadline: formValues.submissionDeadline,
        expectedDeliveryDate: formValues.expectedDeliveryDate,
        paymentTerms: formValues.paymentTerms,
        evaluationCriteria: formValues.evaluationCriteria,
        technicalRequirements: formValues.technicalRequirements,
        productIds: formValues.productIds,
      };

      await submitRFQ(rfqData);
      reset();
    } catch (error) {
      console.error("❌ RFQ Form submit hatası:", error);
    }
  };

  const handleCancel = () => {
    reset();
    closeRFQModal();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div className="row row-gap-16">
        {/* Seçilen Ürün Bilgisi */}
        <div className="col-12">
          <div className="bg-primary-50 border border-primary-200 rounded-12 p-16">
            <div className="d-flex align-items-start gap-12">
              <div className="flex-shrink-0">
                <div className="bg-primary-100 rounded-8 p-8 d-flex align-items-center justify-content-center">
                  <i className="ph-fill ph-package text-primary-600 fs-20"></i>
                </div>
              </div>
              <div className="flex-grow-1">
                <h6 className="text-primary-700 fw-semibold mb-4 fs-14">
                  Seçilen Ürün Sayısı
                </h6>
                <p className="text-primary-600 mb-0 fs-13">
                  {selectedProductIds.length} ürün için RFQ oluşturulacak
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Başlık - Zorunlu */}
        <div className="col-12">
          <FormInput
            name="title"
            label="RFQ Başlığı"
            type="text"
            placeholder="RFQ için açıklayıcı bir başlık giriniz"
            isRequired
            isRequiredText="RFQ başlığı zorunludur"
            helperText="RFQ'nuzun amacını açıkça belirten bir başlık yazın"
            variant="inline"
          />
        </div>

        {/* Açıklama */}
        <div className="col-12">
          <FormTextarea
            name="description"
            label="Açıklama"
            placeholder="RFQ hakkında detaylı açıklama yazınız..."
            rows={4}
            helperText="Tedarikçilere RFQ ile ilgili ek bilgiler sağlayın"
            variant="inline"
          />
        </div>

        {/* RFQ Tipi */}
        <div className="col-12 pb-16">
          <FormAutocomplete
            name="rfqType"
            label="RFQ Tipi"
            options={rfqTypeOptions}
            variant="inline"
          />
        </div>

        {/* Tarihler */}
        {/* Teklif Son Tarihi - Zorunlu */}
        <div className="col-6">
          <FormInput
            name="submissionDeadline"
            label="Teklif Son Tarihi"
            type="datetime-local"
            isRequired
            isRequiredText="Teklif son tarihi zorunludur"
            helperText="Tekliflerin alınacağı son tarih ve saat"
            minToday
            variant="inline"
          />
        </div>

        {/* Beklenen Teslimat Tarihi */}
        <div className="col-6">
          <FormInput
            name="expectedDeliveryDate"
            label="Beklenen Teslimat Tarihi"
            type="date"
            helperText="Ürünlerin teslim edilmesini beklediğiniz tarih"
            minToday
            variant="inline"
          />
        </div>

        {/* Ödeme Koşulları */}
        <div className="col-12">
          <FormTextarea
            name="paymentTerms"
            label="Ödeme Koşulları"
            placeholder="Örn: 30 gün vadeli, %50 peşin %50 teslimatta..."
            rows={3}
            helperText="Ödeme şartlarınızı açıkça belirtin"
            variant="inline"
          />
        </div>

        {/* Değerlendirme Kriterleri */}
        <div className="col-12">
          <FormTextarea
            name="evaluationCriteria"
            label="Değerlendirme Kriterleri"
            placeholder="Tekliflerin değerlendirileceği kriterler (fiyat, kalite, teslimat süresi vb.)"
            rows={3}
            helperText="Tekliflerin hangi kriterlere göre değerlendirileceğini belirtin"
            variant="inline"
          />
        </div>

        {/* Teknik Gereksinimler */}
        <div className="col-12">
          <FormTextarea
            name="technicalRequirements"
            label="Teknik Gereksinimler"
            placeholder="Ürünler için teknik özellikler ve gereksinimler..."
            rows={3}
            helperText="Ürünlerin teknik özelliklerini ve standartlarını belirtin"
            variant="inline"
          />
        </div>

        {/* Form Aksiyonları */}
        <div className="col-12">
          <div className="d-flex align-items-center gap-12 justify-content-end pt-16 border-top">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={isCreateLoadingRFQ}
            >
              İptal
            </Button>
            <Button
              type="submit"
              variant="success"
              loading={isCreateLoadingRFQ}
              disabled={isCreateLoadingRFQ}
              leftIcon="ph-bold ph-check"
            >
              RFQ Oluştur
            </Button>
          </div>
        </div>
      </div>
    </Form>
  );
};
