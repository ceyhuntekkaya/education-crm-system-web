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
  // İl değiştiğinde ilçeyi temizle
  React.useEffect(() => {
    if (values.provinceId && values.districtId) {
      // İl değişmişse ve hala ilçe seçiliyse, ilçeyi temizle
      updateField("districtId", "");
    }
  }, [values.provinceId, values.districtId, updateField]);
}
