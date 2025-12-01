import { useSchoolDetailContext } from "../context/school-detail-context";
import { CustomCard, CustomImage } from "@/components/ui";
import { renderStars, getLanguageTypeLabel } from "@/utils";

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
      <CustomCard title="Okul Bilgileri">
        <p className="text-neutral-500">Okul bilgileri henüz mevcut değil.</p>
      </CustomCard>
    );
  }

  const school = currentSchool;
  const campus = school.campus;

  const institutionInfoItems = [
    {
      label: "Okul Adı",
      value: <span className="text-main-600 fw-semibold">{school.name}</span>,
      isShowing: school.name && school.name.trim() !== "",
    },
    {
      label: "Okul Türü",
      value: (
        <span className="fw-semibold text-warning-600 text-md">
          <div className="d-flex align-items-center gap-8">
            {school.institutionType?.iconUrl && (
              <CustomImage
                src={school.institutionType.iconUrl}
                tempImage={tempIconUrl}
                alt={school.institutionType.displayName || ""}
                width={20}
                height={20}
              />
            )}
            <span
              className="px-12 py-4 rounded-pill text-sm fw-medium"
              style={{
                backgroundColor: `${school.institutionType?.colorCode}20`,
                color: school.institutionType?.colorCode,
                border: `1px solid ${school.institutionType?.colorCode}30`,
              }}
            >
              {school.institutionType?.displayName}
            </span>
          </div>
          <small className="text-neutral-500 d-block mt-4">
            {school.institutionType?.description}
          </small>
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
        <div className="d-flex align-items-center gap-8">
          <span>
            {school.currentStudentCount} / {school.capacity}
          </span>
          <div className="w-100px h-8 bg-neutral-100 rounded-4 position-relative">
            <div
              className="h-100 bg-success-500 rounded-4"
              style={{
                width: `${
                  ((school.currentStudentCount || 0) / (school.capacity || 1)) *
                  100
                }%`,
              }}
            ></div>
          </div>
          <small className="text-neutral-500">
            %
            {Math.round(
              ((school.currentStudentCount || 0) / (school.capacity || 1)) * 100
            )}{" "}
            dolu
          </small>
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
    {
      label: "İletişim",
      value: (
        <div className="d-flex flex-column gap-4">
          {school.phone && (
            <div className="d-flex align-items-center gap-8">
              <i className="ph ph-phone text-main-500"></i>
              <span>{school.phone}</span>
              {school.extension && (
                <small className="text-neutral-500">
                  Dahili: {school.extension}
                </small>
              )}
            </div>
          )}
          {school.email && (
            <div className="d-flex align-items-center gap-8">
              <i className="ph ph-envelope text-main-500"></i>
              <a href={`mailto:${school.email}`} className="text-main-600">
                {school.email}
              </a>
            </div>
          )}
        </div>
      ),
      isShowing:
        (school.phone && school.phone.trim() !== "") ||
        (school.email && school.email.trim() !== ""),
    },
    {
      label: "Sosyal Medya",
      value: (
        <div className="d-flex flex-wrap gap-12">
          {school.facebookUrl && (
            <a
              href={ensureProtocol(school.facebookUrl)}
              target="_blank"
              rel="noopener noreferrer"
              className="d-flex align-items-center gap-8 px-12 py-8 rounded-8 bg-main-50 hover:bg-main-100 text-decoration-none transition-all"
              title="Facebook"
            >
              <i
                className="ph-fill ph-facebook-logo text-lg"
                style={{ color: "#1877F2" }}
              ></i>
              <span className="text-sm text-neutral-700">Facebook</span>
            </a>
          )}
          {school.twitterUrl && (
            <a
              href={ensureProtocol(school.twitterUrl)}
              target="_blank"
              rel="noopener noreferrer"
              className="d-flex align-items-center gap-8 px-12 py-8 rounded-8 bg-main-50 hover:bg-main-100 text-decoration-none transition-all"
              title="Twitter"
            >
              <i
                className="ph-fill ph-twitter-logo text-lg"
                style={{ color: "#1DA1F2" }}
              ></i>
              <span className="text-sm text-neutral-700">Twitter</span>
            </a>
          )}
          {school.instagramUrl && (
            <a
              href={ensureProtocol(school.instagramUrl)}
              target="_blank"
              rel="noopener noreferrer"
              className="d-flex align-items-center gap-8 px-12 py-8 rounded-8 bg-main-50 hover:bg-main-100 text-decoration-none transition-all"
              title="Instagram"
            >
              <i
                className="ph-fill ph-instagram-logo text-lg"
                style={{ color: "#E4405F" }}
              ></i>
              <span className="text-sm text-neutral-700">Instagram</span>
            </a>
          )}
          {school.linkedinUrl && (
            <a
              href={ensureProtocol(school.linkedinUrl)}
              target="_blank"
              rel="noopener noreferrer"
              className="d-flex align-items-center gap-8 px-12 py-8 rounded-8 bg-main-50 hover:bg-main-100 text-decoration-none transition-all"
              title="LinkedIn"
            >
              <i
                className="ph-fill ph-linkedin-logo text-lg"
                style={{ color: "#0A66C2" }}
              ></i>
              <span className="text-sm text-neutral-700">LinkedIn</span>
            </a>
          )}
          {school.youtubeUrl && (
            <a
              href={ensureProtocol(school.youtubeUrl)}
              target="_blank"
              rel="noopener noreferrer"
              className="d-flex align-items-center gap-8 px-12 py-8 rounded-8 bg-main-50 hover:bg-main-100 text-decoration-none transition-all"
              title="Youtube"
            >
              <i
                className="ph-fill ph-youtube-logo text-lg"
                style={{ color: "#FF0000" }}
              ></i>
              <span className="text-sm text-neutral-700">Youtube</span>
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
    {
      label: "Konum",
      value: (
        <div className="d-flex flex-wrap align-items-center gap-8">
          {campus?.district?.name && (
            <span className="badge bg-neutral-50 text-neutral-600 px-8 py-4">
              <i className="ph ph-buildings me-4"></i>
              {campus.district.name}
            </span>
          )}
          {campus?.province?.name && (
            <span className="badge bg-neutral-50 text-neutral-600 px-8 py-4">
              <i className="ph ph-map-pin me-4"></i>
              {campus.province.name}
            </span>
          )}
        </div>
      ),
      isShowing: campus?.district?.name || campus?.province?.name,
    },
    {
      label: "Kampüs",
      value: (
        <div className="d-flex flex-column gap-4">
          <span className="fw-semibold">{campus?.name}</span>
          <span className="text-sm text-neutral-500">ID: #{campus?.id}</span>
        </div>
      ),
      isShowing: campus?.name && campus.name.trim() !== "",
    },
    {
      label: "Fiyat Bilgisi",
      value: (
        <div className="d-flex flex-column gap-8">
          {school.registrationFee && (
            <div className="d-flex justify-content-between align-items-center">
              <span>Kayıt Ücreti:</span>
              <span className="fw-semibold text-main-600">
                {school.registrationFee?.toLocaleString()} ₺
              </span>
            </div>
          )}
          {school.monthlyFee && (
            <div className="d-flex justify-content-between align-items-center">
              <span>Aylık Ücret:</span>
              <span className="fw-semibold text-main-600">
                {school.monthlyFee?.toLocaleString()} ₺
              </span>
            </div>
          )}
          {school.annualFee && (
            <div className="d-flex justify-content-between align-items-center border-top pt-8">
              <span>Yıllık Ücret:</span>
              <span className="fw-bold text-success-600">
                {school.annualFee?.toLocaleString()} ₺
              </span>
            </div>
          )}
        </div>
      ),
      isShowing:
        school.registrationFee || school.monthlyFee || school.annualFee,
    },
    {
      label: "İstatistikler",
      value: (
        <div className="d-flex flex-column gap-8">
          {school.viewCount && (
            <div className="d-flex justify-content-between align-items-center">
              <span>Görüntülenme:</span>
              <span className="fw-semibold">
                {school.viewCount.toLocaleString()}
              </span>
            </div>
          )}
          {school.likeCount && (
            <div className="d-flex justify-content-between align-items-center">
              <span>Beğeni:</span>
              <span className="fw-semibold">
                {school.likeCount.toLocaleString()}
              </span>
            </div>
          )}
          {school.postCount && (
            <div className="d-flex justify-content-between align-items-center">
              <span>Paylaşım:</span>
              <span className="fw-semibold">{school.postCount}</span>
            </div>
          )}
        </div>
      ),
      isShowing: school.viewCount || school.likeCount || school.postCount,
    },
    {
      label: "Değerlendirme",
      value: (
        <div className="d-flex flex-column gap-8">
          <div className="d-flex align-items-center gap-8">
            {renderStars(school.ratingAverage || 0)}
            <span className="text-md text-neutral-700 ms-8 fw-semibold">
              {school.ratingAverage}
            </span>
          </div>
          <small className="text-neutral-500">
            {school.ratingCount} değerlendirme
          </small>
        </div>
      ),
      isShowing:
        school.ratingAverage &&
        school.ratingCount &&
        (school.ratingCount || 0) > 0,
    },
  ];

  // Eğer görüntülenecek herhangi bir bilgi yoksa boş state göster
  const visibleItems = institutionInfoItems.filter((item) => item.isShowing);

  return (
    <div className="d-flex flex-column gap-24">
      {/* Okul Açıklaması */}
      {school.description && (
        <CustomCard
          title="Okul Hakkında"
          editButtonUrl={
            school.id ? `/company/school-list/add-edit/${school.id}` : undefined
          }
        >
          <p className="text-neutral-700 text-md leading-relaxed mb-0">
            {school.description}
          </p>
        </CustomCard>
      )}

      {visibleItems.length > 0 ? (
        <CustomCard
          title="Okul Bilgileri"
          items={institutionInfoItems}
          editButtonUrl={
            school.id ? `/company/school-list/add-edit/${school.id}` : undefined
          }
        />
      ) : (
        <CustomCard
          title="Okul Bilgileri"
          editButtonUrl={
            school.id ? `/company/school-list/add-edit/${school.id}` : undefined
          }
        >
          <p className="text-neutral-500">Okul bilgileri henüz mevcut değil.</p>
        </CustomCard>
      )}
    </div>
  );
}
