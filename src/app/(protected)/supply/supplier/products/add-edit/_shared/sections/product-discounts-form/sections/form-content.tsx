"use client";

import React, { useState, useRef } from "react";
import {
  Form,
  FormInput,
  FormAutocomplete,
  FormCheckbox,
} from "@/components/forms";
import { Button } from "@/components/ui";
import { useFormHook } from "@/hooks";
import { useForm } from "@/contexts/form-context";
import { useProductAddEdit } from "../../../context";
import { ProductDiscountFormData } from "../types/form-data";
import { discountTypeOptions } from "../../../utils";
import { DiscountsList } from "./discounts-list";

/**
 * Product Discount form content component
 */
export const ProductDiscountFormContent: React.FC = () => {
  const { hasErrors } = useFormHook();
  const { reset, setValue, values } = useForm();
  const formRef = useRef<HTMLDivElement>(null);

  // Product Add/Edit context'ten sadece action'ları al
  const {
    editingDiscountId,
    addDiscountLoading,
    editDiscountLoading,
    postProductDiscount,
    putProductDiscount,
    deleteProductDiscount,
    setEditingDiscountId,
  } = useProductAddEdit();

  const handleSubmit = async (values: any) => {
    const formData = values as ProductDiscountFormData;

    try {
      const discountData: any = {
        discountName: formData.discountName,
        discountType: formData.discountType,
        discountValue: formData.discountValue || undefined,
        minQuantity: formData.minQuantity || undefined,
        maxQuantity: formData.maxQuantity || undefined,
        startDate: formData.startDate || undefined,
        endDate: formData.endDate || undefined,
        isActive: formData.isActive ?? true,
      };

      // Undefined değerleri temizle
      Object.keys(discountData).forEach(
        (key) => discountData[key] === undefined && delete discountData[key],
      );

      if (editingDiscountId) {
        // UPDATE
        await putProductDiscount(editingDiscountId, discountData);
        setEditingDiscountId(null);
      } else {
        // CREATE
        await postProductDiscount(discountData);
      }

      // Form'u temizle
      reset();
    } catch (error) {
      console.error("Discount işlemi başarısız:", error);
    }
  };

  const handleEdit = (discount: any) => {
    // State'i güncelle
    setEditingDiscountId(discount.id);
    // Tarihleri YYYY-MM-DD formatına dönüştür
    const formatDate = (dateString: string) => {
      if (!dateString) return "";
      const date = new Date(dateString);
      return date.toISOString().split("T")[0];
    };

    // Her bir alanı ayrı ayrı set et
    setValue("discountName", discount.discountName);
    setValue("discountType", discount.discountType);
    setValue("discountValue", discount.discountValue || 0);
    setValue("minQuantity", discount.minQuantity || 0);
    setValue("maxQuantity", discount.maxQuantity || 0);
    setValue("startDate", formatDate(discount.startDate));
    setValue("endDate", formatDate(discount.endDate));
    setValue("isActive", discount.isActive ?? true);
  };

  const handleDelete = async (discountId: number) => {
    await deleteProductDiscount(discountId);
    // Form'u sıfırla ve editing state'i temizle
    setEditingDiscountId(null);
    reset();
  };

  const handleCancel = () => {
    setEditingDiscountId(null);
    reset();
  };

  const handleAddNew = () => {
    // Düzenleme modundan çık ve formu temizle
    setEditingDiscountId(null);
    reset();

    // Forma scroll yap
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="d-flex flex-column gap-48">
      {/* İndirim Formu */}
      <div ref={formRef}>
        <Form onSubmit={handleSubmit}>
          <div className="row row-gap-24">
            {/* İndirim Adı */}
            <div className="col-lg-6">
              <FormInput
                name="discountName"
                label="İndirim Adı"
                placeholder="Örn: Yaz İndirimi"
                required
              />
            </div>

            {/* İndirim Tipi */}
            <div className="col-lg-6">
              <FormAutocomplete
                name="discountType"
                label="İndirim Tipi"
                options={discountTypeOptions}
                placeholder="İndirim tipi seçiniz"
                required
              />
            </div>

            {/* İndirim Değeri */}
            <div className="col-lg-6">
              <FormInput
                name="discountValue"
                label="İndirim Değeri"
                type="number"
                placeholder="Örn: 10"
                helperText={
                  values?.discountType === "PERCENTAGE"
                    ? "Yüzde olarak giriniz"
                    : values?.discountType === "FIXED_AMOUNT"
                      ? "Sabit tutar olarak giriniz"
                      : ""
                }
              />
            </div>

            {/* Minimum Miktar */}
            <div className="col-lg-3">
              <FormInput
                name="minQuantity"
                label="Min. Miktar"
                type="number"
                placeholder="0"
              />
            </div>

            {/* Maksimum Miktar */}
            <div className="col-lg-3">
              <FormInput
                name="maxQuantity"
                label="Max. Miktar"
                type="number"
                placeholder="0"
              />
            </div>

            {/* Başlangıç Tarihi */}
            <div className="col-lg-6">
              <FormInput
                name="startDate"
                label="Başlangıç Tarihi"
                type="date"
                placeholder="Tarih seçiniz"
              />
            </div>

            {/* Bitiş Tarihi */}
            <div className="col-lg-6">
              <FormInput
                name="endDate"
                label="Bitiş Tarihi"
                type="date"
                placeholder="Tarih seçiniz"
              />
            </div>

            {/* Aktif */}
            <div className="col-lg-6">
              <FormCheckbox name="isActive" label="Aktif" variant="outlined" />
            </div>

            {/* Form Actions */}
            <div className="col-lg-12">
              <div className="d-flex justify-content-end gap-12">
                {editingDiscountId && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancel}
                    disabled={addDiscountLoading || editDiscountLoading}
                  >
                    İptal
                  </Button>
                )}
                <Button
                  type="submit"
                  disabled={
                    hasErrors || addDiscountLoading || editDiscountLoading
                  }
                  loading={addDiscountLoading || editDiscountLoading}
                >
                  {editingDiscountId ? "Güncelle" : "Ekle"}
                </Button>
              </div>
            </div>
          </div>
        </Form>
      </div>

      {/* Mevcut İndirimler Listesi */}
      <DiscountsList
        editingDiscountId={editingDiscountId}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onAddNew={handleAddNew}
      />
    </div>
  );
};
