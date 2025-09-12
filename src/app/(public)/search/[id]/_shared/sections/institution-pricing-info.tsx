interface InstitutionPricingInfoProps {
  school: any;
  formatCurrency: (amount: number) => string;
}

export default function InstitutionPricingInfo({
  school,
  formatCurrency,
}: InstitutionPricingInfoProps) {
  return (
    <div className="tutor-details__content">
      <div className="border border-neutral-30 rounded-12 bg-white p-8 mt-24">
        <div className="border border-neutral-30 rounded-12 bg-main-25 p-32">
          {/* Ana Ücret Bilgileri */}
          <h4 className="mb-16">Ücret Bilgileri</h4>

          {/* Temel Ücretler */}
          <h5 className="mb-16">Temel Ücret Yapısı</h5>
          <ul className="tution-info-list bg-white rounded-8 mb-32">
            <li className="d-flex align-items-start px-32 py-16">
              <span className="w-50-percent fw-semibold text-neutral-700">
                Kayıt Ücreti
              </span>
              <span className="w-50-percent fw-normal text-neutral-500 text-md">
                <span className="text-main-600 fw-semibold text-lg">
                  {formatCurrency(school.registrationFee)}
                </span>
              </span>
            </li>

            <li className="d-flex align-items-start px-32 py-16">
              <span className="w-50-percent fw-semibold text-neutral-700">
                Aylık Ücret
              </span>
              <span className="w-50-percent fw-normal text-neutral-500 text-md">
                <span className="text-success-600 fw-semibold text-lg">
                  {formatCurrency(school.monthlyFee)}
                </span>
              </span>
            </li>

            <li className="d-flex align-items-start px-32 py-16">
              <span className="w-50-percent fw-semibold text-neutral-700">
                Yıllık Ücret
              </span>
              <span className="w-50-percent fw-normal text-neutral-500 text-md">
                <span className="text-warning-600 fw-semibold text-lg">
                  {formatCurrency(school.annualFee)}
                </span>
              </span>
            </li>

            <li className="d-flex align-items-start px-32 py-16">
              <span className="w-50-percent fw-semibold text-neutral-700">
                10 Aylık Toplam
              </span>
              <span className="w-50-percent fw-normal text-neutral-500 text-md">
                <span className="text-primary-600 fw-semibold text-lg">
                  {formatCurrency(
                    school.registrationFee + school.monthlyFee * 10
                  )}
                </span>
              </span>
            </li>
          </ul>

          {/* Ödeme Seçenekleri */}
          <h5 className="mb-16">Ödeme Seçenekleri ve İndirimler</h5>
          <ul className="tution-info-list bg-white rounded-8 mb-32">
            <li className="d-flex align-items-start px-32 py-16">
              <span className="w-50-percent fw-semibold text-neutral-700">
                Aylık Ödeme
              </span>
              <span className="w-50-percent fw-normal text-neutral-500 text-md">
                <span className="text-neutral-600 fw-medium">
                  Her ayın 1&apos;i
                </span>
              </span>
            </li>

            <li className="d-flex align-items-start px-32 py-16">
              <span className="w-50-percent fw-semibold text-neutral-700">
                3 Aylık Ödeme
              </span>
              <span className="w-50-percent fw-normal text-neutral-500 text-md">
                <span className="text-success-600 fw-semibold">%5 İndirim</span>
              </span>
            </li>

            <li className="d-flex align-items-start px-32 py-16">
              <span className="w-50-percent fw-semibold text-neutral-700">
                6 Aylık Ödeme
              </span>
              <span className="w-50-percent fw-normal text-neutral-500 text-md">
                <span className="text-success-600 fw-semibold">
                  %10 İndirim
                </span>
              </span>
            </li>

            <li className="d-flex align-items-start px-32 py-16">
              <span className="w-50-percent fw-semibold text-neutral-700">
                Yıllık Ödeme
              </span>
              <span className="w-50-percent fw-normal text-neutral-500 text-md">
                <span className="text-success-600 fw-semibold">
                  %15 İndirim
                </span>
              </span>
            </li>
          </ul>

          {/* Ödeme Yöntemleri */}
          <h5 className="mb-16">Kabul Edilen Ödeme Yöntemleri</h5>
          <ul className="tution-info-list bg-white rounded-8 mb-32">
            <li className="d-flex align-items-start px-32 py-16">
              <span className="w-50-percent fw-semibold text-neutral-700">
                Nakit Ödeme
              </span>
              <span className="w-50-percent fw-normal text-neutral-500 text-md">
                <span className="text-success-600 fw-medium">✓ Mevcut</span>
              </span>
            </li>

            <li className="d-flex align-items-start px-32 py-16">
              <span className="w-50-percent fw-semibold text-neutral-700">
                Kredi Kartı
              </span>
              <span className="w-50-percent fw-normal text-neutral-500 text-md">
                <span className="text-success-600 fw-medium">✓ Taksitli</span>
              </span>
            </li>

            <li className="d-flex align-items-start px-32 py-16">
              <span className="w-50-percent fw-semibold text-neutral-700">
                Banka Havalesi/EFT
              </span>
              <span className="w-50-percent fw-normal text-neutral-500 text-md">
                <span className="text-success-600 fw-medium">✓ Mevcut</span>
              </span>
            </li>

            <li className="d-flex align-items-start px-32 py-16">
              <span className="w-50-percent fw-semibold text-neutral-700">
                Otomatik Ödeme
              </span>
              <span className="w-50-percent fw-normal text-neutral-500 text-md">
                <span className="text-info-600 fw-medium">✓ Talimat</span>
              </span>
            </li>
          </ul>

          {/* Önemli Notlar */}
          <h5 className="mb-16">Önemli Koşullar</h5>
          <ul className="tution-info-list bg-white rounded-8">
            <li className="d-flex align-items-start px-32 py-16">
              <span className="w-50-percent fw-semibold text-neutral-700">
                Kayıt Ücreti
              </span>
              <span className="w-50-percent fw-normal text-neutral-500 text-md">
                <span className="text-warning-600 fw-medium">İade edilmez</span>
              </span>
            </li>

            <li className="d-flex align-items-start px-32 py-16">
              <span className="w-50-percent fw-semibold text-neutral-700">
                Aylık Ücretler
              </span>
              <span className="w-50-percent fw-normal text-neutral-500 text-md">
                <span className="text-neutral-600 fw-medium">Peşin alınır</span>
              </span>
            </li>

            <li className="d-flex align-items-start px-32 py-16">
              <span className="w-50-percent fw-semibold text-neutral-700">
                Fiyat Geçerliliği
              </span>
              <span className="w-50-percent fw-normal text-neutral-500 text-md">
                <span className="text-neutral-600 fw-medium">
                  2024-2025 Eğitim Yılı
                </span>
              </span>
            </li>

            <li className="d-flex align-items-start px-32 py-16">
              <span className="w-50-percent fw-semibold text-neutral-700">
                Fiyat Değişikliği
              </span>
              <span className="w-50-percent fw-normal text-neutral-500 text-md">
                <span className="text-warning-600 fw-medium">
                  Hakkı saklıdır
                </span>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
