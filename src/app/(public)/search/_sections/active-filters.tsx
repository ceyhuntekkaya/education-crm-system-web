"use client";

import React from "react";
import { useSearchContext } from "../_contexts";
import { useFormHook } from "@/hooks";
import { Button } from "@/components";
import { mockSearchFilterParams } from "../_mock";

// Filter kategorileri ve grupları
const FILTER_GROUPS = {
  location: {
    title: "Lokasyon",
    fields: ["countryId", "provinceId", "districtId", "neighborhoodId"],
    icon: "ph-map-pin",
  },
  institution: {
    title: "Kurum",
    fields: ["institutionTypeId", "searchTerm"],
    icon: "ph-buildings",
  },
  academic: {
    title: "Akademik",
    fields: ["curriculumType", "languageOfInstruction", "ageRange"],
    icon: "ph-graduation-cap",
  },
  financial: {
    title: "Ücret",
    fields: ["feeRange"],
    icon: "ph-currency-circle-dollar",
  },
  rating: {
    title: "Değerlendirme",
    fields: ["minRating"],
    icon: "ph-star",
  },
  features: {
    title: "Özellikler",
    fields: ["hasActiveCampaigns", "isSubscribed"],
    icon: "ph-tag",
  },
};

// Filter label'ları için mapping
const FILTER_LABELS: Record<string, string> = {
  searchTerm: "Arama",
  institutionTypeId: "Kurum Türü",
  countryId: "Ülke",
  provinceId: "İl",
  districtId: "İlçe",
  neighborhoodId: "Mahalle",
  ageRange: "Yaş Aralığı",
  feeRange: "Ücret Aralığı",
  curriculumType: "Müfredat",
  languageOfInstruction: "Eğitim Dili",
  minRating: "Minimum Puan",
  hasActiveCampaigns: "Aktif Kampanyalar",
  isSubscribed: "Abone Olunan",
  sortBy: "Sıralama",
};

interface FilterChipProps {
  label: string;
  value: string;
  onRemove: () => void;
}

interface FilterGroup {
  title: string;
  icon: string;
  filters: Array<{
    key: string;
    label: string;
    value: string;
  }>;
}

const FilterChip: React.FC<FilterChipProps> = ({ label, value, onRemove }) => {
  return (
    <div className="filter-chip d-inline-flex align-items-center gap-8 bg-main-50 text-main-600 px-12 py-6 rounded-8 me-8 mb-8">
      <span className="text-sm fw-medium">{label}:</span>
      <span className="text-sm">{value}</span>
      <button
        type="button"
        onClick={onRemove}
        className="filter-chip__remove text-main-600 hover-text-main-800 ms-4"
        style={{ background: "none", border: "none", cursor: "pointer" }}
      >
        <i className="ph ph-x text-xs" />
      </button>
    </div>
  );
};

const FilterGroupComponent: React.FC<{
  group: FilterGroup;
  onRemoveFilter: (filterKey: string) => void;
}> = ({ group, onRemoveFilter }) => {
  if (group.filters.length === 0) return null;

  return (
    <div className="filter-group mb-16">
      <div className="filter-group-header d-flex align-items-center gap-8 mb-12">
        <i className={`${group.icon} text-main-600`} />
        <h6 className="mb-0 text-main-600 fw-semibold">{group.title}</h6>
        <span className="text-xs text-neutral-500">
          ({group.filters.length})
        </span>
      </div>
      <div className="filter-chips-container">
        {group.filters.map((filter) => (
          <FilterChip
            key={filter.key}
            label={filter.label}
            value={filter.value}
            onRemove={() => onRemoveFilter(filter.key)}
          />
        ))}
      </div>
    </div>
  );
};

