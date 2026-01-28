import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { QuotationComparisonDto, RFQDto } from "@/types";
import { formatDate, dejaVuSansNormal, dejaVuSansBold } from "@/utils";

/**
 * Quotation PDF Formatı:
 * - Üst kısımda tarih (sağ üstte)
 * - İki kolon: Sol müşteri bilgileri, Sağ tedarikçi bilgileri (quotation'dan)
 * - Alt kısımda teklif kalemleri tablosu
 * - Türkçe karakter desteği için DejaVuSans fontu kullanılıyor
 */

// Font yükleme fonksiyonu
const loadTurkishFonts = (doc: jsPDF): void => {
  // DejaVuSans Normal font'u ekle
  doc.addFileToVFS("DejaVuSans-normal.ttf", dejaVuSansNormal);
  doc.addFont("DejaVuSans-normal.ttf", "DejaVuSans", "normal");

  // DejaVuSans Bold font'u ekle
  doc.addFileToVFS("DejaVuSans-bold.ttf", dejaVuSansBold);
  doc.addFont("DejaVuSans-bold.ttf", "DejaVuSans", "bold");

  // Varsayılan font olarak ayarla
  doc.setFont("DejaVuSans", "normal");
};

interface GenerateQuotationPDFParams {
  rfq: RFQDto;
  quotation: QuotationComparisonDto;
  companyInfo?: {
    name?: string;
    address?: string;
    phone?: string;
    email?: string;
    taxNumber?: string;
  };
}

