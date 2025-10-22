import React from "react";
import { CustomCard } from "@/components/ui";

/**
 * Kampüs boş section durumu bileşeni
 */
export const CampusDetailEmptySection: React.FC = () => {
  return (
    <CustomCard>
      <div className="text-center py-5">
        <i
          className="ph ph-files text-neutral-400 mb-3"
          style={{ fontSize: "64px" }}
        ></i>
        <h4 className="text-neutral-600 mb-2">Gösterilecek Bilgi Yok</h4>
        <p className="text-neutral-500 mb-0">
          Bu kampüs için henüz gösterilecek detay bilgisi bulunmamaktadır.
        </p>
      </div>
    </CustomCard>
  );
};
