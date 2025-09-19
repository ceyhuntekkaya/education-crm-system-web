import React from "react";
import { useFormHook } from "@/hooks";

/**
 * Lokasyon bağımlılıklarını yönetir
 * İl değiştiğinde ilçe seçimini temizler
 */
export function useLocationDependencies(
  values: any,
  updateField: (field: string, value: any) => void
) {
  // Önceki provinceId değerini tutmak için ref kullan
  const prevProvinceIdRef = React.useRef(values.provinceId);

  // İl değiştiğinde ilçeyi temizle
  React.useEffect(() => {
    // Sadece provinceId gerçekten değiştiğinde ve yeni değer varsa işlem yap
    if (
      values.provinceId &&
      values.provinceId !== prevProvinceIdRef.current &&
      values.districtId
    ) {
      // İl değişmişse ve hala ilçe seçiliyse, ilçeyi temizle
      updateField("districtId", "");
    }

    // Önceki değeri güncelle
    prevProvinceIdRef.current = values.provinceId;
  }, [values.provinceId, values.districtId, updateField]);
}