const ActiveFilters: React.FC = () => {
  const { options, institutions } = useSearchContext();
  const { values, updateField, resetForm, isDirty } = useFormHook();

  // Aktif filtreleri gruplandırılmış şekilde hesapla
  const getGroupedActiveFilters = (): FilterGroup[] => {
    if (!values || !isDirty) return [];

    const selectedInstitutionTypeId = values.institutionTypeId; // Scope'u genişlet

    const allFilters: Array<{
      key: string;
      label: string;
      value: string;
    }> = [];

    // Basit string değerler
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

    simpleFields.forEach((field) => {
      const value = values[field];
      if (value && value !== "") {
        let displayValue = value;

        // Select field'lar için label'ı bul
        switch (field) {
          case "institutionTypeId":
            const institutionType = options.institution.data.find(
              (opt) => opt.value === value
            );
            displayValue = institutionType?.label || value;
            break;
          case "countryId":
            const country = options.location.countries.data.find(
              (opt) => opt.value === value
            );
            displayValue = country?.label || value;
            break;
          case "provinceId":
            const province = options.location.provinces.data.find(
              (opt) => opt.value === value
            );
            displayValue = province?.label || value;
            break;
          case "districtId":
            const district = options.location.districts.data.find(
              (opt) => opt.value === value
            );
            displayValue = district?.label || value;
            break;
          case "neighborhoodId":
            const neighborhood = options.location.neighborhoods.data.find(
              (opt) => opt.value === value
            );
            displayValue = neighborhood?.label || value;
            break;
        }

        allFilters.push({
          key: field,
          label: FILTER_LABELS[field] || field,
          value: displayValue,
        });
      }
    });

    // Yaş aralığı
    if (values.ageRange && Array.isArray(values.ageRange)) {
      const [min, max] = values.ageRange;
      if (min !== 1 || max !== 80) {
        allFilters.push({
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
        allFilters.push({
          key: "feeRange",
          label: "Ücret Aralığı",
          value: `₺${min.toLocaleString()} - ₺${max.toLocaleString()}`,
        });
      }
    }

    // Boolean değerler
    if (values.hasActiveCampaigns) {
      allFilters.push({
        key: "hasActiveCampaigns",
        label: "Aktif Kampanyalar",
        value: "Var",
      });
    }

    if (values.isSubscribed) {
      allFilters.push({
        key: "isSubscribed",
        label: "Abone Olunan",
        value: "Evet",
      });
    }

    // Dinamik property filtreleri
    // Önce propertyFilters objesi içindeki değerleri kontrol et
    if (values.propertyFilters && typeof values.propertyFilters === "object") {
      Object.entries(values.propertyFilters).forEach(([propertyId, value]) => {
        if (value && value !== "") {
          // Dinamik property için gerçek label'ı bul
          let propertyLabel = `Özellik ${propertyId}`;

          // Seçili kurum tipine göre dinamik property gruplarını getir
          if (selectedInstitutionTypeId) {
            // Mock data'dan property label'ını bul
            const mockData = mockSearchFilterParams.find(
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

          allFilters.push({
            key: `property_${propertyId}`,
            label: propertyLabel,
            value: Array.isArray(value) ? value.join(", ") : String(value),
          });
        }
      });
    }

    // Ayrıca dinamik property gruplarını direkt form field olarak kontrol et
    if (selectedInstitutionTypeId) {
      const mockData = mockSearchFilterParams.find(
        (item: any) =>
          item.institutionTypeDto?.id?.toString() === selectedInstitutionTypeId
      );

      if (mockData?.propertyGroupTypeDtos) {
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
                  allFilters.push({
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
                allFilters.push({
                  key: `dynamic_${group.name}_${groupValue}`, // Grup adı + değer ID'si ile unique key
                  label: group.displayName || group.name,
                  value: property.displayName || groupValue,
                });
              }
            }
          }
        });
      }
    }

    // Filtreleri gruplara ayır
    const groups: FilterGroup[] = [];

    // Önce statik grupları kontrol et
    Object.entries(FILTER_GROUPS).forEach(([groupKey, groupConfig]) => {
      const groupFilters = allFilters.filter((filter) => {
        // Normal field'lar için
        if (groupConfig.fields.includes(filter.key)) {
          return true;
        }
        // Sadece eski tip property filtreleri features grubuna ekle
        if (groupKey === "features" && filter.key.startsWith("property_")) {
          return true;
        }
        return false;
      });

      if (groupFilters.length > 0) {
        groups.push({
          title: groupConfig.title,
          icon: groupConfig.icon,
          filters: groupFilters,
        });
      }
    });

    // Sonra dinamik property gruplarını ayrı kategoriler olarak ekle
    if (selectedInstitutionTypeId) {
      const mockData = mockSearchFilterParams.find(
        (item: any) =>
          item.institutionTypeDto?.id?.toString() === selectedInstitutionTypeId
      );

      if (mockData?.propertyGroupTypeDtos) {
        mockData.propertyGroupTypeDtos.forEach((group: any) => {
          // Bu gruba ait filtreleri bul
          const dynamicGroupFilters = allFilters.filter((filter) =>
            filter.key.startsWith(`dynamic_${group.name}_`)
          );

          if (dynamicGroupFilters.length > 0) {
            // Grup tipine göre uygun ikon seç
            let groupIcon = "ph-squares-four"; // Varsayılan ikon

            // Grup adına göre özel ikonlar
            const groupName = group.name?.toLowerCase() || "";
            if (
              groupName.includes("category") ||
              groupName.includes("kategori")
            ) {
              groupIcon = "ph-squares-four";
            } else if (
              groupName.includes("facilities") ||
              groupName.includes("imkan")
            ) {
              groupIcon = "ph-buildings";
            } else if (
              groupName.includes("education") ||
              groupName.includes("egitim")
            ) {
              groupIcon = "ph-graduation-cap";
            } else if (
              groupName.includes("transport") ||
              groupName.includes("ulasim")
            ) {
              groupIcon = "ph-car";
            } else if (
              groupName.includes("security") ||
              groupName.includes("guvenlik")
            ) {
              groupIcon = "ph-shield-check";
            }

            groups.push({
              title: group.displayName || group.name,
              icon: groupIcon,
              filters: dynamicGroupFilters,
            });
          }
        });
      }
    }

    return groups;
  };

  const filterGroups = getGroupedActiveFilters();
  const resultCount = institutions.length;
  const totalActiveFilters = filterGroups.reduce(
    (total, group) => total + group.filters.length,
    0
  );

  // Tekil filter temizleme
  const removeFilter = (filterKey: string) => {
    if (filterKey.startsWith("property_")) {
      // Eski tip dinamik property filter'ı temizle
      const propertyId = filterKey.replace("property_", "");
      const currentPropertyFilters = values.propertyFilters || {};
      const newPropertyFilters = { ...currentPropertyFilters };
      delete newPropertyFilters[propertyId];
      updateField("propertyFilters", newPropertyFilters);
    } else if (filterKey.startsWith("dynamic_")) {
      // Yeni tip dinamik property filter'ı temizle (grup adı + değer ID'si ile)
      const parts = filterKey.replace("dynamic_", "").split("_");
      if (parts.length >= 2) {
        const groupName = parts.slice(0, -1).join("_"); // Son elemanı çıkar, geri kalanı grup adı
        const valueToRemove = parts[parts.length - 1]; // Son eleman değer ID'si

        const currentValue = values[groupName];

        if (Array.isArray(currentValue)) {
          // Çoklu seçim - sadece bu değeri çıkar
          const newValue = currentValue.filter((val) => val !== valueToRemove);
          updateField(groupName, newValue as any);
        } else {
          // Tekli seçim - tümünü temizle
          updateField(groupName, "");
        }
      }
    } else if (filterKey === "ageRange") {
      updateField("ageRange", [1, 80] as any);
    } else if (filterKey === "feeRange") {
      updateField("feeRange", [0.1, 1000000] as any);
    } else {
      updateField(
        filterKey,
        filterKey === "hasActiveCampaigns" || filterKey === "isSubscribed"
          ? false
          : ""
      );
    }
  };

  // Aktif filter yoksa sadece sonuç sayısını göster
  if (totalActiveFilters === 0) {
    return (
      <div className="search-results-info bg-white rounded-12 p-16 mb-24 box-shadow-sm border border-neutral-30">
        <span className="text-neutral-600 text-sm">
          <strong>{resultCount}</strong> okul bulundu
        </span>
      </div>
    );
  }

  return (
    <div className="active-filters bg-white rounded-12 p-24 mb-24 box-shadow-sm border border-neutral-30">
      <div className="d-flex flex-between align-items-start mb-16">
        <div>
          <h6 className="mb-4 text-neutral-700">
            Aktif Filtreler ({totalActiveFilters})
          </h6>
          <span className="text-neutral-600 text-sm">
            <strong>{resultCount}</strong> okul bulundu
          </span>
        </div>
        <div className="d-flex align-items-center gap-12">
          <Button
            type="button"
            variant="outline"
            size="xs"
            leftIcon="ph-trash"
            onClick={resetForm}
            className="text-neutral-500 hover-text-danger-600"
          >
            Tümünü Temizle
          </Button>
        </div>
      </div>

      <div className="grouped-filters">
        {filterGroups.map((group) => (
          <FilterGroupComponent
            key={group.title}
            group={group}
            onRemoveFilter={removeFilter}
          />
        ))}
      </div>
    </div>
  );
};

export default ActiveFilters;
