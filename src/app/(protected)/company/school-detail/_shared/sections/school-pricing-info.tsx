import { PricingSummaryDto } from "@/types";
import { useSchoolDetail } from "../context/school-detail-context";
import { formatCurrency } from "@/utils";
import { CustomCard } from "@/components/ui";
import { schoolDetailMockData } from "@/app/(public)/search/[id]/_shared";

export default function SchoolPricingInfo() {
  const { currentSchool } = useSchoolDetail();

  if (!currentSchool?.pricings || currentSchool.pricings.length === 0) {
    return (
      <CustomCard title="Ücret Bilgileri">
        <p className="text-neutral-500">Ücret bilgileri henüz mevcut değil.</p>
      </CustomCard>
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

  // Pricing sections array oluştur
  const pricingSections = [
    {
      title: "Temel Ücretler",
      titleColor: "text-main-600",
      titleIcon: "ph-bold ph-currency-circle-dollar",
      items: basicItems.map((item) => ({
        label: item.label,
        sublabel:
          item.pricing?.gradeLevel && item.pricing?.academicYear
            ? `${item.pricing.gradeLevel} - ${item.pricing.academicYear}`
            : undefined,
        value: item.value,
        isShowing: item.isShowing,
      })),
    },
    {
      title: "Ek Ücretler",
      titleColor: "text-success-600",
      titleIcon: "ph-bold ph-plus-circle",
      items: additionalItems.map((item) => ({
        label: item.label,
        sublabel:
          item.pricing?.gradeLevel && item.pricing?.academicYear
            ? `${item.pricing.gradeLevel} - ${item.pricing.academicYear}`
            : undefined,
        value: item.value,
        isShowing: item.isShowing,
      })),
    },
    {
      title: "Ödeme ve Maliyet Özeti",
      titleColor: "text-primary-600",
      titleIcon: "ph-bold ph-calculator",
      items: summaryItems.map((item) => ({
        label: item.label,
        sublabel:
          item.pricing?.gradeLevel && item.pricing?.academicYear
            ? `${item.pricing.gradeLevel} - ${item.pricing.academicYear}`
            : undefined,
        value: item.value,
        isShowing: item.isShowing,
      })),
    },
  ];

  return <CustomCard title="Ücret Bilgileri" multiItems={pricingSections} />;
}
