import Image from "next/image";

interface InstitutionGeneralInfoProps {
  school: any;
  campus: any;
  renderStars: (rating: number) => JSX.Element;
}

export default function InstitutionGeneralInfo({
  school,
  campus,
  renderStars,
}: InstitutionGeneralInfoProps) {
  return (
    <div className="tutor-details__content">
      {/* Cover Image */}
      {school.coverImageUrl && (
        <div
          className="position-relative rounded-16 overflow-hidden mb-24"
          style={{ height: "300px" }}
        >
          <Image
            src={school.coverImageUrl}
            alt={school.name}
            fill
            className="object-cover"
          />
          <div className="position-absolute inset-0 bg-gradient-to-t from-black-50 to-transparent"></div>
          <div className="position-absolute bottom-0 left-0 p-24 text-white">
            <h2 className="h3 fw-bold mb-8">{school.name}</h2>
            <p className="text-white text-opacity-90 mb-0">
              {school.institutionType.displayName}
            </p>
          </div>
        </div>
      )}

      {/* Kurum Açıklaması */}
      {school.description && (
        <div className="border border-neutral-30 rounded-12 bg-white p-8 mb-24">
          <div className="border border-neutral-30 rounded-12 bg-main-25 p-32">
            <h4 className="mb-16">Kurum Hakkında</h4>
            <span className="d-block border border-neutral-30 my-20 border-dashed" />
            <p className="text-neutral-700 text-md leading-relaxed mb-0">
              {school.description}
            </p>
          </div>
        </div>
      )}

      <div className="border border-neutral-30 rounded-12 bg-white p-8 mt-24">
        <div className="border border-neutral-30 rounded-12 bg-main-25 p-32 bg-main-25">
          <h4 className="mb-16">Kurum Bilgileri</h4>
          <span className="d-block border border-neutral-30 my-24 border-dashed" />

          <ul className="tution-info-list bg-white rounded-8">
            <li className="d-flex align-items-start px-32 py-16">
              <span className="w-50-percent fw-semibold text-neutral-700">
                Kurum Adı
              </span>
              <span className="w-50-percent fw-normal text-neutral-500 text-md">
                <span className="text-main-600 fw-semibold">{school.name}</span>
              </span>
            </li>

            <li className="d-flex align-items-start px-32 py-16">
              <span className="w-50-percent fw-semibold text-neutral-700">
                Kurum Türü
              </span>
              <span className="w-50-percent fw-semibold text-warning-600 text-md">
                <div className="d-flex align-items-center gap-8">
                  {school.institutionType.iconUrl && (
                    <Image
                      src={school.institutionType.iconUrl}
                      alt={school.institutionType.displayName}
                      width={20}
                      height={20}
                    />
                  )}
                  <span
                    className="px-12 py-4 rounded-pill text-sm fw-medium"
                    style={{
                      backgroundColor: `${school.institutionType.colorCode}20`,
                      color: school.institutionType.colorCode,
                      border: `1px solid ${school.institutionType.colorCode}30`,
                    }}
                  >
                    {school.institutionType.displayName}
                  </span>
                </div>
                <small className="text-neutral-500 d-block mt-4">
                  {school.institutionType.description}
                </small>
              </span>
            </li>

            <li className="d-flex align-items-start px-32 py-16">
              <span className="w-50-percent fw-semibold text-neutral-700">
                Yaş Aralığı
              </span>
              <span className="w-50-percent fw-normal text-neutral-500 text-md">
                {school.minAge} - {school.maxAge} yaş
              </span>
            </li>

            <li className="d-flex align-items-start px-32 py-16">
              <span className="w-50-percent fw-semibold text-neutral-700">
                Müfredat Türü
              </span>
              <span className="w-50-percent fw-normal text-neutral-500 text-md">
                {school.curriculumType}
              </span>
            </li>

            <li className="d-flex align-items-start px-32 py-16">
              <span className="w-50-percent fw-semibold text-neutral-700">
                Eğitim Dili
              </span>
              <span className="w-50-percent fw-normal text-neutral-500 text-md">
                {school.languageOfInstruction}
              </span>
            </li>

            <li className="d-flex align-items-start px-32 py-16">
              <span className="w-50-percent fw-semibold text-neutral-700">
                Yabancı Dil
              </span>
              <span className="w-50-percent fw-normal text-neutral-500 text-md">
                {school.foreignLanguages}
              </span>
            </li>

            <li className="d-flex align-items-start px-32 py-16">
              <span className="w-50-percent fw-semibold text-neutral-700">
                Öğrenci Kapasitesi
              </span>
              <span className="w-50-percent fw-normal text-neutral-500 text-md">
                {school.currentStudentCount} / {school.capacity}
              </span>
            </li>

            <li className="d-flex align-items-start px-32 py-16">
              <span className="w-50-percent fw-semibold text-neutral-700">
                Ortalama Sınıf Mevcudu
              </span>
              <span className="w-50-percent fw-normal text-neutral-500 text-md">
                {school.classSizeAverage} öğrenci
              </span>
            </li>

            <li className="d-flex align-items-start px-32 py-16">
              <span className="w-50-percent fw-semibold text-neutral-700">
                Görüntülenme Sayısı
              </span>
              <span className="w-50-percent fw-normal text-neutral-500 text-md">
                {school.viewCount.toLocaleString()}
              </span>
            </li>

            <li className="d-flex align-items-start px-32 py-16">
              <span className="w-50-percent fw-semibold text-neutral-700">
                Kampüs
              </span>
              <span className="w-50-percent fw-normal text-neutral-500 text-md">
                {campus.name}
              </span>
            </li>

            <li className="d-flex align-items-start px-32 py-16">
              <span className="w-50-percent fw-semibold text-neutral-700">
                Website
              </span>
              <span className="w-50-percent fw-normal text-neutral-500 text-md">
                <a
                  href={campus.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-main-600"
                >
                  {campus.websiteUrl}
                </a>
              </span>
            </li>

            <li className="d-flex align-items-start px-32 py-16">
              <span className="w-50-percent fw-semibold text-neutral-700">
                Değerlendirme
              </span>
              <div className="flex-align gap-8">
                {renderStars(school.ratingAverage)}
                <span className="text-md text-neutral-700 ms-8">
                  ({school.ratingCount} değerlendirme)
                </span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
