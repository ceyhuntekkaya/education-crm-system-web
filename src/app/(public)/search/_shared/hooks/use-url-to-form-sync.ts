import { useSearchParams } from "next/navigation";
import { useEffect, useCallback, useRef, useState } from "react";
import { useForm } from "@/contexts";

/**
 * URL parametrelerini form değerleriyle senkronize eden hook
 * Sadece sayfa ilk yüklendiğinde çalışır, sonrasında form interaksiyonuna müdahale etmez
 */
export const useUrlToFormSync = () => {
  const searchParams = useSearchParams();
  const { setValue } = useForm();
  const hasInitialized = useRef(false);
  const [hasUrlParams, setHasUrlParams] = useState(false);
  const [urlPropertyFilters, setUrlPropertyFilters] = useState<number[]>([]);

  const syncUrlToForm = useCallback(async () => {
    // Eğer daha önce initialize edildiyse, tekrar çalışmasın
    if (hasInitialized.current) return;

    if (!searchParams) return;

    // URL'den gelen tüm parametreleri al
    const params = new URLSearchParams(searchParams.toString());

    // Favori arama varsa normal URL sync'i skip et
    const favSearchId = params.get("favSearchId");
    if (favSearchId) {
      hasInitialized.current = true;
      setHasUrlParams(false);
      // console.log("🔗 URL sync skipped - favori arama mevcut:", favSearchId);
      return;
    }

    // Eğer URL'de parametre yoksa hiçbir şey yapma
    if (params.toString() === "") {
      hasInitialized.current = true;
      setHasUrlParams(false);
      return;
    }

    // URL'de parametre var demektir
    setHasUrlParams(true);

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
        case "minFee":
        case "maxFee":
          // minFee ve maxFee'yi feeRange array'ine dönüştür
          const minFeeValue = params.get("minFee");
          const maxFeeValue = params.get("maxFee");
          if (minFeeValue || maxFeeValue) {
            const minFee = minFeeValue ? Number(minFeeValue) : 1;
            const maxFee = maxFeeValue ? Number(maxFeeValue) : 1000000;
            if (!isNaN(minFee) && !isNaN(maxFee)) {
              // feeRange field'ına yaz (sadece bir kere yazılsın diye key'i kontrol et)
              if (!processedParams["feeRange"]) {
                processedParams["feeRange"] = [minFee, maxFee];
              }
            }
          }
          break;

        case "feeRange":
          // feeRange parametresi birden fazla değer alabilir (array olarak)
          const feeRangeValues = params.getAll("feeRange");
          if (feeRangeValues.length > 0) {
            const numericValues = feeRangeValues
              .map((val) => Number(val))
              .filter((val) => !isNaN(val));
            if (numericValues.length > 0) {
              processedParams["feeRange"] = numericValues;
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
          // Property filters için array'e çevir ve ayrı bir state'te tut
          // Form'a yazmıyoruz çünkü form'da object olarak beklendiği için uyumsuzluk olur
          const propertyFilterValues = params.getAll("propertyFilters");
          if (propertyFilterValues.length > 0) {
            const numericValues = propertyFilterValues
              .map((val) => Number(val))
              .filter((val) => !isNaN(val));
            // State'e kaydet, form'a yazma
            setUrlPropertyFilters(numericValues);
          }
          break;

        case "minAge":
        case "maxAge":
          // minAge ve maxAge'i ageRange array'ine dönüştür
          // Hem minAge hem de maxAge varsa ikisini birleştir
          const minAgeValue = params.get("minAge");
          const maxAgeValue = params.get("maxAge");
          if (minAgeValue || maxAgeValue) {
            const minAge = minAgeValue ? Number(minAgeValue) : 1;
            const maxAge = maxAgeValue ? Number(maxAgeValue) : 80;
            if (!isNaN(minAge) && !isNaN(maxAge)) {
              // ageRange field'ına yaz (sadece bir kere yazılsın diye key'i kontrol et)
              if (!processedParams["ageRange"]) {
                processedParams["ageRange"] = [minAge, maxAge];
              }
            }
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
              processedParams["ageRange"] = numericValues;
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

  return { hasUrlParams, urlPropertyFilters };
};
