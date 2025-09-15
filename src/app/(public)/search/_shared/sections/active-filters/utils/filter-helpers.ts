import { FilterGroup } from "../types";
import {
  processSimpleFields,
  processRangeFields,
  processBooleanFields,
} from "./value-processing-helpers";
import {
  processDynamicPropertyFilters,
  processDynamicFormFields,
} from "./dynamic-property-helpers";
import {
  createStaticFilterGroups,
  createDynamicFilterGroups,
  combineFilterGroups,
} from "./filter-group-helpers";
import { InstitutionTypeListDto } from "@/types";

// Ana aktif filtreleri gruplandırılmış şekilde hesaplama fonksiyonu
export const getGroupedActiveFilters = (
  values: any,
  isDirty: boolean,
  options: any,
  institutionTypes: InstitutionTypeListDto[]
): FilterGroup[] => {
  if (!values || !isDirty) return [];

  const selectedInstitutionTypeId = values.institutionTypeId;

  // Tüm filter tiplerini işle ve birleştir
  const simpleFilters = processSimpleFields(values, options);
  const rangeFilters = processRangeFields(values);
  const booleanFilters = processBooleanFields(values);
  const dynamicPropertyFilters = processDynamicPropertyFilters(
    values,
    selectedInstitutionTypeId,
    institutionTypes
  );
  const dynamicFormFilters = processDynamicFormFields(
    values,
    selectedInstitutionTypeId,
    institutionTypes
  );

  // Tüm filtreleri birleştir
  const allFilters = [
    ...simpleFilters,
    ...rangeFilters,
    ...booleanFilters,
    ...dynamicPropertyFilters,
    ...dynamicFormFilters,
  ];

  // Statik ve dinamik grupları oluştur
  const staticGroups = createStaticFilterGroups(allFilters);
  const dynamicGroups = createDynamicFilterGroups(
    allFilters,
    selectedInstitutionTypeId,
    institutionTypes
  );

  // Tüm grupları birleştir ve döndür
  return combineFilterGroups(staticGroups, dynamicGroups);
};
