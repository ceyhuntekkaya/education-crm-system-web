import { InstitutionTypeListDto, PropertyGroupTypeDto, PropertyTypeDto, FormValues } from "@/types";

/**
 * Form değerlerine göre propertyFilters oluşturur
 * institutionTypes'ın aynısını döner ama PropertyTypeDto'larda isSelected bilgisi ile
 * 
 * @param values - Form değerleri
 * @param institutionTypes - Kurum türleri verisi
 * @returns PropertyFilters array (InstitutionTypeListDto[] formatında)
 */
export const createPropertyFilters = (
  values: FormValues,
  institutionTypes: InstitutionTypeListDto[]
): InstitutionTypeListDto[] => {
  return institutionTypes.map((institutionType) => {
    const propertyGroupTypeDtos = institutionType.propertyGroupTypeDtos?.map(
      (group: PropertyGroupTypeDto) => {
        const propertyTypes = group.propertyTypes?.map(
          (property: PropertyTypeDto) => {
            // Bu property'nin form'da seçili olup olmadığını kontrol et
            const groupFieldName = group.name || `property_group_${group.id}`;
            const selectedValues = values[groupFieldName] || [];
            const isSelected = Array.isArray(selectedValues)
              ? selectedValues.includes(property.id?.toString())
              : selectedValues === property.id?.toString();

            return {
              ...property,
              isSelected,
            };
          }
        );

        return {
          ...group,
          propertyTypes,
        };
      }
    );

    return {
      ...institutionType,
      propertyGroupTypeDtos,
    };
  });
};
