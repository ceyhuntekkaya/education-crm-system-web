import { useBrandDetail } from "../context/brand-detail-context";
import { CustomCard, CustomImage } from "@/components/ui";
import { renderStars } from "@/utils";

export default function BrandGeneralInfo() {
  const { currentBrand } = useBrandDetail();

  if (!currentBrand) {
    return (
      <CustomCard title="Marka Bilgileri">
        <p className="text-neutral-500">Marka bilgileri henüz mevcut değil.</p>
      </CustomCard>
    );
  }

  const brand = currentBrand;

  const brandInfoItems = [
    {
      label: "Marka Adı",
      value: <span className="text-main-600 fw-semibold">{brand.name}</span>,
      isShowing: brand.name && brand.name.trim() !== "",
    },
    {
      label: "Açıklama",
      value: (
        <span className="text-neutral-700">
          {brand.description || "Açıklama mevcut değil"}
        </span>
      ),
      isShowing: true,
    },
    {
      label: "Website",
      value: brand.websiteUrl ? (
        <a
          href={brand.websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-main-600 text-decoration-none"
        >
          {brand.websiteUrl}
        </a>
      ) : (
        <span className="text-neutral-500">Website mevcut değil</span>
      ),
      isShowing: true,
    },
    {
      label: "E-posta",
      value: brand.email ? (
        <a
          href={`mailto:${brand.email}`}
          className="text-main-600 text-decoration-none"
        >
          {brand.email}
        </a>
      ) : (
        <span className="text-neutral-500">E-posta mevcut değil</span>
      ),
      isShowing: true,
    },
    {
      label: "Telefon",
      value: brand.phone ? (
        <a
          href={`tel:${brand.phone}`}
          className="text-main-600 text-decoration-none"
        >
          {brand.phone}
        </a>
      ) : (
        <span className="text-neutral-500">Telefon mevcut değil</span>
      ),
      isShowing: true,
    },
    {
      label: "Kuruluş Yılı",
      value: (
        <span className="text-neutral-700">
          {brand.foundedYear || "Belirtilmemiş"}
        </span>
      ),
      isShowing: brand.foundedYear !== undefined,
    },
    {
      label: "Ortalama Puan",
      value: (
        <div className="d-flex align-items-center gap-8">
          {brand.ratingAverage ? (
            <>
              {renderStars(brand.ratingAverage)}
              <span className="fw-semibold text-warning-600">
                {brand.ratingAverage.toFixed(1)}
              </span>
              <span className="text-neutral-500">
                ({brand.ratingCount || 0} değerlendirme)
              </span>
            </>
          ) : (
            <span className="text-neutral-500">Henüz değerlendirme yok</span>
          )}
        </div>
      ),
      isShowing: true,
    },
    {
      label: "Görüntülenme",
      value: (
        <span className="text-neutral-700">
          {brand.viewCount?.toLocaleString() || 0} görüntülenme
        </span>
      ),
      isShowing: brand.viewCount !== undefined,
    },
  ];

  return (
    <CustomCard title="Genel Marka Bilgileri">
      <div className="d-flex align-items-start gap-24">
        {/* Logo */}
        <div className="flex-shrink-0">
          {brand.logoUrl ? (
            <CustomImage
              src={brand.logoUrl}
              alt={brand.name || "Marka logosu"}
              width={80}
              height={80}
              className="rounded-8 border border-neutral-30"
              style={{ objectFit: "cover" }}
            />
          ) : (
            <div
              className="d-flex align-items-center justify-content-center bg-neutral-100 rounded-8 border border-neutral-30"
              style={{ width: "80px", height: "80px" }}
            >
              <i
                className="ph ph-buildings text-neutral-500"
                style={{ fontSize: "32px" }}
              />
            </div>
          )}
        </div>

        {/* Brand Info */}
        <div className="flex-grow-1">
          <div className="row g-3">
            {brandInfoItems
              .filter((item) => item.isShowing)
              .map((item, index) => (
                <div key={index} className="col-12">
                  <div className="d-flex justify-content-between align-items-start flex-wrap">
                    <span className="text-neutral-600 fw-medium mb-1 text-sm">
                      {item.label}:
                    </span>
                    <div className="text-end">{item.value}</div>
                  </div>
                  {index <
                    brandInfoItems.filter((item) => item.isShowing).length -
                      1 && <hr className="my-12" />}
                </div>
              ))}
          </div>
        </div>
      </div>
    </CustomCard>
  );
}
