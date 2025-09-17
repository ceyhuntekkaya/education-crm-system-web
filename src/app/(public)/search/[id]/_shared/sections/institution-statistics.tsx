import { useInstitutionDetail } from "../contexts";

export default function InstitutionStatistics() {
  const { school, campus } = useInstitutionDetail();
  return (
    <div className="tutor-details__content">
      <div className="border border-neutral-30 rounded-12 bg-white p-8 mt-24">
        <div className="border border-neutral-30 rounded-12 bg-main-25 p-32">
          <h4 className="mb-16">İstatistikler ve Popülerlik</h4>
          <span className="d-block border border-neutral-30 my-24 border-dashed" />

          {/* Görüntülenme ve Etkileşim İstatistikleri */}
          <h5 className="mb-16">Görüntülenme ve Etkileşim</h5>
          <ul className="tution-info-list bg-white rounded-8 mb-32">
            <li className="d-flex align-items-start px-32 py-16">
              <span className="w-50-percent fw-semibold text-neutral-700">
                Görüntülenme Sayısı
              </span>
              <span className="w-50-percent fw-normal text-neutral-500 text-md">
                <span className="text-main-600 fw-semibold">
                  {school.viewCount?.toLocaleString()}
                </span>
              </span>
            </li>

            <li className="d-flex align-items-start px-32 py-16">
              <span className="w-50-percent fw-semibold text-neutral-700">
                Beğeni Sayısı
              </span>
              <span className="w-50-percent fw-normal text-neutral-500 text-md">
                <span className="text-danger-600 fw-semibold">
                  {school.likeCount?.toLocaleString()}
                </span>
              </span>
            </li>

            <li className="d-flex align-items-start px-32 py-16">
              <span className="w-50-percent fw-semibold text-neutral-700">
                Paylaşım Sayısı
              </span>
              <span className="w-50-percent fw-normal text-neutral-500 text-md">
                <span className="text-success-600 fw-semibold">
                  {school.postCount?.toLocaleString()}
                </span>
              </span>
            </li>

            <li className="d-flex align-items-start px-32 py-16">
              <span className="w-50-percent fw-semibold text-neutral-700">
                Ortalama Değerlendirme
              </span>
              <span className="w-50-percent fw-normal text-neutral-500 text-md">
                <span className="text-warning-600 fw-semibold">
                  {school.ratingAverage} / 5.0
                </span>
                <small className="text-neutral-500 d-block">
                  ({school.ratingCount} değerlendirme)
                </small>
              </span>
            </li>
          </ul>

          {/* Öğrenci Bilgileri */}
          <h5 className="mb-16">Öğrenci Bilgileri</h5>
          <ul className="tution-info-list bg-white rounded-8 mb-32">
            <li className="d-flex align-items-start px-32 py-16">
              <span className="w-50-percent fw-semibold text-neutral-700">
                Toplam Kapasite
              </span>
              <span className="w-50-percent fw-normal text-neutral-500 text-md">
                <span className="text-main-600 fw-semibold">
                  {school.capacity} öğrenci
                </span>
              </span>
            </li>

            <li className="d-flex align-items-start px-32 py-16">
              <span className="w-50-percent fw-semibold text-neutral-700">
                Mevcut Öğrenci Sayısı
              </span>
              <span className="w-50-percent fw-normal text-neutral-500 text-md">
                <span className="text-success-600 fw-semibold">
                  {school.currentStudentCount} öğrenci
                </span>
              </span>
            </li>

            <li className="d-flex align-items-start px-32 py-16">
              <span className="w-50-percent fw-semibold text-neutral-700">
                Doluluk Oranı
              </span>
              <span className="w-50-percent fw-normal text-neutral-500 text-md">
                <div className="d-flex align-items-center gap-12">
                  <div className="flex-grow-1">
                    <div
                      className="w-100 bg-neutral-100 rounded-pill"
                      style={{ height: "8px" }}
                    >
                      <div
                        className="bg-main-600 rounded-pill h-100"
                        style={{
                          width: `${
                            (school.currentStudentCount / school.capacity) * 100
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>
                  <span className="fw-semibold text-main-600">
                    %
                    {Math.round(
                      (school.currentStudentCount / school.capacity) * 100
                    )}
                  </span>
                </div>
              </span>
            </li>

            <li className="d-flex align-items-start px-32 py-16">
              <span className="w-50-percent fw-semibold text-neutral-700">
                Ortalama Sınıf Mevcudu
              </span>
              <span className="w-50-percent fw-normal text-neutral-500 text-md">
                <span className="text-info-600 fw-semibold">
                  {school.classSizeAverage} öğrenci
                </span>
              </span>
            </li>

            <li className="d-flex align-items-start px-32 py-16">
              <span className="w-50-percent fw-semibold text-neutral-700">
                Yaş Aralığı
              </span>
              <span className="w-50-percent fw-normal text-neutral-500 text-md">
                <span className="text-primary-600 fw-semibold">
                  {school.minAge} - {school.maxAge} yaş
                </span>
              </span>
            </li>
          </ul>

          {/* Özellikler */}
          {school.propertyValues && school.propertyValues.length > 0 && (
            <>
              <h5 className="mb-16">Kurum Özellikleri</h5>

              <div className="row g-12">
                {school.propertyValues.map((property: any, index: number) => (
                  <div key={index} className="col-md-6">
                    <div className="d-flex align-items-center gap-12 bg-white rounded-8 p-16 border border-neutral-50">
                      <div className="w-40 h-40 bg-success-50 rounded-circle flex-center">
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
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
