import React, { useState, useEffect, useMemo, useRef } from "react";
import { FormRadio, FormCheckbox } from "@/components";
import { useFormHook } from "@/hooks";
import { formatTitle } from "@/utils";
import { useSearchContext } from "../../../contexts";
import { getDynamicPropertyGroups } from "../../../utils";
import type { PropertyGroupTypeDto, PropertyTypeDto } from "@/types";

interface SearchTerms {
  [groupId: string]: string;
}

export const DynamicPropertySections = () => {
  const { values } = useFormHook();
  const { institutionTypes } = useSearchContext();

  // Her section için ayrı arama state'i
  const [searchTerms, setSearchTerms] = useState<SearchTerms>({});
  const prevInstitutionTypeId = useRef(values?.institutionTypeId);

  // Seçilen kurum tipine göre dinamik grupları al
  const dynamicGroups = useMemo(() => {
    const selectedInstitutionTypeId = values?.institutionTypeId || "";
    return getDynamicPropertyGroups(
      selectedInstitutionTypeId,
      institutionTypes
    );
  }, [values?.institutionTypeId, institutionTypes]);

  // Kurum türü değiştiğinde arama terimlerini sıfırla
  useEffect(() => {
    if (prevInstitutionTypeId.current !== values?.institutionTypeId) {
      prevInstitutionTypeId.current = values?.institutionTypeId;
      setSearchTerms({});
    }
  }, [values?.institutionTypeId]);

  // Arama terimini güncelleme fonksiyonu
  const updateSearchTerm = (groupId: string, term: string) => {
    setSearchTerms((prev) => ({
      ...prev,
      [groupId]: term,
    }));
  };

  // Arama filtreleme fonksiyonu
  const filterPropertyTypes = (
    propertyTypes: PropertyTypeDto[],
    searchTerm: string
  ): PropertyTypeDto[] => {
    if (!searchTerm.trim()) return propertyTypes;

    return propertyTypes.filter((property) =>
      property.displayName?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // Dinamik property grup section'larını oluştur
  const dynamicPropertySections = useMemo(() => {
    return dynamicGroups.map((group: PropertyGroupTypeDto) => {
      const currentSearchTerm = searchTerms[group.id!] || "";
      const filteredPropertyTypes = filterPropertyTypes(
        group.propertyTypes || [],
        currentSearchTerm
      );

      return {
        id: `property-group-${group.id}`,
        title: formatTitle(group.displayName || ""),
        component: (
          <div className="property-types">
            {/* Küçük Arama Input'u */}
            {group.propertyTypes && group.propertyTypes.length > 0 && (
              <div className="mb-16 w-100">
                <input
                  type="text"
                  className="common-input common-input--sm"
                  placeholder={`${formatTitle(
                    group.displayName || ""
                  )} içinde ara...`}
                  value={currentSearchTerm}
                  onChange={(e) =>
                    updateSearchTerm(group.id!.toString(), e.target.value)
                  }
                />
              </div>
            )}

            {/* Scrollable Options Container */}
            <div className="max-h-264-px overflow-y-auto scroll-thin">
              {filteredPropertyTypes && filteredPropertyTypes.length > 0 ? (
                group.isMultiple === null ||
                group.isMultiple === undefined ||
                group.isMultiple === true ? (
                  // Çoklu seçim için checkbox (isMultiple: null, undefined, veya true)
                  <FormCheckbox
                    name={group.name || `property_group_${group.id}`}
                    label=""
                    options={filteredPropertyTypes
                      .filter((property) => property.id && property.displayName)
                      .map((property) => ({
                        value: property.id!.toString(),
                        label: formatTitle(property.displayName!),
                      }))}
                    multi={true}
                    maxSelection={7}
                  />
                ) : (
                  // Tekli seçim için radio (isMultiple: false)
                  <FormRadio
                    name={group.name || `property_group_${group.id}`}
                    label=""
                    value=""
                    options={filteredPropertyTypes
                      .filter((property) => property.id && property.displayName)
                      .map((property) => ({
                        value: property.id!.toString(),
                        label: formatTitle(property.displayName!),
                      }))}
                    multi={true}
                  />
                )
              ) : currentSearchTerm ? (
                <p className="text-neutral-500 text-sm mb-0">
                  Arama kriterinize uygun seçenek bulunamadı.
                </p>
              ) : (
                <p className="text-neutral-500 text-sm mb-0">
                  Bu kategori için seçenek bulunmuyor.
                </p>
              )}
            </div>
          </div>
        ),
      };
    });
  }, [dynamicGroups, searchTerms]);

  return dynamicPropertySections;
};
