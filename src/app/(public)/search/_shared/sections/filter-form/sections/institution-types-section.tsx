import React, { useMemo } from "react";
import { FormRadio } from "@/components";
import { useSearchContext } from "../../../contexts";
import { useFormHook } from "@/hooks";

export const InstitutionTypesSection = () => {
  const { options } = useSearchContext();
  const { values, useResetFieldOnChange } = useFormHook();

  // Seçili grup kontrolü
  const selectedGroupId = values.institutionGroupId;
  
  // Kurum kategorisi değiştiğinde kurum tipini sıfırla
  useResetFieldOnChange("institutionGroupId", "institutionTypeId");

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
