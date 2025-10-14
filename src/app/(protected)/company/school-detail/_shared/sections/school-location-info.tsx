import { useSchoolDetail } from "../context/school-detail-context";
import { CustomCard } from "@/components/ui";

export default function SchoolLocationInfo() {
  const { currentSchool } = useSchoolDetail();

  if (!currentSchool) {
    return (
      <CustomCard title="Konum Bilgileri">
        <p className="text-neutral-500">Konum bilgileri henüz mevcut değil.</p>
      </CustomCard>
    );
  }

  const school = currentSchool;
  const campus = school.campus;

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
      label: "İl ID",
      value: (
        <span className="text-neutral-600 fw-medium">
          #{campus.province?.id}
        </span>
      ),
      isShowing: campus.province?.id && campus.province.id > 0,
    },
    {
      label: "İl Adı",
      value: (
        <span className="text-main-600 fw-semibold">
          {campus.province?.name}
        </span>
      ),
      isShowing: campus.province?.name && campus.province.name.trim() !== "",
    },
    {
      label: "İl Kodu",
      value: (
        <span className="text-neutral-600 font-mono">
          {campus.province?.code}
        </span>
      ),
      isShowing: campus.province?.code && campus.province.code.trim() !== "",
    },
    {
      label: "Plaka Kodu",
      value: (
        <span className="bg-main-50 text-main-600 px-12 py-6 rounded-8 fw-semibold d-inline-flex align-items-center gap-4">
          <i className="ph-bold ph-car text-sm"></i>
          {campus.province?.plateCode}
        </span>
      ),
      isShowing:
        campus.province?.plateCode && campus.province.plateCode.trim() !== "",
    },
    {
      label: "Büyükşehir Durumu",
      value: (
        <span
          className={`px-12 py-6 rounded-8 text-sm fw-medium d-inline-flex align-items-center gap-4 ${
            campus.province?.isMetropolitan
              ? "bg-success-50 text-success-600"
              : "bg-neutral-50 text-neutral-600"
          }`}
        >
          <i
            className={`ph-bold ${
              campus.province?.isMetropolitan ? "ph-city" : "ph-house"
            } text-sm`}
          ></i>
          {campus.province?.isMetropolitan ? "Büyükşehir" : "İl"}
        </span>
      ),
      isShowing: typeof campus.province?.isMetropolitan === "boolean",
    },
    {
      label: "İldeki Toplam Okul",
      value: (
        <div className="d-flex align-items-center gap-8">
          <i className="ph-bold ph-buildings text-primary-600"></i>
          <span className="text-primary-600 fw-semibold">
            {campus.province?.schoolCount?.toLocaleString()} okul
          </span>
        </div>
      ),
      isShowing:
        campus.province?.schoolCount && campus.province.schoolCount > 0,
    },
    {
      label: "İlçe ID",
      value: (
        <span className="text-neutral-600 fw-medium">
          #{campus.district?.id}
        </span>
      ),
      isShowing: campus.district?.id && campus.district.id > 0,
    },
    {
      label: "İlçe Adı",
      value: (
        <span className="text-success-600 fw-semibold">
          {campus.district?.name}
        </span>
      ),
      isShowing: campus.district?.name && campus.district.name.trim() !== "",
    },
    {
      label: "İlçe Kodu",
      value: (
        <span className="text-neutral-600 font-mono">
          {campus.district?.code}
        </span>
      ),
      isShowing: campus.district?.code && campus.district.code.trim() !== "",
    },
    {
      label: "İlçe Türü",
      value: (
        <span className="bg-info-50 text-info-600 px-12 py-6 rounded-8 text-sm fw-medium d-inline-flex align-items-center gap-4">
          <i className="ph-bold ph-map-pin-area text-sm"></i>
          {campus.district?.districtType === "MERKEZ"
            ? "Merkez İlçe"
            : campus.district?.districtType}
        </span>
      ),
      isShowing:
        campus.district?.districtType &&
        campus.district.districtType.trim() !== "",
    },
    {
      label: "Merkez Statüsü",
      value: (
        <span
          className={`px-12 py-6 rounded-8 text-sm fw-medium d-inline-flex align-items-center gap-4 ${
            campus.district?.isCentral
              ? "bg-warning-50 text-warning-600"
              : "bg-neutral-50 text-neutral-600"
          }`}
        >
          <i
            className={`ph-bold ${
              campus.district?.isCentral ? "ph-star" : "ph-circle"
            } text-sm`}
          ></i>
          {campus.district?.isCentral ? "Merkez İlçe" : "Taşra İlçe"}
        </span>
      ),
      isShowing: typeof campus.district?.isCentral === "boolean",
    },
    {
      label: "İlçedeki Okul Sayısı",
      value: (
        <div className="d-flex align-items-center gap-8">
          <i className="ph-bold ph-graduation-cap text-success-600"></i>
          <span className="text-success-600 fw-semibold">
            {campus.district?.schoolCount?.toLocaleString()} okul
          </span>
        </div>
      ),
      isShowing:
        campus.district?.schoolCount && campus.district.schoolCount > 0,
    },
    {
      label: "Sosyoekonomik Seviye",
      value: (
        <span className="bg-primary-50 text-primary-600 px-12 py-6 rounded-8 fw-semibold d-inline-flex align-items-center gap-4">
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
      label: "Bölge Özellikleri",
      value: (
        <div className="d-flex flex-column gap-8">
          <div className="d-flex align-items-center gap-8">
            <i className="ph-bold ph-city text-main-600"></i>
            <span>
              {campus.province?.isMetropolitan ? "Büyükşehir" : "İl"} - Plaka:{" "}
              {campus.province?.plateCode}
            </span>
          </div>
          <div className="d-flex align-items-center gap-8">
            <i className="ph-bold ph-map-pin-area text-success-600"></i>
            <span>
              {campus.district?.isCentral ? "Merkez" : "Taşra"} İlçe -
              {campus.district?.socioeconomicLevel === "UPPER_MIDDLE"
                ? "Üst Orta Gelir"
                : campus.district?.socioeconomicLevel}
            </span>
          </div>
        </div>
      ),
      isShowing: true,
    },
    {
      label: "Bölgedeki Eğitim Durumu",
      value: (
        <div className="d-flex flex-column gap-8">
          <div className="d-flex align-items-center gap-8">
            <i className="ph-bold ph-buildings text-primary-600"></i>
            <span>
              İl genelinde{" "}
              <span className="text-primary-600 fw-semibold">
                {campus.province?.schoolCount?.toLocaleString()}
              </span>{" "}
              okul
            </span>
          </div>
          <div className="d-flex align-items-center gap-8">
            <i className="ph-bold ph-graduation-cap text-success-600"></i>
            <span>
              İlçede{" "}
              <span className="text-success-600 fw-semibold">
                {campus.district?.schoolCount?.toLocaleString()}
              </span>{" "}
              okul
            </span>
          </div>
        </div>
      ),
      isShowing: campus.province?.schoolCount && campus.district?.schoolCount,
    },
  ];

  // Sections array oluştur
  const locationSections = [
    {
      title: "İl Bilgileri",
      titleColor: "text-main-600",
      titleIcon: "ph-bold ph-city",
      items: locationInfoItems.slice(0, 6),
    },
    {
      title: "İlçe Bilgileri",
      titleColor: "text-success-600",
      titleIcon: "ph-bold ph-map-pin-area",
      items: locationInfoItems.slice(6, 13),
    },
    {
      title: "Bölge Özeti",
      titleColor: "text-warning-600",
      titleIcon: "ph-bold ph-map-pin",
      items: locationInfoItems.slice(13),
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
