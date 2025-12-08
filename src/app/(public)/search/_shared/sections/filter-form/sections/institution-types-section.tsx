import React, { useMemo, useEffect, useRef } from "react";
import { FormRadio } from "@/components";
import { useSearchContext } from "../../../contexts";
import { useFormHook } from "@/hooks";
import type { PropertyGroupTypeDto } from "@/types";

export const InstitutionTypesSection = () => {
  const { options, institutionTypes } = useSearchContext();
  const { values, useResetFieldOnChange, deleteFields } = useFormHook();

  // Seçili grup kontrolü
  const selectedGroupId = values.institutionGroupId;
  const selectedInstitutionTypeId = values.institutionTypeId;

  // Önceki kurum tipi ID'sini takip et
  const prevInstitutionTypeIdRef = useRef<string | undefined>(undefined);

  // Seçili kurum tipine ait dinamik property alanlarının isimlerini çıkar
  const currentDynamicPropertyFieldNames = useMemo(() => {
    if (!selectedInstitutionTypeId || !institutionTypes?.length) return [];

    const selectedInstitutionData = institutionTypes.find(
      (item) =>
        item.institutionTypeDto?.id?.toString() === selectedInstitutionTypeId
    );

    if (!selectedInstitutionData?.propertyGroupTypeDtos) return [];

    return selectedInstitutionData.propertyGroupTypeDtos.map(
      (group: PropertyGroupTypeDto) =>
        group.name || `property_group_${group.id}`
    );
  }, [selectedInstitutionTypeId, institutionTypes]);

  // Kurum kategorisi değiştiğinde kurum tipini sıfırla
  // (Dinamik alanlar zaten institutionTypeId değişimi ile sıfırlanacak)
  useResetFieldOnChange("institutionGroupId", "institutionTypeId");

  // Kurum tipi değiştiğinde, ÖNCEKİ kurum tipine ait dinamik alanları form'dan tamamen sil
  useEffect(() => {
    const prevTypeId = prevInstitutionTypeIdRef.current;

    // İlk render'da veya değişiklik yoksa bir şey yapma
    if (prevTypeId === selectedInstitutionTypeId) return;

    // Önceki tip varsa, o tipe ait alanları form'dan tamamen sil
    if (prevTypeId && institutionTypes?.length) {
      const prevInstitutionData = institutionTypes.find(
        (item) => item.institutionTypeDto?.id?.toString() === prevTypeId
      );

      if (prevInstitutionData?.propertyGroupTypeDtos) {
        const fieldsToDelete = prevInstitutionData.propertyGroupTypeDtos.map(
          (group: PropertyGroupTypeDto) =>
            group.name || `property_group_${group.id}`
        );
        deleteFields(fieldsToDelete);
      }
    }

    // Ref'i güncelle
    prevInstitutionTypeIdRef.current = selectedInstitutionTypeId;
  }, [selectedInstitutionTypeId, institutionTypes, deleteFields]);

  const isGroupSelected = selectedGroupId && selectedGroupId !== "";

  // Seçili gruba göre kurum türlerini filtrele
  const filteredInstitutionTypes = useMemo(() => {
    if (!isGroupSelected) {
      return [];
    }

    // Seçili gruba ait kurum türlerini filtrele
    return options.institution.data.filter((item) => {
      // Placeholder'ı her zaman göster
      if (item.value === "") return true;
      // Seçili gruba ait olanları göster
      return item.groupId?.toString() === selectedGroupId;
    });
  }, [isGroupSelected, selectedGroupId, options.institution.data]);

  return {
    id: "institutionTypes",
    title: "Kurum",
    component: (
      <div className="institution-types-section">
        {/* Kurum Grubu Seçimi */}
        <div className="mb-24">
          <label className="form-label text-neutral-900 fw-medium mb-12">
            Kurum Kategorisi
          </label>
          <FormRadio
            name="institutionGroupId"
            label=""
            value=""
            options={options.institutionGroups.data}
            multi={true}
            isShowAll={false}
          />
        </div>

        {/* Ayırıcı */}
        <span className="d-block border border-neutral-30 border-dashed my-24" />

        {/* Kurum Türü Seçimi veya Uyarı Mesajı */}
        <div>
          <label className="form-label text-neutral-900 fw-medium mb-12">
            Kurum Tipi
          </label>

          {!isGroupSelected ? (
            // Grup seçilmemişse uyarı mesajı göster
            <div className="alert alert-info d-flex align-items-center gap-12 p-16 bg-info-50 border border-info-200 rounded-8">
              <i className="ph-bold ph-info text-info-600 text-xl" />
              <span className="text-sm text-neutral-700">
                Lütfen önce bir kurum kategorisi seçiniz.
              </span>
            </div>
          ) : (
            // Grup seçilmişse kurum türlerini göster
            <FormRadio
              name="institutionTypeId"
              label=""
              value=""
              options={filteredInstitutionTypes}
              multi={true}
              isShowAll
              minShowingValues={5}
            />
          )}
        </div>
      </div>
    ),
  };
};
