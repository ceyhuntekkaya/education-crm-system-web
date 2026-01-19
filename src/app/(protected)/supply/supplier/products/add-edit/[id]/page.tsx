"use client";

import React from "react";
import { CustomCard } from "@/components";
import { useProductAddEdit } from "../_shared/context";
import { ProductForm, ProductImagesForm } from "../_shared/sections";
import { usePageTitle } from "@/hooks";

/**
 * Product Add/Edit page
 */
export default function ProductAddEditPage() {
  const { product, productDetailLoading, isEditing } = useProductAddEdit();

  const pageTitle = isEditing ? "Ürün Düzenle" : "Yeni Ürün Ekle";

  usePageTitle(pageTitle);

  return (
    <>
      <CustomCard
        title={pageTitle}
        subtitle={
          isEditing
            ? "Mevcut ürün bilgilerini düzenleyin"
            : "Yeni ürün bilgilerini oluşturun"
        }
        isBack
        mb="mb-24"
        isLoading={productDetailLoading && isEditing}
      >
        <ProductForm initialData={isEditing ? product || undefined : undefined} />
      </CustomCard>

      {/* Ürün Görselleri Formu - Sadece düzenleme modunda gösterilir */}
      {isEditing && (
        <CustomCard
          title="Ürün Görselleri"
          subtitle="Ürününüz için görseller yükleyebilirsiniz"
          mb="mb-24"
        >
          <ProductImagesForm />
        </CustomCard>
      )}
    </>
  );
}
