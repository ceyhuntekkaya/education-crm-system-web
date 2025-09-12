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

// Ana aktif filtreleri gruplandırılmış şekilde hesaplama fonksiyonu
export const getGroupedActiveFilters = (
  values: any,
  isDirty: boolean,
  options: any
): FilterGroup[] => {
  if (!values || !isDirty) return [];

  const selectedInstitutionTypeId = values.institutionTypeId;

  // Tüm filter tiplerini işle ve birleştir
  const simpleFilters = processSimpleFields(values, options);
  const rangeFilters = processRangeFields(values);
  const booleanFilters = processBooleanFields(values);
  const dynamicPropertyFilters = processDynamicPropertyFilters(
    values,
    selectedInstitutionTypeId
  );
  const dynamicFormFilters = processDynamicFormFields(
    values,
    selectedInstitutionTypeId
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
    selectedInstitutionTypeId
  );

  // Tüm grupları birleştir ve döndür
  return combineFilterGroups(staticGroups, dynamicGroups);
};
