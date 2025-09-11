import React, { useState } from "react";
import { FormRadio, FormCheckbox } from "@/components";
import { useFormHook } from "@/hooks";
import { mockSearchFilterParams } from "@/app/(public)/search/_mock";
import { InstitutionTypeListDto } from "@/types";

interface DynamicPropertySectionsProps {
  options: any;
}

export const DynamicPropertySections = ({
  options,
}: DynamicPropertySectionsProps) => {
  const { values } = useFormHook();

  // Her section için ayrı arama state'i
  const [searchTerms, setSearchTerms] = useState<{ [key: string]: string }>({});

  // Arama terimini güncelleme fonksiyonu
  const updateSearchTerm = (groupId: string, term: string) => {
    setSearchTerms((prev) => ({
      ...prev,
      [groupId]: term,
    }));
  };

  // Arama filtreleme fonksiyonu
  const filterPropertyTypes = (propertyTypes: any[], searchTerm: string) => {
    if (!searchTerm.trim()) return propertyTypes;

    return propertyTypes.filter((property: any) =>
      property.displayName?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // Seçilen kurum tipine göre dinamik section'ları oluştur
  const selectedInstitutionType = values?.institutionTypeId || "";
  const selectedInstitutionData = mockSearchFilterParams.find(
    (item: InstitutionTypeListDto) =>
      item.institutionTypeDto?.id?.toString() === selectedInstitutionType
  );

  // Dinamik property grup section'larını oluştur
  const dynamicPropertySections =
    selectedInstitutionData?.propertyGroupTypeDtos?.map((group: any) => {
      const currentSearchTerm = searchTerms[group.id] || "";
      const filteredPropertyTypes = filterPropertyTypes(
        group.propertyTypes || [],
        currentSearchTerm
      );

      return {
        id: `property-group-${group.id}`,
        title: (
          <div className="d-flex align-items-center justify-content-between w-100">
            <span className="fw-medium">{group.displayName}</span>
          </div>
        ),
        component: (
          <div className="property-types">
            {/* Küçük Arama Input'u */}
            {group.propertyTypes && group.propertyTypes.length > 0 && (
              <div className="mb-16 w-100">
                <input
                  type="text"
                  className="common-input common-input--sm"
                  placeholder={`${group.displayName} içinde ara...`}
                  value={currentSearchTerm}
                  onChange={(e) => updateSearchTerm(group.id, e.target.value)}
                />
              </div>
            )}

            {/* Scrollable Options Container */}
            <div className="max-h-264-px overflow-y-auto scroll-thin">
              {filteredPropertyTypes && filteredPropertyTypes.length > 0 ? (
                group.isMultiple ? (
                  // Çoklu seçim için checkbox
                  <FormCheckbox
                    name={group.name} // name field'ını kullan (örn: "facilities")
                    label=""
                    options={filteredPropertyTypes
                      .filter(
                        (property: any) => property.id && property.displayName
                      )
                      .map((property: any) => ({
                        value: property.id!.toString(),
                        label: property.displayName!,
                      }))}
                    multi={true}
                  />
                ) : (
                  // Tekli seçim için radio
                  <FormRadio
                    name={group.name} // name field'ını kullan (örn: "education_system")
                    label=""
                    value=""
                    options={filteredPropertyTypes
                      .filter(
                        (property: any) => property.id && property.displayName
                      )
                      .map((property: any) => ({
                        value: property.id!.toString(),
                        label: property.displayName!,
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
    }) || [];

  return dynamicPropertySections;
};
