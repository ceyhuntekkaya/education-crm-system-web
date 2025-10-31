import { useSchoolDetail } from "../context/school-detail-context";
import { CustomCard } from "@/components/ui";
import {
  getSchoolPropertyGroupIcon,
  getSchoolPropertyGroupColor,
} from "../utils";

export default function SchoolAdditionalFeatures() {
  const {
    schoolProperties,
    isPropertiesLoading,
    propertiesError,
    selectedSchool,
  } = useSchoolDetail();

  // Determine empty states
  const isEmpty = !selectedSchool || !schoolProperties.length;
  const emptyMessage = !selectedSchool
    ? "Ek özellikleri görmek için bir okul seçiniz"
    : "Bu okul için henüz ek özellik tanımlanmamış";
  const emptyIcon = !selectedSchool ? "ph-graduation-cap" : "ph-list-bullets";

  // multiItems formatında hazırla
  const propertySections = schoolProperties.map((group) => ({
    title: group.groupDisplayName,
    titleColor: getSchoolPropertyGroupColor(group.groupName),
    titleIcon: getSchoolPropertyGroupIcon(group.groupName),
    items: group.properties.map((property) => ({
      label: property.displayName,
      sublabel:
        property.displayName !== property.name ? property.name : undefined,
      value: (
        <div className="d-flex align-items-center gap-8 ">
          <span className="text-success-600 fw-semibold d-flex align-items-center gap-4">
            <i className="ph ph-check-circle text-sm"></i>
            Mevcut
          </span>
        </div>
      ),
      isShowing: true,
    })),
  }));

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
      multiItems={isEmpty ? undefined : propertySections}
    />
  );
}
