"use client";

import React, { useCallback, useState } from "react";
import { useRouter, useParams, usePathname } from "next/navigation";
import { useSnackbar } from "@/contexts";
import { useQuotationsContext } from "../contexts";
import { ActionButton } from "@/components/layouts/detail-layout/components";
import { generateSupplierQuotationPDF } from "../../detail/[id]/_shared/utils";

/**
 * Quotation Header Section
 * Tüm Quotation sayfalarında ortak kullanılacak header bölümü
 * - DetailLayout'un Header component'lerini kullanır
 * - Geri Dön butonu (sayfa durumuna göre dinamik yönlendirme)
 * - Teklif detayına özel action buttons (Teklif Kalemleri, Düzenle, PDF, vb.)
 * - Quotation verisini QuotationsContext'ten alır (tüm sayfalarda çalışır)
 */
export const QuotationHeaderSection: React.FC = () => {
  const router = useRouter();
  const { showSnackbar } = useSnackbar();
  const params = useParams();
  const pathname = usePathname();
  const quotationId = params.id as string;

  // Quotation ve items verisini context'ten al (tek API çağrısı)
  const { quotation, quotationLoading, quotationItems, quotationItemsLoading } =
    useQuotationsContext();

  // PDF generating state
  const [isPdfGenerating, setIsPdfGenerating] = useState(false);

  // Hangi sayfada olduğumuzu tespit et ve geri buton linkini belirle
  const getBackButtonHref = () => {
    // Detail sayfasındaysak liste sayfasına git
    if (
      pathname?.includes(`/supply/supplier/quotations/detail/${quotationId}`) &&
      !pathname?.includes("/add-edit")
    ) {
      return "/supply/supplier/quotations";
    }

    // Items ana sayfasındaysak (add-edit değil) detay sayfasına git
    if (
      pathname?.includes(`/supply/supplier/quotations/items/${quotationId}`) &&
      !pathname?.includes("/add-edit")
    ) {
      return `/supply/supplier/quotations/detail/${quotationId}`;
    }

    // Items alt sayfalarındaysak (add-edit/new, add-edit/[itemId]) items sayfasına git
    if (
      pathname?.includes(
        `/supply/supplier/quotations/items/${quotationId}/add-edit`,
      )
    ) {
      return `/supply/supplier/quotations/items/${quotationId}`;
    }

    // Quotation add-edit sayfasındaysak detay sayfasına git
    if (pathname?.includes(`/supply/supplier/quotations/add-edit`)) {
      return `/supply/supplier/quotations/detail/${quotationId}`;
    }

    // Diğer tüm iç sayfalarda detail sayfasına git
    return `/supply/supplier/quotations/detail/${quotationId}`;
  };

  // PDF generation handler
  const handleGeneratePDF = useCallback(async () => {
    if (!quotation) return;

    setIsPdfGenerating(true);
    try {
      await generateSupplierQuotationPDF({
        quotation,
        items: quotationItems,
      });
      showSnackbar("PDF başarıyla oluşturuldu", "success");
    } catch (err) {
      console.error("PDF oluşturma hatası:", err);
      showSnackbar("PDF oluşturulurken bir hata oluştu", "error");
    } finally {
      setIsPdfGenerating(false);
    }
  }, [quotation, quotationItems, showSnackbar]);

  // Custom handlers
  const handleEdit = () => {
    if (quotation?.status !== "DRAFT") {
      showSnackbar(
        "Yalnızca taslak durumundaki teklifler düzenlenebilir.",
        "warning",
      );
      return;
    }
    router.push(`/supply/supplier/quotations/add-edit/${quotationId}`);
  };

  // Default action buttons - BackButton dahil
  const actionButtons = [
    {
      id: "back",
      label: "Geri Dön",
      href: getBackButtonHref(),
    },
    {
      id: "detail",
      label: "Detay",
      href: `/supply/supplier/quotations/detail/${quotationId}`,
    },
    {
      id: "items",
      label: "Teklif Kalemleri",
      href: `/supply/supplier/quotations/items/${quotationId}`,
    },
    {
      id: "pdf",
      label: isPdfGenerating ? "PDF Hazırlanıyor..." : "PDF Olarak Görüntüle",
      onClick: handleGeneratePDF,
      disabled:
        isPdfGenerating ||
        quotationItemsLoading ||
        !quotation ||
        quotationLoading,
    },
    {
      id: "edit",
      label: "Düzenle",
      onClick: handleEdit,
    },
  ];

  return (
    <div className="detail-layout-header">
      <div className="quotation-detail-page__header">
        {/* Action Buttons */}
        {actionButtons.length > 0 && (
          <div className="quotation-detail-page__header-actions">
            {actionButtons.map((button) => (
              <ActionButton
                key={button.id}
                config={{
                  id: button.id,
                  label: button.label,
                  href: button.href,
                  onClick: button.onClick,
                  disabled: button.disabled,
                  variant:
                    button.id === "back"
                      ? "outline"
                      : button.id === "edit" || button.id === "pdf"
                        ? "primary"
                        : "secondary",
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
