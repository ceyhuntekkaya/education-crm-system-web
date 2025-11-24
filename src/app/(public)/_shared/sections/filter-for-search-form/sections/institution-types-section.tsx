import React, { useMemo } from "react";
import { FormRadio, LoadingSpinner } from "@/components";
import { useFilterSearchContext } from "../contexts";
import { useFormHook } from "@/hooks";

export const InstitutionTypesSection = () => {
  const { options } = useFilterSearchContext();
  const { values } = useFormHook();

  // Seçili grup kontrolü
  const selectedGroupId = values.institutionGroupId;
  const isGroupSelected = selectedGroupId && selectedGroupId !== "";

  // Seçili gruba göre kurum türlerini filtrele
  const filteredInstitutionTypes = useMemo(() => {
    if (!isGroupSelected) {
      return [];
    }

    // Seçili gruba ait kurum türlerini filtrele
    return options.institutionTypes.data.filter((item) => {
      // Placeholder'ı her zaman göster
      if (item.value === "") return true;
      // Seçili gruba ait olanları göster
      return item.groupId?.toString() === selectedGroupId;
    });
  }, [isGroupSelected, selectedGroupId, options.institutionTypes.data]);

  return (
    <div className="institution-types-section">
      <div className="row g-3">
        {/* Kurum Kategorisi - Sol taraf */}
        <div className="col-md-6">
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

          {options.institutionGroups.loading && (
            <LoadingSpinner
              message="Kurum kategorileri yükleniyor..."
              size="sm"
              variant="dots"
            />
          )}

          {options.institutionGroups.error && (
            <div className="text-center py-2">
              <small className="text-danger">
                Kurum kategorileri yüklenirken hata oluştu
              </small>
            </div>
          )}
        </div>

        {/* Kurum Türü - Sağ taraf */}
        <div className="col-md-6">
          <label className="form-label text-neutral-900 fw-medium mb-12">
            Kurum Tipi
          </label>

          {!isGroupSelected ? (
            // Grup seçilmemişse bilgi mesajı göster
            <div className="alert alert-info d-flex align-items-center gap-12 p-16 bg-info-50 border border-info-200 rounded-8">
              <i className="ph-bold ph-info text-info-600 text-xl" />
              <span className="text-sm text-neutral-700">
                Lütfen önce bir kurum kategorisi seçiniz.
              </span>
            </div>
          ) : (
            // Grup seçilmişse kurum türlerini göster
            <>
              <FormRadio
                name="institutionTypeId"
                label=""
                value=""
                options={filteredInstitutionTypes}
                multi={true}
                isShowAll
                minShowingValues={4}
              />

              {options.institutionTypes.loading && (
                <LoadingSpinner
                  message="Kurum türleri yükleniyor..."
                  size="sm"
                  variant="dots"
                />
              )}

              {options.institutionTypes.error && (
                <div className="text-center py-2">
                  <small className="text-danger">
                    Kurum türleri yüklenirken hata oluştu
                  </small>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
