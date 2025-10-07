import { SchoolPricingDto, CustomFeeDto } from "@/types";
import { useInstitutionDetail } from "../contexts";

export default function InstitutionPricingInfo() {
  const { pricings, formatCurrency } = useInstitutionDetail();

  if (!pricings || pricings.length === 0) {
    return (
      <div className="tutor-details__content">
        <div className="border border-neutral-30 rounded-12 bg-white p-8 mt-24">
          <div className="border border-neutral-30 rounded-12 bg-main-25 p-32">
            <h4 className="mb-16">Ücret Bilgileri</h4>
            <p className="text-neutral-500">
              Ücret bilgileri henüz mevcut değil.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Her yaş grubu için ücret bilgilerini hazırla
  const pricingInfoItems = pricings.flatMap((pricing: SchoolPricingDto) => {
    // Temel Ücretler
    const basicFees = [
      {
        label: "Kayıt Ücreti",
        value: (
          <span className="text-main-600 fw-semibold">
            {formatCurrency(pricing.registrationFee || 0)}
          </span>
        ),
        isShowing: (pricing.registrationFee || 0) > 0,
        category: "basic" as const,
        pricing: pricing,
      },
      {
        label: "Başvuru Ücreti",
        value: (
          <span className="text-info-600 fw-semibold">
            {formatCurrency(pricing.applicationFee || 0)}
          </span>
        ),
        isShowing: (pricing.applicationFee || 0) > 0,
        category: "basic" as const,
        pricing: pricing,
      },
      {
        label: "Aylık Ücret",
        value: (
          <span className="text-success-600 fw-semibold">
            {formatCurrency(pricing.monthlyTuition || 0)}
          </span>
        ),
        isShowing: (pricing.monthlyTuition || 0) > 0,
        category: "basic" as const,
        pricing: pricing,
      },
      {
        label: "Yıllık Ücret",
        value: (
          <span className="text-warning-600 fw-semibold">
            {formatCurrency(pricing.annualTuition || 0)}
          </span>
        ),
        isShowing: (pricing.annualTuition || 0) > 0,
        category: "basic" as const,
        pricing: pricing,
      },
      {
        label: "Yarıyıl Ücreti",
        value: (
          <span className="text-primary-600 fw-semibold">
            {formatCurrency(pricing.semesterTuition || 0)}
          </span>
        ),
        isShowing: (pricing.semesterTuition || 0) > 0,
        category: "basic" as const,
        pricing: pricing,
      },
    ];

    // Ek Ücretler
    const additionalFees = [
      {
        label: "Kitap Ücreti",
        value: (
          <span className="text-info-600 fw-semibold">
            {formatCurrency(pricing.bookFee || 0)}
          </span>
        ),
        isShowing: (pricing.bookFee || 0) > 0,
        category: "additional" as const,
        pricing: pricing,
      },
      {
        label: "Üniforma Ücreti",
        value: (
          <span className="text-info-600 fw-semibold">
            {formatCurrency(pricing.uniformFee || 0)}
          </span>
        ),
        isShowing: (pricing.uniformFee || 0) > 0,
        category: "additional" as const,
        pricing: pricing,
      },
      {
        label: "Aktivite Ücreti",
        value: (
          <span className="text-info-600 fw-semibold">
            {formatCurrency(pricing.activityFee || 0)}
          </span>
        ),
        isShowing: (pricing.activityFee || 0) > 0,
        category: "additional" as const,
        pricing: pricing,
      },
      {
        label: "Teknoloji Ücreti",
        value: (
          <span className="text-info-600 fw-semibold">
            {formatCurrency(pricing.technologyFee || 0)}
          </span>
        ),
        isShowing: (pricing.technologyFee || 0) > 0,
        category: "additional" as const,
        pricing: pricing,
      },
      {
        label: "Laboratuvar Ücreti",
        value: (
          <span className="text-info-600 fw-semibold">
            {formatCurrency(pricing.laboratoryFee || 0)}
          </span>
        ),
        isShowing: (pricing.laboratoryFee || 0) > 0,
        category: "additional" as const,
        pricing: pricing,
      },
      {
        label: "Ulaşım Ücreti",
        value: (
          <span className="text-info-600 fw-semibold">
            {formatCurrency(pricing.transportationFee || 0)}
          </span>
        ),
        isShowing: (pricing.transportationFee || 0) > 0,
        category: "additional" as const,
        pricing: pricing,
      },
      {
        label: "Kafeterya Ücreti",
        value: (
          <span className="text-info-600 fw-semibold">
            {formatCurrency(pricing.cafeteriaFee || 0)}
          </span>
        ),
        isShowing: (pricing.cafeteriaFee || 0) > 0,
        category: "additional" as const,
        pricing: pricing,
      },
      {
        label: "Uzatılmış Gün Ücreti",
        value: (
          <span className="text-info-600 fw-semibold">
            {formatCurrency(pricing.extendedDayFee || 0)}
          </span>
        ),
        isShowing: (pricing.extendedDayFee || 0) > 0,
        category: "additional" as const,
        pricing: pricing,
      },
    ];

    // Özel Ücretler
    const customFees =
      pricing.customFees?.map((customFee: CustomFeeDto) => ({
        label: customFee.feeName || "",
        value: (
          <div className="d-flex flex-column gap-4">
            <span className="text-warning-600 fw-semibold">
              {formatCurrency(customFee.feeAmount || 0)}
            </span>
            <span className="text-xs text-neutral-500">
              {customFee.feeDescription}
            </span>
          </div>
        ),
        isShowing: true,
        category: "custom" as const,
        pricing: pricing,
      })) || [];

    // Toplam ve Ödeme Bilgileri
    const summaryItems = [
      {
        label: "Yıllık Toplam Maliyet",
        value: (
          <span className="bg-danger-50 text-danger-600 px-12 py-6 rounded-8 fw-bold d-inline-flex align-items-center gap-4">
            <i className="ph-bold ph-wallet text-sm"></i>
            {formatCurrency(pricing.totalAnnualCost || 0)}
          </span>
        ),
        isShowing: (pricing.totalAnnualCost || 0) > 0,
        category: "summary" as const,
        pricing: pricing,
      },
      {
        label: "Ödeme Sıklığı",
        value: (
          <span className="text-primary-600 fw-semibold">
            {pricing.paymentFrequency === "MONTHLY"
              ? "Aylık"
              : pricing.paymentFrequency}
          </span>
        ),
        isShowing: !!pricing.paymentFrequency,
        category: "summary" as const,
        pricing: pricing,
      },
      {
        label: "Taksit Sayısı",
        value: (
          <span className="text-primary-600 fw-semibold">
            {pricing.installmentCount || 0} Taksit
          </span>
        ),
        isShowing: (pricing.installmentCount || 0) > 0,
        category: "summary" as const,
        pricing: pricing,
      },
      {
        label: "Peşin Ödeme",
        value: (
          <span className="text-primary-600 fw-semibold">
            {formatCurrency(pricing.downPaymentAmount || 0)} (%
            {pricing.downPaymentPercentage || 0})
          </span>
        ),
        isShowing: (pricing.downPaymentAmount || 0) > 0,
        category: "summary" as const,
        pricing: pricing,
      },
      {
        label: "Finansal Yardım",
        value: (
          <div className="d-flex flex-column gap-4">
            {pricing.needBasedAidAvailable && (
              <span className="text-success-600 fw-medium">
                ✓ İhtiyaç Bazlı
              </span>
            )}
            {pricing.meritBasedAidAvailable && (
              <span className="text-success-600 fw-medium">✓ Başarı Bazlı</span>
            )}
          </div>
        ),
        isShowing:
          pricing.needBasedAidAvailable || pricing.meritBasedAidAvailable,
        category: "summary" as const,
        pricing: pricing,
      },
    ];

    return [...basicFees, ...additionalFees, ...customFees, ...summaryItems];
  });

  // PricingInfoItem interface tanımı
  interface PricingInfoItem {
    label: string;
    value: JSX.Element;
    isShowing: boolean;
    category: "basic" | "additional" | "custom" | "summary";
    pricing: SchoolPricingDto;
  }

  // Kategorilere göre filtreleme
  const basicItems = pricingInfoItems.filter(
    (item: PricingInfoItem) => item.category === "basic" && item.isShowing
  );
  const additionalItems = pricingInfoItems.filter(
    (item: PricingInfoItem) => item.category === "additional" && item.isShowing
  );
  const customItems = pricingInfoItems.filter(
    (item: PricingInfoItem) => item.category === "custom" && item.isShowing
  );
  const summaryItems = pricingInfoItems.filter(
    (item: PricingInfoItem) => item.category === "summary" && item.isShowing
  );

  return (
    <div className="tutor-details__content">
      <div className="border border-neutral-30 rounded-12 bg-white p-8 mt-24">
        <div className="border border-neutral-30 rounded-12 bg-main-25 p-32">
          {/* Temel Ücretler */}
          {basicItems.length > 0 && (
            <>
              <h4 className="mb-16 text-main-600">
                <i className="ph-bold ph-currency-circle-dollar me-8"></i>
                Temel Ücretler
              </h4>
              <span className="d-block border border-neutral-30 my-24 border-dashed" />

              <ul className="tution-info-list bg-white rounded-8 mb-32">
                {basicItems.map((item: PricingInfoItem, index: number) => (
                  <li
                    key={index}
                    className="d-flex align-items-start px-32 py-16"
                  >
                    <span className="w-50-percent fw-semibold text-neutral-700">
                      {item.label}
                      {item.pricing && (
                        <span className="d-block text-xs text-neutral-500 fw-normal mt-4">
                          {item.pricing.classLevel} ({item.pricing.ageRange})
                        </span>
                      )}
                    </span>
                    <span className="w-50-percent fw-normal text-neutral-500 text-md">
                      {item.value}
                    </span>
                  </li>
                ))}
              </ul>
            </>
          )}

          {/* Ek Ücretler */}
          {additionalItems.length > 0 && (
            <>
              <h4 className="mb-16 text-success-600">
                <i className="ph-bold ph-plus-circle me-8"></i>
                Ek Ücretler
              </h4>
              <span className="d-block border border-neutral-30 my-24 border-dashed" />

              <ul className="tution-info-list bg-white rounded-8 mb-32">
                {additionalItems.map((item: PricingInfoItem, index: number) => (
                  <li
                    key={index}
                    className="d-flex align-items-start px-32 py-16"
                  >
                    <span className="w-50-percent fw-semibold text-neutral-700">
                      {item.label}
                      {item.pricing && (
                        <span className="d-block text-xs text-neutral-500 fw-normal mt-4">
                          {item.pricing.classLevel} ({item.pricing.ageRange})
                        </span>
                      )}
                    </span>
                    <span className="w-50-percent fw-normal text-neutral-500 text-md">
                      {item.value}
                    </span>
                  </li>
                ))}
              </ul>
            </>
          )}

          {/* Özel Ücretler */}
          {customItems.length > 0 && (
            <>
              <h4 className="mb-16 text-warning-600">
                <i className="ph-bold ph-star me-8"></i>
                Özel Ücretler
              </h4>
              <span className="d-block border border-neutral-30 my-24 border-dashed" />

              <ul className="tution-info-list bg-white rounded-8 mb-32">
                {customItems.map((item: PricingInfoItem, index: number) => (
                  <li
                    key={index}
                    className="d-flex align-items-start px-32 py-16"
                  >
                    <span className="w-50-percent fw-semibold text-neutral-700">
                      {item.label}
                      {item.pricing && (
                        <span className="d-block text-xs text-neutral-500 fw-normal mt-4">
                          {item.pricing.classLevel} ({item.pricing.ageRange})
                        </span>
                      )}
                    </span>
                    <span className="w-50-percent fw-normal text-neutral-500 text-md">
                      {item.value}
                    </span>
                  </li>
                ))}
              </ul>
            </>
          )}

          {/* Toplam ve Ödeme Bilgileri */}
          {summaryItems.length > 0 && (
            <>
              <h4 className="mb-16 text-primary-600">
                <i className="ph-bold ph-calculator me-8"></i>
                Ödeme ve Maliyet Özeti
              </h4>
              <span className="d-block border border-neutral-30 my-24 border-dashed" />

              <ul className="tution-info-list bg-white rounded-8">
                {summaryItems.map((item: PricingInfoItem, index: number) => (
                  <li
                    key={index}
                    className="d-flex align-items-start px-32 py-16"
                  >
                    <span className="w-50-percent fw-semibold text-neutral-700">
                      {item.label}
                      {item.pricing && (
                        <span className="d-block text-xs text-neutral-500 fw-normal mt-4">
                          {item.pricing.classLevel} ({item.pricing.ageRange})
                        </span>
                      )}
                    </span>
                    <span className="w-50-percent fw-normal text-neutral-500 text-md">
                      {item.value}
                    </span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
