import { useSchoolDetailContext } from "../context/school-detail-context";
import { CustomCard } from "@/components/ui";

export default function SchoolLocationInfo() {
  const { currentSchool } = useSchoolDetailContext();

  if (!currentSchool) {
    return (
      <CustomCard title="Konum Bilgileri">
        <p className="text-neutral-500">Konum bilgileri henüz mevcut değil.</p>
      </CustomCard>
    );
  }

  const school = currentSchool;
  const campus = school.campus;

  console.log("campus ,=> ", campus);

  if (!campus) {
    return (
      <CustomCard
        title="Konum Bilgileri"
        headerAction={<i className="ph-bold ph-city text-main-600"></i>}
      >
        <p className="text-neutral-500">Konum bilgisi bulunmamaktadır.</p>
      </CustomCard>
    );
  }

  const locationInfoItems = [
    {
      label: "İl",
      value: (
        <div className="d-flex align-items-center gap-8">
          <span className="text-main-600 fw-semibold">
            {campus.province?.name}
          </span>
          {campus.province?.plateCode && (
            <span className="bg-main-50 text-main-600 px-8 py-4 rounded-6 text-sm fw-medium">
              {campus.province.plateCode}
            </span>
          )}
        </div>
      ),
      isShowing: campus.province?.name && campus.province.name.trim() !== "",
    },
    {
      label: "İlçe",
      value: (
        <span className="text-success-600 fw-semibold">
          {campus.district?.name}
        </span>
      ),
      isShowing: campus.district?.name && campus.district.name.trim() !== "",
    },
    {
      label: "Sosyoekonomik Seviye",
      value: (
        <span className="bg-primary-50 text-primary-600 px-12 py-6 rounded-8 fw-medium d-inline-flex align-items-center gap-4">
          <i className="ph-bold ph-trend-up text-sm"></i>
          {campus.district?.socioeconomicLevel === "UPPER_MIDDLE"
            ? "Üst Orta Gelir"
            : campus.district?.socioeconomicLevel === "HIGH"
            ? "Üst Gelir"
            : campus.district?.socioeconomicLevel === "MIDDLE"
            ? "Orta Gelir"
            : campus.district?.socioeconomicLevel === "LOWER_MIDDLE"
            ? "Alt Orta Gelir"
            : campus.district?.socioeconomicLevel === "LOW"
            ? "Alt Gelir"
            : campus.district?.socioeconomicLevel}
        </span>
      ),
      isShowing:
        campus.district?.socioeconomicLevel &&
        campus.district.socioeconomicLevel.trim() !== "",
    },
    {
      label: "Bölge Tipi",
      value: (
        <div className="d-flex align-items-center gap-8 flex-wrap">
          {campus.province?.isMetropolitan && (
            <span className="bg-success-50 text-success-600 px-10 py-4 rounded-6 text-sm fw-medium d-inline-flex align-items-center gap-4">
              <i className="ph-bold ph-city text-xs"></i>
              Büyükşehir
            </span>
          )}
          {campus.district?.isCentral && (
            <span className="bg-warning-50 text-warning-600 px-10 py-4 rounded-6 text-sm fw-medium d-inline-flex align-items-center gap-4">
              <i className="ph-bold ph-star text-xs"></i>
              Merkez İlçe
            </span>
          )}
        </div>
      ),
      isShowing: campus.province?.isMetropolitan || campus.district?.isCentral,
    },
  ];

  // Sections array oluştur
  const locationSections = [
    {
      title: "Konum Bilgileri",
      titleColor: "text-main-600",
      titleIcon: "ph-bold ph-map-pin",
      items: locationInfoItems,
    },
  ];

  // Eğer görüntülenecek herhangi bir bilgi yoksa boş state göster
  const visibleItems = locationInfoItems.filter((item) => item.isShowing);

  if (visibleItems.length === 0) {
    return (
      <CustomCard
        title="Konum Bilgileri"
        headerAction={<i className="ph-bold ph-city text-main-600"></i>}
      >
        <p className="text-neutral-500">Konum bilgileri henüz mevcut değil.</p>
      </CustomCard>
    );
  }

  return <CustomCard title="Konum Bilgileri" multiItems={locationSections} />;
}
