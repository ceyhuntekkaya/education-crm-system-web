import { useSearchParams } from "next/navigation";
import { useEffect, useCallback, useRef } from "react";
import { useForm } from "@/contexts";

/**
 * URL parametrelerini form değerleriyle senkronize eden hook
 * Sadece sayfa ilk yüklendiğinde çalışır, sonrasında form interaksiyonuna müdahale etmez
 */
export const useUrlToFormSync = () => {
  const searchParams = useSearchParams();
  const { setValue } = useForm();
  const hasInitialized = useRef(false);

  const syncUrlToForm = useCallback(async () => {
    // Eğer daha önce initialize edildiyse, tekrar çalışmasın
    if (hasInitialized.current) return;

    if (!searchParams) return;

    // URL'den gelen tüm parametreleri al
    const params = new URLSearchParams(searchParams.toString());

    // Eğer URL'de parametre yoksa hiçbir şey yapma
    if (params.toString() === "") {
      hasInitialized.current = true;
      return;
    }

    // Tüm setValue işlemlerini paralel olarak çalıştır
    const updatePromises: Promise<void>[] = [];

    // Parametre değerlerini toplu olarak işle
    const processedParams: Record<string, any> = {};

    // Her parametre için form field'ını hazırla
    params.forEach((value, key) => {
      // Boş değerleri ignore et
      if (!value || value.trim() === "") return;

      // Eğer bu key zaten işlendiyse skip et (çoklu değerler için)
      if (key in processedParams) return;

      // Özel durumlar için kontroller
      switch (key) {
        case "feeRange":
          // feeRange parametresi birden fazla değer alabilir (array olarak)
          const feeRangeValues = params.getAll("feeRange");
          if (feeRangeValues.length > 0) {
            const numericValues = feeRangeValues
              .map((val) => Number(val))
              .filter((val) => !isNaN(val));
            if (numericValues.length > 0) {
              processedParams[key] = numericValues;
            }
          }
          break;

        case "provinceId":
        case "districtId":
        case "institutionTypeId":
          // ID değerlerini string olarak tut (form'da string olarak kullanılıyor)
          const numericValue = Number(value);
          if (!isNaN(numericValue) && numericValue > 0) {
            processedParams[key] = value; // String olarak tut
          }
          break;

        case "institutionTypeIds":
          // Çoklu seçim için array'e çevir
          const institutionTypeValues = params.getAll("institutionTypeIds");
          if (institutionTypeValues.length > 0) {
            const numericValues = institutionTypeValues
              .map((val) => Number(val))
              .filter((val) => !isNaN(val));
            processedParams[key] = numericValues;
          }
          break;

        case "propertyFilters":
          // Property filters için array'e çevir
          const propertyFilterValues = params.getAll("propertyFilters");
          if (propertyFilterValues.length > 0) {
            const numericValues = propertyFilterValues
              .map((val) => Number(val))
              .filter((val) => !isNaN(val));
            processedParams[key] = numericValues;
          }
          break;

        case "ageRange":
          // ageRange için array değerlerini kontrol et
          const ageRangeValues = params.getAll("ageRange");
          if (ageRangeValues.length > 0) {
            const numericValues = ageRangeValues
              .map((val) => Number(val))
              .filter((val) => !isNaN(val));
            if (numericValues.length > 0) {
              processedParams[key] = numericValues;
            }
          }
          break;

        case "hasActiveCampaigns":
        case "isSubscribed":
          // Boolean değerler için
          processedParams[key] = value === "true" || value === "1";
          break;

        case "minRating":
          // Rating değeri için number kontrolü
          const ratingValue = Number(value);
          if (!isNaN(ratingValue) && ratingValue >= 0 && ratingValue <= 5) {
            processedParams[key] = value; // String olarak tut
          }
          break;

        case "latitude":
        case "longitude":
          // Koordinat değerleri için
          const coordValue = Number(value);
          if (!isNaN(coordValue)) {
            processedParams[key] = coordValue;
          }
          break;

        case "radiusKm":
          // Radius değeri için
          const radiusValue = Number(value);
          if (!isNaN(radiusValue) && radiusValue > 0) {
            processedParams[key] = radiusValue;
          }
          break;

        case "searchTerm":
        case "curriculumType":
        case "languageOfInstruction":
        case "sortBy":
        case "sortDirection":
        case "countryId":
        case "neighborhoodId":
          // String değerler için direkt ekle
          processedParams[key] = value;
          break;

        default:
          // Diğer tanınmayan parametreler için de string olarak ekle
          // Bu dinamik property filtreleri için kullanılabilir
          processedParams[key] = value;
          break;
      }
    });

    // Tüm güncellemeleri paralel olarak yap
    Object.keys(processedParams).forEach((key) => {
      updatePromises.push(setValue(key, processedParams[key]));
    });

    // Tüm güncellemelerin tamamlanmasını bekle
    await Promise.all(updatePromises);

    // Initialize edildiğini işaretle - artık tekrar çalışmasın
    hasInitialized.current = true;
  }, [searchParams, setValue]);

  useEffect(() => {
    syncUrlToForm();
  }, [syncUrlToForm]);
};
