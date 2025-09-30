import { useSearchParams } from "next/navigation";
import { useEffect, useCallback, useRef } from "react";
import { useForm } from "@/contexts";
import { mockFavSearchParams } from "../mock/fav-search-filters";
import type { FavFilterSyncReturn } from "../types/fav-filter-types";

interface InstitutionTypeConfig {
  typeId: string;
  hasMultiple: boolean;
  allIds?: number[];
}

// Temiz helper fonksiyonlar
const getInstitutionTypesFromProperties = (
  propertyFilters: any[]
): number[] => {
  return propertyFilters
    .filter((filter) =>
      filter.propertyGroupTypeDtos?.some((group: any) =>
        group.propertyTypes?.some((prop: any) => prop.isSelected)
      )
    )
    .map((filter) => filter.institutionTypeDto.id);
};

const determineInstitutionType = (
  favFilter: any
): InstitutionTypeConfig | null => {
  // İlk önce property filters'dan kontrol et
  const propertyBasedIds = favFilter.propertyFilters
    ? getInstitutionTypesFromProperties(favFilter.propertyFilters)
    : [];

  if (propertyBasedIds.length > 0) {
    return {
      typeId: propertyBasedIds[0].toString(),
      hasMultiple: propertyBasedIds.length > 1,
      allIds: propertyBasedIds,
    };
  }

  // Fallback: institutionTypeIds'den kontrol et
  if (favFilter.institutionTypeIds != null) {
    const ids = Array.isArray(favFilter.institutionTypeIds)
      ? favFilter.institutionTypeIds
      : [favFilter.institutionTypeIds];

    if (ids.length > 0) {
      return {
        typeId: ids[0].toString(),
        hasMultiple: ids.length > 1,
        allIds: ids,
      };
    }
  }

  return null;
};

// Utility fonksiyonlar
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const isValidFavId = (favId: string): boolean => {
  const id = Number(favId);
  return !isNaN(id) && id >= 0;
};

const getFavFilter = (favId: string) => {
  const id = Number(favId);
  return mockFavSearchParams[id] || null;
};

/**
 * URL'den gelen favId parametresine göre favori filtreyi form değerleriyle senkronize eden hook
 */
