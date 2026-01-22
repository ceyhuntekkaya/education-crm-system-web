import React from "react";
import { BackButton, EditButton, DeleteButton } from "./sections";

/**
 * Ürün detay sayfası header'ı
 * Geri dön butonu, düzenle ve sil aksiyonlarını içerir
 */
export const ProductDetailHeader: React.FC = () => {
  return (
    <div
      className="d-flex align-items-center justify-content-between mb-24"
      style={{ width: "100%" }}
    >
      <BackButton />
      <div className="d-flex align-items-center gap-12">
        <EditButton />
        <DeleteButton />
      </div>
    </div>
  );
};
