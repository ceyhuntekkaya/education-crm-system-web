import { useEffect, useRef } from "react";

/**
 * Lokasyon bağımlılıklarını yönetir
 * Üst seviye alan değiştiğinde alt seviye alanları temizler
 */
export function useLocationDependencies(
  values: any,
  updateField: (field: string, value: any) => void
) {
  const prevValues = useRef({
    countryId: values?.countryId,
    provinceId: values?.provinceId,
    districtId: values?.districtId,
  });

  useEffect(() => {
    // Ülke değişti - bağımlı alanları temizle
    if (prevValues.current.countryId !== values?.countryId) {
      prevValues.current.countryId = values?.countryId;
      if (values?.provinceId) updateField("provinceId", "");
      if (values?.districtId) updateField("districtId", "");
      if (values?.neighborhoodId) updateField("neighborhoodId", "");
    }

    // İl değişti - bağımlı alanları temizle
    if (prevValues.current.provinceId !== values?.provinceId) {
      prevValues.current.provinceId = values?.provinceId;
      if (values?.districtId) updateField("districtId", "");
      if (values?.neighborhoodId) updateField("neighborhoodId", "");
    }

    // İlçe değişti - bağımlı alanları temizle
    if (prevValues.current.districtId !== values?.districtId) {
      prevValues.current.districtId = values?.districtId;
      if (values?.neighborhoodId) updateField("neighborhoodId", "");
    }
  }, [values, updateField]);

  return prevValues.current;
}
