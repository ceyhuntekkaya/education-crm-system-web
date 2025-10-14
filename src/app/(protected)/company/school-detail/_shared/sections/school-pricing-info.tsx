import { PricingSummaryDto } from "@/types";
import { useSchoolDetail } from "../context/school-detail-context";
import { formatCurrency } from "@/utils";

export default function SchoolPricingInfo() {
  const { currentSchool } = useSchoolDetail();

  if (!currentSchool?.pricings || currentSchool.pricings.length === 0) {
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

  const pricings = currentSchool.pricings;

  // Her yaş grubu için ücret bilgilerini hazırla
  const pricingInfoItems = pricings.flatMap((pricing: PricingSummaryDto) => {
    // Temel Ücretler
    const basicFees = [
      {
        label: "Aylık Ücret",
        value: (
          <span className="text-success-600 fw-semibold">
            {pricing.formattedMonthlyFee ||
              formatCurrency(pricing.monthlyTuition || 0)}
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
            {pricing.formattedAnnualFee ||
              formatCurrency(pricing.annualTuition || 0)}
          </span>
        ),
        isShowing: (pricing.annualTuition || 0) > 0,
        category: "basic" as const,
        pricing: pricing,
      },
    ];

    // Ek Hizmetler
    const additionalServices = [
      {
        label: "Ulaşım Hizmeti",
        value: (
          <span className="text-info-600 fw-semibold d-flex align-items-center gap-4">
            <i className="ph ph-bus text-sm"></i>
            {pricing.hasTransportation ? "Mevcut" : "Mevcut Değil"}
          </span>
        ),
        isShowing: true,
        category: "additional" as const,
        pricing: pricing,
      },
      {
        label: "Kafeterya Hizmeti",
        value: (
          <span className="text-info-600 fw-semibold d-flex align-items-center gap-4">
            <i className="ph ph-fork-knife text-sm"></i>
            {pricing.hasCafeteria ? "Mevcut" : "Mevcut Değil"}
          </span>
        ),
        isShowing: true,
        category: "additional" as const,
        pricing: pricing,
      },
      {
        label: "Uzatılmış Gün",
        value: (
          <span className="text-info-600 fw-semibold d-flex align-items-center gap-4">
            <i className="ph ph-clock text-sm"></i>
            {pricing.hasExtendedDay ? "Mevcut" : "Mevcut Değil"}
          </span>
        ),
        isShowing: true,
        category: "additional" as const,
        pricing: pricing,
      },
      {
        label: "Finansal Yardım",
        value: (
          <span className="text-success-600 fw-semibold d-flex align-items-center gap-4">
            <i className="ph ph-hand-heart text-sm"></i>
            {pricing.hasFinancialAid ? "Mevcut" : "Mevcut Değil"}
          </span>
        ),
        isShowing: true,
        category: "additional" as const,
        pricing: pricing,
      },
    ];

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
        label: "Sınıf Seviyesi",
        value: (
          <span className="text-info-600 fw-semibold">
            {pricing.gradeLevel}
          </span>
        ),
        isShowing: !!pricing.gradeLevel,
        category: "summary" as const,
        pricing: pricing,
      },
      {
        label: "Pazar Konumu",
        value: (
          <span className="text-warning-600 fw-semibold">
            {pricing.marketPosition}
          </span>
        ),
        isShowing: !!pricing.marketPosition,
        category: "summary" as const,
        pricing: pricing,
      },
    ];

    return [...basicFees, ...additionalServices, ...summaryItems];
  });

  // Kategorilere göre filtreleme
  const basicItems = pricingInfoItems.filter(
    (item) => item.category === "basic" && item.isShowing
  );
  const additionalItems = pricingInfoItems.filter(
    (item) => item.category === "additional" && item.isShowing
  );
  const summaryItems = pricingInfoItems.filter(
    (item) => item.category === "summary" && item.isShowing
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
                {basicItems.map((item, index: number) => (
                  <li
                    key={index}
                    className="d-flex align-items-start px-32 py-16"
                  >
                    <span className="w-50-percent fw-semibold text-neutral-700">
                      {item.label}
                      {item.pricing && item.pricing.gradeLevel && (
                        <span className="d-block text-xs text-neutral-500 fw-normal mt-4">
                          {item.pricing.gradeLevel} -{" "}
                          {item.pricing.academicYear}
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
                {additionalItems.map((item, index: number) => (
                  <li
                    key={index}
                    className="d-flex align-items-start px-32 py-16"
                  >
                    <span className="w-50-percent fw-semibold text-neutral-700">
                      {item.label}
                      {item.pricing && item.pricing.gradeLevel && (
                        <span className="d-block text-xs text-neutral-500 fw-normal mt-4">
                          {item.pricing.gradeLevel} -{" "}
                          {item.pricing.academicYear}
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
                {summaryItems.map((item, index: number) => (
                  <li
                    key={index}
                    className="d-flex align-items-start px-32 py-16"
                  >
                    <span className="w-50-percent fw-semibold text-neutral-700">
                      {item.label}
                      {item.pricing && item.pricing.gradeLevel && (
                        <span className="d-block text-xs text-neutral-500 fw-normal mt-4">
                          {item.pricing.gradeLevel} -{" "}
                          {item.pricing.academicYear}
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
