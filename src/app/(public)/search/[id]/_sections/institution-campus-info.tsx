interface InstitutionCampusInfoProps {
  school: any;
  campus: any;
  brand: any;
}

export default function InstitutionCampusInfo({
  school,
  campus,
  brand,
}: InstitutionCampusInfoProps) {
  return (
    <div className="tutor-details__content">
      <div className="border border-neutral-30 rounded-12 bg-white p-8 mt-24">
        <div className="border border-neutral-30 rounded-12 bg-main-25 p-32 bg-main-25">
          {/* Kampüs Bilgileri */}
          <h4 className="mb-16">Kampüs Bilgileri</h4>
          <span className="d-block border border-neutral-30 my-24 border-dashed" />

          <ul className="tution-info-list bg-white rounded-8 mb-32">
            <li className="d-flex align-items-start px-32 py-16">
              <span className="w-50-percent fw-semibold text-neutral-700">
                Kampüs Adı
              </span>
              <span className="w-50-percent fw-normal text-neutral-500 text-md">
                <span className="text-main-600 fw-semibold">{campus.name}</span>
              </span>
            </li>

            <li className="d-flex align-items-start px-32 py-16">
              <span className="w-50-percent fw-semibold text-neutral-700">
                Açıklama
              </span>
              <span className="w-50-percent fw-normal text-neutral-500 text-md">
                {campus.description}
              </span>
            </li>

            <li className="d-flex align-items-start px-32 py-16">
              <span className="w-50-percent fw-semibold text-neutral-700">
                Adres
              </span>
              <span className="w-50-percent fw-normal text-neutral-500 text-md">
                {campus.addressLine1}
                {campus.addressLine2 && (
                  <>
                    <br />
                    {campus.addressLine2}
                  </>
                )}
                <br />
                {campus.district.name}, {campus.province.name}
                {campus.postalCode && (
                  <>
                    <br />
                    <span className="text-main-600 fw-medium">
                      Posta Kodu: {campus.postalCode}
                    </span>
                  </>
                )}
              </span>
            </li>

            <li className="d-flex align-items-start px-32 py-16">
              <span className="w-50-percent fw-semibold text-neutral-700">
                İletişim
              </span>
              <span className="w-50-percent fw-normal text-neutral-500 text-md">
                <div className="d-flex flex-column gap-8">
                  <div className="d-flex align-items-center gap-8">
                    <i className="ph-bold ph-phone text-main-600"></i>
                    <span>{campus.phone}</span>
                  </div>
                  <div className="d-flex align-items-center gap-8">
                    <i className="ph-bold ph-envelope text-main-600"></i>
                    <span>{campus.email}</span>
                  </div>
                  {campus.fax && (
                    <div className="d-flex align-items-center gap-8">
                      <i className="ph-bold ph-fax text-main-600"></i>
                      <span>{campus.fax}</span>
                    </div>
                  )}
                  {campus.websiteUrl && (
                    <div className="d-flex align-items-center gap-8">
                      <i className="ph-bold ph-globe text-main-600"></i>
                      <a
                        href={campus.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-main-600 hover-text-main-800"
                      >
                        Web Sitesi
                      </a>
                    </div>
                  )}
                </div>
              </span>
            </li>

            <li className="d-flex align-items-start px-32 py-16">
              <span className="w-50-percent fw-semibold text-neutral-700">
                Kampüs Değerlendirme
              </span>
              <span className="w-50-percent fw-normal text-neutral-500 text-md">
                <div className="d-flex align-items-center gap-8">
                  <span className="fw-semibold text-warning-600">
                    ⭐ {campus.ratingAverage}
                  </span>
                  <span>({campus.ratingCount} değerlendirme)</span>
                </div>
              </span>
            </li>
          </ul>

          {/* Okul Grubu Bilgileri */}
          <h4 className="mb-16">Okul Grubu Bilgileri</h4>
          <span className="d-block border border-neutral-30 my-24 border-dashed" />

          <ul className="tution-info-list bg-white rounded-8">
            <li className="d-flex align-items-start px-32 py-16">
              <span className="w-50-percent fw-semibold text-neutral-700">
                Okul Grubu
              </span>
              <span className="w-50-percent fw-normal text-neutral-500 text-md">
                <span className="text-main-600 fw-semibold">{brand.name}</span>
              </span>
            </li>

            <li className="d-flex align-items-start px-32 py-16">
              <span className="w-50-percent fw-semibold text-neutral-700">
                Kuruluş Yılı
              </span>
              <span className="w-50-percent fw-normal text-neutral-500 text-md">
                {brand.foundedYear}
              </span>
            </li>

            <li className="d-flex align-items-start px-32 py-16">
              <span className="w-50-percent fw-semibold text-neutral-700">
                Grup Açıklaması
              </span>
              <span className="w-50-percent fw-normal text-neutral-500 text-md">
                {brand.description}
              </span>
            </li>

            <li className="d-flex align-items-start px-32 py-16">
              <span className="w-50-percent fw-semibold text-neutral-700">
                Grup İletişim
              </span>
              <span className="w-50-percent fw-normal text-neutral-500 text-md">
                <div className="d-flex flex-column gap-8">
                  <div className="d-flex align-items-center gap-8">
                    <i className="ph-bold ph-phone text-main-600"></i>
                    <span>{brand.phone}</span>
                  </div>
                  <div className="d-flex align-items-center gap-8">
                    <i className="ph-bold ph-envelope text-main-600"></i>
                    <span>{brand.email}</span>
                  </div>
                  {brand.websiteUrl && (
                    <div className="d-flex align-items-center gap-8">
                      <i className="ph-bold ph-globe text-main-600"></i>
                      <a
                        href={brand.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-main-600 hover-text-main-800"
                      >
                        Ana Web Sitesi
                      </a>
                    </div>
                  )}
                </div>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
