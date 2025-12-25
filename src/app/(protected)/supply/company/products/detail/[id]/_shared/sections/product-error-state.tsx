import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui";

interface ProductErrorStateProps {
  error: string;
}

/**
 * Ürün yüklenirken hata oluştuğunda gösterilen error state component'i
 */
export const ProductErrorState: React.FC<ProductErrorStateProps> = ({
  error,
}) => {
  const router = useRouter();

  return (
    <div className="product-detail-page__state-container">
      <i className="ph-bold ph-warning-circle text-danger product-detail-page__state-icon"></i>
      <h5 className="text-danger fw-semibold mt-3 mb-2 product-detail-page__state-title">
        Hata Oluştu
      </h5>
      <p className="text-neutral-500 mb-4 product-detail-page__state-message">
        {error}
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