export const useFavFilterSync = (): FavFilterSyncReturn => {
  const searchParams = useSearchParams();
  const { setValue, reset } = useForm();
  const isInitialized = useRef(false);
  const lastFavId = useRef<string | null>(null);

  // Ana senkronizasyon fonksiyonu
  const syncFilter = useCallback(async () => {
    const favId = searchParams?.get("favId");

    // FavId yoksa veya zaten işlenmişse çık
    if (!favId || lastFavId.current === favId) {
      if (!favId) {
        isInitialized.current = true;
        lastFavId.current = null;
      }
      return;
    }

    // Geçersiz favId kontrolü
    if (!isValidFavId(favId)) {
      isInitialized.current = true;
      lastFavId.current = favId;
      return;
    }

    // Filter verisini al
    const filter = getFavFilter(favId);
    if (!filter) {
      console.warn(`Favorite filter not found: ${favId} - Resetting form`);

      // Eşleşen favori filtre yoksa formu resetle
      reset();

      isInitialized.current = true;
      lastFavId.current = favId;
      return;
    }

    console.log(`Loading favorite filter: ${favId}`);
    lastFavId.current = favId;

    try {
      // Dinamik component'lerin yüklenmesi için bekle
      await wait(300);

      // Temel alanları ayarla
      const basicUpdates: Promise<void>[] = [];

      // String alanlar
      if (filter.searchTerm)
        basicUpdates.push(setValue("searchTerm", filter.searchTerm));
      if (filter.curriculumType)
        basicUpdates.push(setValue("curriculumType", filter.curriculumType));
      if (filter.languageOfInstruction)
        basicUpdates.push(
          setValue("languageOfInstruction", filter.languageOfInstruction)
        );
      if (filter.sortBy) basicUpdates.push(setValue("sortBy", filter.sortBy));
      if (filter.sortDirection)
        basicUpdates.push(setValue("sortDirection", filter.sortDirection));

      // Sayısal alanlar (string'e çevir)
      if (filter.countryId != null)
        basicUpdates.push(setValue("countryId", filter.countryId.toString()));
      if (filter.provinceId != null)
        basicUpdates.push(setValue("provinceId", filter.provinceId.toString()));
      if (filter.districtId != null)
        basicUpdates.push(setValue("districtId", filter.districtId.toString()));
      if (filter.page != null)
        basicUpdates.push(setValue("page", filter.page.toString()));
      if (filter.size != null)
        basicUpdates.push(setValue("size", filter.size.toString()));

      // Range alanları
      if (filter.minAge != null && filter.maxAge != null) {
        basicUpdates.push(setValue("ageRange", [filter.minAge, filter.maxAge]));
      }
      if (filter.minFee != null && filter.maxFee != null) {
        basicUpdates.push(setValue("feeRange", [filter.minFee, filter.maxFee]));
      }
      if (filter.minRating) {
        basicUpdates.push(setValue("minRating", filter.minRating));
      }

      await Promise.all(basicUpdates);

      // Institution type ayarla
      const config = determineInstitutionType(filter);
      if (config) {
        const { typeId, hasMultiple, allIds } = config;

        if (hasMultiple && allIds) {
          await Promise.all([
            setValue(
              "institutionTypeIds",
              allIds.map((id) => id.toString())
            ),
            setValue("institutionTypeId", ""),
          ]);
        } else {
          await Promise.all([
            setValue("institutionTypeId", typeId),
            setValue("institutionTypeIds", ""),
          ]);
        }
      }

      // Property filters ayarla
      if (filter.propertyFilters?.length) {
        // Önce temizle
        const clearUpdates: Promise<void>[] = [];
        filter.propertyFilters.forEach((propertyFilter: any) => {
          propertyFilter.propertyGroupTypeDtos?.forEach((groupType: any) => {
            const fieldName =
              groupType.displayName ||
              groupType.name ||
              `property_group_${groupType.id}`;
            clearUpdates.push(setValue(fieldName, []));
          });
        });
        await Promise.all(clearUpdates);
        await wait(50);

        // Seçili property'leri ayarla
        const setUpdates: Promise<void>[] = [];
        filter.propertyFilters.forEach((propertyFilter: any) => {
          propertyFilter.propertyGroupTypeDtos?.forEach((groupType: any) => {
            const selectedIds =
              groupType.propertyTypes
                ?.filter((prop: any) => prop.isSelected)
                .map((prop: any) => prop.id.toString()) || [];

            if (selectedIds.length > 0) {
              const fieldName =
                groupType.displayName ||
                groupType.name ||
                `property_group_${groupType.id}`;
              setUpdates.push(setValue(fieldName, selectedIds));
            }
          });
        });
        await Promise.all(setUpdates);
      }

      // Ek alanları ayarla
      await Promise.all([
        setValue("propertyFilters", ""),
        setValue("favId", favId),
        setValue("_forceUpdate", Date.now().toString()),
      ]);

      console.log(`Favorite filter loaded successfully: ${favId}`);
    } catch (error) {
      console.error("Error loading favorite filter:", error);
    } finally {
      isInitialized.current = true;
    }
  }, [searchParams, setValue, reset]);

  // FavId değişikliklerini izle
  useEffect(() => {
    const favId = searchParams?.get("favId");

    if (lastFavId.current !== favId) {
      isInitialized.current = false;
      lastFavId.current = null;
    }
  }, [searchParams]);

  // Senkronizasyonu başlat
  useEffect(() => {
    syncFilter();
  }, [syncFilter]);

  return {
    isInitialized: isInitialized.current,
  };
};
