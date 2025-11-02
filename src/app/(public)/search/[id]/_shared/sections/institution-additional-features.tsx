import { useInstitutionDetail } from "../contexts";
import { CustomCard } from "@/components/ui";
import {
  getInstitutionPropertyGroupIcon,
  getInstitutionPropertyGroupColor,
} from "../utils";

export default function InstitutionAdditionalFeatures() {
  const {
    institutionProperties,
    isPropertiesLoading,
    propertiesError,
    school,
  } = useInstitutionDetail();

  // Determine empty states
  const isEmpty = !school || !institutionProperties.length;
  const emptyMessage = !school
    ? "Ek özellikleri görmek için bir kurum seçiniz"
    : "Bu kurum için henüz ek özellik tanımlanmamış";
  const emptyIcon = !school ? "ph-graduation-cap" : "ph-list-bullets";

  // multiItems formatında hazırla
  const propertySections = institutionProperties.map((group) => ({
    title: group.groupDisplayName,
    titleColor: getInstitutionPropertyGroupColor(group.groupName),
    titleIcon: getInstitutionPropertyGroupIcon(group.groupName),
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
