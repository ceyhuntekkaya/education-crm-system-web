import Image from "next/image";
import { useSchoolDetail } from "../context/school-detail-context";

const tempIconUrl =
  "https://img.freepik.com/premium-vector/school-icon-set-public-primary-high-school-vector-symbol-college-institute-building-sign-university-icon-black-filled-outlined-style_268104-13445.jpg";

export default function SchoolGeneralInfo() {
  const { currentSchool } = useSchoolDetail();

  if (!currentSchool) {
    return null;
  }

  const school = currentSchool;
  const campus = school.campus;

  const renderStars = (rating: number): JSX.Element => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex-align gap-4">
        {[...Array(fullStars)].map((_, i) => (
          <span
            key={`full-${i}`}
            className="text-lg fw-medium text-warning-600 d-flex"
          >
            <i className="ph-fill ph-star" />
          </span>
        ))}
        {hasHalfStar && (
          <span className="text-lg fw-medium text-warning-600 d-flex">
            <i className="ph-fill ph-star-half" />
          </span>
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <span
            key={`empty-${i}`}
            className="text-lg fw-medium text-neutral-300 d-flex"
          >
            <i className="ph-fill ph-star" />
          </span>
        ))}
      </div>
    );
  };

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
              <Image
                src={tempIconUrl || school.institutionType.iconUrl}
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
      value: school.languageOfInstruction,
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
      label: "Konum",
      value: (
        <div className="d-flex flex-column gap-4">
          <span className="text-sm text-neutral-500">
            {campus?.district?.name} / {campus?.province?.name}
          </span>
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

  return (
    <div className="tutor-details__content mt-24">
      {/* Okul Açıklaması */}
      {school.description && (
        <div className="border border-neutral-30 rounded-12 bg-white p-8 mb-24">
          <div className="border border-neutral-30 rounded-12 bg-main-25 p-32">
            <h4 className="mb-16">Okul Hakkında</h4>
            <span className="d-block border border-neutral-30 my-20 border-dashed" />
            <p className="text-neutral-700 text-md leading-relaxed mb-0">
              {school.description}
            </p>
          </div>
        </div>
      )}

      <div className="border border-neutral-30 rounded-12 bg-white p-8 mt-24">
        <div className="border border-neutral-30 rounded-12 bg-main-25 p-32 bg-main-25">
          <h4 className="mb-16">Okul Bilgileri</h4>
          <span className="d-block border border-neutral-30 my-24 border-dashed" />

          <ul className="tution-info-list bg-white rounded-8">
            {institutionInfoItems
              .filter((item) => item.isShowing)
              .map((item, index) => (
                <li
                  key={index}
                  className="d-flex align-items-start px-32 py-16"
                >
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
