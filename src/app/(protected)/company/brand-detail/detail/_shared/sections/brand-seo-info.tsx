import { useBrandDetail } from "../context/brand-detail-context";
import { CustomCard } from "@/components/ui";

export default function BrandSeoInfo() {
  const { currentBrand } = useBrandDetail();

  if (!currentBrand) {
    return null;
  }

  const brand = currentBrand;

  const seoItems = [
    {
      label: "Slug",
      value: brand.slug,
      description: "URL dostu benzersiz tanımlayıcı",
      icon: "ph-link",
    },
    {
      label: "Meta Başlık",
      value: brand.metaTitle,
      description: "Arama motorları için sayfa başlığı",
      icon: "ph-text-aa",
    },
    {
      label: "Meta Açıklama",
      value: brand.metaDescription,
      description: "Arama sonuçlarında görünecek açıklama",
      icon: "ph-article",
    },
    {
      label: "Meta Anahtar Kelimeler",
      value: brand.metaKeywords,
      description: "SEO anahtar kelimeleri",
      icon: "ph-key",
    },
  ];

  const availableSeoItems = seoItems.filter((item) => item.value);

  if (availableSeoItems.length === 0) {
    return (
      <CustomCard title="SEO Bilgileri">
        <div className="text-center py-24">
          <i
            className="ph ph-magnifying-glass text-neutral-400"
            style={{ fontSize: "48px" }}
          />
          <p className="text-neutral-500 mb-0 mt-12">
            SEO bilgileri henüz tanımlanmamış
          </p>
        </div>
      </CustomCard>
    );
  }

  return (
    <CustomCard title="SEO Bilgileri">
      <div className="d-flex flex-column gap-16">
        {availableSeoItems.map((item, index) => (
          <div
            key={index}
            className="border-bottom border-neutral-30 pb-16 last:border-bottom-0 last:pb-0"
          >
            <div className="d-flex align-items-start gap-12 mb-8">
              <div
                className="d-flex align-items-center justify-content-center rounded-circle bg-main-50"
                style={{ width: "32px", height: "32px", minWidth: "32px" }}
              >
                <i
                  className={item.icon}
                  style={{ fontSize: "16px", color: "#6366f1" }}
                />
              </div>
              <div className="flex-grow-1">
                <h6 className="mb-4 text-neutral-800">{item.label}</h6>
                <p className="text-sm text-neutral-600 mb-8">
                  {item.description}
                </p>
                <div className="bg-neutral-25 rounded-8 p-12">
                  {item.label === "Meta Açıklama" ? (
                    <p className="text-sm text-neutral-800 mb-0 line-height-relaxed">
                      {item.value}
                    </p>
                  ) : item.label === "Meta Anahtar Kelimeler" ? (
                    <div className="d-flex flex-wrap gap-8">
                      {item.value?.split(",").map((keyword, keyIndex) => (
                        <span
                          key={keyIndex}
                          className="badge bg-main-100 text-main-700 px-8 py-4 text-xs fw-medium"
                        >
                          {keyword.trim()}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <code className="text-sm text-neutral-800 bg-transparent p-0">
                      {item.value}
                    </code>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Görüntülenme İstatistiği */}
        {brand.viewCount !== undefined && (
          <div className="border-top border-neutral-30 pt-16">
            <div className="d-flex align-items-center gap-12">
              <div
                className="d-flex align-items-center justify-content-center rounded-circle bg-success-50"
                style={{ width: "32px", height: "32px", minWidth: "32px" }}
              >
                <i
                  className="ph ph-eye"
                  style={{ fontSize: "16px", color: "#10b981" }}
                />
              </div>
              <div>
                <h6 className="mb-4 text-neutral-800">
                  Görüntülenme İstatistiği
                </h6>
                <p className="text-sm text-neutral-600 mb-4">
                  Toplam sayfa görüntülenme sayısı
                </p>
                <p className="text-lg fw-semibold text-success-600 mb-0">
                  {brand.viewCount.toLocaleString()} görüntülenme
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </CustomCard>
  );
}
