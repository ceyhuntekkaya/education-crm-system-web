"use client";

import React from "react";
import {
  Form,
  FormInput,
  FormTextarea,
  FormAutocomplete,
} from "@/components/forms";
import { Button } from "@/components/ui/button";
import { useFormHook } from "@/hooks";
import { useForm } from "@/contexts/form-context";
import { useQuotationAddEdit } from "../../../context";
import {
  QuotationCreateDtoCurrency,
  QuotationUpdateDtoCurrency,
} from "@/types";

export const QuotationFormContent: React.FC = () => {
  const { hasErrors } = useFormHook();
  const { reset } = useForm();
  const { isEditing, postQuotation, putQuotation, quotationSubmitLoading } =
    useQuotationAddEdit();

  // Currency options - CREATE ve UPDATE için aynı
  const currencyOptions = Object.values(QuotationCreateDtoCurrency).map(
    (value) => ({
      value,
      label: value,
    })
  );

  const handleSubmit = async (values: any) => {
    // Form values'ı DTO'ya çevir
    const formattedValues = {
      ...values,
      rfqId: parseInt(values.rfqId),
      supplierId: parseInt(values.supplierId),
      totalAmount: values.totalAmount
        ? parseFloat(values.totalAmount)
        : undefined,
      deliveryDays: values.deliveryDays
        ? parseInt(values.deliveryDays)
        : undefined,
    };

    if (isEditing) {
      // UPDATE - rfqId ve supplierId gönderilmez
      const { rfqId, supplierId, ...updateData } = formattedValues;
      await putQuotation(updateData);
    } else {
      // CREATE - tüm veriler gönderilir
      await postQuotation(formattedValues);
    }
  };

  const handleCancel = () => {
    reset();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div className="row row-gap-24">
        <div className="col-12">
          <h5 className="mb-16">Temel Bilgiler</h5>
        </div>

        {!isEditing && (
          <>
            <div className="col-6">
              <FormInput
                name="rfqId"
                label="RFQ ID"
                type="number"
                placeholder="RFQ ID giriniz..."
                isRequired
              />
            </div>

            <div className="col-6">
              <FormInput
                name="supplierId"
                label="Tedarikçi ID"
                type="number"
                placeholder="Tedarikçi ID giriniz..."
                isRequired
              />
            </div>
          </>
        )}

        <div className={isEditing ? "col-6" : "col-6"}>
          <FormInput
            name="totalAmount"
            label="Toplam Tutar"
            type="number"
            placeholder="Toplam tutarı giriniz..."
          />
        </div>

        <div className={isEditing ? "col-6" : "col-6"}>
          <FormAutocomplete
            name="currency"
            label="Para Birimi"
            options={currencyOptions}
            placeholder="Para birimi seçiniz..."
          />
        </div>

        <div className="col-12">
          <h5 className="mb-16 mt-16">Teslim ve Koşullar</h5>
        </div>

        <div className="col-6">
          <FormInput
            name="validUntil"
            label="Geçerlilik Tarihi"
            type="date"
            placeholder="Geçerlilik tarihi seçiniz..."
          />
        </div>

        <div className="col-6">
          <FormInput
            name="deliveryDays"
            label="Teslimat Süresi (Gün)"
            type="number"
            placeholder="Teslimat süresini giriniz..."
          />
        </div>

        <div className="col-6">
          <FormTextarea
            name="paymentTerms"
            label="Ödeme Koşulları"
            placeholder="Ödeme koşullarını giriniz..."
            rows={4}
          />
        </div>

        <div className="col-6">
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
            placeholder="Ek notlar giriniz..."
            rows={4}
          />
        </div>

        <span className="d-block border border-neutral-30 my-12 border-dashed" />

        <div className="col-12">
          <div className="d-flex gap-16 justify-content-end">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={quotationSubmitLoading}
            >
              İptal
            </Button>
            <Button
              type="submit"
              variant="inline"
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
