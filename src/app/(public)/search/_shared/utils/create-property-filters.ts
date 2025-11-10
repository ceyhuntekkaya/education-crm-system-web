import { InstitutionTypeListDto, PropertyGroupTypeDto, PropertyTypeDto, FormValues } from "@/types";

/**
 * Form değerlerine göre propertyFilters oluşturur
 * Sadece isSelected: true olan property'lerin ID'lerini döner
 * 
 * @param values - Form değerleri
 * @param institutionTypes - Kurum türleri verisi
 * @returns Seçili property ID'lerinin array'i [1, 2, 3, ...]
 */
export const createPropertyFilters = (
  values: FormValues,
  institutionTypes: InstitutionTypeListDto[]
): number[] => {
  const selectedPropertyIds: number[] = [];

  // Tüm institution type'ları ve grupları dolaş
  institutionTypes.forEach((institutionType) => {
    institutionType.propertyGroupTypeDtos?.forEach((group: PropertyGroupTypeDto) => {
      group.propertyTypes?.forEach((property: PropertyTypeDto) => {
        // Bu property'nin form'da seçili olup olmadığını kontrol et
        const groupFieldName = group.name || `property_group_${group.id}`;
        const selectedValues = values[groupFieldName] || [];
        const isSelected = Array.isArray(selectedValues)
          ? selectedValues.includes(property.id?.toString())
          : selectedValues === property.id?.toString();

        // Seçili ise ve ID varsa, listeye ekle
        if (isSelected && property.id) {
          selectedPropertyIds.push(property.id);
        }
      });
    });
  });

  return selectedPropertyIds;
};
