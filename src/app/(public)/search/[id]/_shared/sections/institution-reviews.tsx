import { useInstitutionDetail } from "../contexts";

// Detailed rating categories data
const ratingCategories = [
  {
    id: "temizlik",
    title: "Temizlik",
    description: "Genel temizlik standartları ve hijyen",
    icon: "ph-fill ph-broom",
    bgColor: "bg-main-100",
    textColor: "text-main-600",
    progressColor: "bg-main-600",
    rating: 5.0,
  },
  {
    id: "dogruluk",
    title: "Doğruluk",
    description: "Bilgi doğruluğu ve güvenilirlik",
    icon: "ph-fill ph-check-circle",
    bgColor: "bg-success-100",
    textColor: "text-success-600",
    progressColor: "bg-success-600",
    rating: 5.0,
  },
  {
    id: "giris",
    title: "Giriş",
    description: "Erişim kolaylığı ve giriş süreci",
    icon: "ph-fill ph-magnifying-glass",
    bgColor: "bg-info-100",
    textColor: "text-info-600",
    progressColor: "bg-info-600",
    rating: 5.0,
  },
  {
    id: "iletisim",
    title: "İletişim",
    description: "İletişim kalitesi ve erişilebilirlik",
    icon: "ph-fill ph-chat-centered-text",
    bgColor: "bg-purple-100",
    textColor: "text-purple-600",
    progressColor: "bg-purple-600",
    rating: 5.0,
  },
  {
    id: "konum",
    title: "Konum",
    description: "Konum avantajları ve ulaşım",
    icon: "ph-fill ph-map-pin",
    bgColor: "bg-warning-100",
    textColor: "text-warning-600",
    progressColor: "bg-warning-600",
    rating: 5.0,
  },
  {
    id: "kalite",
    title: "Kalite/Fiyat Oranı",
    description: "Verilen hizmetin fiyat değeri",
    icon: "ph-fill ph-tag",
    bgColor: "bg-danger-100",
    textColor: "text-danger-600",
    progressColor: "bg-danger-600",
    rating: 5.0,
  },
];

export default function InstitutionReviews() {
  const { school, renderStars } = useInstitutionDetail();
  return (
    <div className="tutor-details__content">
      <div className="border border-neutral-30 rounded-12 bg-white p-8 mt-24">
        <div className="border border-neutral-30 rounded-12 bg-main-25 p-32">
          <h5 className="mb-0">Ortalama Değerlendirme</h5>
          <span className="d-block border border-neutral-30 my-32 border-dashed" />

          {/* Rating Overview */}
          <div className="d-flex flex-sm-row flex-column gap-36">
            <div className="rounded-16 px-40 py-24 flex-center flex-column flex-shrink-0 text-center bg-main-600 text-white">
              <h2 className="mb-8 text-white">{school.ratingAverage}</h2>
              <div className="flex-center gap-4">
                {renderStars(school.ratingAverage)}
              </div>
              <span className="mt-8 text-gray-500">
                {school.ratingCount} Değerlendirme
              </span>
            </div>

            {/* Rating Breakdown */}
            <div className="flex-grow-1">
              {[5, 4, 3, 2, 1].map((star, index) => {
                const percentages = [90, 75, 67, 44, 21];
                return (
                  <div key={star} className="flex-align gap-20 mb-8">
                    <div className="flex-align gap-8">
                      <span className="text-lg fw-medium text-warning-600 d-flex">
                        <i className="ph-fill ph-star" />
                      </span>
                      <span className="text-gray-900 flex-shrink-0">
                        {star}
                      </span>
                    </div>
                    <div
                      className="progress w-100 bg-white rounded-pill h-12"
                      role="progressbar"
                      aria-label="Basic example"
                      aria-valuenow={percentages[index]}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    >
                      <div
                        className="progress-bar bg-main-600 rounded-pill"
                        style={{ width: `${percentages[index]}%` }}
                      />
                    </div>
                    <span className="text-gray-900 flex-shrink-0">
                      {percentages[index]}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <span className="d-block border border-neutral-30 my-32 border-dashed" />

          {/* Detailed Category Ratings - Card Grid */}
          <div className="mt-32">
            <h6 className="mb-24 fw-semibold text-neutral-900">
              Detaylı Değerlendirmeler
            </h6>

            <div className="row">
              {ratingCategories.map((category) => (
                <div key={category.id} className="col-lg-6 mb-24">
                  <div className="border border-neutral-30 rounded-12 bg-white p-32 h-100">
                    <div className="d-flex align-items-center justify-content-between mb-20">
                      <div className="d-flex align-items-center gap-12">
                        <div
                          className={`w-48 h-48 ${category.bgColor} rounded-circle flex-center`}
                          style={{ minWidth: "48px", minHeight: "48px" }}
                        >
                          <i
                            className={`${category.icon} ${category.textColor} text-lg`}
                          ></i>
                        </div>
                        <div>
                          <h6 className="mb-4 fw-semibold">{category.title}</h6>
                          <p className="text-neutral-500 text-xs mb-0">
                            {category.description}
                          </p>
                        </div>
                      </div>
                      <div className="text-end">
                        <h4 className={`${category.textColor} fw-bold mb-4`}>
                          {category.rating.toFixed(1)}
                        </h4>
                        <div className="flex-center gap-2">
                          {renderStars(category.rating)}
                        </div>
                      </div>
                    </div>

                    <div className="progress bg-neutral-200 rounded-pill h-8 mb-0">
                      <div
                        className={`progress-bar ${category.progressColor} rounded-pill`}
                        style={{ width: `${(category.rating / 5) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
