import { useInstitutionDetail } from "../contexts";
import { InstitutionPropertyValueDto } from "@/types";

interface StatisticsInfoItem {
  label: string;
  value: React.ReactNode;
  isShowing: boolean;
}

export default function InstitutionStatistics() {
  const { school, campus } = useInstitutionDetail();

  const statisticsInfoItems: StatisticsInfoItem[] = [
    // Görüntülenme ve Etkileşim İstatistikleri
    {
      label: "Görüntülenme Sayısı",
      value: (
        <div className="d-flex align-items-center gap-8">
          <i className="ph-bold ph-eye text-main-600"></i>
          <span className="text-main-600 fw-semibold">
            {(school.viewCount || 0).toLocaleString()}
          </span>
        </div>
      ),
      isShowing: (school.viewCount || 0) > 0,
    },
    {
      label: "Beğeni Sayısı",
      value: (
        <div className="d-flex align-items-center gap-8">
          <i className="ph-bold ph-heart text-danger-600"></i>
          <span className="text-danger-600 fw-semibold">
            {(school.likeCount || 0).toLocaleString()}
          </span>
        </div>
      ),
      isShowing: (school.likeCount || 0) > 0,
    },
    {
      label: "Paylaşım Sayısı",
      value: (
        <div className="d-flex align-items-center gap-8">
          <i className="ph-bold ph-share-network text-success-600"></i>
          <span className="text-success-600 fw-semibold">
            {(school.postCount || 0).toLocaleString()}
          </span>
        </div>
      ),
      isShowing: (school.postCount || 0) > 0,
    },
    {
      label: "Değerlendirme Ortalaması",
      value: (
        <div className="d-flex align-items-center gap-8">
          <i className="ph-bold ph-star text-warning-600"></i>
          <div className="d-flex flex-column">
            <span className="text-warning-600 fw-semibold">
              {school.ratingAverage || 0} / 5.0
            </span>
            <small className="text-neutral-500">
              ({(school.ratingCount || 0).toLocaleString()} değerlendirme)
            </small>
          </div>
        </div>
      ),
      isShowing: (school.ratingAverage || 0) > 0,
    },
    // Öğrenci Bilgileri
    {
      label: "Toplam Kapasite",
      value: (
        <div className="d-flex align-items-center gap-8">
          <i className="ph-bold ph-users-three text-main-600"></i>
          <span className="text-main-600 fw-semibold">
            {(school.capacity || 0).toLocaleString()} öğrenci
          </span>
        </div>
      ),
      isShowing: (school.capacity || 0) > 0,
    },
    {
      label: "Mevcut Öğrenci Sayısı",
      value: (
        <div className="d-flex align-items-center gap-8">
          <i className="ph-bold ph-student text-success-600"></i>
          <span className="text-success-600 fw-semibold">
            {(school.currentStudentCount || 0).toLocaleString()} öğrenci
          </span>
        </div>
      ),
      isShowing: (school.currentStudentCount || 0) > 0,
    },
    {
      label: "Doluluk Oranı",
      value: (
        <div className="d-flex align-items-center gap-12">
          <i className="ph-bold ph-chart-pie text-info-600"></i>
          <div className="flex-grow-1">
            <div className="d-flex align-items-center gap-12">
              <div className="flex-grow-1">
                <div
                  className="w-100 bg-neutral-100 rounded-pill"
                  style={{ height: "8px" }}
                >
                  <div
                    className="bg-main-600 rounded-pill h-100"
                    style={{
                      width: `${Math.min(
                        ((school.currentStudentCount || 0) /
                          (school.capacity || 1)) *
                          100,
                        100
                      )}%`,
                    }}
                  ></div>
                </div>
              </div>
              <span className="fw-semibold text-main-600">
                %
                {Math.round(
                  ((school.currentStudentCount || 0) / (school.capacity || 1)) *
                    100
                )}
              </span>
            </div>
          </div>
        </div>
      ),
      isShowing:
        (school.capacity || 0) > 0 && (school.currentStudentCount || 0) > 0,
    },
    {
      label: "Ortalama Sınıf Mevcudu",
      value: (
        <div className="d-flex align-items-center gap-8">
          <i className="ph-bold ph-chalkboard-teacher text-info-600"></i>
          <span className="text-info-600 fw-semibold">
            {school.classSizeAverage || 0} öğrenci
          </span>
        </div>
      ),
      isShowing: (school.classSizeAverage || 0) > 0,
    },
    {
      label: "Yaş Aralığı",
      value: (
        <div className="d-flex align-items-center gap-8">
          <i className="ph-bold ph-calendar-blank text-primary-600"></i>
          <span className="text-primary-600 fw-semibold">
            {school.minAge || 0} - {school.maxAge || 0} yaş
          </span>
        </div>
      ),
      isShowing: (school.minAge || 0) > 0 && (school.maxAge || 0) > 0,
    },
    // Kampüs İstatistikleri
    {
      label: "Kampüs Değerlendirmesi",
      value: (
        <div className="d-flex align-items-center gap-8">
          <i className="ph-bold ph-buildings text-warning-600"></i>
          <div className="d-flex flex-column">
            <span className="text-warning-600 fw-semibold">
              {campus.ratingAverage || 0} / 5.0
            </span>
            <small className="text-neutral-500">
              ({(campus.ratingCount || 0).toLocaleString()} değerlendirme)
            </small>
          </div>
        </div>
      ),
      isShowing: (campus.ratingAverage || 0) > 0,
    },
    {
      label: "Kampüsteki Okul Sayısı",
      value: (
        <div className="d-flex align-items-center gap-8">
          <i className="ph-bold ph-graduation-cap text-success-600"></i>
          <span className="text-success-600 fw-semibold">
            {school.campus.schoolCount || 0} okul
          </span>
        </div>
      ),
      isShowing: (school.campus.schoolCount || 0) > 0,
    },
    // Popülerlik Özeti
    {
      label: "Toplam Etkileşim",
      value: (
        <div className="d-flex flex-column gap-8">
          <div className="d-flex align-items-center gap-8">
            <i className="ph-bold ph-trend-up text-main-600"></i>
            <span className="text-main-600 fw-semibold">
              {(
                (school.viewCount || 0) +
                (school.likeCount || 0) +
                (school.postCount || 0)
              ).toLocaleString()}
            </span>
          </div>
          <div className="text-xs text-neutral-500">
            Görüntülenme + Beğeni + Paylaşım
          </div>
        </div>
      ),
      isShowing:
        (school.viewCount || 0) +
          (school.likeCount || 0) +
          (school.postCount || 0) >
        0,
    },
    {
      label: "Genel Popülerlik Durumu",
      value: (
        <div className="d-flex align-items-center gap-8">
          <i className="ph-bold ph-trophy text-warning-600"></i>
          <span
            className={`px-12 py-6 rounded-8 text-sm fw-medium ${
              (school.ratingAverage || 0) >= 4.5
                ? "bg-success-50 text-success-600"
                : (school.ratingAverage || 0) >= 4.0
                ? "bg-warning-50 text-warning-600"
                : (school.ratingAverage || 0) >= 3.0
                ? "bg-info-50 text-info-600"
                : "bg-neutral-50 text-neutral-600"
            }`}
          >
            {(school.ratingAverage || 0) >= 4.5
              ? "Çok Popüler"
              : (school.ratingAverage || 0) >= 4.0
              ? "Popüler"
              : (school.ratingAverage || 0) >= 3.0
              ? "Orta Seviye"
              : "Yeni Kurum"}
          </span>
        </div>
      ),
      isShowing: true,
    },
  ];

  // Etkileşim istatistiklerini filtrele
  const interactionItems = statisticsInfoItems
    .slice(0, 4)
    .filter((item) => item.isShowing);

  // Öğrenci bilgilerini filtrele
  const studentItems = statisticsInfoItems
    .slice(4, 10)
    .filter((item) => item.isShowing);

  // Kampüs ve popülerlik özetini filtrele
  const summaryItems = statisticsInfoItems
    .slice(10)
    .filter((item) => item.isShowing);

  return (
    <div className="tutor-details__content">
      <div className="border border-neutral-30 rounded-12 bg-white p-8 mt-24">
        <div className="border border-neutral-30 rounded-12 bg-main-25 p-32">
          {/* Etkileşim İstatistikleri */}
          <h4 className="mb-16 text-main-600">
            <i className="ph-bold ph-chart-line me-8"></i>
            Etkileşim İstatistikleri
          </h4>
          <span className="d-block border border-neutral-30 my-24 border-dashed" />

          <ul className="tution-info-list bg-white rounded-8 mb-32">
            {interactionItems.map((item, index) => (
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

          {/* Öğrenci Bilgileri */}
          <h4 className="mb-16 text-success-600">
            <i className="ph-bold ph-student me-8"></i>
            Öğrenci Bilgileri
          </h4>
          <span className="d-block border border-neutral-30 my-24 border-dashed" />

          <ul className="tution-info-list bg-white rounded-8 mb-32">
            {studentItems.map((item, index) => (
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

          {/* Popülerlik Özeti */}
          <h4 className="mb-16 text-warning-600">
            <i className="ph-bold ph-trophy me-8"></i>
            Popülerlik Özeti
          </h4>
          <span className="d-block border border-neutral-30 my-24 border-dashed" />

          <ul className="tution-info-list bg-white rounded-8 mb-32">
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

          {/* Kurum Özellikleri */}
          {school.propertyValues && school.propertyValues.length > 0 && (
            <>
              <h4 className="mb-16 text-info-600">
                <i className="ph-bold ph-gear me-8"></i>
                Kurum Özellikleri
              </h4>
              <span className="d-block border border-neutral-30 my-24 border-dashed" />

              <div className="row g-12">
                {school.propertyValues.map(
                  (property: InstitutionPropertyValueDto, index: number) => (
                    <div key={index} className="col-md-6">
                      <div className="d-flex align-items-center gap-12 bg-white rounded-8 p-16 border border-neutral-50 mb-12">
                        <div className="w-40-px h-40-px bg-success-50 rounded-circle flex-center">
                          <i className="ph-bold ph-check text-success-600"></i>
                        </div>
                        <div>
                          <p className="text-sm fw-semibold text-neutral-700 mb-4">
                            {property.propertyDisplayName}
                          </p>
                          <p className="text-xs text-success-600 fw-medium mb-0">
                            {property.formattedValue}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
