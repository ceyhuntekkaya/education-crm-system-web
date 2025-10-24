import React from "react";
import { CustomCard, LoadingSpinner } from "@/components/ui";

/**
 * Marka detayları yüklenirken gösterilen loading section'ı
 */
export const BrandDetailLoadingSection: React.FC = () => {
  return (
    <CustomCard title="Marka Detayı">
      <div className="text-center py-4">
        <LoadingSpinner
          message="Marka bilgisi yükleniyor..."
          size="md"
          variant="dots"
        />
      </div>
    </CustomCard>
  );
};

/**
 * Marka bilgisi yüklenirken hata oluştuğunda gösterilen section
 */
export const BrandDetailErrorSection: React.FC<{ error: string }> = ({
  error,
}) => {
  return (
    <CustomCard
      title="Hata"
      bgColor="bg-danger-25"
      border="border border-danger-30"
    >
      <div className="text-center py-8">
        <i className="ph ph-warning-circle text-danger fs-2 mb-3"></i>
        <p className="text-danger mb-0">
          Marka bilgisi yüklenirken hata oluştu: {error}
        </p>
      </div>
    </CustomCard>
  );
};

/**
 * Marka bulunamadığında gösterilen section
 */
export const BrandDetailNotFoundSection: React.FC = () => {
  return (
    <CustomCard
      title="Marka Bulunamadı"
      bgColor="bg-warning-25"
      border="border border-warning-30"
    >
      <div className="text-center py-8">
        <i className="ph ph-buildings text-warning fs-2 mb-3"></i>
        <p className="text-warning mb-0">
          Marka bilgisi bulunamadı veya henüz yüklenmedi.
        </p>
      </div>
    </CustomCard>
  );
};

/**
 * Marka detayları boş olduğunda gösterilen section
 */
export const BrandDetailEmptySection: React.FC = () => {
  return (
    <CustomCard title="Marka Detayı">
      <div className="text-center py-8">
        <i className="ph ph-info text-info fs-2 mb-3"></i>
        <p className="text-info mb-0">
          Görüntülenecek marka detayı bulunmamaktadır.
        </p>
      </div>
    </CustomCard>
  );
};
