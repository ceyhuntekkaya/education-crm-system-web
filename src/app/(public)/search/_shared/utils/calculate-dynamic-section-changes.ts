import { getDynamicPropertyGroups } from "./get-dynamic-property-groups";
import { checkDynamicFieldChange } from "./check-dynamic-field-change";
import { InstitutionTypeListDto } from "@/types";

/**
 * Tüm dinamik section'ların değişiklik durumunu hesaplar
 */
export const calculateDynamicSectionChanges = (
  selectedInstitutionTypeId: string,
  values: Record<string, any>,
  initialValues: Record<string, any>,
  institutionTypes: InstitutionTypeListDto[]
): Record<string, boolean> => {
  const changes: Record<string, boolean> = {};

  const dynamicGroups = getDynamicPropertyGroups(
    selectedInstitutionTypeId,
    institutionTypes
  );

  dynamicGroups.forEach((group: any) => {
    const dynamicSectionId = `property-group-${group.id}`;
    const fieldName = group.name;

    if (fieldName) {
      const currentValue = values[fieldName];
      const hasChange = checkDynamicFieldChange(
        fieldName,
        currentValue,
        initialValues,
        group.isMultiple
      );

      changes[dynamicSectionId] = hasChange;
    } else {
      changes[dynamicSectionId] = false;
    }
  });

  return changes;
};
