import { useInstitutionDetail } from "../contexts";

export default function InstitutionReviews() {
  const { school, renderStars } = useInstitutionDetail();

  // School yoksa hiçbir şey gösterme
  if (!school) {
    return null;
  }

  // Rating verisi yoksa gösterme
  if (!school.ratingAverage || school.ratingAverage === 0) {
    return (
      <div className="tutor-details__content">
        <div className="border border-neutral-30 rounded-12 bg-white p-8 mt-24">
          <div className="border border-neutral-30 rounded-12 bg-main-25 p-32">
            <h5 className="mb-0">Ortalama Değerlendirme</h5>
            <span className="d-block border border-neutral-30 my-32 border-dashed" />
            <div className="text-center py-32">
              <i className="ph-bold ph-star text-neutral-300 text-xxl mb-16 d-block"></i>
              <p className="text-neutral-500">
                Henüz değerlendirme bulunmamaktadır.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Rating breakdown hesaplama - Gerçek API'de bu veriler gelene kadar basit bir dağılım kullanıyoruz
  // TODO: Backend'den star_distribution verisi geldiğinde burası güncellenecek
  const calculateStarDistribution = (average: number, totalCount: number) => {
    // Ortalamaya göre basit bir dağılım hesaplayalım
    // Bu geçici bir çözüm - idealinde backend'den gelmeli
    const distribution = [0, 0, 0, 0, 0]; // 1,2,3,4,5 yıldız

    if (totalCount === 0) return distribution;

    // Ortalamaya göre mantıklı bir dağılım
    if (average >= 4.5) {
      distribution[4] = 70; // 5 yıldız
      distribution[3] = 20; // 4 yıldız
      distribution[2] = 7; // 3 yıldız
      distribution[1] = 2; // 2 yıldız
      distribution[0] = 1; // 1 yıldız
    } else if (average >= 4.0) {
      distribution[4] = 50;
      distribution[3] = 35;
      distribution[2] = 10;
      distribution[1] = 3;
      distribution[0] = 2;
    } else if (average >= 3.5) {
      distribution[4] = 30;
      distribution[3] = 40;
      distribution[2] = 20;
      distribution[1] = 7;
      distribution[0] = 3;
    } else if (average >= 3.0) {
      distribution[4] = 20;
      distribution[3] = 30;
      distribution[2] = 30;
      distribution[1] = 15;
      distribution[0] = 5;
    } else {
      distribution[4] = 10;
      distribution[3] = 20;
      distribution[2] = 30;
      distribution[1] = 25;
      distribution[0] = 15;
    }

    return distribution;
  };

  const starDistribution = calculateStarDistribution(
    school.ratingAverage || 0,
    school.ratingCount || 0
  );

  return (
    <div className="tutor-details__content">
      <div className="border border-neutral-30 rounded-12 bg-white p-8 mt-24">
        <div className="border border-neutral-30 rounded-12 bg-main-25 p-32">
          <h5 className="mb-0">Ortalama Değerlendirme</h5>
          <span className="d-block border border-neutral-30 my-32 border-dashed" />

          {/* Rating Overview */}
          <div className="d-flex flex-sm-row flex-column gap-36">
            <div className="rounded-16 px-40 py-24 flex-center flex-column flex-shrink-0 text-center bg-main-600 text-white">
              <h2 className="mb-8 text-white">
                {school.ratingAverage.toFixed(1)}
              </h2>
              <div className="flex-center gap-4">
                {renderStars(school.ratingAverage)}
              </div>
              <span className="mt-8 text-gray-500">
                {school.ratingCount.toLocaleString()} Değerlendirme
              </span>
            </div>

            {/* Rating Breakdown */}
            <div className="flex-grow-1">
              {[5, 4, 3, 2, 1].map((star, index) => {
                const percentage = starDistribution[5 - star - 1] || 0;
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
                      aria-label={`${star} yıldız değerlendirmeler`}
                      aria-valuenow={percentage}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    >
                      <div
                        className="progress-bar bg-main-600 rounded-pill"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-gray-900 flex-shrink-0">
                      {percentage}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Backend'den kategori bazlı rating'ler geldiğinde burası aktif edilecek */}
          {/* 
          <span className="d-block border border-neutral-30 my-32 border-dashed" />
          
          <div className="mt-32">
            <h6 className="mb-24 fw-semibold text-neutral-900">
              Detaylı Değerlendirmeler
            </h6>
            // Kategori bazlı rating kartları buraya gelecek
          </div>
          */}
        </div>
      </div>
    </div>
  );
}
