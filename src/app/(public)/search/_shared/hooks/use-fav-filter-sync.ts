import { useSearchParams } from "next/navigation";
import { useEffect, useCallback, useRef } from "react";
import { useForm } from "@/contexts";
import { mockFavSearchParams } from "../mock/fav-search-filters";
import type { FavFilterSyncReturn } from "../types/fav-filter-types";

// Types
interface InstitutionTypeConfig {
  typeId: string;
  hasMultiple: boolean;
  allIds?: number[];
}

// Helper functions
const findInstitutionTypesWithSelectedProperties = (
  propertyFilters: any[]
): number[] => {
  const institutionTypesWithSelectedProperties: number[] = [];

  propertyFilters.forEach((propertyFilter) => {
    if (
      !propertyFilter.propertyGroupTypeDtos ||
      !Array.isArray(propertyFilter.propertyGroupTypeDtos)
    ) {
      return;
    }

    const hasSelectedProperties = propertyFilter.propertyGroupTypeDtos.some(
      (groupType: any) =>
        groupType.propertyTypes &&
        Array.isArray(groupType.propertyTypes) &&
        groupType.propertyTypes.some(
          (propertyType: any) => propertyType.isSelected === true
        )
    );

    if (hasSelectedProperties) {
      institutionTypesWithSelectedProperties.push(
        propertyFilter.institutionTypeDto.id
      );
    }
  });

  return institutionTypesWithSelectedProperties;
};

const determineInstitutionType = (
  favFilter: any
): InstitutionTypeConfig | null => {
  let finalInstitutionTypeId: string | undefined;
  let hasMultipleTypes = false;
  let allIds: number[] | undefined;

  // Check property filters first
  if (favFilter.propertyFilters && Array.isArray(favFilter.propertyFilters)) {
    const institutionTypesWithSelectedProperties =
      findInstitutionTypesWithSelectedProperties(favFilter.propertyFilters);

    if (institutionTypesWithSelectedProperties.length > 0) {
      finalInstitutionTypeId =
        institutionTypesWithSelectedProperties[0].toString();
      hasMultipleTypes = institutionTypesWithSelectedProperties.length > 1;
      allIds = institutionTypesWithSelectedProperties;
      console.log(
        `Institution type determined from selected properties: ${finalInstitutionTypeId}`
      );
    }
  }

  // Fall back to institutionTypeIds if not found in properties
  if (!finalInstitutionTypeId && favFilter.institutionTypeIds != null) {
    const institutionTypeIds = Array.isArray(favFilter.institutionTypeIds)
      ? favFilter.institutionTypeIds
      : [favFilter.institutionTypeIds];

    if (institutionTypeIds.length > 0) {
      finalInstitutionTypeId = institutionTypeIds[0].toString();
      hasMultipleTypes = institutionTypeIds.length > 1;
      allIds = institutionTypeIds;
      console.log(
        `Institution type determined from institutionTypeIds: ${finalInstitutionTypeId}`
      );
    }
  }

  if (!finalInstitutionTypeId) {
    return null;
  }

  return {
    typeId: finalInstitutionTypeId,
    hasMultiple: hasMultipleTypes,
    allIds,
  };
};

/**
 * URL'den gelen favId parametresine göre favori filtreyi form değerleriyle senkronize eden hook
 * favId değiştiğinde veya sayfa yenilendiğinde otomatik olarak yeniden çalışır
 *
 * @example
 * // URL: /search?favId=0
 * // Bu durumda mockFavSearchParams[0] index'indeki favori filtre yüklenir
 *
 * // URL değiştiğinde: /search?favId=1
 * // Yeni favori filtre otomatik olarak yüklenir
 *
 * // Context içinde kullanım:
 * useFavFilterSync();
 *
 * @returns Hook'un initialize durumu
 */
