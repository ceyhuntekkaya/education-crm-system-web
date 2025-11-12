import { useEffect, useRef, useState } from "react";
import { InstitutionChangesReturn } from "../types";

/**
 * Kurum türü değişikliklerini yönetir
 */
export function useInstitutionChanges(
  values: any,
  clearAllFieldsExcept: (fields: string[]) => void,
  isFavoriteLoading?: boolean // Favori yüklenirken clearing'i devre dışı bırakmak için
): InstitutionChangesReturn {
  const [institutionTypeChangeCounter, setInstitutionTypeChangeCounter] =
    useState(0);

  const prevInstitutionTypeId = useRef(values?.institutionTypeId);

  useEffect(() => {
    // Kurum türü değişti - lokasyon ve ücret aralığı hariç tüm alanları temizle
    if (prevInstitutionTypeId.current !== values?.institutionTypeId) {
      prevInstitutionTypeId.current = values?.institutionTypeId;

      // Counter'ı artır (child component'lar için signal)
      setInstitutionTypeChangeCounter((prev) => prev + 1);

      // Favori yüklenirken clearing yapma!
      if (isFavoriteLoading) {
        console.log(
          "Favori yüklenirken institution change clearing atlanıyor..."
        );
        return;
      }

      // Kurum türü değiştiyse ve bir değer varsa, diğer alanları sıfırla
      if (values?.institutionTypeId) {
        console.log("Institution type değişti, form clearing yapılıyor...");

        const fieldsToKeep = [
          "institutionTypeId", // Kurum türü kendisi
          "countryId",
          "provinceId",
          "districtId",
          "neighborhoodId",
          "latitude",
          "longitude",
          "radiusKm", // Lokasyon alanları
          "feeRange",
          "minFee",
          "maxFee", // Ücret aralığı
        ];

        clearAllFieldsExcept(fieldsToKeep);
      }
    }
  }, [values?.institutionTypeId, clearAllFieldsExcept, isFavoriteLoading]);

  return {
    institutionTypeChangeCounter,
  };
}
