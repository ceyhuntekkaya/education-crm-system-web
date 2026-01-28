import React, { useState } from "react";
import {
  QuotationComparisonDtoStatus,
  QuotationComparisonDto,
} from "@/types/dto/supply/quotation.dto";
import { canAcceptQuotation, generateQuotationPDF } from "../../../utils";
import { useSnackbar, useAuth } from "@/contexts";
import { useRFQQuotationsContext } from "../../../contexts";

interface QuotationCardActionsProps {
  quotationId?: number;
  status?: QuotationComparisonDtoStatus;
  quotation: QuotationComparisonDto;
  onAccept?: (quotationId?: number) => void;
}

export const QuotationCardActions: React.FC<QuotationCardActionsProps> = ({
  quotationId,
  status,
  quotation,
  onAccept,
}) => {
  const { showSnackbar } = useSnackbar();
  const { user } = useAuth();

  // RFQ verisini context'ten al
  const { rfq } = useRFQQuotationsContext();

  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const isAcceptable = canAcceptQuotation(status);

  const handleAccept = () => {
    if (isAcceptable && onAccept) {
      onAccept(quotationId);
    }
  };

  const handleExportPDF = async () => {
    if (!rfq || !quotation) {
      showSnackbar("Teklif bilgisi yükleniyor, lütfen bekleyin", "info");
      return;
    }

    setIsGeneratingPDF(true);
    try {
      await generateQuotationPDF({
        rfq,
        quotation,
        companyInfo: {
          name: rfq.companyName || "N/A",
          address: user?.addressLine1 || "-",
          phone: user?.phone || "-",
          email: user?.email || "-",
        },
      });

      showSnackbar("PDF başarıyla oluşturuldu", "success");
    } catch (error) {
      console.error("PDF oluşturma hatası:", error);
      showSnackbar("PDF oluşturulurken bir hata oluştu", "error");
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <div className="mt-16 d-flex flex-column gap-12">
      {/* Accept Button */}
      <button
        className="btn btn-success w-100 d-flex align-items-center justify-content-center gap-8 py-12"
        style={{
          fontSize: "0.875rem",
          fontWeight: 600,
          borderRadius: "12px",
          opacity: !isAcceptable ? 0.5 : 1,
          cursor: !isAcceptable ? "not-allowed" : "pointer",
          pointerEvents: !isAcceptable ? "none" : "auto",
        }}
        disabled={!isAcceptable}
        onClick={handleAccept}
      >
        <i className="ph-bold ph-check-circle" style={{ fontSize: "18px" }} />
        <span>Teklifi Kabul Et</span>
      </button>

      {/* PDF Download Button - Card Style */}
      <button
        className="w-100 d-flex align-items-center justify-content-center gap-8 py-12 px-16 bg-white rounded-12 transition-all"
        style={{
          border: "1.5px solid hsl(var(--neutral-40))",
          cursor:
            isGeneratingPDF || !rfq || !quotation ? "not-allowed" : "pointer",
          opacity: isGeneratingPDF || !rfq || !quotation ? 0.6 : 1,
          boxShadow: "0 2px 6px rgba(0, 0, 0, 0.04)",
        }}
        disabled={isGeneratingPDF || !rfq || !quotation}
        onClick={handleExportPDF}
        title={
          !rfq
            ? "RFQ yükleniyor..."
            : !quotation
              ? "Teklif yükleniyor..."
              : "Teklifi PDF olarak indir ve görüntüle"
        }
        onMouseEnter={(e) => {
          if (!isGeneratingPDF && rfq && quotation) {
            e.currentTarget.style.borderColor = "hsl(var(--primary-600))";
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.08)";
          }
        }}
        onMouseLeave={(e) => {
          if (!isGeneratingPDF && rfq && quotation) {
            e.currentTarget.style.borderColor = "hsl(var(--neutral-40))";
            e.currentTarget.style.boxShadow = "0 2px 6px rgba(0, 0, 0, 0.04)";
          }
        }}
      >
        <i
          className={`ph-bold ${isGeneratingPDF ? "ph-circle-notch ph-spin" : "ph-download-simple"}`}
          style={{
            fontSize: "18px",
            color: isGeneratingPDF
              ? "hsl(var(--neutral-600))"
              : "hsl(var(--primary-600))",
          }}
        />
        <span
          className="fw-medium"
          style={{
            fontSize: "0.875rem",
            color: isGeneratingPDF
              ? "hsl(var(--neutral-600))"
              : "hsl(var(--neutral-900))",
          }}
        >
          {isGeneratingPDF
            ? "PDF Hazırlanıyor..."
            : "Teklifi PDF Olarak Görüntüle"}
        </span>
      </button>
    </div>
  );
};
