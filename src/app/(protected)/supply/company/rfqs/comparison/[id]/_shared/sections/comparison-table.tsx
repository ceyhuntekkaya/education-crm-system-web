"use client";

import React from "react";
import { useComparisonContext } from "../contexts";
import type {
  QuotationComparisonDto,
  QuotationComparisonDtoStatus,
} from "../types";
import {
  formatPrice,
  formatDate,
  formatRating,
  isBestInCategory,
  getExpiryStatusClass,
  calculateDaysUntilExpiry,
  getStatusColorConfig,
} from "../utils";
import { COMPARISON_STATUS_CONFIG } from "../types/comparison-types";

/**
 * Comparison Table Component
 *
 * Teklifleri tablo görünümünde karşılaştırır
 * RFQ Card ve Detail sayfası tasarımlarını baz alarak modern UI/UX
 */
export const ComparisonTable: React.FC = () => {
  const { comparisons } = useComparisonContext();

  if (!comparisons.length) {
    return null;
  }

  // Tüm item isimlerini topla (unique)
  const allItemNames = Array.from(
    new Set(
      comparisons.flatMap(
        (comp: QuotationComparisonDto) =>
          comp.items?.map((item) => item.itemName) || []
      )
    )
  ) as string[];

  return (
    <div
      className="bg-white rounded-16 overflow-hidden"
      style={{
        boxShadow:
          "0 4px 12px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.04)",
        border: "1.5px solid hsl(var(--neutral-40))",
      }}
    >
      <div className="table-responsive">
        <table className="table table-hover mb-0">
          <thead>
            <tr
              style={{
                backgroundColor: "hsl(var(--neutral-50))",
                borderBottom: "2px solid hsl(var(--neutral-100))",
              }}
            >
              <th
                className="text-neutral-700 fw-semibold text-sm px-20 py-16"
                style={{
                  minWidth: "200px",
                  position: "sticky",
                  left: 0,
                  backgroundColor: "hsl(var(--neutral-50))",
                  zIndex: 2,
                  borderRight: "1.5px solid hsl(var(--neutral-100))",
                }}
              >
                <div className="d-flex align-items-center gap-8">
                  <div
                    className="d-flex align-items-center justify-content-center bg-neutral-100 text-neutral-700 rounded-8"
                    style={{
                      width: "32px",
                      height: "32px",
                      fontSize: "16px",
                      flexShrink: 0,
                    }}
                  >
                    <i className="ph-bold ph-list"></i>
                  </div>
                  <span className="text-neutral-900">Kriter</span>
                </div>
              </th>
              {comparisons.map((comparison: QuotationComparisonDto) => (
                <th
                  key={comparison.quotationId}
                  className="text-neutral-700 fw-semibold text-sm px-20 py-16"
                  style={{
                    minWidth: "250px",
                    backgroundColor: "hsl(var(--neutral-50))",
                    borderLeft: "1px solid hsl(var(--neutral-100))",
                  }}
                >
                  <div className="soft-card rounded-12 p-12">
                    <div className="d-flex flex-column gap-8 align-items-center">
                      <div className="d-flex align-items-center gap-6">
                        <div
                          className="d-flex align-items-center justify-content-center bg-primary-100 text-primary-700 rounded-8"
                          style={{
                            width: "28px",
                            height: "28px",
                            fontSize: "14px",
                            flexShrink: 0,
                          }}
                        >
                          <i className="ph-bold ph-buildings"></i>
                        </div>
                        <div className="fw-bold text-neutral-900 text-center">
                          {comparison.supplierCompanyName ||
                            "Tedarikçi Adı Yok"}
                        </div>
                      </div>
                      {comparison.averageRating !== undefined && (
                        <div className="d-flex align-items-center justify-content-center gap-4 text-xs">
                          <div
                            className="d-flex align-items-center justify-content-center bg-warning-100 text-warning-700 rounded-8"
                            style={{
                              width: "24px",
                              height: "24px",
                              fontSize: "12px",
                            }}
                          >
                            <i className="ph-fill ph-star"></i>
                          </div>
                          <span className="fw-semibold text-neutral-700">
                            {formatRating(comparison.averageRating)}
                          </span>
                        </div>
                      )}
                      {/* <div className="d-flex align-items-center gap-4 mt-2">
                        <i className="ph-bold ph-arrows-left-right text-neutral-500 text-xs"></i>
                        <span className="text-neutral-600 fw-medium text-xs">
                          Karşılaştırma
                        </span>
                      </div> */}
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Status Row */}
            <tr className="border-bottom">
              <td
                className="text-neutral-900 fw-semibold px-20 py-16 bg-neutral-25"
                style={{
                  position: "sticky",
                  left: 0,
                  zIndex: 1,
                }}
              >
                <div className="d-flex align-items-center gap-8">
                  <div
                    className="d-flex align-items-center justify-content-center bg-info-100 text-info-700 rounded-8"
                    style={{
                      width: "32px",
                      height: "32px",
                      fontSize: "16px",
                      flexShrink: 0,
                    }}
                  >
                    <i className="ph-bold ph-flag"></i>
                  </div>
                  <span>Durum</span>
                </div>
              </td>
              {comparisons.map((comparison: QuotationComparisonDto) => {
                const statusConfig = comparison.status
                  ? COMPARISON_STATUS_CONFIG[
                      comparison.status as QuotationComparisonDtoStatus
                    ]
                  : null;
                const statusColor = getStatusColorConfig(comparison.status);
                return (
                  <td
                    key={comparison.quotationId}
                    className="px-20 py-16 text-center"
                  >
                    {statusConfig && (
                      <div className="d-flex justify-content-center">
                        <span
                          className="d-inline-flex align-items-center gap-6 px-14 py-8 rounded-8 text-sm fw-bold"
                          style={{
                            backgroundColor: statusColor.bgColor,
                            color: statusColor.textColor,
                            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
                            minWidth: "130px",
                            justifyContent: "center",
                            border: `1px solid ${statusColor.bgColor}`,
                          }}
                        >
                          <i
                            className={statusConfig.icon}
                            style={{ fontSize: "14px" }}
                          ></i>
                          {statusConfig.label}
                        </span>
                      </div>
                    )}
                  </td>
                );
              })}
            </tr>

            {/* Total Amount Row */}
            <tr className="border-bottom">
              <td
                className="text-neutral-900 fw-semibold px-20 py-16 bg-neutral-25"
                style={{
                  position: "sticky",
                  left: 0,
                  zIndex: 1,
                }}
              >
                <div className="d-flex align-items-center gap-8">
                  <div
                    className="d-flex align-items-center justify-content-center bg-success-100 text-success-700 rounded-8"
                    style={{
                      width: "32px",
                      height: "32px",
                      fontSize: "16px",
                      flexShrink: 0,
                    }}
                  >
                    <i className="ph-bold ph-currency-circle-dollar"></i>
                  </div>
                  <span>Toplam Tutar</span>
                </div>
              </td>
              {comparisons.map((comparison: QuotationComparisonDto) => {
                const isBest = isBestInCategory(
                  comparison,
                  comparisons,
                  "price"
                );
                return (
                  <td
                    key={comparison.quotationId}
                    className="px-20 py-16 text-center"
                  >
                    <div
                      className={`soft-card rounded-12 p-12 ${
                        isBest ? "border-success" : ""
                      }`}
                      style={{
                        border: isBest
                          ? "2px solid hsl(var(--success-500))"
                          : undefined,
                        backgroundColor: isBest
                          ? "rgba(34, 197, 94, 0.05)"
                          : undefined,
                      }}
                    >
                      <div className="d-flex flex-column gap-8 align-items-center">
                        <span className="fw-bold text-neutral-900">
                          {formatPrice(
                            comparison.totalAmount,
                            comparison.currency
                          )}
                        </span>
                        {isBest && (
                          <span className="d-inline-flex align-items-center gap-4 px-8 py-4 rounded-6 bg-success-100 text-success-700 text-xs fw-semibold">
                            <i className="ph-fill ph-trophy"></i>
                            En İyi Fiyat
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                );
              })}
            </tr>

            {/* Delivery Days Row */}
            <tr className="border-bottom">
              <td
                className="text-neutral-900 fw-semibold px-20 py-16 bg-neutral-25"
                style={{
                  position: "sticky",
                  left: 0,
                  zIndex: 1,
                }}
              >
                <div className="d-flex align-items-center gap-8">
                  <div
                    className="d-flex align-items-center justify-content-center bg-primary-100 text-primary-700 rounded-8"
                    style={{
                      width: "32px",
                      height: "32px",
                      fontSize: "16px",
                      flexShrink: 0,
                    }}
                  >
                    <i className="ph-bold ph-truck"></i>
                  </div>
                  <span>Teslimat Süresi</span>
                </div>
              </td>
              {comparisons.map((comparison: QuotationComparisonDto) => {
                const isBest = isBestInCategory(
                  comparison,
                  comparisons,
                  "delivery"
                );
                return (
                  <td
                    key={comparison.quotationId}
                    className="px-20 py-16 text-center"
                  >
                    <div
                      className={`soft-card rounded-12 p-12 ${
                        isBest ? "border-primary" : ""
                      }`}
                      style={{
                        border: isBest
                          ? "2px solid hsl(var(--primary-500))"
                          : undefined,
                        backgroundColor: isBest
                          ? "rgba(59, 130, 246, 0.05)"
                          : undefined,
                      }}
                    >
                      <div className="d-flex flex-column gap-8 align-items-center">
                        <span className="fw-semibold text-neutral-900">
                          {comparison.deliveryDays
                            ? `${comparison.deliveryDays} gün`
                            : "-"}
                        </span>
                        {isBest && comparison.deliveryDays && (
                          <span className="d-inline-flex align-items-center gap-4 px-8 py-4 rounded-6 bg-primary-100 text-primary-700 text-xs fw-semibold">
                            <i className="ph-fill ph-lightning"></i>
                            En Hızlı
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                );
              })}
            </tr>

            {/* Valid Until Row */}
            <tr className="border-bottom">
              <td
                className="text-neutral-900 fw-semibold px-20 py-16 bg-neutral-25"
                style={{
                  position: "sticky",
                  left: 0,
                  zIndex: 1,
                }}
              >
                <div className="d-flex align-items-center gap-8">
                  <div
                    className="d-flex align-items-center justify-content-center bg-warning-100 text-warning-700 rounded-8"
                    style={{
                      width: "32px",
                      height: "32px",
                      fontSize: "16px",
                      flexShrink: 0,
                    }}
                  >
                    <i className="ph-bold ph-calendar"></i>
                  </div>
                  <span>Geçerlilik Tarihi</span>
                </div>
              </td>
              {comparisons.map((comparison: QuotationComparisonDto) => {
                const daysUntilExpiry = calculateDaysUntilExpiry(
                  comparison.validUntil
                );
                const expiryClass = getExpiryStatusClass(comparison.validUntil);

                return (
                  <td
                    key={comparison.quotationId}
                    className="px-20 py-16 text-center"
                  >
                    <div className="soft-card rounded-12 p-12">
                      <div className="d-flex flex-column gap-8 align-items-center">
                        <span className="fw-medium text-neutral-900">
                          {formatDate(comparison.validUntil)}
                        </span>
                        {daysUntilExpiry !== null && (
                          <span
                            className={`text-xs fw-semibold px-8 py-4 rounded-6 ${
                              daysUntilExpiry > 7
                                ? "bg-success-100 text-success-700"
                                : daysUntilExpiry > 3
                                ? "bg-warning-100 text-warning-700"
                                : "bg-danger-100 text-danger-700"
                            }`}
                          >
                            {daysUntilExpiry > 0
                              ? `${daysUntilExpiry} gün kaldı`
                              : daysUntilExpiry === 0
                              ? "Bugün sona eriyor"
                              : "Süresi doldu"}
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                );
              })}
            </tr>

            {/* Payment Terms Row */}
            <tr className="border-bottom">
              <td
                className="text-neutral-900 fw-semibold px-20 py-16 bg-neutral-25"
                style={{
                  position: "sticky",
                  left: 0,
                  zIndex: 1,
                }}
              >
                <div className="d-flex align-items-center gap-8">
                  <div
                    className="d-flex align-items-center justify-content-center bg-success-100 text-success-700 rounded-8"
                    style={{
                      width: "32px",
                      height: "32px",
                      fontSize: "16px",
                      flexShrink: 0,
                    }}
                  >
                    <i className="ph-bold ph-credit-card"></i>
                  </div>
                  <span>Ödeme Koşulları</span>
                </div>
              </td>
              {comparisons.map((comparison: QuotationComparisonDto) => (
                <td
                  key={comparison.quotationId}
                  className="px-20 py-16 text-center"
                >
                  <div className="soft-card rounded-12 p-12">
                    <span className="text-neutral-700 text-sm">
                      {comparison.paymentTerms || (
                        <span className="text-neutral-400 fst-italic">-</span>
                      )}
                    </span>
                  </div>
                </td>
              ))}
            </tr>

            {/* Warranty Terms Row */}
            <tr className="border-bottom">
              <td
                className="text-neutral-900 fw-semibold px-20 py-16 bg-neutral-25"
                style={{
                  position: "sticky",
                  left: 0,
                  zIndex: 1,
                }}
              >
                <div className="d-flex align-items-center gap-8">
                  <div
                    className="d-flex align-items-center justify-content-center bg-danger-100 text-danger-700 rounded-8"
                    style={{
                      width: "32px",
                      height: "32px",
                      fontSize: "16px",
                      flexShrink: 0,
                    }}
                  >
                    <i className="ph-bold ph-shield-check"></i>
                  </div>
                  <span>Garanti Koşulları</span>
                </div>
              </td>
              {comparisons.map((comparison: QuotationComparisonDto) => (
                <td
                  key={comparison.quotationId}
                  className="px-20 py-16 text-center"
                >
                  <div className="soft-card rounded-12 p-12">
                    <span className="text-neutral-700 text-sm">
                      {comparison.warrantyTerms || (
                        <span className="text-neutral-400 fst-italic">-</span>
                      )}
                    </span>
                  </div>
                </td>
              ))}
            </tr>

            {/* Items Separator */}
            {allItemNames.length > 0 && (
              <tr className="bg-neutral-50">
                <td colSpan={comparisons.length + 1} className="px-20 py-16">
                  <div className="d-flex align-items-center gap-8 fw-semibold text-neutral-900">
                    <div
                      className="d-flex align-items-center justify-content-center bg-primary-100 text-primary-700 rounded-8"
                      style={{
                        width: "32px",
                        height: "32px",
                        fontSize: "16px",
                      }}
                    >
                      <i className="ph-bold ph-package"></i>
                    </div>
                    <span>Ürün Detayları</span>
                  </div>
                </td>
              </tr>
            )}

            {/* Item Rows */}
            {allItemNames.map((itemName: string) => (
              <tr key={itemName} className="border-bottom">
                <td
                  className="text-neutral-900 fw-medium px-20 py-16 bg-neutral-25"
                  style={{
                    position: "sticky",
                    left: 0,
                    zIndex: 1,
                  }}
                >
                  <div className="d-flex align-items-center gap-8">
                    <div
                      className="d-flex align-items-center justify-content-center bg-primary-100 text-primary-700 rounded-8"
                      style={{
                        width: "32px",
                        height: "32px",
                        fontSize: "16px",
                        flexShrink: 0,
                      }}
                    >
                      <i className="ph-bold ph-cube"></i>
                    </div>
                    <span className="text-neutral-900 fw-semibold">
                      {itemName}
                    </span>
                  </div>
                </td>
                {comparisons.map((comparison: QuotationComparisonDto) => {
                  const item = comparison.items?.find(
                    (i) => i.itemName === itemName
                  );
                  return (
                    <td key={comparison.quotationId} className="px-20 py-16">
                      {item ? (
                        <div className="soft-card rounded-12 p-12">
                          <div className="d-flex flex-column gap-10 text-sm">
                            {/* Miktar */}
                            <div className="d-flex justify-content-between align-items-center">
                              <div className="d-flex align-items-center gap-6">
                                <i className="ph-bold ph-package text-neutral-500 text-xs"></i>
                                <span className="text-neutral-600 text-xs">
                                  Miktar:
                                </span>
                              </div>
                              <span className="fw-semibold text-neutral-900">
                                {item.quantity} {item.unit}
                              </span>
                            </div>
                            {/* Birim Fiyat */}
                            <div className="d-flex justify-content-between align-items-center">
                              <div className="d-flex align-items-center gap-6">
                                <i className="ph-bold ph-currency-circle-dollar text-neutral-500 text-xs"></i>
                                <span className="text-neutral-600 text-xs">
                                  Birim Fiyat:
                                </span>
                              </div>
                              <span className="fw-medium text-neutral-900">
                                {formatPrice(
                                  item.unitPrice,
                                  comparison.currency
                                )}
                              </span>
                            </div>
                            {/* İndirim */}
                            {item.discountAmount !== undefined &&
                              item.discountAmount > 0 && (
                                <div className="d-flex justify-content-between align-items-center">
                                  <div className="d-flex align-items-center gap-6">
                                    <i className="ph-bold ph-tag text-danger-500 text-xs"></i>
                                    <span className="text-neutral-600 text-xs">
                                      İndirim:
                                    </span>
                                  </div>
                                  <span className="fw-medium text-danger-600">
                                    {formatPrice(
                                      item.discountAmount,
                                      comparison.currency
                                    )}
                                  </span>
                                </div>
                              )}
                            {/* Toplam */}
                            <div
                              className="d-flex justify-content-between align-items-center pt-8 mt-8"
                              style={{
                                borderTop: "1px solid rgba(17, 24, 39, 0.1)",
                              }}
                            >
                              <div className="d-flex align-items-center gap-6">
                                <i className="ph-bold ph-currency-circle-dollar text-primary-600 text-xs"></i>
                                <span className="text-neutral-700 fw-semibold">
                                  Toplam:
                                </span>
                              </div>
                              <span className="fw-bold text-neutral-900">
                                {formatPrice(
                                  item.totalPrice,
                                  comparison.currency
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="soft-card rounded-12 p-12">
                          <div className="d-flex align-items-center justify-content-center">
                            <span className="text-neutral-400 text-sm fst-italic">
                              <i className="ph-bold ph-x-circle me-2"></i>
                              Teklif verilmedi
                            </span>
                          </div>
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}

            {/* Notes Row */}
            <tr>
              <td
                className="text-neutral-900 fw-semibold px-20 py-16 bg-neutral-25"
                style={{
                  position: "sticky",
                  left: 0,
                  zIndex: 1,
                }}
              >
                <div className="d-flex align-items-center gap-8">
                  <div
                    className="d-flex align-items-center justify-content-center bg-main-100 text-main-700 rounded-8"
                    style={{
                      width: "32px",
                      height: "32px",
                      fontSize: "16px",
                      flexShrink: 0,
                    }}
                  >
                    <i className="ph-bold ph-note"></i>
                  </div>
                  <span>Notlar</span>
                </div>
              </td>
              {comparisons.map((comparison: QuotationComparisonDto) => (
                <td key={comparison.quotationId} className="px-20 py-16">
                  <div className="soft-card rounded-12 p-12">
                    <span className="text-neutral-700 text-sm">
                      {comparison.notes || (
                        <span className="text-neutral-400 fst-italic">-</span>
                      )}
                    </span>
                  </div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
