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
        <div className="border border-neutral-30 rounded-12 bg-main-25 p-32 bg-main-25">
          <h4 className="mb-16">Ücret Bilgileri</h4>
          <span className="d-block border border-neutral-30 my-24 border-dashed" />

          {/* Pricing Cards */}
          <div className="row gy-4">
            <div className="col-md-4">
              <div className="bg-white p-24 rounded-12 text-center border">
                <i className="ph ph-currency-circle-dollar text-main-600 text-4xl mb-12"></i>
                <h5 className="text-main-600 mb-8">Kayıt Ücreti</h5>
                <p className="text-2xl fw-bold text-heading mb-0">
                  {formatCurrency(school.registrationFee)}
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="bg-white p-24 rounded-12 text-center border">
                <i className="ph ph-calendar text-success-600 text-4xl mb-12"></i>
                <h5 className="text-success-600 mb-8">Aylık Ücret</h5>
                <p className="text-2xl fw-bold text-heading mb-0">
                  {formatCurrency(school.monthlyFee)}
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="bg-white p-24 rounded-12 text-center border">
                <i className="ph ph-calendar-check text-warning-600 text-4xl mb-12"></i>
                <h5 className="text-warning-600 mb-8">Yıllık Ücret</h5>
                <p className="text-2xl fw-bold text-heading mb-0">
                  {formatCurrency(school.annualFee)}
                </p>
              </div>
            </div>
          </div>

          <span className="d-block border border-neutral-30 my-24 border-dashed" />

          {/* Pricing Details */}
          <div className="bg-white p-24 rounded-12">
            <h5 className="mb-16">Ücret Detayları</h5>
            <ul className="list-unstyled">
              <li className="d-flex justify-content-between py-2">
                <span>Kayıt Ücreti (Tek Seferlik):</span>
                <strong>{formatCurrency(school.registrationFee)}</strong>
              </li>
              <li className="d-flex justify-content-between py-2">
                <span>Aylık Eğitim Ücreti:</span>
                <strong>{formatCurrency(school.monthlyFee)}</strong>
              </li>
              <li className="d-flex justify-content-between py-2">
                <span>Yıllık Toplam Ücret:</span>
                <strong>{formatCurrency(school.annualFee)}</strong>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
