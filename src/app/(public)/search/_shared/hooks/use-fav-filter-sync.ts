import { useSearchParams } from "next/navigation";
import { useEffect, useCallback, useRef } from "react";
import { useForm } from "@/contexts";
import { mockFavSearchParams } from "../mock/fav-search-filters";
import type { FavFilterSyncReturn } from "../types/fav-filter-types";

/**
 * URL'den gelen favId parametresine göre favori filtreyi form değerleriyle senkronize eden hook
 * Sadece sayfa ilk yüklendiğinde çalışır, sonrasında form interaksiyonuna müdahale etmez
 *
 * @example
 * // URL: /search?favId=0
 * // Bu durumda mockFavSearchParams[0] index'indeki favori filtre yüklenir
 *
 * // Context içinde kullanım:
 * useFavFilterSync();
 *
 * @returns {{ isInitialized: boolean }} Hook'un initialize durumu
 */
export const useFavFilterSync = (): FavFilterSyncReturn => {
  const searchParams = useSearchParams();
  const { setValue } = useForm();
  const hasInitialized = useRef(false);

  const syncFavFilterToForm = useCallback(async () => {
    // Eğer daha önce initialize edildiyse, tekrar çalışmasın
    if (hasInitialized.current) return;

    if (!searchParams) return;

    // URL'den favId parametresini al
    const favId = searchParams.get("favId");

    // favId yoksa hiçbir şey yapma
    if (!favId) {
      hasInitialized.current = true;
      return;
    }

    // Dinamik property'ler için biraz gecikme ekle
    // Form alanları tam yüklenmeden önce çalışmasını önle
    await new Promise((resolve) => setTimeout(resolve, 100));

    // favId'yi number'a çevir
    const favIdNumber = Number(favId);
    if (isNaN(favIdNumber) || favIdNumber < 0) {
      hasInitialized.current = true;
      return;
    }

    // favId'ye karşılık gelen favori filtreyi bul (array index olarak)
    const favFilter = mockFavSearchParams[favIdNumber];

    if (!favFilter) {
      console.warn(`Favori filtre bulunamadı: favId = ${favIdNumber}`);
      hasInitialized.current = true;
      return;
    }

    console.log(`Favori filtre yükleniyor: favId = ${favIdNumber}`, favFilter);

    // Tüm setValue işlemlerini paralel olarak çalıştır
    const updatePromises: Promise<void>[] = [];

    // Temel arama parametrelerini set et
    if (favFilter.searchTerm !== undefined && favFilter.searchTerm !== null) {
      updatePromises.push(setValue("searchTerm", favFilter.searchTerm));
    }

    if (
      favFilter.minAge !== undefined &&
      favFilter.maxAge !== undefined &&
      favFilter.minAge !== null &&
      favFilter.maxAge !== null
    ) {
      // Form'da ageRange array olarak değil, string olarak saklanıyor gibi görünüyor
      // Ama örnek obje'de ageRange: "" var, bu yüzden array olarak set edelim
      updatePromises.push(
        setValue("ageRange", [favFilter.minAge, favFilter.maxAge])
      );
    }

    if (
      favFilter.minFee !== undefined &&
      favFilter.maxFee !== undefined &&
      favFilter.minFee !== null &&
      favFilter.maxFee !== null
    ) {
      updatePromises.push(
        setValue("feeRange", [favFilter.minFee, favFilter.maxFee])
      );
    }

    if (
      favFilter.curriculumType !== undefined &&
      favFilter.curriculumType !== ""
    ) {
      updatePromises.push(setValue("curriculumType", favFilter.curriculumType));
    }

    if (
      favFilter.languageOfInstruction !== undefined &&
      favFilter.languageOfInstruction !== ""
    ) {
      updatePromises.push(
        setValue("languageOfInstruction", favFilter.languageOfInstruction)
      );
    }

    if (favFilter.countryId !== undefined) {
      updatePromises.push(
        setValue("countryId", favFilter.countryId.toString())
      );
    }

    if (favFilter.provinceId !== undefined) {
      updatePromises.push(
        setValue("provinceId", favFilter.provinceId.toString())
      );
    }

    if (favFilter.districtId !== undefined) {
      updatePromises.push(
        setValue("districtId", favFilter.districtId.toString())
      );
    }

    if (favFilter.minRating !== undefined && favFilter.minRating !== "") {
      // Form'da minRating string olarak saklanıyor
      updatePromises.push(setValue("minRating", favFilter.minRating));
    }

    // Institution type ID'sini belirle
    let finalInstitutionTypeId: string | undefined;
    let hasMultipleTypes = false;

    // Önce propertyFilters'tan seçili property'lerin institution type'ını bul
    if (favFilter.propertyFilters && Array.isArray(favFilter.propertyFilters)) {
      // Seçili property'lerin olduğu institution type'ları bul
      const institutionTypesWithSelectedProperties: number[] = [];

      favFilter.propertyFilters.forEach((propertyFilter) => {
        if (
          propertyFilter.propertyGroupTypeDtos &&
          Array.isArray(propertyFilter.propertyGroupTypeDtos)
        ) {
          const hasSelectedProperties =
            propertyFilter.propertyGroupTypeDtos.some(
              (groupType) =>
                groupType.propertyTypes &&
                Array.isArray(groupType.propertyTypes) &&
                groupType.propertyTypes.some(
                  (propertyType) => propertyType.isSelected === true
                )
            );

          if (hasSelectedProperties) {
            institutionTypesWithSelectedProperties.push(
              propertyFilter.institutionTypeDto.id
            );
          }
        }
      });

      // Eğer seçili property'ler varsa o institution type'ı kullan
      if (institutionTypesWithSelectedProperties.length > 0) {
        finalInstitutionTypeId =
          institutionTypesWithSelectedProperties[0].toString();
        hasMultipleTypes = institutionTypesWithSelectedProperties.length > 1;
        console.log(
          `Seçili property'lerden institution type belirlendi: ${finalInstitutionTypeId}`
        );
      }
    }

    // Eğer property'lerden bir institution type bulunamadıysa, institutionTypeIds'den al
    if (!finalInstitutionTypeId && favFilter.institutionTypeIds !== undefined) {
      const institutionTypeIds = Array.isArray(favFilter.institutionTypeIds)
        ? favFilter.institutionTypeIds
        : [favFilter.institutionTypeIds];

      if (institutionTypeIds.length > 0) {
        finalInstitutionTypeId = institutionTypeIds[0].toString();
        hasMultipleTypes = institutionTypeIds.length > 1;
        console.log(
          `institutionTypeIds'den institution type belirlendi: ${finalInstitutionTypeId}`
        );
      }
    }

    // Institution type ID'yi form'a set et
    if (finalInstitutionTypeId) {
      if (hasMultipleTypes) {
        // Çoklu seçim durumu
        const allIds = favFilter.institutionTypeIds;
        if (allIds && Array.isArray(allIds)) {
          updatePromises.push(
            setValue(
              "institutionTypeIds",
              allIds.map((id) => id.toString())
            )
          );
        }
        updatePromises.push(setValue("institutionTypeId", "")); // Çoklu seçimde institutionTypeId boş
      } else {
        // Tek seçim durumu
        updatePromises.push(
          setValue("institutionTypeId", finalInstitutionTypeId)
        );
        updatePromises.push(setValue("institutionTypeIds", "")); // Tek seçimde institutionTypeIds boş
      }
    }

    // Property filters'ı işle - seçili property'leri form'a yükle
    if (favFilter.propertyFilters && Array.isArray(favFilter.propertyFilters)) {
      favFilter.propertyFilters.forEach((propertyFilter) => {
        if (
          propertyFilter.propertyGroupTypeDtos &&
          Array.isArray(propertyFilter.propertyGroupTypeDtos)
        ) {
          propertyFilter.propertyGroupTypeDtos.forEach((groupType) => {
            if (
              groupType.propertyTypes &&
              Array.isArray(groupType.propertyTypes)
            ) {
              // Bu property group type için seçili property ID'lerini topla
              const selectedPropertyIds = groupType.propertyTypes
                .filter((propertyType) => propertyType.isSelected === true)
                .map((propertyType) => propertyType.id.toString());

              // Eğer seçili property'ler varsa, form alanına set et
              if (selectedPropertyIds.length > 0) {
                // Form'daki field name: groupType.displayName (örn: "EĞİTİM SİSTEMİ", "EK PROGRAMLAR")
                const fieldName =
                  groupType.displayName ||
                  groupType.name ||
                  `property_group_${groupType.id}`;

                console.log(
                  `Setting dynamic property field: ${fieldName}`,
                  selectedPropertyIds
                );
                updatePromises.push(setValue(fieldName, selectedPropertyIds));
              }
            }
          });
        }
      });
    }

    // Sıralama parametrelerini set et (form'da string olarak)
    if (favFilter.sortBy !== undefined && favFilter.sortBy !== "") {
      updatePromises.push(setValue("sortBy", favFilter.sortBy));
    }

    if (
      favFilter.sortDirection !== undefined &&
      favFilter.sortDirection !== ""
    ) {
      updatePromises.push(setValue("sortDirection", favFilter.sortDirection));
    }

    // Sayfalama parametrelerini set et (form'da string olarak)
    if (favFilter.page !== undefined) {
      updatePromises.push(setValue("page", favFilter.page.toString()));
    }

    if (favFilter.size !== undefined) {
      updatePromises.push(setValue("size", favFilter.size.toString()));
    }

    // Property filters alanını boş string olarak set et (form yapısına uygun)
    updatePromises.push(setValue("propertyFilters", ""));

    // favId alanını set et
    updatePromises.push(setValue("favId", favId));

    try {
      // Tüm güncellemelerin tamamlanmasını bekle
      await Promise.all(updatePromises);
      console.log(`Favori filtre başarıyla yüklendi: favId = ${favIdNumber}`);
    } catch (error) {
      console.error("Favori filtre yüklenirken hata oluştu:", error);
    }

    // Initialize edildiğini işaretle - artık tekrar çalışmasın
    hasInitialized.current = true;
  }, [searchParams, setValue]);

  useEffect(() => {
    syncFavFilterToForm();
  }, [syncFavFilterToForm]);

  // Hook'un kullanılabilmesi için bir return değeri sağla
  return {
    isInitialized: hasInitialized.current,
  };
};
