import { FILTER_LABELS } from "../constants";

// Form value'larını display value'ya dönüştürme helper'ları
export const getDisplayValueForField = (
  field: string,
  value: string,
  options: any
): string => {
  let displayValue = value;

  switch (field) {
    case "institutionTypeId":
      const institutionType = options.institution.data.find(
        (opt: any) => opt.value === value
      );
      displayValue = institutionType?.label || value;
      break;
    case "countryId":
      const country = options.location.countries.data.find(
        (opt: any) => opt.value === value
      );
      displayValue = country?.label || value;
      break;
    case "provinceId":
      const province = options.location.provinces.data.find(
        (opt: any) => opt.value === value
      );
      displayValue = province?.label || value;
      break;
    case "districtId":
      const district = options.location.districts.data.find(
        (opt: any) => opt.value === value
      );
      displayValue = district?.label || value;
      break;
    case "neighborhoodId":
      const neighborhood = options.location.neighborhoods.data.find(
        (opt: any) => opt.value === value
      );
      displayValue = neighborhood?.label || value;
      break;
    case "minRating":
      // Minimum puan için daha kullanıcı dostu gösterim
      const numValue = parseFloat(value);
      if (!isNaN(numValue)) {
        if (numValue === 5) {
          displayValue = `${numValue} yıldız`;
        } else {
          displayValue = `${numValue} yıldız ve üzeri`;
        }
      } else {
        displayValue = `${value} ve üzeri`;
      }
      break;
  }

  return displayValue;
};

// Basit string field'ları işleme
export const processSimpleFields = (
  values: any,
  options: any
): Array<{
  key: string;
  label: string;
  value: string;
}> => {
  const simpleFields = [
    "searchTerm",
    "institutionTypeId",
    "countryId",
    "provinceId",
    "districtId",
    "neighborhoodId",
    "curriculumType",
    "languageOfInstruction",
    "minRating",
  ];

  const filters: Array<{
    key: string;
    label: string;
    value: string;
  }> = [];

  simpleFields.forEach((field) => {
    const value = values[field];
    if (value && value !== "") {
      const displayValue = getDisplayValueForField(field, value, options);

      filters.push({
        key: field,
        label: FILTER_LABELS[field] || field,
        value: displayValue,
      });
    }
  });

  return filters;
};

// Range field'ları işleme
export const processRangeFields = (
  values: any
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

  // Yaş aralığı
  if (values.ageRange && Array.isArray(values.ageRange)) {
    const [min, max] = values.ageRange;
    if (min !== 1 || max !== 80) {
      filters.push({
        key: "ageRange",
        label: "Yaş Aralığı",
        value: `${min} - ${max} yaş`,
      });
    }
  }

  // Ücret aralığı
  if (values.feeRange && Array.isArray(values.feeRange)) {
    const [min, max] = values.feeRange;
    if (min !== 0.1 || max !== 1000000) {
      filters.push({
        key: "feeRange",
        label: "Ücret Aralığı",
        value: `₺${min.toLocaleString()} - ₺${max.toLocaleString()}`,
      });
    }
  }

  return filters;
};

// Boolean field'ları işleme
export const processBooleanFields = (
  values: any
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

  if (values.hasActiveCampaigns) {
    filters.push({
      key: "hasActiveCampaigns",
      label: "Aktif Kampanyalar",
      value: "Var",
    });
  }

  if (values.isSubscribed) {
    filters.push({
      key: "isSubscribed",
      label: "Abone Olunan",
      value: "Evet",
    });
  }

  return filters;
};
