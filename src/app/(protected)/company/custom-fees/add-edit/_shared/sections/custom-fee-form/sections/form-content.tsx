"use client";

import React from "react";
import {
  Form,
  FormInput,
  FormAutocomplete,
  FormCheckbox,
  FormTextarea,
  FormValues,
} from "@/components/forms";
import { Button } from "@/components/ui/button";
import { CustomFeeFormData } from "../types/form-data";
import { useFormHook } from "@/hooks";
import { useForm } from "@/contexts/form-context";
import { feeTypeOptions, feeFrequencyOptions, statusOptions } from "../options";
import { useCustomFeeAddEdit } from "../../../context";
import { filterDataForEdit } from "../../../utils";
import { CustomFeeCreateDto } from "@/types";
import { useAuth } from "@/contexts";

/**
 * Custom fee form content component
 */
export const CustomFeeFormContent: React.FC = () => {
  // Auth context'ten user bilgisini al
  const { user } = useAuth();

  // Context'ten verileri al
  const {
    isEditing,
    postCustomFee,
    putCustomFee,
    customFeeLoading,
    customFeeId,
  } = useCustomFeeAddEdit();

  // Form hook - validation ve error kontrolü için
  const { hasErrors } = useFormHook();

  // Form reset hook'u
  const { reset } = useForm();

  const handleSubmit = async (values: any) => {
    const formData: CustomFeeCreateDto = {
      ...values,
      // createdByUserId'yi auth context'teki user'dan al
      createdByUserId: user?.id || 1,
    };

    if (isEditing) {
      // Edit modunda sadece izin verilen alanları gönder
      const filteredData = filterDataForEdit(formData) as CustomFeeCreateDto;
      await putCustomFee(filteredData);
    } else {
      // Yeni kayıt
      await postCustomFee(formData);
    }
  };

  const handleCancel = () => {
    reset();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormValues />
      <div className="row row-gap-24">
        {/* TEMEL BİLGİLER */}
        <div className="col-12">
          <h5 className="mb-16">Temel Bilgiler</h5>
        </div>

        {/* Ücret Adı */}
        <div className="col-6">
          <FormInput
            name="feeName"
            label="Ücret Adı"
            placeholder="Örn: Laboratuvar Kullanım Ücreti"
            required
          />
        </div>

        {/* Ücret Türü */}
        <div className="col-6">
          <FormAutocomplete
            name="feeType"
            label="Ücret Türü"
            options={feeTypeOptions}
            placeholder="Ücret türü seçiniz..."
            required
          />
        </div>

        {/* Ücret Tutarı */}
        <div className="col-6">
          <FormInput
            name="feeAmount"
            label="Ücret Tutarı"
            type="number"
            placeholder="Ücret tutarını giriniz..."
            required
          />
        </div>

        {/* Ücret Sıklığı */}
        <div className="col-6">
          <FormAutocomplete
            name="feeFrequency"
            label="Ücret Sıklığı"
            options={feeFrequencyOptions}
            placeholder="Ücret sıklığını seçiniz..."
            required
          />
        </div>

        {/* Durum */}
        <div className="col-6">
          <FormAutocomplete
            name="status"
            label="Durum"
            options={statusOptions}
            placeholder="Durumu seçiniz..."
          />
        </div>

        {/* Açıklama */}
        <div className="col-12">
          <FormTextarea
            name="feeDescription"
            label="Açıklama"
            placeholder="Ücret hakkında detaylı açıklama..."
            rows={4}
          />
        </div>

        {/* UYGULANMA KURALLARI */}
        <div className="col-12">
          <hr className="my-24" />
          <h5 className="mb-16">Uygulanma Kuralları</h5>
        </div>

        {/* Checkbox'lar */}
        <div className="col-6">
          <FormCheckbox name="isMandatory" label="Zorunlu Ücret" />
          <small className="text-muted">
            Bu ücret tüm öğrenciler için zorunludur
          </small>
        </div>

        <div className="col-6">
          <FormCheckbox name="isRefundable" label="İade Edilebilir" />
          <small className="text-muted">
            Bu ücret belirli koşullarda iade edilebilir
          </small>
        </div>

        <div className="col-6">
          <FormCheckbox
            name="appliesToNewStudents"
            label="Yeni Öğrencilere Uygulanır"
          />
        </div>

        <div className="col-6">
          <FormCheckbox
            name="appliesToExistingStudents"
            label="Mevcut Öğrencilere Uygulanır"
          />
        </div>

        {/* Uygulanacak Sınıflar */}
        <div className="col-6">
          <FormInput
            name="appliesToGrades"
            label="Uygulanacak Sınıflar"
            placeholder="Sınıf aralığını giriniz (Örn: 5-8, 9-12)..."
          />
          <small className="text-muted">Sınıf aralığını belirtiniz</small>
        </div>

        {/* Minimum Yaş */}
        <div className="col-3">
          <FormInput
            name="minimumAge"
            label="Minimum Yaş"
            type="number"
            placeholder="Minimum yaş giriniz..."
          />
        </div>

        {/* Maksimum Yaş */}
        <div className="col-3">
          <FormInput
            name="maximumAge"
            label="Maksimum Yaş"
            type="number"
            placeholder="Maksimum yaş giriniz..."
          />
        </div>

        {/* GEÇERLİLİK TARİHLERİ */}
        <div className="col-12">
          <hr className="my-24" />
          <h5 className="mb-16">Geçerlilik Tarihleri</h5>
        </div>

        {/* Başlangıç Tarihi */}
        <div className="col-6">
          <FormInput
            name="validFrom"
            label="Geçerlilik Başlangıcı"
            type="date"
          />
        </div>

        {/* Bitiş Tarihi */}
        <div className="col-6">
          <FormInput name="validUntil" label="Geçerlilik Bitişi" type="date" />
        </div>

        {/* ÖDEME AYARLARI */}
        <div className="col-12">
          <hr className="my-24" />
          <h5 className="mb-16">Ödeme Ayarları</h5>
        </div>

        {/* Vade Günü Farkı */}
        <div className="col-4">
          <FormInput
            name="dueDateOffsetDays"
            label="Vade Günü Farkı"
            type="number"
            placeholder="Gün sayısını giriniz..."
          />
          <small className="text-muted">Faturadan kaç gün sonra ödenecek</small>
        </div>

        {/* Gecikme Ücreti Yüzdesi */}
        <div className="col-4">
          <FormInput
            name="lateFeePercentage"
            label="Gecikme Ücreti (%)"
            type="number"
            placeholder="Yüzde oranını giriniz..."
          />
          <small className="text-muted">
            Geç ödemelerde uygulanacak ceza yüzdesi
          </small>
        </div>

        {/* Maksimum Taksit */}
        <div className="col-4">
          <FormInput
            name="maxInstallments"
            label="Maksimum Taksit Sayısı"
            type="number"
            placeholder="Taksit sayısını giriniz..."
          />
        </div>

        {/* Taksit İzni */}
        <div className="col-4">
          <FormCheckbox name="installmentAllowed" label="Taksit İzni Var" />
        </div>

        {/* İndirim Uygunluğu */}
        <div className="col-4">
          <FormCheckbox name="discountEligible" label="İndirilebilir" />
        </div>

        {/* Burs Uygulanabilir */}
        <div className="col-4">
          <FormCheckbox
            name="scholarshipApplicable"
            label="Burs Uygulanabilir"
          />
        </div>

        {/* GÖRÜNÜRLÜK VE BİLDİRİM */}
        <div className="col-12">
          <hr className="my-24" />
          <h5 className="mb-16">Görünürlük ve Bildirim</h5>
        </div>

        {/* Faturada Göster */}
        <div className="col-4">
          <FormCheckbox name="displayOnInvoice" label="Faturada Göster" />
        </div>

        {/* Doküman Gerekli */}
        <div className="col-4">
          <FormCheckbox name="documentationRequired" label="Doküman Gerekli" />
        </div>

        {/* Veli Bildirimi Gerekli */}
        <div className="col-4">
          <FormCheckbox
            name="parentNotificationRequired"
            label="Veli Bildirimi Gerekli"
          />
        </div>

        {/* Onay Gerekli */}
        <div className="col-4">
          <FormCheckbox name="requiresApproval" label="Onay Gerekli" />
        </div>

        {/* Görüntülenme Sırası */}
        <div className="col-6">
          <FormInput
            name="displayOrder"
            label="Görüntülenme Sırası"
            type="number"
            placeholder="Sıra numarasını giriniz..."
          />
          <small className="text-muted">
            Listede görüntülenme sırası (0 = en üstte)
          </small>
        </div>

        {/* Bildirim Süresi */}
        <div className="col-6">
          <FormInput
            name="advanceNoticeDays"
            label="Önceden Bildirim Günü"
            type="number"
            placeholder="Gün sayısını giriniz..."
          />
          <small className="text-muted">
            Kaç gün önceden bildirim yapılacak
          </small>
        </div>

        {/* Gerekli Dokümanlar */}
        {/* @ts-ignore */}
        <div className="col-12">
          <FormTextarea
            name="requiredDocuments"
            label="Gerekli Dokümanlar"
            placeholder="Gerekli dokümanları listeleyin..."
            rows={3}
          />
        </div>

        {/* Ücret Politikası */}
        <div className="col-12">
          <FormTextarea
            name="feePolicy"
            label="Ücret Politikası"
            placeholder="Ücret ile ilgili politika ve kurallar..."
            rows={4}
          />
        </div>

        {/* FORM BUTTONS */}
        <div className="col-12">
          <div className="d-flex justify-content-end align-items-center gap-12 mt-24">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={customFeeLoading}
            >
              <i className="ph ph-x me-8"></i>
              İptal
            </Button>
            <Button type="submit" disabled={hasErrors || customFeeLoading}>
              {customFeeLoading ? (
                <>
                  <i className="ph ph-circle-notch ph-spin me-8"></i>
                  {isEditing ? "Güncelleniyor..." : "Kaydediliyor..."}
                </>
              ) : (
                <>
                  <i className="ph ph-floppy-disk me-8"></i>
                  {isEditing ? "Güncelle" : "Kaydet"}
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </Form>
  );
};