export const generateQuotationPDF = async ({
  rfq,
  quotation,
  companyInfo,
}: GenerateQuotationPDFParams) => {
  // Validasyon
  if (!rfq) {
    throw new Error("RFQ verisi bulunamadı");
  }
  if (!quotation) {
    throw new Error("Teklif verisi bulunamadı");
  }

  // PDF oluştur (A4 formatında)
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  // Türkçe karakter desteği için fontları yükle
  loadTurkishFonts(doc);

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  let yPos = margin;

  // === HEADER BÖLÜMÜ ===
  // Başlık kutusu
  doc.setFillColor(41, 128, 185);
  doc.rect(0, 0, pageWidth, 35, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont("DejaVuSans", "bold");
  doc.text("TEKLİF TALEBİ (RFQ)", margin, 15);

  // Tarih - Sağ Üstte
  doc.setFontSize(11);
  doc.setFont("DejaVuSans", "normal");
  const dateText = `Tarih: ${formatDate(new Date().toISOString())}`;
  const dateWidth = doc.getTextWidth(dateText);
  doc.text(dateText, pageWidth - margin - dateWidth, 15);

  // RFQ Numarası - Sağ üst ikinci satır
  doc.setFontSize(10);
  const rfqNoText = `RFQ #${rfq.id || "N/A"}`;
  const rfqNoWidth = doc.getTextWidth(rfqNoText);
  doc.text(rfqNoText, pageWidth - margin - rfqNoWidth, 25);

  doc.setTextColor(50, 50, 50); // Normal metin rengine dön
  yPos = 45;

  // RFQ Başlık
  doc.setFontSize(14);
  doc.setFont("DejaVuSans", "bold");
  doc.setTextColor(41, 128, 185);
  const title = rfq.title || "Temel İhtiyaçlar";
  doc.text(title, margin, yPos);
  doc.setTextColor(50, 50, 50);
  yPos += 10;

  // Çizgi
  doc.setDrawColor(200, 200, 200);
  doc.line(margin, yPos, pageWidth - margin, yPos);
  yPos += 8;

  // === İKİ KOLON: MÜŞTERİ VE TEDARİKÇİ BİLGİLERİ ===
  const columnWidth = (pageWidth - margin * 3) / 2;
  const leftColumnX = margin;
  const rightColumnX = margin + columnWidth + margin;
  const boxStartY = yPos;

  // Sol Kutu - Müşteri Bilgileri
  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(0.5);
  doc.setFillColor(250, 250, 250);
  doc.roundedRect(leftColumnX, yPos, columnWidth, 40, 3, 3, "FD");

  yPos += 6;
  doc.setFillColor(41, 128, 185);
  doc.roundedRect(leftColumnX + 2, yPos, columnWidth - 4, 8, 2, 2, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.setFont("DejaVuSans", "bold");
  doc.text("Müşteri Bilgileri", leftColumnX + 5, yPos + 5);
  doc.setTextColor(50, 50, 50);

  let leftYPos = yPos + 12;
  doc.setFontSize(8);
  doc.setFont("DejaVuSans", "normal");

  const customerData = [
    {
      label: "Firma Adı:",
      value:
        companyInfo?.name || rfq.companyName || "Eğitim Dünyası Maslak Kampüsü",
    },
    { label: "Adres:", value: companyInfo?.address || "-" },
    { label: "Telefon:", value: companyInfo?.phone || "-" },
    { label: "E-posta:", value: companyInfo?.email || "-" },
  ];

  customerData.forEach((item) => {
    doc.setFont("DejaVuSans", "bold");
    doc.text(item.label, leftColumnX + 5, leftYPos);
    doc.setFont("DejaVuSans", "normal");
    const lines = doc.splitTextToSize(item.value, columnWidth - 35);
    doc.text(lines, leftColumnX + 28, leftYPos);
    leftYPos += 5;
  });

  // Sağ Kutu - Tedarikçi Bilgileri
  yPos = boxStartY;
  doc.setFillColor(250, 250, 250);
  doc.roundedRect(rightColumnX, yPos, columnWidth, 40, 3, 3, "FD");

  yPos += 6;
  doc.setFillColor(41, 128, 185);
  doc.roundedRect(rightColumnX + 2, yPos, columnWidth - 4, 8, 2, 2, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.setFont("DejaVuSans", "bold");
  doc.text("Tedarikçi Bilgileri", rightColumnX + 5, yPos + 5);
  doc.setTextColor(50, 50, 50);

  let rightYPos = yPos + 12;
  doc.setFontSize(8);
  doc.setFont("DejaVuSans", "normal");

  const supplierData = [
    { label: "Firma Adı:", value: quotation.supplierCompanyName || "-" },
    { label: "Teklif No:", value: `#${quotation.quotationId || "-"}` },
    { label: "Versiyon:", value: `v${quotation.versionNumber || "1"}` },
    {
      label: "Puan:",
      value: quotation.averageRating ? `* ${quotation.averageRating}/5.0` : "-",
    },
  ];

  supplierData.forEach((item) => {
    doc.setFont("DejaVuSans", "bold");
    doc.text(item.label, rightColumnX + 5, rightYPos);
    doc.setFont("DejaVuSans", "normal");
    const lines = doc.splitTextToSize(item.value, columnWidth - 35);
    doc.text(lines, rightColumnX + 28, rightYPos);
    rightYPos += 5;
  });

  // Y pozisyonunu kutulardan sonraya ayarla
  yPos = boxStartY + 45;

  // === TEKLİF DETAYLARI ===
  doc.setDrawColor(41, 128, 185);
  doc.setLineWidth(0.5);
  doc.line(margin, yPos, pageWidth - margin, yPos);
  yPos += 8;

  doc.setFontSize(12);
  doc.setFont("DejaVuSans", "bold");
  doc.setTextColor(41, 128, 185);
  doc.text("Teklif Detayları", margin, yPos);
  doc.setTextColor(50, 50, 50);
  yPos += 8;

  // Grid düzeninde detaylar
  const col1X = margin;
  const col2X = margin + (pageWidth - margin * 2) / 2;
  const colWidth = (pageWidth - margin * 2) / 2 - 5;

  doc.setFontSize(8);

  // Sol kolon
  let currentY = yPos;
  const leftDetails = [
    {
      label: "RFQ Tipi:",
      value: rfq.rfqType === "OPEN" ? "Açık İhale" : "Davetli İhale",
    },
    { label: "Teklif Durumu:", value: getStatusText(quotation.status) },
    {
      label: "Geçerlilik Tarihi:",
      value: quotation.validUntil ? formatDate(quotation.validUntil) : "-",
    },
    {
      label: "Teslimat Süresi:",
      value: quotation.deliveryDays ? `${quotation.deliveryDays} gün` : "-",
    },
  ];

  leftDetails.forEach((item) => {
    doc.setFont("DejaVuSans", "bold");
    doc.text(item.label, col1X, currentY);
    doc.setFont("DejaVuSans", "normal");
    doc.text(item.value, col1X + 35, currentY);
    currentY += 5;
  });

  // Sağ kolon
  currentY = yPos;
  const rightDetails = [
    {
      label: "Son Başvuru:",
      value: rfq.submissionDeadline ? formatDate(rfq.submissionDeadline) : "-",
    },
    {
      label: "Beklenen Teslimat:",
      value: rfq.expectedDeliveryDate
        ? formatDate(rfq.expectedDeliveryDate)
        : "-",
    },
    {
      label: "Ödeme Koşulları:",
      value: quotation.paymentTerms || rfq.paymentTerms || "-",
    },
    { label: "Garanti Koşulları:", value: quotation.warrantyTerms || "-" },
  ];

  rightDetails.forEach((item) => {
    doc.setFont("DejaVuSans", "bold");
    doc.text(item.label, col2X, currentY);
    doc.setFont("DejaVuSans", "normal");
    const valueLines = doc.splitTextToSize(item.value, colWidth - 35);
    doc.text(valueLines, col2X + 35, currentY);
    currentY += valueLines.length * 5;
  });

  yPos = Math.max(currentY, yPos + leftDetails.length * 5) + 8;

  // Notlar
  if (quotation.notes) {
    doc.setFillColor(255, 251, 230);
    doc.setDrawColor(255, 193, 7);
    doc.roundedRect(margin, yPos, pageWidth - margin * 2, 15, 2, 2, "FD");

    doc.setFontSize(8);
    doc.setFont("DejaVuSans", "bold");
    doc.text("[!] Notlar:", margin + 3, yPos + 5);
    doc.setFont("DejaVuSans", "normal");
    const notesLines = doc.splitTextToSize(
      quotation.notes,
      pageWidth - margin * 2 - 20,
    );
    doc.text(notesLines, margin + 18, yPos + 5);
    yPos += 15 + 5;
  }

  yPos += 5;

  // === TEKLİF KALEMLERİ TABLOSU ===
  doc.setDrawColor(200, 200, 200);
  doc.line(margin, yPos, pageWidth - margin, yPos);
  yPos += 8;

  doc.setFontSize(11);
  doc.setFont("DejaVuSans", "bold");
  doc.text("Teklif Kalemleri", margin, yPos);
  yPos += 8;

  // Tablo başlıkları - Profesyonel teklif formatı
  const tableHeaders = [
    [
      "#",
      "Ürün/Hizmet",
      "Miktar",
      "Birim",
      "Birim Fiyat",
      "İndirim (%)",
      "Toplam",
    ],
  ];

  // Tablo satırları - quotation items'dan
  const items = quotation.items || [];
  const currency = quotation.currency || "TRY";

  const tableRows = items.map((item, index) => {
    // Backend'den gelen veri yapısı:
    // - unitPrice: Net birim fiyat
    // - discountAmount: İndirim yüzdesi (örn: 1.00 = %1, 2.00 = %2)
    // - totalPrice: Net toplam (quantity * unitPrice)

    return [
      (index + 1).toString(),
      item.itemName || "-",
      item.quantity?.toLocaleString("tr-TR") || "-",
      item.unit || "-",
      `${item.unitPrice?.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${currency}`,
      `%${item.discountAmount?.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || "0.00"}`,
      `${item.totalPrice?.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${currency}`,
    ];
  });

  // Genel toplamı kalemlerin totalPrice'larını toplayarak hesapla
  const calculatedTotal = items.reduce(
    (sum, item) => sum + (item.totalPrice || 0),
    0,
  );

  // Toplam satırı - Tablo footer'ı olarak (colspan kullanarak)
  const footerRows = [
    [
      {
        content: "GENEL TOPLAM:",
        colSpan: 3,
        styles: { halign: "left" as const, fontStyle: "bold" as const },
      },
      {
        content: `${calculatedTotal.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${currency}`,
        colSpan: 4,
        styles: { halign: "right" as const, fontStyle: "bold" as const },
      },
    ],
  ];

  // AutoTable ile tablo oluştur
  autoTable(doc, {
    startY: yPos,
    head: tableHeaders,
    body: tableRows,
    foot: footerRows,
    theme: "striped",
    didParseCell: (data) => {
      // Tüm hücreler için DejaVuSans fontu kullan
      data.cell.styles.font = "DejaVuSans";
    },
    headStyles: {
      fillColor: [41, 128, 185],
      textColor: [255, 255, 255],
      fontStyle: "bold",
      fontSize: 9,
      halign: "center",
    },
    bodyStyles: {
      fontSize: 8,
      textColor: [50, 50, 50],
    },
    footStyles: {
      fillColor: [245, 250, 255],
      textColor: [41, 128, 185],
      fontStyle: "bold",
      fontSize: 9,
      lineWidth: { top: 1.5, bottom: 0, left: 0, right: 0 },
      lineColor: [41, 128, 185],
      cellPadding: { top: 4, bottom: 4, left: 3, right: 3 },
    },
    alternateRowStyles: {
      fillColor: [250, 250, 250],
    },
    margin: { left: margin, right: margin },
    columnStyles: {
      0: { cellWidth: 10, halign: "center" }, // #
      1: { cellWidth: 50, halign: "left" }, // Ürün/Hizmet
      2: { cellWidth: 18, halign: "right" }, // Miktar
      3: { cellWidth: 12, halign: "center" }, // Birim
      4: { cellWidth: 28, halign: "right" }, // Birim Fiyat
      5: { cellWidth: 22, halign: "right" }, // İndirim
      6: { cellWidth: 30, halign: "right" }, // Toplam
    },
  });

  // Tablo sonrası pozisyon
  const finalY = (doc as any).lastAutoTable.finalY || yPos;
  yPos = finalY + 10;

  // Footer - Sayfa numarası
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setFont("DejaVuSans", "normal");
    doc.setTextColor(150, 150, 150);
    const footerText = `Sayfa ${i} / ${totalPages}`;
    const footerWidth = doc.getTextWidth(footerText);
    doc.text(
      footerText,
      pageWidth - margin - footerWidth,
      pageHeight - margin / 2,
    );
  }

  // PDF'i indir - Dosya adını düzgün formatta oluştur
  const sanitizeFileName = (text: string): string => {
    if (!text) return "";
    // Türkçe karakterleri ASCII'ye dönüştür
    const turkishMap: Record<string, string> = {
      ç: "c",
      Ç: "C",
      ğ: "g",
      Ğ: "G",
      ı: "i",
      İ: "I",
      ö: "o",
      Ö: "O",
      ş: "s",
      Ş: "S",
      ü: "u",
      Ü: "U",
    };
    let result = text.replace(
      /[çÇğĞıİöÖşŞüÜ]/g,
      (char) => turkishMap[char] || char,
    );
    // Özel karakterleri ve boşlukları temizle
    result = result.replace(/[^a-zA-Z0-9\s-]/g, "").trim();
    // Boşlukları tire ile değiştir ve ardışık tireleri tek tireye indir
    result = result.replace(/\s+/g, "-").replace(/-+/g, "-");
    return result;
  };

  const supplierName = sanitizeFileName(
    quotation.supplierCompanyName || "Tedarikci",
  );
  const rfqTitle = sanitizeFileName(rfq.title || "Teklif");
  const dateStr = new Date().toISOString().split("T")[0]; // YYYY-MM-DD formatı

  const fileName = `RFQ-${rfq.id}_${rfqTitle}_${supplierName}_${dateStr}.pdf`;
  doc.save(fileName);
};

// Helper function - Status text
const getStatusText = (status?: string): string => {
  switch (status) {
    case "DRAFT":
      return "Taslak";
    case "SUBMITTED":
      return "Gönderildi";
    case "UNDER_REVIEW":
      return "İnceleniyor";
    case "ACCEPTED":
      return "Kabul Edildi";
    case "REJECTED":
      return "Reddedildi";
    case "EXPIRED":
      return "Süresi Doldu";
    default:
      return "Bilinmiyor";
  }
};