export const useFavFilterSync = (): FavFilterSyncReturn => {
  const searchParams = useSearchParams();
  const { setValue } = useForm();
  const hasInitialized = useRef(false);
  const lastProcessedFavId = useRef<string | null>(null);
  const processingTimeout = useRef<NodeJS.Timeout | null>(null);

  const syncFavFilterToForm = useCallback(async () => {
    // Clear any existing processing timeout
    if (processingTimeout.current) {
      clearTimeout(processingTimeout.current);
      processingTimeout.current = null;
    }

    if (!searchParams) {
      return;
    }

    const favId = searchParams.get("favId");

    // If no favId, reset initialization state and return
    if (!favId) {
      hasInitialized.current = true;
      lastProcessedFavId.current = null;
      return;
    }

    // Check if we need to process this favId
    const shouldProcess =
      !hasInitialized.current || lastProcessedFavId.current !== favId;

    if (!shouldProcess) {
      return;
    }

    console.log(`Starting to process favId: ${favId}`);

    // Wait for dynamic properties to load with longer timeout
    await new Promise((resolve) => {
      setTimeout(resolve, 500);
    });

    const favIdNumber = Number(favId);
    if (Number.isNaN(favIdNumber) || favIdNumber < 0) {
      hasInitialized.current = true;
      lastProcessedFavId.current = favId;
      return;
    }

    const favFilter = mockFavSearchParams[favIdNumber];

    if (!favFilter) {
      console.warn(`Favorite filter not found: favId = ${favIdNumber}`);
      hasInitialized.current = true;
      lastProcessedFavId.current = favId;
      return;
    }

    console.log(`Loading favorite filter: favId = ${favIdNumber}`, favFilter);

    // Update the last processed favId to track changes
    lastProcessedFavId.current = favId;

    const updatePromises: Promise<void>[] = [];

    // Set basic search parameters
    const {
      searchTerm,
      minAge,
      maxAge,
      minFee,
      maxFee,
      curriculumType,
      languageOfInstruction,
      countryId,
      provinceId,
      districtId,
      minRating,
    } = favFilter;

    if (searchTerm) {
      updatePromises.push(setValue("searchTerm", searchTerm));
    }

    if (minAge != null && maxAge != null) {
      updatePromises.push(setValue("ageRange", [minAge, maxAge]));
    }

    if (minFee != null && maxFee != null) {
      updatePromises.push(setValue("feeRange", [minFee, maxFee]));
    }

    if (curriculumType) {
      updatePromises.push(setValue("curriculumType", curriculumType));
    }

    if (languageOfInstruction) {
      updatePromises.push(
        setValue("languageOfInstruction", languageOfInstruction)
      );
    }

    if (countryId != null) {
      updatePromises.push(setValue("countryId", countryId.toString()));
    }

    if (provinceId != null) {
      updatePromises.push(setValue("provinceId", provinceId.toString()));
    }

    if (districtId != null) {
      updatePromises.push(setValue("districtId", districtId.toString()));
    }

    if (minRating) {
      updatePromises.push(setValue("minRating", minRating));
    }

    // Set institution type
    const institutionTypeConfig = determineInstitutionType(favFilter);

    if (institutionTypeConfig) {
      const { typeId, hasMultiple, allIds } = institutionTypeConfig;

      if (hasMultiple && allIds) {
        updatePromises.push(
          setValue(
            "institutionTypeIds",
            allIds.map((id: number) => id.toString())
          )
        );
        updatePromises.push(setValue("institutionTypeId", ""));
      } else {
        updatePromises.push(setValue("institutionTypeId", typeId));
        updatePromises.push(setValue("institutionTypeIds", ""));
      }
    }

    // Process property filters - load selected properties to form
    if (favFilter.propertyFilters && Array.isArray(favFilter.propertyFilters)) {
      // First, clear all existing property selections to ensure clean state
      favFilter.propertyFilters.forEach((propertyFilter: any) => {
        if (
          propertyFilter.propertyGroupTypeDtos &&
          Array.isArray(propertyFilter.propertyGroupTypeDtos)
        ) {
          propertyFilter.propertyGroupTypeDtos.forEach((groupType: any) => {
            const fieldName =
              groupType.displayName ||
              groupType.name ||
              `property_group_${groupType.id}`;
            updatePromises.push(setValue(fieldName, []));
          });
        }
      });

      // Wait a bit for the clear operations to complete
      await Promise.all(updatePromises);
      updatePromises.length = 0;

      // Then set the selected properties
      favFilter.propertyFilters.forEach((propertyFilter: any) => {
        if (
          !propertyFilter.propertyGroupTypeDtos ||
          !Array.isArray(propertyFilter.propertyGroupTypeDtos)
        ) {
          return;
        }

        propertyFilter.propertyGroupTypeDtos.forEach((groupType: any) => {
          if (
            !groupType.propertyTypes ||
            !Array.isArray(groupType.propertyTypes)
          ) {
            return;
          }

          const selectedPropertyIds = groupType.propertyTypes
            .filter((propertyType: any) => propertyType.isSelected === true)
            .map((propertyType: any) => propertyType.id.toString());

          const fieldName =
            groupType.displayName ||
            groupType.name ||
            `property_group_${groupType.id}`;

          console.log(
            `Setting dynamic property field: ${fieldName}`,
            selectedPropertyIds
          );

          // Set the selected properties with a small delay to ensure proper rendering
          updatePromises.push(
            new Promise<void>((resolve) => {
              setTimeout(() => {
                setValue(fieldName, selectedPropertyIds).then(resolve);
              }, 50);
            })
          );
        });
      });
    }

    // Set sorting parameters
    const { sortBy, sortDirection, page, size } = favFilter;

    if (sortBy) {
      updatePromises.push(setValue("sortBy", sortBy));
    }

    if (sortDirection) {
      updatePromises.push(setValue("sortDirection", sortDirection));
    }

    // Set pagination parameters
    if (page != null) {
      updatePromises.push(setValue("page", page.toString()));
    }

    if (size != null) {
      updatePromises.push(setValue("size", size.toString()));
    }

    // Set additional form fields
    updatePromises.push(
      setValue("propertyFilters", ""),
      setValue("favId", favId)
    );

    try {
      await Promise.all(updatePromises);

      // Force a final update to ensure all dynamic components re-render
      await new Promise<void>((resolve) => {
        setTimeout(() => {
          // Trigger a final state update to force re-render of dynamic components
          setValue("_forceUpdate", Date.now().toString())
            .then(() => resolve())
            .catch(() => resolve());
        }, 100);
      });

      console.log(
        `Favorite filter loaded successfully: favId = ${favIdNumber}`
      );
    } catch (error) {
      console.error("Error loading favorite filter:", error);
    } finally {
      hasInitialized.current = true;
    }
  }, [searchParams, setValue]);

  useEffect(() => {
    syncFavFilterToForm();

    // Cleanup function
    return () => {
      if (processingTimeout.current) {
        clearTimeout(processingTimeout.current);
        processingTimeout.current = null;
      }
    };
  }, [syncFavFilterToForm]);

  // Reset initialization when searchParams change (page refresh or navigation)
  useEffect(() => {
    const favId = searchParams?.get("favId");
    if (lastProcessedFavId.current !== favId) {
      hasInitialized.current = false;
      // Clear any pending processing
      if (processingTimeout.current) {
        clearTimeout(processingTimeout.current);
        processingTimeout.current = null;
      }
    }
  }, [searchParams]);

  return {
    isInitialized: hasInitialized.current,
  };
};
