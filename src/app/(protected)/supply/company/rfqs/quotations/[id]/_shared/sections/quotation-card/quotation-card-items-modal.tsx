import React from "react";
import { Modal, ModalHeader, ModalBody } from "@/components/ui/modal";
import { formatCurrency } from "@/utils";
import type {
  QuotationItemComparisonDto,
  QuotationComparisonDtoStatus,
} from "@/types/supply/quotation";
import { getStatusColor } from "../../utils";

interface QuotationCardItemsModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: QuotationItemComparisonDto[];
  currency?: string;
  status?: QuotationComparisonDtoStatus;
}

export const QuotationCardItemsModal: React.FC<
  QuotationCardItemsModalProps
> = ({ isOpen, onClose, items, currency, status }) => {
  const statusConfig = getStatusColor(status);
  const statusColor = statusConfig.color || "#10b981";

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="md"
      ariaLabel="Kalem Detayları"
    >
      <ModalHeader
        title={`Kalem Detayları (${items.length})`}
        onClose={onClose}
      />
      <ModalBody scrollable>
        <div className="d-flex flex-column gap-8">
          {items.map((item, index) => (
            <div
              key={item.rfqItemId || index}
              className="soft-card rounded-12"
              style={{
                border: "1px solid hsl(var(--neutral-40))",
              }}
            >
              {/* Item Name Header */}
              <div className="mb-8 px-8 pt-8">
                <h5
                  className="mb-0 fw-semibold"
                  style={{
                    fontSize: "0.875rem",
                    color: "hsl(var(--neutral-900))",
                    lineHeight: "1.3",
                  }}
                >
                  {item.itemName || "İsimsiz Kalem"}
                </h5>
              </div>

              {/* Item Details - Using meta-container structure */}
              <div className="px-8 pb-8">
                {/* First Row: Quantity and Unit Price */}
                <div
                  className="meta-container"
                  style={{ padding: "8px", gap: "8px" }}
                >
                  {/* Quantity */}
                  <div className="meta-item">
                    <div className="meta-content" style={{ gap: "4px" }}>
                      <p
                        className="meta-label"
                        style={{ fontSize: "0.625rem" }}
                      >
                        Miktar
                      </p>
                      <div
                        className="meta-value-wrapper"
                        style={{ gap: "6px" }}
                      >
                        <div className="meta-icon-wrapper">
                          <div
                            className="meta-icon bg-primary-100 text-primary-700"
                            style={{ width: "24px", height: "24px" }}
                          >
                            <i
                              className="ph-bold ph-package"
                              style={{ fontSize: "12px" }}
                            />
                          </div>
                        </div>
                        <span
                          className="meta-value"
                          style={{ fontSize: "0.75rem" }}
                        >
                          {item.quantity || 0} {item.unit || "adet"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div
                    className="meta-item-divider"
                    style={{ height: "24px" }}
                  ></div>

                  {/* Unit Price */}
                  <div className="meta-item">
                    <div className="meta-content" style={{ gap: "4px" }}>
                      <p
                        className="meta-label"
                        style={{ fontSize: "0.625rem" }}
                      >
                        Birim Fiyat
                      </p>
                      <div
                        className="meta-value-wrapper"
                        style={{ gap: "6px" }}
                      >
                        <div className="meta-icon-wrapper">
                          <div
                            className="meta-icon bg-info-100 text-info-700"
                            style={{ width: "24px", height: "24px" }}
                          >
                            <i
                              className="ph-bold ph-currency-circle-dollar"
                              style={{ fontSize: "12px" }}
                            />
                          </div>
                        </div>
                        <span
                          className="meta-value"
                          style={{ fontSize: "0.75rem" }}
                        >
                          {item.unitPrice !== undefined &&
                          item.unitPrice !== null
                            ? formatCurrency(item.unitPrice, currency || "TRY")
                            : "-"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                {(item.discountAmount && item.discountAmount > 0) ||
                (item.totalPrice !== undefined && item.totalPrice !== null) ? (
                  <div
                    style={{
                      height: "1px",
                      backgroundColor: "hsl(var(--neutral-40))",
                      margin: "8px 0",
                    }}
                  />
                ) : null}

                {/* Second Row: Discount and Total */}
                {(item.discountAmount && item.discountAmount > 0) ||
                (item.totalPrice !== undefined && item.totalPrice !== null) ? (
                  <div
                    className="meta-container"
                    style={{ padding: "8px", gap: "8px" }}
                  >
                    {/* Discount */}
                    {item.discountAmount && item.discountAmount > 0 && (
                      <>
                        <div className="meta-item">
                          <div className="meta-content" style={{ gap: "4px" }}>
                            <p
                              className="meta-label"
                              style={{ fontSize: "0.625rem" }}
                            >
                              İndirim
                            </p>
                            <div
                              className="meta-value-wrapper"
                              style={{ gap: "6px" }}
                            >
                              <div className="meta-icon-wrapper">
                                <div
                                  className="meta-icon bg-success-100 text-success-700"
                                  style={{ width: "24px", height: "24px" }}
                                >
                                  <i
                                    className="ph-bold ph-tag"
                                    style={{ fontSize: "12px" }}
                                  />
                                </div>
                              </div>
                              <span
                                className="meta-value text-success"
                                style={{
                                  fontSize: "0.75rem",
                                  fontWeight: 600,
                                }}
                              >
                                {formatCurrency(
                                  item.discountAmount,
                                  currency || "TRY"
                                )}
                              </span>
                            </div>
                          </div>
                        </div>

                        {item.totalPrice !== undefined &&
                          item.totalPrice !== null && (
                            <div
                              className="meta-item-divider"
                              style={{ height: "24px" }}
                            ></div>
                          )}
                      </>
                    )}

                    {/* Total Price */}
                    {item.totalPrice !== undefined &&
                      item.totalPrice !== null && (
                        <div className="meta-item">
                          <div className="meta-content" style={{ gap: "4px" }}>
                            <p
                              className="meta-label"
                              style={{ fontSize: "0.625rem" }}
                            >
                              Toplam
                            </p>
                            <div
                              className="meta-value-wrapper"
                              style={{ gap: "6px" }}
                            >
                              <div className="meta-icon-wrapper">
                                <div
                                  className="meta-icon text-white"
                                  style={{
                                    width: "28px",
                                    height: "28px",
                                    backgroundColor: statusColor,
                                  }}
                                >
                                  <i
                                    className="ph-bold ph-currency-circle-dollar"
                                    style={{ fontSize: "14px" }}
                                  />
                                </div>
                              </div>
                              <span
                                className="meta-value fw-bold"
                                style={{
                                  fontSize: "0.875rem",
                                  color: statusColor,
                                }}
                              >
                                {formatCurrency(
                                  item.totalPrice,
                                  currency || "TRY"
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                  </div>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </ModalBody>
    </Modal>
  );
};
