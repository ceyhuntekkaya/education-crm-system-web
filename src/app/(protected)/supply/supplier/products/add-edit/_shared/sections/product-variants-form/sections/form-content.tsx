"use client";

import React, { useState, useRef } from "react";
import { Form, FormInput, FormCheckbox } from "@/components/forms";
import { Button } from "@/components/ui";
import { useFormHook } from "@/hooks";
import { useForm } from "@/contexts/form-context";
import { useProductAddEdit } from "../../../context";
import { ProductVariantFormData } from "../types/form-data";
import { VariantsList } from "./variants-list";

/**
 * Product Variant form content component
 */
export const ProductVariantFormContent: React.FC = () => {
  const { hasErrors } = useFormHook();
  const { reset, setValue, values } = useForm();
  const formRef = useRef<HTMLDivElement>(null);

  // Product Add/Edit context'ten sadece action'ları al
  const {
    editingVariantId,
    addVariantLoading,
    editVariantLoading,
    postProductVariant,
    putProductVariant,
    deleteProductVariant,
    setEditingVariantId,
  } = useProductAddEdit();

  const handleSubmit = async (values: any) => {
    const formData = values as ProductVariantFormData;

    try {
      const variantData: any = {
        variantName: formData.variantName,
        sku: formData.sku || undefined,
        priceAdjustment: formData.priceAdjustment || undefined,
        stockQuantity: formData.stockQuantity || undefined,
        isActive: formData.isActive ?? true,
      };

      // Undefined değerleri temizle
      Object.keys(variantData).forEach(
        (key) => variantData[key] === undefined && delete variantData[key],
      );

      if (editingVariantId) {
        // UPDATE
        await putProductVariant(editingVariantId, variantData);
        setEditingVariantId(null);
      } else {
        // CREATE
        await postProductVariant(variantData);
      }

      // Form'u temizle
      reset();
    } catch (error) {
      console.error("Variant işlemi başarısız:", error);
    }
  };

  const handleEdit = (variant: any) => {
    // State'i güncelle
    setEditingVariantId(variant.id);

    // Her bir alanı ayrı ayrı set et
    setValue("variantName", variant.variantName);
    setValue("sku", variant.sku || "");
    setValue("priceAdjustment", variant.priceAdjustment || 0);
    setValue("stockQuantity", variant.stockQuantity || 0);
    setValue("isActive", variant.isActive ?? true);
  };

  const handleDelete = async (variantId: number) => {
    await deleteProductVariant(variantId);
    // Form'u sıfırla ve editing state'i temizle
    setEditingVariantId(null);
    reset();
  };

  const handleCancel = () => {
    setEditingVariantId(null);
    reset();
  };

  const handleAddNew = () => {
    // Düzenleme modundan çık ve formu temizle
    setEditingVariantId(null);
    reset();

    // Forma scroll yap
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="d-flex flex-column gap-48">
      {/* Varyant Formu */}
      <div ref={formRef}>
        <Form onSubmit={handleSubmit}>
          <div className="row row-gap-24">
            {/* Varyant Adı */}
            <div className="col-lg-6">
              <FormInput
                name="variantName"
                label="Varyant Adı"
                placeholder="Örn: Büyük Boy, Kırmızı, XL"
                required
              />
            </div>

            {/* SKU */}
            <div className="col-lg-6">
              <FormInput
                name="sku"
                label="SKU"
                placeholder="Stok Kodu"
                helperText="Ürün için benzersiz stok kodu"
              />
            </div>

            {/* Fiyat Ayarı */}
            <div className="col-lg-6">
              <FormInput
                name="priceAdjustment"
                label="Fiyat Farkı"
                type="number"
                placeholder="0.00"
                helperText="Ana ürün fiyatına eklenecek/çıkarılacak tutar (₺)"
              />
            </div>

            {/* Stok Miktarı */}
            <div className="col-lg-6">
              <FormInput
                name="stockQuantity"
                label="Stok Miktarı"
                type="number"
                placeholder="0"
                helperText="Bu varyant için mevcut stok adedi"
              />
            </div>

            {/* Aktif */}
            <div className="col-lg-6">
              <FormCheckbox name="isActive" label="Aktif" variant="outlined" />
            </div>

            {/* Form Actions */}
            <div className="col-lg-12">
              <div className="d-flex justify-content-end gap-12">
                {editingVariantId && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancel}
                    disabled={addVariantLoading || editVariantLoading}
                  >
                    İptal
                  </Button>
                )}
                <Button
                  type="submit"
                  disabled={
                    hasErrors || addVariantLoading || editVariantLoading
                  }
                  loading={addVariantLoading || editVariantLoading}
                >
                  {editingVariantId ? "Güncelle" : "Ekle"}
                </Button>
              </div>
            </div>
          </div>
        </Form>
      </div>

      {/* Mevcut Varyantlar Listesi */}
      <VariantsList
        editingVariantId={editingVariantId}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onAddNew={handleAddNew}
      />
    </div>
  );
};
