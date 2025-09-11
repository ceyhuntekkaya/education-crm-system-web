import React from "react";
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

  // Seçilen kurum tipine göre dinamik section'ları oluştur
  const selectedInstitutionType = values?.institutionTypeId || "";
  const selectedInstitutionData = mockSearchFilterParams.find(
    (item: InstitutionTypeListDto) =>
      item.institutionTypeDto?.id?.toString() === selectedInstitutionType
  );

  // Dinamik property grup section'larını oluştur
  const dynamicPropertySections =
    selectedInstitutionData?.propertyGroupTypeDtos?.map((group: any) => ({
      id: `property-group-${group.id}`,
      title: (
        <div className="d-flex align-items-center justify-content-between w-100">
          <span className="fw-medium">{group.displayName}</span>
        </div>
      ),
      component: (
        <div className="property-types">
          {group.propertyTypes && group.propertyTypes.length > 0 ? (
            group.isMultiple ? (
              // Çoklu seçim için checkbox
              <FormCheckbox
                name={group.name} // name field'ını kullan (örn: "facilities")
                label=""
                options={group.propertyTypes
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
                options={group.propertyTypes
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
          ) : (
            <p className="text-neutral-500 text-sm mb-0">
              Bu kategori için seçenek bulunmuyor.
            </p>
          )}
        </div>
      ),
    })) || [];

  return dynamicPropertySections;
};
