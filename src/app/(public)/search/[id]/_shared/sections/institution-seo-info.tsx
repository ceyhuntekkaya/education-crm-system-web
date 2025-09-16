import { useInstitutionDetail } from "../contexts";

export default function InstitutionSeoInfo() {
  const { school } = useInstitutionDetail();
  return (
    <div className="tutor-details__content">
      <div className="border border-neutral-30 rounded-12 bg-white p-8 mt-24">
        <div className="border border-neutral-30 rounded-12 bg-main-25 p-32">
          {/* SEO Meta Bilgileri */}
          <h4 className="mb-16">SEO ve Meta Bilgileri</h4>

          {/* Meta Başlık ve Açıklama */}
          <h5 className="mb-16">Meta Bilgileri</h5>
          <ul className="tution-info-list bg-white rounded-8 mb-32">
            <li className="d-flex align-items-start px-32 py-16">
              <span className="w-50-percent fw-semibold text-neutral-700">
                Meta Başlık
              </span>
              <span className="w-50-percent fw-normal text-neutral-500 text-md">
                <span className="text-main-600 fw-semibold">
                  {school.metaTitle}
                </span>
              </span>
            </li>

            <li className="d-flex align-items-start px-32 py-16">
              <span className="w-50-percent fw-semibold text-neutral-700">
                Meta Açıklama
              </span>
              <span className="w-50-percent fw-normal text-neutral-500 text-md">
                <span className="text-success-600 fw-medium">
                  {school.metaDescription}
                </span>
              </span>
            </li>

            <li className="d-flex align-items-start px-32 py-16">
              <span className="w-50-percent fw-semibold text-neutral-700">
                URL Slug
              </span>
              <span className="w-50-percent fw-normal text-neutral-500 text-md">
                <code className="text-info-600 fw-medium">/{school.slug}</code>
              </span>
            </li>
          </ul>

          {/* Anahtar Kelimeler */}
          <h5 className="mb-16">Anahtar Kelimeler</h5>
          <ul className="tution-info-list bg-white rounded-8 mb-32">
            <li className="d-flex align-items-start px-32 py-16">
              <span className="w-50-percent fw-semibold text-neutral-700">
                SEO Anahtar Kelimeleri
              </span>
              <span className="w-50-percent fw-normal text-neutral-500 text-md">
                <div className="d-flex flex-wrap gap-8">
                  {school.metaKeywords
                    ?.split(", ")
                    .map((keyword: string, index: number) => (
                      <span
                        key={index}
                        className="px-12 py-6 bg-warning-50 text-warning-700 rounded-pill text-sm fw-medium"
                      >
                        #{keyword.trim()}
                      </span>
                    ))}
                </div>
              </span>
            </li>
          </ul>

          {/* SEO Performans Göstergeleri */}
          <h5 className="mb-16">SEO Performans Göstergeleri</h5>
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
                İçerik Sayısı
              </span>
              <span className="w-50-percent fw-normal text-neutral-500 text-md">
                <span className="text-success-600 fw-semibold">
                  {school.postCount}
                </span>
              </span>
            </li>

            <li className="d-flex align-items-start px-32 py-16">
              <span className="w-50-percent fw-semibold text-neutral-700">
                Ortalama Puan
              </span>
              <span className="w-50-percent fw-normal text-neutral-500 text-md">
                <span className="text-warning-600 fw-semibold">
                  {school.ratingAverage}/5.0
                </span>
              </span>
            </li>

            <li className="d-flex align-items-start px-32 py-16">
              <span className="w-50-percent fw-semibold text-neutral-700">
                Toplam Beğeni
              </span>
              <span className="w-50-percent fw-normal text-neutral-500 text-md">
                <span className="text-danger-600 fw-semibold">
                  {school.likeCount}
                </span>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
