import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui";

/**
 * Ürün bulunamadığında gösterilen empty state component'i
 */
export const ProductEmptyState: React.FC = () => {
  const router = useRouter();

  return (
    <div className="product-detail-page__state-container">
      <i className="ph-bold ph-package text-neutral-400 product-detail-page__state-icon"></i>
      <h5 className="text-neutral-700 fw-semibold mt-3 mb-2 product-detail-page__state-title">
        Ürün Bulunamadı
      </h5>
      <p className="text-neutral-500 mb-4 product-detail-page__state-message">
        Bu ID ile ilişkili bir ürün bulunamadı. Lütfen geçerli bir ürün
        ID&apos;si ile tekrar deneyin.
      </p>
      <Button
        variant="outline"
        leftIcon="ph-arrow-left"
        onClick={() => router.back()}
      >
        Geri Dön
      </Button>
    </div>
  );
};
