"use client";

import React from "react";
import {
  Form,
  FormInput,
  FormTextarea,
  FormAutocomplete,
} from "@/components/forms";
import { Button } from "@/components/ui/button";
import { FileInput } from "@/components/file-input";
import { useFormHook } from "@/hooks";
import { useForm } from "@/contexts/form-context";
import { useProductAddEdit } from "../../../context";
import { ProductFormData } from "../types/form-data";
import {
  statusOptions,
  stockTrackingTypeOptions,
  currencyOptions,
} from "../../../utils";

/**
 * Product form content component
 */
export const ProductFormContent: React.FC = () => {
  // Form hook - validation ve error kontrolü için
  const { hasErrors } = useFormHook();

  // Form reset hook'u
  const { reset, errors } = useForm();

  // Context'ten Product işlemlerini al
  const {
    isEditing,
    postProduct,
    putProduct,
    productSubmitLoading,
    productError,
    categoryOptions,
    categoriesLoading,
  } = useProductAddEdit();

  const handleSubmit = async (values: any) => {
    const formData = values as ProductFormData;

    try {
      if (isEditing) {
        // UPDATE - Sadece ProductUpdateDto'daki alanları gönder
        const updateData: any = {
          categoryId: formData.categoryId,
          name: formData.name,
          sku: formData.sku || undefined,
          description: formData.description || undefined,
          technicalSpecs: formData.technicalSpecs || undefined,
          status: formData.status,
          stockTrackingType: formData.stockTrackingType,
          stockQuantity: formData.stockQuantity || undefined,
          minStockLevel: formData.minStockLevel || undefined,
          basePrice: formData.basePrice,
          currency: formData.currency,
          taxRate: formData.taxRate || undefined,
          minOrderQuantity: formData.minOrderQuantity || undefined,
          deliveryDays: formData.deliveryDays || undefined,
          mainImageUrl: formData.mainImageUrl || undefined,
        };
        // Undefined değerleri temizle
        Object.keys(updateData).forEach(
          (key) => updateData[key] === undefined && delete updateData[key],
        );
        await putProduct(updateData);
      } else {
        // CREATE - Zorunlu alanlar ve opsiyonel alanlar
        const createData: any = {
          supplierId:
            typeof formData.supplierId === "string"
              ? parseInt(formData.supplierId)
              : formData.supplierId,
          categoryId:
            typeof formData.categoryId === "string"
              ? parseInt(formData.categoryId)
              : formData.categoryId,
          name: formData.name,
          basePrice:
            typeof formData.basePrice === "string"
              ? parseFloat(formData.basePrice)
              : formData.basePrice,
          sku: formData.sku || undefined,
          description: formData.description || undefined,
          technicalSpecs: formData.technicalSpecs || undefined,
          status: formData.status,
          stockTrackingType: formData.stockTrackingType,
          stockQuantity: formData.stockQuantity || undefined,
          minStockLevel: formData.minStockLevel || undefined,
          currency: formData.currency,
          taxRate: formData.taxRate || undefined,
          minOrderQuantity: formData.minOrderQuantity || undefined,
          deliveryDays: formData.deliveryDays || undefined,
          mainImageUrl: formData.mainImageUrl || undefined,
        };
        // Undefined değerleri temizle
        Object.keys(createData).forEach(
          (key) => createData[key] === undefined && delete createData[key],
        );
        await postProduct(createData);
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
        {/* Sol Kolon - Temel Bilgiler */}
        <div className="col-6">
          <div className="d-flex flex-column gap-16">
            <h5>Temel Bilgiler</h5>
            <FormInput
              name="name"
              label="Ürün Adı"
              type="text"
              placeholder="Ürün adını giriniz..."
              isRequired
            />
            <FormAutocomplete
              name="categoryId"
              label="Kategori"
              options={categoryOptions}
              placeholder="Kategori seçiniz..."
              isRequired
              isLoading={categoriesLoading}
            />

            <FormInput
              name="sku"
              label="SKU"
              type="text"
              placeholder="SKU kodunu giriniz..."
            />
            <FormAutocomplete
              name="status"
              label="Durum"
              options={statusOptions}
              placeholder="Durum seçiniz..."
            />
          </div>
        </div>

        {/* Sağ Kolon - Görsel */}
        <div className="col-6">
          <div className="d-flex flex-column gap-16">
            <h5>Ürün Görseli</h5>
            <FileInput
              label="Ana Görsel"
              type="img"
              variant="outline"
              placeholder="Görsel yüklemek için tıklayın veya sürükleyin"
              maxSize={5}
              uploadButtonText="Görsel Yükle"
              name="mainImageUrl"
              isAutoUpload
              isCropPreview={true}
              cropWidth={180}
              cropHeight={180}
            />
          </div>
        </div>

        <div className="col-12">
          <span className="d-block border border-neutral-30 my-24 border-dashed" />
        </div>

        {/* Açıklama */}
        <div className="col-6">
          <FormTextarea
            name="description"
            label="Açıklama"
            placeholder="Ürün açıklamasını giriniz..."
            rows={8}
          />
        </div>

        {/* Teknik Özellikler */}
        <div className="col-6">
          <FormTextarea
            name="technicalSpecs"
            label="Teknik Özellikler"
            placeholder="Teknik özellikleri giriniz..."
            rows={8}
          />
        </div>

        <div className="col-12">
          <span className="d-block border border-neutral-30 my-24 border-dashed" />
        </div>

        {/* Fiyat Bilgileri */}
        <div className="col-12">
          <h5 className="mb-16">Fiyat Bilgileri</h5>
        </div>
        <div className="col-4">
          <FormInput
            name="basePrice"
            label="Temel Fiyat"
            type="number"
            placeholder="Temel fiyatı giriniz..."
            isRequired
          />
        </div>
        <div className="col-4">
          <FormAutocomplete
            name="currency"
            label="Para Birimi"
            options={currencyOptions}
            placeholder="Para birimi seçiniz..."
          />
        </div>
        <div className="col-4">
          <FormInput
            name="taxRate"
            label="Vergi Oranı (%)"
            type="number"
            placeholder="Vergi oranını giriniz..."
          />
        </div>

        <div className="col-12">
          <span className="d-block border border-neutral-30 my-24 border-dashed" />
        </div>

        {/* Stok Bilgileri */}
        <div className="col-12">
          <h5 className="mb-16">Stok Bilgileri</h5>
        </div>
        <div className="col-4">
          <FormAutocomplete
            name="stockTrackingType"
            label="Stok Takip Tipi"
            options={stockTrackingTypeOptions}
            placeholder="Stok takip tipi seçiniz..."
          />
        </div>
        <div className="col-4">
          <FormInput
            name="stockQuantity"
            label="Stok Miktarı"
            type="number"
            placeholder="Stok miktarını giriniz..."
          />
        </div>
        <div className="col-4">
          <FormInput
            name="minStockLevel"
            label="Minimum Stok Seviyesi"
            type="number"
            placeholder="Minimum stok seviyesini giriniz..."
          />
        </div>

        <div className="col-12">
          <span className="d-block border border-neutral-30 my-24 border-dashed" />
        </div>

        {/* Sipariş Bilgileri */}
        <div className="col-12">
          <h5 className="mb-16">Sipariş Bilgileri</h5>
        </div>
        <div className="col-6">
          <FormInput
            name="minOrderQuantity"
            label="Minimum Sipariş Miktarı"
            type="number"
            placeholder="Minimum sipariş miktarını giriniz..."
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

        {/* Hata Mesajı */}
        {productError && (
          <div className="col-12">
            <div className="alert alert-danger" role="alert">
              {productError}
            </div>
          </div>
        )}

        {/* Form Actions */}
        <div className="col-12">
          <div className="d-flex justify-content-end gap-12 mt-24">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={productSubmitLoading}
            >
              İptal
            </Button>
            <Button
              type="submit"
              disabled={hasErrors || productSubmitLoading}
              loading={productSubmitLoading}
            >
              {isEditing ? "Güncelle" : "Kaydet"}
            </Button>
          </div>
        </div>
      </div>
    </Form>
  );
};
