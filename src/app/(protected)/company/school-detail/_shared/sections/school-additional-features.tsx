import { useSchoolDetailContext } from "../context/school-detail-context";
import { CustomCard } from "@/components/ui";

export default function SchoolAdditionalFeatures() {
  const {
    schoolProperties,
    isPropertiesLoading,
    propertiesError,
    selectedSchool,
  } = useSchoolDetailContext();

  // Determine empty states
  const isEmpty = !selectedSchool || !schoolProperties.length;
  const emptyMessage = !selectedSchool
    ? "Ek özellikleri görmek için bir Kurum seçiniz"
    : "Bu Kurum için henüz ek özellik tanımlanmamış";
  const emptyIcon = !selectedSchool ? "ph-graduation-cap" : "ph-list-bullets";

  return (
    <CustomCard
      title="Ek Özellikler"
      isLoading={isPropertiesLoading}
      loadingMessage="Ek özellikler yükleniyor..."
      isError={!!propertiesError}
      errorMessage={
        propertiesError || "Ek özellikler yüklenirken bir hata oluştu"
      }
      errorIcon="ph-warning-circle"
      isEmpty={isEmpty}
      emptyMessage={emptyMessage}
      emptyIcon={emptyIcon}
    >
      {!isEmpty && (
        <div className="p-24">
          {/* Başlık ve Açıklama */}
          <div className="mb-24">
            <h5 className="mb-16">Özellikler</h5>
            <p className="text-neutral-500 text-sm mb-16">
              Bu Kuruma tanımlanmış olan ek özellikler aşağıda listelenmektedir.
            </p>
          </div>

          {/* Checkbox Grupları */}
          <div className="d-flex flex-column gap-20">
            {schoolProperties.map((group) => (
              <div
                key={group.groupId}
                className="property-group mb-20 bg-white rounded-32 px-24 pt-24 pb-32"
              >
                <h6 className="mb-12 text-neutral-600 fw-semibold">
                  {group.groupDisplayName}
                </h6>
                <div className="row row-gap-12">
                  {group.properties.map((property) => (
                    <div
                      key={property.propertyTypeId}
                      className="col-4 form-check common-check mb-0 mt-20 ps-32"
                    >
                      <input
                        id={`property-${property.propertyTypeId}`}
                        type="checkbox"
                        className="form-check-input bg-main-25"
                        checked={true}
                        readOnly
                      />
                      <label
                        className="form-check-label fw-normal flex-grow-1"
                        htmlFor={`property-${property.propertyTypeId}`}
                      >
                        {property.displayName}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </CustomCard>
  );
}
