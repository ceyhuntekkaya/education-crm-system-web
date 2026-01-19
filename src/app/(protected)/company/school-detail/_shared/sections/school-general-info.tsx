import { useSchoolDetailContext } from "../context/school-detail-context";
import { CustomCard, CustomImage } from "@/components/ui";
import { renderStars, getLanguageTypeLabel, formatPhoneNumber } from "@/utils";

const tempIconUrl =
  "https://img.freepik.com/premium-vector/school-icon-set-public-primary-high-school-vector-symbol-college-institute-building-sign-university-icon-black-filled-outlined-style_268104-13445.jpg";

/**
 * URL'ye protokol ekler (eğer yoksa)
 */
const ensureProtocol = (url: string): string => {
  if (!url) return url;
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  return `https://${url}`;
};

export default function SchoolGeneralInfo() {
  const { currentSchool } = useSchoolDetailContext();

  if (!currentSchool) {
    return (
      <CustomCard title="Kurum Bilgileri">
        <p className="text-neutral-500">Kurum bilgileri henüz mevcut değil.</p>
      </CustomCard>
    );
  }

  const school = currentSchool;
  const campus = school.campus;

  // Temel Bilgiler
  const basicInfoItems = [
    {
      label: "Kurum Adı",
      value: (
        <span className="fw-semibold text-neutral-800">{school.name}</span>
      ),
      isShowing: school.name && school.name.trim() !== "",
    },
    {
      label: "Kurum Türü",
      value: (
        <span className="fw-semibold text-neutral-800">
          {school.institutionType?.displayName}
        </span>
      ),
      isShowing: school.institutionType && school.institutionType.displayName,
    },
    {
      label: "Yaş Aralığı",
      value: `${school.minAge} - ${school.maxAge} yaş`,
      isShowing: school.minAge && school.maxAge,
    },
    {
      label: "Müfredat Türü",
      value: school.curriculumType,
      isShowing: school.curriculumType && school.curriculumType.trim() !== "",
    },
    {
      label: "Eğitim Dili",
      value: school.languageOfInstruction
        ? getLanguageTypeLabel(school.languageOfInstruction)
        : "-",
      isShowing:
        school.languageOfInstruction &&
        school.languageOfInstruction.trim() !== "",
    },
    {
      label: "Yabancı Dil",
      value: school.foreignLanguages,
      isShowing:
        school.foreignLanguages && school.foreignLanguages.trim() !== "",
    },
    {
      label: "Öğrenci Kapasitesi",
      value: (
        <div className="d-flex flex-column gap-8">
          <div className="d-flex justify-content-between align-items-center">
            <span className="text-neutral-600 text-sm">Mevcut / Toplam</span>
            <span className="fw-semibold text-main-600">
              {school.currentStudentCount?.toLocaleString()} /{" "}
              {school.capacity?.toLocaleString()}
            </span>
          </div>
          <div
            className="w-100 h-8 rounded-pill position-relative overflow-hidden"
            style={{ backgroundColor: "#E2E8F0" }}
          >
            <div
              className="h-100 rounded-pill transition-all"
              style={{
                width: `${Math.min(
                  ((school.currentStudentCount || 0) / (school.capacity || 1)) *
                    100,
                  100
                )}%`,
                backgroundColor:
                  ((school.currentStudentCount || 0) / (school.capacity || 1)) *
                    100 >=
                  90
                    ? "#EF4444"
                    : ((school.currentStudentCount || 0) /
                        (school.capacity || 1)) *
                        100 >=
                      75
                    ? "#F59E0B"
                    : "#10B981",
              }}
            ></div>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <span className="text-xs text-neutral-500">Doluluk Oranı</span>
            <span
              className={`text-sm fw-medium ${
                ((school.currentStudentCount || 0) / (school.capacity || 1)) *
                  100 >=
                90
                  ? "text-danger-600"
                  : ((school.currentStudentCount || 0) /
                      (school.capacity || 1)) *
                      100 >=
                    75
                  ? "text-warning-600"
                  : "text-success-600"
              }`}
            >
              %
              {Math.round(
                ((school.currentStudentCount || 0) / (school.capacity || 1)) *
                  100
              )}
            </span>
          </div>
        </div>
      ),
      isShowing:
        school.currentStudentCount !== null &&
        school.capacity !== null &&
        (school.capacity || 0) > 0,
    },
    {
      label: "Ortalama Sınıf Mevcudu",
      value: `${school.classSizeAverage} öğrenci`,
      isShowing: school.classSizeAverage && school.classSizeAverage > 0,
    },
  ];

  // İletişim Bilgileri
  const contactInfoItems = [
    {
      label: "Telefon",
      value: (
        <div className="d-flex align-items-center gap-8">
          <i className="ph ph-phone text-main-600"></i>
          <span>{formatPhoneNumber(school.phone)}</span>
          {school.extension && (
            <>
              <span className="text-neutral-300 mx-4">|</span>
              <span className="text-sm text-neutral-500">
                Dahili: {school.extension}
              </span>
            </>
          )}
        </div>
      ),
      isShowing: school.phone && school.phone.trim() !== "",
    },
    {
      label: "E-posta",
      value: (
        <div className="d-flex align-items-center gap-8">
          <i className="ph ph-envelope text-main-600"></i>
          <a href={`mailto:${school.email}`} className="text-main-600">
            {school.email}
          </a>
        </div>
      ),
      isShowing: school.email && school.email.trim() !== "",
    },
    {
      label: "Sosyal Medya",
      value: (
        <div className="d-flex flex-wrap gap-8">
          {school.facebookUrl && (
            <a
              href={ensureProtocol(school.facebookUrl)}
              target="_blank"
              rel="noopener noreferrer"
              className="d-inline-flex align-items-center gap-6 px-10 py-6 rounded-6 bg-main-50 hover:bg-main-100 text-decoration-none transition-all"
              title="Facebook"
            >
              <i
                className="ph-fill ph-facebook-logo text-base"
                style={{ color: "#1877F2" }}
              ></i>
              <span className="text-xs text-neutral-700">Facebook</span>
            </a>
          )}
          {school.twitterUrl && (
            <a
              href={ensureProtocol(school.twitterUrl)}
              target="_blank"
              rel="noopener noreferrer"
              className="d-inline-flex align-items-center gap-6 px-10 py-6 rounded-6 bg-main-50 hover:bg-main-100 text-decoration-none transition-all"
              title="Twitter"
            >
              <i
                className="ph-fill ph-twitter-logo text-base"
                style={{ color: "#1DA1F2" }}
              ></i>
              <span className="text-xs text-neutral-700">Twitter</span>
            </a>
          )}
          {school.instagramUrl && (
            <a
              href={ensureProtocol(school.instagramUrl)}
              target="_blank"
              rel="noopener noreferrer"
              className="d-inline-flex align-items-center gap-6 px-10 py-6 rounded-6 bg-main-50 hover:bg-main-100 text-decoration-none transition-all"
              title="Instagram"
            >
              <i
                className="ph-fill ph-instagram-logo text-base"
                style={{ color: "#E4405F" }}
              ></i>
              <span className="text-xs text-neutral-700">Instagram</span>
            </a>
          )}
          {school.linkedinUrl && (
            <a
              href={ensureProtocol(school.linkedinUrl)}
              target="_blank"
              rel="noopener noreferrer"
              className="d-inline-flex align-items-center gap-6 px-10 py-6 rounded-6 bg-main-50 hover:bg-main-100 text-decoration-none transition-all"
              title="LinkedIn"
            >
              <i
                className="ph-fill ph-linkedin-logo text-base"
                style={{ color: "#0A66C2" }}
              ></i>
              <span className="text-xs text-neutral-700">LinkedIn</span>
            </a>
          )}
          {school.youtubeUrl && (
            <a
              href={ensureProtocol(school.youtubeUrl)}
              target="_blank"
              rel="noopener noreferrer"
              className="d-inline-flex align-items-center gap-6 px-10 py-6 rounded-6 bg-main-50 hover:bg-main-100 text-decoration-none transition-all"
              title="Youtube"
            >
              <i
                className="ph-fill ph-youtube-logo text-base"
                style={{ color: "#FF0000" }}
              ></i>
              <span className="text-xs text-neutral-700">Youtube</span>
            </a>
          )}
        </div>
      ),
      isShowing:
        school.facebookUrl ||
        school.twitterUrl ||
        school.instagramUrl ||
        school.linkedinUrl ||
        school.youtubeUrl,
    },
  ];

  // Konum Bilgileri
  const locationInfoItems = [
    {
      label: "İl",
      value: (
        <div className="d-flex align-items-center gap-8">
          <span className="text-main-600 fw-semibold">
            {campus?.province?.name}
          </span>
          {campus?.province?.plateCode && (
            <span className="bg-main-50 text-main-600 px-8 py-4 rounded-6 text-sm fw-medium">
              {campus.province.plateCode}
            </span>
          )}
        </div>
      ),
      isShowing: campus?.province?.name && campus.province.name.trim() !== "",
    },
    {
      label: "İlçe",
      value: (
        <span className="text-success-600 fw-semibold">
          {campus?.district?.name}
        </span>
      ),
      isShowing: campus?.district?.name && campus.district.name.trim() !== "",
    },
    {
      label: "Sosyoekonomik Seviye",
      value: (
        <span className="bg-primary-50 text-primary-600 px-12 py-6 rounded-8 fw-medium d-inline-flex align-items-center gap-4">
          <i className="ph-bold ph-trend-up text-sm"></i>
          {campus?.district?.socioeconomicLevel === "UPPER_MIDDLE"
            ? "Üst Orta Gelir"
            : campus?.district?.socioeconomicLevel === "HIGH"
            ? "Üst Gelir"
            : campus?.district?.socioeconomicLevel === "MIDDLE"
            ? "Orta Gelir"
            : campus?.district?.socioeconomicLevel === "LOWER_MIDDLE"
            ? "Alt Orta Gelir"
            : campus?.district?.socioeconomicLevel === "LOW"
            ? "Alt Gelir"
            : campus?.district?.socioeconomicLevel}
        </span>
      ),
      isShowing:
        campus?.district?.socioeconomicLevel &&
        campus.district.socioeconomicLevel.trim() !== "",
    },
    {
      label: "Bölge Tipi",
      value: (
        <div className="d-flex align-items-center gap-8 flex-wrap">
          {campus?.province?.isMetropolitan && (
            <span className="bg-success-50 text-success-600 px-10 py-4 rounded-6 text-sm fw-medium d-inline-flex align-items-center gap-4">
              <i className="ph-bold ph-city text-xs"></i>
              Büyükşehir
            </span>
          )}
          {campus?.district?.isCentral && (
            <span className="bg-warning-50 text-warning-600 px-10 py-4 rounded-6 text-sm fw-medium d-inline-flex align-items-center gap-4">
              <i className="ph-bold ph-star text-xs"></i>
              Merkez İlçe
            </span>
          )}
        </div>
      ),
      isShowing:
        campus?.province?.isMetropolitan || campus?.district?.isCentral,
    },
  ];

  const visibleBasicInfo = basicInfoItems.filter((item) => item.isShowing);
  const visibleContactInfo = contactInfoItems.filter((item) => item.isShowing);
  const visibleLocationInfo = locationInfoItems.filter(
    (item) => item.isShowing
  );

  const sections = [
    {
      title: "Temel Bilgiler",
      titleColor: "text-main-600",
      titleIcon: "ph-bold ph-graduation-cap",
      items: basicInfoItems,
    },
    {
      title: "İletişim Bilgileri",
      titleColor: "text-success-600",
      titleIcon: "ph-bold ph-phone",
      items: contactInfoItems,
    },
    {
      title: "Konum Bilgileri",
      titleColor: "text-warning-600",
      titleIcon: "ph-bold ph-map-pin",
      items: locationInfoItems,
    },
  ];

  return (
    <div className="d-flex flex-column gap-24">
      {/* Kurum Açıklaması */}
      <CustomCard
        title="Kurum Hakkında"
        editButtonUrl={
          school.id ? `/company/school-list/add-edit/${school.id}` : undefined
        }
      >
        <p className="text-neutral-700 text-md leading-relaxed mb-0">
          {school.description || "-"}
        </p>
      </CustomCard>

      {/* Temel, İletişim ve Konum Bilgileri */}
      {(visibleBasicInfo.length > 0 ||
        visibleContactInfo.length > 0 ||
        visibleLocationInfo.length > 0) && (
        <CustomCard title="Kurum Bilgileri" multiItems={sections} />
      )}
    </div>
  );
}
