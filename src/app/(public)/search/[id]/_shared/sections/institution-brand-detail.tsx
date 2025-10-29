import { useInstitutionDetail } from "../contexts";

export default function InstitutionBrandDetail() {
  const { brand } = useInstitutionDetail();

  // Brand yoksa hiçbir şey gösterme
  if (!brand) {
    return null;
  }

  const brandInfoItems = [
    {
      label: "Kurum Adı",
      value: <span className="text-main-600 fw-semibold">{brand.name}</span>,
      isShowing: brand.name && brand.name.trim() !== "",
    },
    {
      label: "Kuruluş Yılı",
      value: brand.foundedYear,
      isShowing: brand.foundedYear && brand.foundedYear > 0,
    },
    {
      label: "Kurum Açıklaması",
      value: brand.description,
      isShowing: brand.description && brand.description.trim() !== "",
    },
    {
      label: "Kurum İletişim",
      value: (
        <div className="d-flex flex-column gap-8">
          {brand.phone && (
            <div className="d-flex align-items-center gap-8">
              <i className="ph-bold ph-phone text-main-600"></i>
              <span>{brand.phone}</span>
            </div>
          )}
          {brand.email && (
            <div className="d-flex align-items-center gap-8">
              <i className="ph-bold ph-envelope text-main-600"></i>
              <a href={`mailto:${brand.email}`} className="text-main-600">
                {brand.email}
              </a>
            </div>
          )}
        </div>
      ),
      isShowing: brand.phone || brand.email,
    },
    {
      label: "Ana Web Sitesi",
      value: brand.websiteUrl ? (
        <a
          href={brand.websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-main-600 d-flex align-items-center gap-8 hover-text-main-800"
        >
          <i className="ph-bold ph-globe"></i>
          {brand.websiteUrl}
        </a>
      ) : null,
      isShowing: brand.websiteUrl && brand.websiteUrl.trim() !== "",
    },
  ];

  return (
    <div className="tutor-details__content">
      <div className="border border-neutral-30 rounded-12 bg-white p-8 mt-24">
        <div className="border border-neutral-30 rounded-12 bg-main-25 p-32">
          <h4 className="mb-16">Kurum Bilgileri</h4>
          <span className="d-block border border-neutral-30 my-24 border-dashed" />

          <ul className="tution-info-list bg-white rounded-8">
            {brandInfoItems
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
