"use client";

import React, { useMemo } from "react";
import { CustomCard } from "@/components/ui";
import { useInstitutionDetail } from "../contexts";
import {
  getFeeTypeIcon,
  getFrequencyDisplayName,
  getStatusBadgeColor,
  getStatusDisplayName,
} from "../utils";

/**
 * Kurum özel ücret bilgilerini gösteren bileşen
 */
export const InstitutionCustomFees: React.FC = () => {
  const { school, loading } = useInstitutionDetail();

  // CustomFees'leri school'dan al
  const allCustomFees = useMemo(() => {
    if (!school?.customFees || school.customFees.length === 0) return [];

    // displayOrder'a göre sırala
    return [...school.customFees].sort(
      (a, b) => (a.displayOrder || 0) - (b.displayOrder || 0)
    );
  }, [school?.customFees]);

  // multiItems için section'ları oluştur
  const customFeeSections = useMemo(() => {
    if (!allCustomFees || allCustomFees.length === 0) return [];

    return allCustomFees.map((fee) => {
      const items = [
        {
          label: "Açıklama",
          value: fee.feeDescription || "Belirtilmemiş",
          isShowing: !!fee.feeDescription,
        },
        {
          label: "Ücret Tutarı",
          value: (
            <span className="text-success-600 fw-bold fs-5">
              {fee.formattedFeeAmount || `${fee.feeAmount?.toFixed(2)} ₺`}
            </span>
          ),
          isShowing: true,
        },
        {
          label: "Ödeme Sıklığı",
          value: (
            <span className="d-flex align-items-center gap-4">
              <i className="ph ph-calendar text-primary-600"></i>
              {getFrequencyDisplayName(fee.feeFrequency)}
            </span>
          ),
          isShowing: !!fee.feeFrequency,
        },
        {
          label: "Zorunluluk",
          value: (
            <span
              className={`badge ${
                fee.isMandatory
                  ? "bg-danger-100 text-danger-600"
                  : "bg-success-100 text-success-600"
              } px-12 py-4 radius-4 fw-medium`}
            >
              {fee.isMandatory ? "Zorunlu" : "Opsiyonel"}
            </span>
          ),
          isShowing: true,
        },
        {
          label: "İade Edilebilir",
          value: (
            <span
              className={`badge ${
                fee.isRefundable
                  ? "bg-success-100 text-success-600"
                  : "bg-neutral-100 text-neutral-600"
              } px-12 py-4 radius-4 fw-medium`}
            >
              {fee.isRefundable ? "Evet" : "Hayır"}
            </span>
          ),
          isShowing: fee.isRefundable !== undefined,
        },
        {
          label: "Geçerlilik",
          value: fee.applicabilityDescription || "Tüm öğrenciler",
          isShowing: !!fee.applicabilityDescription,
        },
        {
          label: "Uygulandığı Sınıflar",
          value: fee.appliesToGrades || "Tüm sınıflar",
          isShowing: !!fee.appliesToGrades,
        },
        {
          label: "Yaş Aralığı",
          value:
            fee.minimumAge && fee.maximumAge
              ? `${fee.minimumAge}-${fee.maximumAge} yaş`
              : fee.minimumAge
              ? `${fee.minimumAge}+ yaş`
              : "Belirtilmemiş",
          isShowing: !!(fee.minimumAge || fee.maximumAge),
        },
        {
          label: "Geçerlilik Tarihleri",
          value: `${fee.validFrom || "?"} - ${fee.validUntil || "?"}`,
          isShowing: !!(fee.validFrom || fee.validUntil),
        },
        {
          label: "Durum",
          value: (
            <span
              className={`badge bg-${getStatusBadgeColor(
                fee.status
              )}-100 text-${getStatusBadgeColor(
                fee.status
              )}-600 px-12 py-4 radius-4 fw-medium`}
            >
              {getStatusDisplayName(fee.status)}
            </span>
          ),
          isShowing: !!fee.status,
        },
        {
          label: "Taksit İmkanı",
          value: fee.installmentAllowed
            ? `Evet (Max: ${fee.maxInstallments} taksit)`
            : "Hayır",
          isShowing: fee.installmentAllowed !== undefined,
        },
        {
          label: "Gecikme Cezası",
          value: fee.lateFeePercentage
            ? `%${fee.lateFeePercentage}`
            : "Belirtilmemiş",
          isShowing: !!fee.lateFeePercentage,
        },
        {
          label: "İndirim Uygunluğu",
          value: fee.discountEligible ? "Uygun" : "Uygun Değil",
          isShowing: fee.discountEligible !== undefined,
        },
        {
          label: "Burs Uygulanabilir",
          value: fee.scholarshipApplicable ? "Evet" : "Hayır",
          isShowing: fee.scholarshipApplicable !== undefined,
        },
        {
          label: "Dokümantasyon Gerekli",
          value: fee.documentationRequired
            ? fee.requiredDocuments || "Evet"
            : "Hayır",
          isShowing: fee.documentationRequired !== undefined,
        },
        {
          label: "Ücret Politikası",
          value: (
            <div className="text-neutral-600 text-sm">{fee.feePolicy}</div>
          ),
          isShowing: !!fee.feePolicy,
        },
        {
          label: "Ödeme İstatistikleri",
          value: (
            <div className="d-flex flex-column gap-8">
              <div className="d-flex justify-content-between">
                <span className="text-neutral-600">Toplam Tahsilat:</span>
                <span className="fw-semibold text-success-600">
                  {fee.totalCollected?.toLocaleString("tr-TR")} ₺
                </span>
              </div>
              <div className="d-flex justify-content-between">
                <span className="text-neutral-600">Ücretlendirilen:</span>
                <span className="fw-semibold">
                  {fee.studentsCharged} öğrenci
                </span>
              </div>
              <div className="d-flex justify-content-between">
                <span className="text-neutral-600">Ödeme Yapan:</span>
                <span className="fw-semibold text-primary-600">
                  {fee.studentsPaid} öğrenci
                </span>
              </div>
              <div className="d-flex justify-content-between">
                <span className="text-neutral-600">Tahsilat Oranı:</span>
                <span className="fw-semibold text-info-600">
                  %{((fee.collectionRate || 0) * 100).toFixed(1)}
                </span>
              </div>
              <div className="d-flex justify-content-between">
                <span className="text-neutral-600">Ort. Gecikme:</span>
                <span className="fw-semibold">
                  {fee.averagePaymentDelayDays?.toFixed(1)} gün
                </span>
              </div>
            </div>
          ),
          isShowing: !!(
            fee.totalCollected ||
            fee.studentsCharged ||
            fee.studentsPaid ||
            fee.collectionRate
          ),
        },
        {
          label: "Oluşturan",
          value: fee.createdByUserName || "Belirtilmemiş",
          isShowing: !!fee.createdByUserName,
        },
        {
          label: "Oluşturma Tarihi",
          value: fee.createdAt
            ? new Date(fee.createdAt).toLocaleDateString("tr-TR")
            : "Belirtilmemiş",
          isShowing: !!fee.createdAt,
        },
      ];

      return {
        title: fee.feeName || "Özel Ücret",
        titleColor: fee.isMandatory ? "text-danger-600" : "text-info-600",
        titleIcon: getFeeTypeIcon(fee.feeType),
        items: items.filter((item) => item.isShowing),
      };
    });
  }, [allCustomFees]);

  return (
    <div className="tutor-details__content mt-24">
      <CustomCard
        title="Özel Ücretler"
        subtitle={`${
          school?.name || "Kurum"
        } bünyesinde uygulanan özel ücret bilgilerini detaylı olarak görüntüleyin`}
        isLoading={loading}
        loadingMessage="Özel ücret bilgileri yükleniyor..."
        isEmpty={!allCustomFees || allCustomFees.length === 0}
        emptyMessage="Özel ücret bilgileri henüz mevcut değil."
        emptyIcon="ph-info"
        multiItems={customFeeSections}
      />
    </div>
  );
};
