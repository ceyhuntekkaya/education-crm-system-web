"use client";

import React from "react";
import { usePageTitle } from "@/hooks";
import { DetailLayout } from "@/components/layouts";
import {
  useSupplierDetail,
  SupplierProductsSection,
  createSupplierDetailColumns,
} from "./_shared";

/**
 * Modern Supplier detay sayfası - DetailLayout kullanarak
 * Tedarikçi detaylarını görüntüler
 */
const SupplierDetailPage: React.FC = () => {
  usePageTitle("Tedarikçi Detayı");
  const { supplier, isLoading, error, hasValidId } = useSupplierDetail();

  return (
    <>
      <DetailLayout
        header={{
          backButton: {
            label: "Geri Dön",
            href: "/supply/company/suppliers",
          },
          actionButtons: [
            // İleride düzenle butonu eklenebilir
            // {
            //   id: "edit",
            //   label: "Düzenle",
            //   onClick: handleEdit,
            // },
          ],
        }}
        loading={{
          isLoading: isLoading && hasValidId,
        }}
        error={{
          error: error && hasValidId ? error : null,
        }}
        empty={{
          isEmpty: !supplier && !isLoading && !error && hasValidId,
          emptyTitle: "Tedarikçi Bulunamadı",
          emptyDescription:
            "İstenen tedarikçi bulunamadı veya erişim izniniz yok.",
        }}
        columns={
          supplier
            ? {
                data: supplier,
                columns: createSupplierDetailColumns(),
              }
            : undefined
        }
      />
      {/* Tedarikçi Ürünleri */}
      {supplier && (
        <div className="mt-32">
          <SupplierProductsSection />
        </div>
      )}
    </>
  );
};

export default SupplierDetailPage;
