import { useInstitutionDetail } from "../contexts";

export default function InstitutionLocationInfo() {
  const { school, campus } = useInstitutionDetail();

  // School veya campus yoksa hiçbir şey gösterme
  if (!school || !campus) {
    return null;
  }

  const locationInfoItems = [
    {
      label: "İl ID",
      value: (
        <span className="text-neutral-600 fw-medium">
          #{school.campus.province.id}
        </span>
      ),
      isShowing: school.campus.province.id && school.campus.province.id > 0,
    },
    {
      label: "İl Adı",
      value: (
        <span className="text-main-600 fw-semibold">
          {school.campus.province.name}
        </span>
      ),
      isShowing:
        school.campus.province.name &&
        school.campus.province.name.trim() !== "",
    },
    {
      label: "İl Kodu",
      value: (
        <span className="text-neutral-600 font-mono">
          {school.campus.province.code}
        </span>
      ),
      isShowing:
        school.campus.province.code &&
        school.campus.province.code.trim() !== "",
    },
    {
      label: "Plaka Kodu",
      value: (
        <span className="bg-main-50 text-main-600 px-12 py-6 rounded-8 fw-semibold d-inline-flex align-items-center gap-4">
          <i className="ph-bold ph-car text-sm"></i>
          {school.campus.province.plateCode}
        </span>
      ),
      isShowing:
        school.campus.province.plateCode &&
        school.campus.province.plateCode.trim() !== "",
    },
    {
      label: "Büyükşehir Durumu",
      value: (
        <span
          className={`px-12 py-6 rounded-8 text-sm fw-medium d-inline-flex align-items-center gap-4 ${
            school.campus.province.isMetropolitan
              ? "bg-success-50 text-success-600"
              : "bg-neutral-50 text-neutral-600"
          }`}
        >
          <i
            className={`ph-bold ${
              school.campus.province.isMetropolitan ? "ph-city" : "ph-house"
            } text-sm`}
          ></i>
          {school.campus.province.isMetropolitan ? "Büyükşehir" : "İl"}
        </span>
      ),
      isShowing: typeof school.campus.province.isMetropolitan === "boolean",
    },
    {
      label: "İldeki Toplam Kurum",
      value: (
        <div className="d-flex align-items-center gap-8">
          <i className="ph-bold ph-buildings text-primary-600"></i>
          <span className="text-primary-600 fw-semibold">
            {school.campus.province.schoolCount?.toLocaleString()} Kurum
          </span>
        </div>
      ),
      isShowing:
        school.campus.province.schoolCount &&
        school.campus.province.schoolCount > 0,
    },
    {
      label: "İlçe ID",
      value: (
        <span className="text-neutral-600 fw-medium">
          #{school.campus.district.id}
        </span>
      ),
      isShowing: school.campus.district.id && school.campus.district.id > 0,
    },
    {
      label: "İlçe Adı",
      value: (
        <span className="text-success-600 fw-semibold">
          {school.campus.district.name}
        </span>
      ),
      isShowing:
        school.campus.district.name &&
        school.campus.district.name.trim() !== "",
    },
    {
      label: "İlçe Kodu",
      value: (
        <span className="text-neutral-600 font-mono">
          {school.campus.district.code}
        </span>
      ),
      isShowing:
        school.campus.district.code &&
        school.campus.district.code.trim() !== "",
    },
    {
      label: "İlçe Türü",
      value: (
        <span className="bg-info-50 text-info-600 px-12 py-6 rounded-8 text-sm fw-medium d-inline-flex align-items-center gap-4">
          <i className="ph-bold ph-map-pin-area text-sm"></i>
          {school.campus.district.districtType === "MERKEZ"
            ? "Merkez İlçe"
            : school.campus.district.districtType}
        </span>
      ),
      isShowing:
        school.campus.district.districtType &&
        school.campus.district.districtType.trim() !== "",
    },
    {
      label: "Merkez Statüsü",
      value: (
        <span
          className={`px-12 py-6 rounded-8 text-sm fw-medium d-inline-flex align-items-center gap-4 ${
            school.campus.district.isCentral
              ? "bg-warning-50 text-warning-600"
              : "bg-neutral-50 text-neutral-600"
          }`}
        >
          <i
            className={`ph-bold ${
              school.campus.district.isCentral ? "ph-star" : "ph-circle"
            } text-sm`}
          ></i>
          {school.campus.district.isCentral ? "Merkez İlçe" : "Taşra İlçe"}
        </span>
      ),
      isShowing: typeof school.campus.district.isCentral === "boolean",
    },
    {
      label: "İlçedeki Kurum Sayısı",
      value: (
        <div className="d-flex align-items-center gap-8">
          <i className="ph-bold ph-graduation-cap text-success-600"></i>
          <span className="text-success-600 fw-semibold">
            {school.campus.district.schoolCount?.toLocaleString()} Kurum
          </span>
        </div>
      ),
      isShowing:
        school.campus.district.schoolCount &&
        school.campus.district.schoolCount > 0,
    },
    {
      label: "Sosyoekonomik Seviye",
      value: (
        <span className="bg-primary-50 text-primary-600 px-12 py-6 rounded-8 fw-semibold d-inline-flex align-items-center gap-4">
          <i className="ph-bold ph-trend-up text-sm"></i>
          {school.campus.district.socioeconomicLevel === "UPPER_MIDDLE"
            ? "Üst Orta Gelir"
            : school.campus.district.socioeconomicLevel === "UPPER"
            ? "Üst Gelir"
            : school.campus.district.socioeconomicLevel === "MIDDLE"
            ? "Orta Gelir"
            : school.campus.district.socioeconomicLevel === "LOWER_MIDDLE"
            ? "Alt Orta Gelir"
            : school.campus.district.socioeconomicLevel === "LOWER"
            ? "Alt Gelir"
            : school.campus.district.socioeconomicLevel}
        </span>
      ),
      isShowing:
        school.campus.district.socioeconomicLevel &&
        school.campus.district.socioeconomicLevel.trim() !== "",
    },
    {
      label: "Tam Adres",
      value: (
        <div className="d-flex flex-column gap-4">
          <span className="text-main-600 fw-medium">{campus.addressLine1}</span>
          {campus.addressLine2 && (
            <span className="text-neutral-600">{campus.addressLine2}</span>
          )}
          <span className="text-sm text-neutral-500">
            {school.campus.district.name} / {school.campus.province.name}
            {campus.postalCode && ` - ${campus.postalCode}`}
          </span>
        </div>
      ),
      isShowing: campus.addressLine1 && campus.addressLine1.trim() !== "",
    },
    {
      label: "Bölge Özellikleri",
      value: (
        <div className="d-flex flex-column gap-8">
          <div className="d-flex align-items-center gap-8">
            <i className="ph-bold ph-city text-main-600"></i>
            <span>
              {school.campus.province.isMetropolitan ? "Büyükşehir" : "İl"} -
              Plaka: {school.campus.province.plateCode}
            </span>
          </div>
          <div className="d-flex align-items-center gap-8">
            <i className="ph-bold ph-map-pin-area text-success-600"></i>
            <span>
              {school.campus.district.isCentral ? "Merkez" : "Taşra"} İlçe -
              {school.campus.district.socioeconomicLevel === "UPPER_MIDDLE"
                ? "Üst Orta Gelir"
                : school.campus.district.socioeconomicLevel}
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
                {school.campus.province.schoolCount?.toLocaleString()}
              </span>{" "}
              Kurum
            </span>
          </div>
          <div className="d-flex align-items-center gap-8">
            <i className="ph-bold ph-graduation-cap text-success-600"></i>
            <span>
              İlçede{" "}
              <span className="text-success-600 fw-semibold">
                {school.campus.district.schoolCount?.toLocaleString()}
              </span>{" "}
              Kurum
            </span>
          </div>
        </div>
      ),
      isShowing:
        school.campus.province.schoolCount &&
        school.campus.district.schoolCount,
    },
  ];

  // İl bilgilerini filtrele
  const provinceItems = locationInfoItems
    .slice(0, 6)
    .filter((item) => item.isShowing);

  // İlçe bilgilerini filtrele
  const districtItems = locationInfoItems
    .slice(6, 13)
    .filter((item) => item.isShowing);

  // Bölge özeti bilgilerini filtrele
  const summaryItems = locationInfoItems
    .slice(13)
    .filter((item) => item.isShowing);

  return (
    <div className="tutor-details__content">
      <div className="border border-neutral-30 rounded-12 bg-white p-8 mt-24">
        <div className="border border-neutral-30 rounded-12 bg-main-25 p-32">
          {/* İl Bilgileri */}
          <h4 className="mb-16 text-main-600">
            <i className="ph-bold ph-city me-8"></i>
            İl Bilgileri
          </h4>
          <span className="d-block border border-neutral-30 my-24 border-dashed" />

          <ul className="tution-info-list bg-white rounded-8 mb-32">
            {provinceItems.map((item, index) => (
              <li key={index} className="d-flex align-items-start px-32 py-16">
                <span className="w-50-percent fw-semibold text-neutral-700">
                  {item.label}
                </span>
                <span className="w-50-percent fw-normal text-neutral-500 text-md">
                  {item.value}
                </span>
              </li>
            ))}
          </ul>

          {/* İlçe Bilgileri */}
          <h4 className="mb-16 text-success-600">
            <i className="ph-bold ph-map-pin-area me-8"></i>
            İlçe Bilgileri
          </h4>
          <span className="d-block border border-neutral-30 my-24 border-dashed" />

          <ul className="tution-info-list bg-white rounded-8 mb-32">
            {districtItems.map((item, index) => (
              <li key={index} className="d-flex align-items-start px-32 py-16">
                <span className="w-50-percent fw-semibold text-neutral-700">
                  {item.label}
                </span>
                <span className="w-50-percent fw-normal text-neutral-500 text-md">
                  {item.value}
                </span>
              </li>
            ))}
          </ul>

          {/* Bölge Özeti */}
          <h4 className="mb-16 text-warning-600">
            <i className="ph-bold ph-map-pin me-8"></i>
            Bölge Özeti
          </h4>
          <span className="d-block border border-neutral-30 my-24 border-dashed" />

          <ul className="tution-info-list bg-white rounded-8">
            {summaryItems.map((item, index) => (
              <li key={index} className="d-flex align-items-start px-32 py-16">
                <span className="w-50-percent fw-semibold text-neutral-700">
                  {item.label}
                </span>
                <span className="w-50-percent fw-normal text-neutral-500 text-md">
                  {item.value}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
