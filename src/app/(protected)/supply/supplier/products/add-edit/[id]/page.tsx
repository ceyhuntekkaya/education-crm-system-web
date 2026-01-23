"use client";

import React from "react";
import { CustomCard } from "@/components";
import { useProductsContext } from "../../_shared/contexts";
import { useProductAddEdit } from "../_shared/context";
import {
  ProductForm,
  ProductImagesForm,
  ProductDiscountsForm,
  ProductVariantsForm,
} from "../_shared/sections";
import { usePageTitle } from "@/hooks";

/**
 * Product Add/Edit page
 */
export default function ProductAddEditPage() {
  const { currentProduct: product, currentProductLoading } =
    useProductsContext();
  const { isEditing } = useProductAddEdit();

  const pageTitle = isEditing ? "Ürün Düzenle" : "Yeni Ürün Ekle";

  usePageTitle(pageTitle);

  return (
    <div className="d-flex flex-column gap-24">
      <CustomCard
        title={pageTitle}
        subtitle={
          isEditing
            ? "Mevcut ürün bilgilerini düzenleyin"
            : "Yeni ürün bilgilerini oluşturun"
        }
        isBack
        type="accordion"
        defaultOpen
        isLoading={currentProductLoading && isEditing}
      >
        <ProductForm
          initialData={isEditing ? product || undefined : undefined}
        />
      </CustomCard>

      {/* Ürün Görselleri Formu - Sadece düzenleme modunda gösterilir */}
      {isEditing && (
        <CustomCard
          title="Ürün Görselleri"
          subtitle="Ürününüz için görseller yükleyebilirsiniz"
          type="accordion"
        >
          <ProductImagesForm />
        </CustomCard>
      )}

      {/* Ürün İndirimleri Formu - Sadece düzenleme modunda gösterilir */}
      {isEditing && (
        <CustomCard
          title="Ürün İndirimleri"
          subtitle="Ürününüz için indirimler tanımlayabilirsiniz"
          type="accordion"
        >
          <ProductDiscountsForm />
        </CustomCard>
      )}

      {/* Ürün Varyantları Formu - Sadece düzenleme modunda gösterilir */}
      {isEditing && (
        <CustomCard
          title="Ürün Varyantları"
          subtitle="Ürününüz için varyantlar tanımlayabilirsiniz"
          type="accordion"
        >
          <ProductVariantsForm />
        </CustomCard>
      )}
    </div>
  );
}
