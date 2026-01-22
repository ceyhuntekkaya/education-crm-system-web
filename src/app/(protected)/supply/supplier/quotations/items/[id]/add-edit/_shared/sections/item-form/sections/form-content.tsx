"use client";

import React, { useEffect } from "react";
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
import { useQuotationItemAddEdit } from "../../../context";
import { QuotationItemFormData } from "../types/form-data";

/**
 * Quotation Item form content component
 */
export const ItemFormContent: React.FC = () => {
  // Form hook - validation ve error kontrolü için
  const { hasErrors } = useFormHook();

  // Form hook'u
  const { reset, values, setValue } = useForm();

  // Context'ten Item işlemlerini al
  const { isEditing, postItem, putItem, itemSubmitLoading, itemError } =
    useQuotationItemAddEdit();

  // Unit options - Birim seçenekleri
  const unitOptions = [
    { value: "ADET", label: "Adet" },
    { value: "KG", label: "Kilogram" },
    { value: "LT", label: "Litre" },
    { value: "M", label: "Metre" },
    { value: "M2", label: "Metrekare" },
    { value: "M3", label: "Metreküp" },
    { value: "PAKET", label: "Paket" },
    { value: "KUTU", label: "Kutu" },
  ];

  // Quantity, unitPrice ve discountAmount değiştiğinde totalPrice'ı hesapla
  useEffect(() => {
    const formValues = values as QuotationItemFormData;
    const quantity = formValues.quantity || 0;
    const unitPrice = formValues.unitPrice || 0;
    const discountAmount = formValues.discountAmount || 0;

    const subtotal = quantity * unitPrice;
    const total = Math.max(0, subtotal - discountAmount);

    setValue("totalPrice", total);
  }, [values, setValue]);

  const handleSubmit = async (values: any) => {
    const formData = values as QuotationItemFormData;

    try {
      if (isEditing) {
        // UPDATE - QuotationItemUpdateDto: Tüm alanlar opsiyonel
        const updateData: any = {};

        // rfqItemId - opsiyonel, number
        if (formData.rfqItemId) {
          updateData.rfqItemId = formData.rfqItemId;
        }

        // itemName - opsiyonel, string (minLength 1)
        if (formData.itemName && formData.itemName.trim()) {
          updateData.itemName = formData.itemName.trim();
        }

        // specifications - opsiyonel, string
        if (formData.specifications && formData.specifications.trim()) {
          updateData.specifications = formData.specifications.trim();
        }

        // quantity - opsiyonel, number
        if (formData.quantity !== undefined && formData.quantity !== null) {
          updateData.quantity = formData.quantity;
        }

        // unit - opsiyonel, string
        if (formData.unit && formData.unit.trim()) {
          updateData.unit = formData.unit.trim();
        }

        // unitPrice - opsiyonel, number
        if (formData.unitPrice !== undefined && formData.unitPrice !== null) {
          updateData.unitPrice = formData.unitPrice;
        }

        // discountAmount - opsiyonel, number
        if (
          formData.discountAmount !== undefined &&
          formData.discountAmount !== null
        ) {
          updateData.discountAmount = formData.discountAmount;
        }

        // totalPrice - opsiyonel, number
        if (formData.totalPrice !== undefined && formData.totalPrice !== null) {
          updateData.totalPrice = formData.totalPrice;
        }

        // deliveryDays - opsiyonel, number
        if (
          formData.deliveryDays !== undefined &&
          formData.deliveryDays !== null
        ) {
          updateData.deliveryDays = formData.deliveryDays;
        }

        // notes - opsiyonel, string
        if (formData.notes && formData.notes.trim()) {
          updateData.notes = formData.notes.trim();
        }

        await putItem(updateData);
      } else {
        // CREATE - QuotationItemCreateDto
        const createData: any = {
          itemName: formData.itemName.trim(), // Zorunlu
          quantity: formData.quantity, // Zorunlu
          unitPrice: formData.unitPrice, // Zorunlu
          totalPrice: formData.totalPrice, // Zorunlu
        };

        // rfqItemId - opsiyonel, number
        if (formData.rfqItemId) {
          createData.rfqItemId = formData.rfqItemId;
        }

        // specifications - opsiyonel, string
        if (formData.specifications && formData.specifications.trim()) {
          createData.specifications = formData.specifications.trim();
        }

        // unit - opsiyonel, string
        if (formData.unit && formData.unit.trim()) {
          createData.unit = formData.unit.trim();
        }

        // discountAmount - opsiyonel, number
        if (
          formData.discountAmount !== undefined &&
          formData.discountAmount !== null &&
          formData.discountAmount > 0
        ) {
          createData.discountAmount = formData.discountAmount;
        }

        // deliveryDays - opsiyonel, number
        if (
          formData.deliveryDays !== undefined &&
          formData.deliveryDays !== null &&
          formData.deliveryDays > 0
        ) {
          createData.deliveryDays = formData.deliveryDays;
        }

        // notes - opsiyonel, string
        if (formData.notes && formData.notes.trim()) {
          createData.notes = formData.notes.trim();
        }

        await postItem(createData);
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
        {/* KALEM BİLGİLERİ */}
        <div className="col-12">
          <h5 className="mb-16">Kalem Bilgileri</h5>
        </div>

        <div className="col-12">
          <FormInput
            name="itemName"
            label="Kalem Adı"
            type="text"
            placeholder="Kalem adını giriniz..."
            isRequired
          />
        </div>

        <div className="col-6">
          <FormInput
            name="quantity"
            label="Miktar"
            type="number"
            placeholder="Miktar giriniz..."
            isRequired
          />
        </div>

        <div className="col-6">
          <FormAutocomplete
            name="unit"
            label="Birim"
            options={unitOptions}
            placeholder="Birim seçiniz..."
          />
        </div>

        <div className="col-12">
          <FormTextarea
            name="specifications"
            label="Özellikler"
            placeholder="Kalem özelliklerini giriniz..."
            rows={3}
          />
        </div>

        <Divider />

        {/* FİYAT BİLGİLERİ */}
        <div className="col-12">
          <h5 className="mb-16">Fiyat Bilgileri</h5>
        </div>

        <div className="col-6">
          <FormInput
            name="unitPrice"
            label="Birim Fiyat (₺)"
            type="number"
            placeholder="Birim fiyatı giriniz..."
            step="0.01"
            isRequired
          />
        </div>

        <div className="col-6">
          <FormInput
            name="discountAmount"
            label="İndirim Tutarı (₺)"
            type="number"
            placeholder="İndirim tutarını giriniz..."
            step="0.01"
          />
        </div>

        <div className="col-12">
          <FormInput
            name="totalPrice"
            label="Toplam Fiyat (₺)"
            type="number"
            placeholder="Toplam fiyat"
            step="0.01"
            isRequired
            disabled
          />
        </div>

        <Divider />

        {/* TESLIMAT VE NOTLAR */}
        <div className="col-12">
          <h5 className="mb-16">Teslimat ve Notlar</h5>
        </div>

        <div className="col-12">
          <FormInput
            name="deliveryDays"
            label="Teslimat Süresi (Gün)"
            type="number"
            placeholder="Teslimat süresini giriniz..."
          />
        </div>

        <div className="col-12">
          <FormTextarea
            name="notes"
            label="Notlar"
            placeholder="Ek notlarınızı giriniz..."
            rows={3}
          />
        </div>

        <Divider />

        {/* FORM ACTIONS */}
        <div className="col-12">
          <div className="d-flex justify-content-end gap-12">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={itemSubmitLoading}
            >
              İptal
            </Button>
            <Button
              type="submit"
              variant="inline"
              disabled={hasErrors || itemSubmitLoading}
              loading={itemSubmitLoading}
            >
              {isEditing ? "Güncelle" : "Kaydet"}
            </Button>
          </div>
        </div>

        {/* ERROR MESSAGE */}
        {itemError && (
          <div className="col-12">
            <div className="alert alert-danger">{itemError}</div>
          </div>
        )}
      </div>
    </Form>
  );
};
