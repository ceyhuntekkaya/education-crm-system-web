import { useMemo } from "react";
import { SECTION_FIELD_MAPPING } from "../sections/filter-form/constants";
import {
  calculateDynamicSectionChanges,
  getDynamicPropertyGroups,
} from "../utils";
import { SectionChangesReturn } from "../types";
import { InstitutionTypeListDto } from "@/types";

/**
 * Section değişiklik durumlarını yönetir
 */
export function useSectionChanges(
  isDirty: boolean,
  areFieldsDirty: (fields: string[]) => boolean,
  values: any,
  initialValues: any,
  institutionTypes: InstitutionTypeListDto[]
): SectionChangesReturn {
  const sectionChanges = useMemo(() => {
    const changes: Record<string, boolean> = {};

    // Eğer form hiç değişmemişse hiçbir section'da değişiklik yok
    if (!isDirty) {
      Object.keys(SECTION_FIELD_MAPPING).forEach((sectionId) => {
        changes[sectionId] = false;
      });

      // Dinamik section'lar için de false olarak ayarla
      const selectedInstitutionType = values?.institutionTypeId || "";
      if (selectedInstitutionType) {
        const dynamicGroups = getDynamicPropertyGroups(
          selectedInstitutionType,
          institutionTypes
        );

        dynamicGroups.forEach((group: any) => {
          changes[`property-group-${group.id}`] = false;
        });
      }

      return changes;
    }

    // Her section için field'ları kontrol et
    Object.keys(SECTION_FIELD_MAPPING).forEach((sectionId) => {
      const fields =
        SECTION_FIELD_MAPPING[sectionId as keyof typeof SECTION_FIELD_MAPPING];
      changes[sectionId] = areFieldsDirty([...fields]); // readonly array'i mutable array'e dönüştür
    });

    // Dinamik property section'ları için değişiklik kontrolü
    const selectedInstitutionType = values?.institutionTypeId || "";
    if (selectedInstitutionType) {
      const dynamicChanges = calculateDynamicSectionChanges(
        selectedInstitutionType,
        values,
        initialValues,
        institutionTypes
      );

      // Dinamik değişiklikleri ana changes objesine ekle
      Object.assign(changes, dynamicChanges);
    }

    return changes;
  }, [isDirty, areFieldsDirty, values, initialValues, institutionTypes]);

  return sectionChanges;
}
