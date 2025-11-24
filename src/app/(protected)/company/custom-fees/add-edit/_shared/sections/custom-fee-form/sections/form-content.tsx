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
import { useFormHook } from "@/hooks";
import { useForm } from "@/contexts/form-context";
import { feeTypeOptions, feeFrequencyOptions, statusOptions } from "../options";
import { useCustomFeeAddEdit } from "../../../context";
import { filterDataForEdit } from "../../../utils";
import { CustomFeeCreateDto } from "@/types";
import { useAuth } from "@/contexts";
import { useCompany } from "@/app/(protected)/company/_shared";

/**
 * Custom fee form content component
 */
export const CustomFeeFormContent: React.FC = () => {
  // Auth context'ten user bilgisini al
  const { user } = useAuth();
  const { selectedSchool } = useCompany();

  // Context'ten verileri al
  // formLoading: Sadece form submit sırasında aktif olan loading durumu
  const { isEditing, postCustomFee, putCustomFee, formLoading, customFeeId } =
    useCustomFeeAddEdit();

  // Form hook - validation ve error kontrolü için
  const { hasErrors } = useFormHook();

  // Form reset hook'u
  const { reset } = useForm();

  const handleSubmit = async (values: any) => {
    const formData: CustomFeeCreateDto = {
      ...values,
      // createdByUserId'yi auth context'teki user'dan al
      createdByUserId: user?.id || 1,
      schoolId: selectedSchool?.id || null,
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
      {/* <FormValues /> */}
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
            isRequired
          />
        </div>

        {/* Ücret Türü */}
        <div className="col-6">
          <FormAutocomplete
            name="feeType"
            label="Ücret Türü"
            options={feeTypeOptions}
            placeholder="Ücret türü seçiniz..."
            isRequired
          />
        </div>

        {/* Ücret Tutarı */}
        <div className="col-6">
          <FormInput
            name="feeAmount"
            label="Ücret Tutarı"
            type="number"
            placeholder="Ücret tutarını giriniz..."
            isRequired
          />
        </div>

        {/* Ücret Sıklığı */}
        <div className="col-6">
          <FormAutocomplete
            name="feeFrequency"
            label="Ücret Sıklığı"
            options={feeFrequencyOptions}
            placeholder="Ücret sıklığını seçiniz..."
            isRequired
          />
        </div>

        {/* Durum */}
        <div className="col-6">
          <FormAutocomplete
            name="status"
            label="Durum"
            options={statusOptions}
            placeholder="Durumu seçiniz..."
            helperText="Sadece durumu aktif olanlar veli tarafında görülecektir"
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
          <FormCheckbox
            name="isMandatory"
            label="Zorunlu Ücret"
            variant="outlined"
            helperText="Bu ücret tüm öğrenciler için zorunludur"
          />
        </div>

        <div className="col-6">
          <FormCheckbox
            name="isRefundable"
            label="İade Edilebilir"
            variant="outlined"
            helperText="Bu ücret belirli koşullarda iade edilebilir"
          />
        </div>

        <div className="col-6">
          <FormCheckbox
            name="appliesToNewStudents"
            label="Yeni Öğrencilere Uygulanır"
            variant="outlined"
          />
        </div>

        <div className="col-6">
          <FormCheckbox
            name="appliesToExistingStudents"
            label="Mevcut Öğrencilere Uygulanır"
            variant="outlined"
          />
        </div>

        {/* Uygulanacak Sınıflar */}
        {/* <div className="col-6">
          <FormInput
            name="appliesToGrades"
            label="Uygulanacak Sınıflar"
            placeholder="Sınıf aralığını giriniz (Örn: 5-8, 9-12)..."
            helperText="Sınıf aralığını belirtiniz"
          />
        </div>

        <div className="col-3">
          <FormInput
            name="minimumAge"
            label="Minimum Yaş"
            type="number"
            placeholder="Minimum yaş giriniz..."
          />
        </div>

        <div className="col-3">
          <FormInput
            name="maximumAge"
            label="Maksimum Yaş"
            type="number"
            placeholder="Maksimum yaş giriniz..."
          />
        </div> */}

        {/* GEÇERLİLİK TARİHLERİ */}
        {/* <div className="col-12">
          <hr className="my-24" />
          <h5 className="mb-16">Geçerlilik Tarihleri</h5>
        </div>

       
        <div className="col-6">
          <FormInput
            name="validFrom"
            label="Geçerlilik Başlangıcı"
            type="date"
          />
        </div>

       
        <div className="col-6">
          <FormInput name="validUntil" label="Geçerlilik Bitişi" type="date" />
        </div> */}

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
            helperText="Faturadan kaç gün sonra ödenecek"
          />
        </div>

        {/* Gecikme Ücreti Yüzdesi */}
        <div className="col-4">
          <FormInput
            name="lateFeePercentage"
            label="Gecikme Ücreti (%)"
            type="number"
            placeholder="Yüzde oranını giriniz..."
            helperText="Geç ödemelerde uygulanacak ceza yüzdesi"
          />
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
          <FormCheckbox
            name="installmentAllowed"
            label="Taksit İzni Var"
            variant="outlined"
          />
        </div>

        {/* İndirim Uygunluğu */}
        <div className="col-4">
          <FormCheckbox
            name="discountEligible"
            label="İndirilebilir"
            variant="outlined"
          />
        </div>

        {/* Burs Uygulanabilir */}
        <div className="col-4">
          <FormCheckbox
            name="scholarshipApplicable"
            label="Burs Uygulanabilir"
            variant="outlined"
          />
        </div>

        {/* GÖRÜNÜRLÜK VE BİLDİRİM */}
        {/* <div className="col-12">
          <hr className="my-24" />
          <h5 className="mb-16">Görünürlük ve Bildirim</h5>
        </div>


        <div className="col-4">
          <FormCheckbox
            name="displayOnInvoice"
            label="Faturada Göster"
            variant="outlined"
          />
        </div>


        <div className="col-4">
          <FormCheckbox
            name="documentationRequired"
            label="Doküman Gerekli"
            variant="outlined"
          />
        </div>


        <div className="col-4">
          <FormCheckbox
            name="parentNotificationRequired"
            label="Veli Bildirimi Gerekli"
            variant="outlined"
          />
        </div>


        <div className="col-4">
          <FormCheckbox
            name="requiresApproval"
            label="Onay Gerekli"
            variant="outlined"
          />
        </div>


        <div className="col-6">
          <FormInput
            name="displayOrder"
            // label="Görüntülenme Sırası"
            type="number"
            placeholder="Sıra numarasını giriniz..."
            helperText="Listede görüntülenme sırası (0 = en üstte)"
          />
        </div>


        <div className="col-6">
          <FormInput
            name="advanceNoticeDays"
            label="Önceden Bildirim Günü"
            type="number"
            placeholder="Gün sayısını giriniz..."
            helperText="Kaç gün önceden bildirim yapılacak"
          />
        </div> */}

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
              disabled={formLoading} // Form submit olurken iptal butonu disable
            >
              <i className="ph ph-x me-8"></i>
              İptal
            </Button>
            <Button type="submit" disabled={hasErrors || formLoading}>
              {formLoading ? (
                <>
                  {/* Form submit loading durumu - sadece burada gösterilir */}
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
