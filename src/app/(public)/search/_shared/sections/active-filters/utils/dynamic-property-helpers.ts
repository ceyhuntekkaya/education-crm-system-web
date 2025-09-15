import { InstitutionTypeListDto } from "@/types";

// Dinamik property filtreleri için helper fonksiyonlar
export const processDynamicPropertyFilters = (
  values: any,
  selectedInstitutionTypeId: string,
  institutionTypes: InstitutionTypeListDto[]
): Array<{
  key: string;
  label: string;
  value: string;
}> => {
  const filters: Array<{
    key: string;
    label: string;
    value: string;
  }> = [];

  // Önce propertyFilters objesi içindeki değerleri kontrol et
  if (values.propertyFilters && typeof values.propertyFilters === "object") {
    Object.entries(values.propertyFilters).forEach(([propertyId, value]) => {
      if (value && value !== "") {
        // Dinamik property için gerçek label'ı bul
        let propertyLabel = `Özellik ${propertyId}`;

        // Seçili kurum tipine göre dinamik property gruplarını getir
        if (selectedInstitutionTypeId) {
          // InstitutionTypes data'dan property label'ını bul
          const mockData = institutionTypes.find(
            (item: any) =>
              item.institutionTypeDto?.id?.toString() ===
              selectedInstitutionTypeId
          );

          if (mockData?.propertyGroupTypeDtos) {
            for (const group of mockData.propertyGroupTypeDtos) {
              const property = group.propertyTypes?.find(
                (prop: any) => prop.id?.toString() === propertyId
              );
              if (property) {
                propertyLabel = property.displayName || propertyLabel;
                break;
              }
            }
          }
        }

        filters.push({
          key: `property_${propertyId}`,
          label: propertyLabel,
          value: Array.isArray(value) ? value.join(", ") : String(value),
        });
      }
    });
  }

  return filters;
};

// Direkt form field olarak dinamik property gruplarını işleme
export const processDynamicFormFields = (
  values: any,
  selectedInstitutionTypeId: string,
  institutionTypes: InstitutionTypeListDto[]
): Array<{
  key: string;
  label: string;
  value: string;
}> => {
  const filters: Array<{
    key: string;
    label: string;
    value: string;
  }> = [];

  if (!selectedInstitutionTypeId) return filters;

  const mockData = institutionTypes.find(
    (item: any) =>
      item.institutionTypeDto?.id?.toString() === selectedInstitutionTypeId
  );

  if (!mockData?.propertyGroupTypeDtos) return filters;

  mockData.propertyGroupTypeDtos.forEach((group: any) => {
    const groupValue = values[group.name]; // Grup adını field name olarak kullan

    if (
      groupValue &&
      ((Array.isArray(groupValue) && groupValue.length > 0) ||
        (!Array.isArray(groupValue) && groupValue !== ""))
    ) {
      if (Array.isArray(groupValue)) {
        // Çoklu seçim - her bir seçimi ayrı chip olarak göster
        groupValue.forEach((val) => {
          const property = group.propertyTypes?.find(
            (prop: any) => prop.id?.toString() === val
          );
          if (property) {
            filters.push({
              key: `dynamic_${group.name}_${val}`, // Grup adı + değer ID'si ile unique key
              label: group.displayName || group.name,
              value: property.displayName || val,
            });
          }
        });
      } else {
        // Tekli seçim
        const property = group.propertyTypes?.find(
          (prop: any) => prop.id?.toString() === groupValue
        );
        if (property) {
          filters.push({
            key: `dynamic_${group.name}_${groupValue}`, // Grup adı + değer ID'si ile unique key
            label: group.displayName || group.name,
            value: property.displayName || groupValue,
          });
        }
      }
    }
  });

  return filters;
};
