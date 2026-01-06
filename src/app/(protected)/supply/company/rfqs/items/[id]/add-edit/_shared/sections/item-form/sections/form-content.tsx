"use client";

import React from "react";
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
import { useRFQItemAddEdit } from "../../../context";
import { RFQItemFormData } from "../types/form-data";

/**
 * RFQ Item form content component
 */
export const ItemFormContent: React.FC = () => {
  // Form hook - validation ve error kontrolü için
  const { hasErrors } = useFormHook();

  // Form reset hook'u
  const { reset } = useForm();

  // Context'ten Item işlemlerini ve kategorileri al
  const {
    isEditing,
    postItem,
    putItem,
    itemSubmitLoading,
    itemError,
    categoriesResponse,
    categoriesLoading,
  } = useRFQItemAddEdit();

  // Kategori options'ı hazırla
  const categoryOptions = React.useMemo(() => {
    const categories = categoriesResponse?.data?.content || [];
    return categories.map((category) => ({
      value: category.id?.toString() || "",
      label: category.name || "",
    }));
  }, [categoriesResponse]);

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

  const handleSubmit = async (values: any) => {
    const formData = values as RFQItemFormData;

    try {
      // categoryId'yi string'den number'a çevir
      const categoryId = formData.categoryId
        ? typeof formData.categoryId === "string"
          ? parseInt(formData.categoryId)
          : formData.categoryId
        : undefined;

      if (isEditing) {
        // UPDATE - RFQItemUpdateDto: Tüm alanlar opsiyonel
        const updateData: any = {};

        // categoryId - opsiyonel, number
        if (categoryId) {
          updateData.categoryId = categoryId;
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

        await putItem(updateData);
      } else {
        // CREATE - RFQItemCreateDto: itemName ve quantity zorunlu
        const createData: any = {
          itemName: formData.itemName.trim(), // Zorunlu, minLength 1
          quantity: formData.quantity, // Zorunlu
        };

        // categoryId - opsiyonel, number
        if (categoryId) {
          createData.categoryId = categoryId;
        }

        // specifications - opsiyonel, string
        if (formData.specifications && formData.specifications.trim()) {
          createData.specifications = formData.specifications.trim();
        }

        // unit - opsiyonel, string
        if (formData.unit && formData.unit.trim()) {
          createData.unit = formData.unit.trim();
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

        <div className="col-12">
          <FormAutocomplete
            name="categoryId"
            label="Kategori"
            options={categoryOptions}
            placeholder="Kategori seçiniz..."
            isLoading={categoriesLoading}
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
            rows={4}
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
