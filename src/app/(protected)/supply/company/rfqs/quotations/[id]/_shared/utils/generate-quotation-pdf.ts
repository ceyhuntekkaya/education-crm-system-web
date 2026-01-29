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

  // === HEADER BÖLÜMÜ (Kompakt) ===
  doc.setFillColor(41, 128, 185);
  doc.rect(0, 0, pageWidth, 18, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.setFont("DejaVuSans", "bold");
  doc.text("TEKLİF TALEBİ (RFQ)", margin, 12);

  // Tarih ve RFQ No - Sağ Üstte (tek satır)
  doc.setFontSize(9);
  doc.setFont("DejaVuSans", "normal");
  const rfqNoText = `RFQ #${rfq.id || "N/A"}`;
  const dateText = formatDate(new Date().toISOString());
  const headerRightText = `${dateText}  |  ${rfqNoText}`;
  const headerRightWidth = doc.getTextWidth(headerRightText);
  doc.text(headerRightText, pageWidth - margin - headerRightWidth, 12);

  doc.setTextColor(50, 50, 50);
  yPos = 26;

  // RFQ Başlık (dengeli boşluklar)
  doc.setFontSize(11);
  doc.setFont("DejaVuSans", "bold");
  doc.setTextColor(41, 128, 185);
  const title = rfq.title || "Temel İhtiyaçlar";
  doc.text(title, margin, yPos);
  doc.setTextColor(50, 50, 50);
  yPos += 6;

  // === İKİ KOLON: MÜŞTERİ VE TEDARİKÇİ BİLGİLERİ ===
  const columnWidth = (pageWidth - margin * 2 - 6) / 2;
  const leftColumnX = margin;
  const rightColumnX = margin + columnWidth + 6;
  const boxStartY = yPos;
  const boxHeight = 28;

  // Sol Kutu - Müşteri Bilgileri
  doc.setDrawColor(220, 220, 220);
  doc.setLineWidth(0.3);
  doc.setFillColor(252, 252, 252);
  doc.roundedRect(leftColumnX, yPos, columnWidth, boxHeight, 2, 2, "FD");

  // Başlık çizgisi
  doc.setFillColor(41, 128, 185);
  doc.roundedRect(leftColumnX, yPos, columnWidth, 6, 2, 2, "F");
  doc.rect(leftColumnX, yPos + 3, columnWidth, 3, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(8);
  doc.setFont("DejaVuSans", "bold");
  doc.text("Müşteri Bilgileri", leftColumnX + 3, yPos + 4.5);
  doc.setTextColor(50, 50, 50);

  let leftYPos = yPos + 10;
  doc.setFontSize(7);

  const customerData = [
    {
      label: "Firma:",
      value: companyInfo?.name || rfq.companyName || "-",
    },
    { label: "Tel:", value: companyInfo?.phone || "-" },
    { label: "E-posta:", value: companyInfo?.email || "-" },
  ];

  customerData.forEach((item) => {
    doc.setFont("DejaVuSans", "bold");
    doc.text(item.label, leftColumnX + 3, leftYPos);
    doc.setFont("DejaVuSans", "normal");
    const maxWidth = columnWidth - 22;
    let displayValue = item.value;
    if (doc.getTextWidth(displayValue) > maxWidth) {
      while (
        doc.getTextWidth(displayValue + "...") > maxWidth &&
        displayValue.length > 0
      ) {
        displayValue = displayValue.slice(0, -1);
      }
      displayValue += "...";
    }
    doc.text(displayValue, leftColumnX + 18, leftYPos);
    leftYPos += 5;
  });

  // Sağ Kutu - Tedarikçi Bilgileri
  yPos = boxStartY;
  doc.setFillColor(252, 252, 252);
  doc.roundedRect(rightColumnX, yPos, columnWidth, boxHeight, 2, 2, "FD");

  // Başlık çizgisi
  doc.setFillColor(41, 128, 185);
  doc.roundedRect(rightColumnX, yPos, columnWidth, 6, 2, 2, "F");
  doc.rect(rightColumnX, yPos + 3, columnWidth, 3, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(8);
  doc.setFont("DejaVuSans", "bold");
  doc.text("Tedarikçi Bilgileri", rightColumnX + 3, yPos + 4.5);
  doc.setTextColor(50, 50, 50);

  let rightYPos = yPos + 10;
  doc.setFontSize(7);

  const supplierData = [
    { label: "Firma:", value: quotation.supplierCompanyName || "-" },
    {
      label: "Teklif:",
      value: `#${quotation.quotationId || "-"} (v${quotation.versionNumber || "1"})`,
    },
    {
      label: "Puan:",
      value: quotation.averageRating ? `★ ${quotation.averageRating}/5.0` : "-",
    },
  ];

  supplierData.forEach((item) => {
    doc.setFont("DejaVuSans", "bold");
    doc.text(item.label, rightColumnX + 3, rightYPos);
    doc.setFont("DejaVuSans", "normal");
    const maxWidth = columnWidth - 20;
    let displayValue = item.value;
    if (doc.getTextWidth(displayValue) > maxWidth) {
      while (
        doc.getTextWidth(displayValue + "...") > maxWidth &&
        displayValue.length > 0
      ) {
        displayValue = displayValue.slice(0, -1);
      }
      displayValue += "...";
    }
    doc.text(displayValue, rightColumnX + 16, rightYPos);
    rightYPos += 5;
  });

  // Y pozisyonunu kutulardan sonraya ayarla
  yPos = boxStartY + boxHeight + 8;

  // === TEKLİF DETAYLARI ===
  // Bölüm başlığı
  doc.setFontSize(10);
  doc.setFont("DejaVuSans", "bold");
  doc.setTextColor(41, 128, 185);
  doc.text("Teklif Detayları", margin, yPos);
  doc.setTextColor(50, 50, 50);
  yPos += 2;

  // İnce çizgi
  doc.setDrawColor(41, 128, 185);
  doc.setLineWidth(0.4);
  doc.line(margin, yPos, margin + 30, yPos);
  yPos += 5;

  // Detay grid kutusu
  doc.setFillColor(250, 250, 252);
  doc.setDrawColor(230, 230, 230);
  doc.setLineWidth(0.3);

  // 3 kolon layout
  const detailColWidth = (pageWidth - margin * 2) / 3;
  doc.setFontSize(7);

  // Satır 1: RFQ Tipi | Durum | Teslimat Süresi
  const row1 = [
    {
      label: "RFQ Tipi:",
      value: rfq.rfqType === "OPEN" ? "Açık İhale" : "Davetli İhale",
      labelWidth: 18,
    },
    { label: "Durum:", value: getStatusText(quotation.status), labelWidth: 14 },
    {
      label: "Teslimat:",
      value: quotation.deliveryDays ? `${quotation.deliveryDays} gün` : "-",
      labelWidth: 18,
    },
  ];

  // Satır 2: Son Başvuru | Beklenen Teslimat | Geçerlilik (tarihler)
  const row2 = [
    {
      label: "Son Başvuru:",
      value: rfq.submissionDeadline ? formatDate(rfq.submissionDeadline) : "-",
      labelWidth: 22,
    },
    {
      label: "Bek. Teslimat:",
      value: rfq.expectedDeliveryDate
        ? formatDate(rfq.expectedDeliveryDate)
        : "-",
      labelWidth: 26,
    },
    {
      label: "Geçerlilik:",
      value: quotation.validUntil ? formatDate(quotation.validUntil) : "-",
      labelWidth: 20,
    },
  ];

  // Satır 1 render
  row1.forEach((item, idx) => {
    const colX = margin + idx * detailColWidth;
    doc.setFont("DejaVuSans", "bold");
    doc.text(item.label, colX, yPos);
    doc.setFont("DejaVuSans", "normal");
    doc.text(item.value, colX + item.labelWidth, yPos);
  });
  yPos += 5;

  // Satır 2 render - 3 kolon tarihler
  row2.forEach((item, idx) => {
    const colX = margin + idx * detailColWidth;
    doc.setFont("DejaVuSans", "bold");
    doc.text(item.label, colX, yPos);
    doc.setFont("DejaVuSans", "normal");
    doc.text(item.value, colX + item.labelWidth, yPos);
  });
  yPos += 6;

  // Ödeme ve Garanti Koşulları - Tam genişlik (uzun metin desteği)
  const paymentTerms = quotation.paymentTerms || rfq.paymentTerms || "-";
  const warrantyTerms = quotation.warrantyTerms || "-";

  // Ödeme Koşulları
  doc.setFont("DejaVuSans", "bold");
  doc.text("Ödeme Koşulları:", margin, yPos);
  doc.setFont("DejaVuSans", "normal");
  const paymentLines = doc.splitTextToSize(
    paymentTerms,
    pageWidth - margin * 2 - 32,
  );
  doc.text(paymentLines.slice(0, 2), margin + 30, yPos);
  yPos += Math.min(paymentLines.length, 2) * 4 + 2;

  // Garanti Koşulları
  doc.setFont("DejaVuSans", "bold");
  doc.text("Garanti Koşulları:", margin, yPos);
  doc.setFont("DejaVuSans", "normal");
  const warrantyLines = doc.splitTextToSize(
    warrantyTerms,
    pageWidth - margin * 2 - 32,
  );
  doc.text(warrantyLines.slice(0, 2), margin + 32, yPos);
  yPos += Math.min(warrantyLines.length, 2) * 4 + 2;

  // Notlar
  if (quotation.notes) {
    yPos += 2;
    doc.setFillColor(255, 251, 230);
    doc.setDrawColor(255, 193, 7);
    doc.setLineWidth(0.3);
    const notesLines = doc.splitTextToSize(
      quotation.notes,
      pageWidth - margin * 2 - 14,
    );
    const displayLines = notesLines.slice(0, 3);
    const notesHeight = displayLines.length * 3.5 + 5;
    doc.roundedRect(
      margin,
      yPos,
      pageWidth - margin * 2,
      notesHeight,
      1.5,
      1.5,
      "FD",
    );

    doc.setFontSize(7);
    doc.setFont("DejaVuSans", "bold");
    doc.setTextColor(180, 130, 0);
    doc.text("Not:", margin + 3, yPos + 4);
    doc.setFont("DejaVuSans", "normal");
    doc.setTextColor(80, 70, 40);
    doc.text(displayLines, margin + 12, yPos + 4);
    doc.setTextColor(50, 50, 50);
    yPos += notesHeight + 4;
  }

  // === TEKLİF KALEMLERİ TABLOSU ===
  yPos += 6;

  // Bölüm başlığı
  doc.setFontSize(10);
  doc.setFont("DejaVuSans", "bold");
  doc.setTextColor(41, 128, 185);
  doc.text("Teklif Kalemleri", margin, yPos);
  doc.setTextColor(50, 50, 50);
  yPos += 2;

  // İnce çizgi
  doc.setDrawColor(41, 128, 185);
  doc.setLineWidth(0.4);
  doc.line(margin, yPos, margin + 28, yPos);
  yPos += 4;

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

  // AutoTable ile tablo oluştur (Kompakt)
  autoTable(doc, {
    startY: yPos,
    head: tableHeaders,
    body: tableRows,
    foot: footerRows,
    theme: "striped",
    didParseCell: (data) => {
      data.cell.styles.font = "DejaVuSans";
    },
    headStyles: {
      fillColor: [41, 128, 185],
      textColor: [255, 255, 255],
      fontStyle: "bold",
      fontSize: 7,
      halign: "center",
      cellPadding: { top: 2, bottom: 2, left: 2, right: 2 },
    },
    bodyStyles: {
      fontSize: 7,
      textColor: [50, 50, 50],
      cellPadding: { top: 1.5, bottom: 1.5, left: 2, right: 2 },
    },
    footStyles: {
      fillColor: [245, 250, 255],
      textColor: [41, 128, 185],
      fontStyle: "bold",
      fontSize: 8,
      lineWidth: { top: 0.5, bottom: 0, left: 0, right: 0 },
      lineColor: [41, 128, 185],
      cellPadding: { top: 2, bottom: 2, left: 2, right: 2 },
    },
    alternateRowStyles: {
      fillColor: [250, 250, 250],
    },
    margin: { left: margin, right: margin },
    columnStyles: {
      0: { cellWidth: 10, halign: "center" }, // #
      1: { cellWidth: "auto", halign: "left" }, // Ürün/Hizmet - auto genişlik
      2: { cellWidth: 20, halign: "right" }, // Miktar
      3: { cellWidth: 18, halign: "center" }, // Birim
      4: { cellWidth: 30, halign: "right" }, // Birim Fiyat
      5: { cellWidth: 22, halign: "right" }, // İndirim
      6: { cellWidth: 35, halign: "right" }, // Toplam
    },
  });

  // Tablo sonrası pozisyon
  const finalY = (doc as any).lastAutoTable.finalY || yPos;
  yPos = finalY + 10;

  // === SAYFA 2+ : KALEM DETAYLARI ===
  // Her kalem için detaylı kart görünümü
  if (items.length > 0) {
    doc.addPage();
    yPos = margin;

    // Sayfa başlığı
    doc.setFillColor(41, 128, 185);
    doc.rect(0, 0, pageWidth, 14, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(12);
    doc.setFont("DejaVuSans", "bold");
    doc.text("Kalem Detayları", margin, 9);
    doc.setFontSize(8);
    doc.setFont("DejaVuSans", "normal");
    const subHeaderText = `${rfq.title || "Teklif"} - ${quotation.supplierCompanyName || "Tedarikçi"}`;
    const subHeaderWidth = doc.getTextWidth(subHeaderText);
    doc.text(subHeaderText, pageWidth - margin - subHeaderWidth, 9);
    doc.setTextColor(50, 50, 50);
    yPos = 20;

    // Kart boyutları - UI/UX uyumlu kompakt tasarım
    const cardWidth = (pageWidth - margin * 2 - 10) / 2;
    const cardGap = 10;
    const cardHeight = 32;

    items.forEach((item, index) => {
      // Sayfa kontrolü
      if (yPos + cardHeight > pageHeight - 15) {
        doc.addPage();
        yPos = margin;
        doc.setFillColor(41, 128, 185);
        doc.rect(0, 0, pageWidth, 12, "F");
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(10);
        doc.setFont("DejaVuSans", "bold");
        doc.text("Kalem Detayları (devam)", margin, 8);
        doc.setTextColor(50, 50, 50);
        yPos = 18;
      }

      // Kart pozisyonu (2 sütunlu grid)
      const colIndex = index % 2;
      const cardX = margin + colIndex * (cardWidth + cardGap);

      // Her 2 kartta bir yeni satır
      if (index > 0 && colIndex === 0) {
        yPos += cardHeight + 5;
        if (yPos + cardHeight > pageHeight - 15) {
          doc.addPage();
          yPos = margin;
          doc.setFillColor(41, 128, 185);
          doc.rect(0, 0, pageWidth, 12, "F");
          doc.setTextColor(255, 255, 255);
          doc.setFontSize(10);
          doc.setFont("DejaVuSans", "bold");
          doc.text("Kalem Detayları (devam)", margin, 8);
          doc.setTextColor(50, 50, 50);
          yPos = 18;
        }
      }

      // Değerler
      const qty = item.quantity || 0;
      const price = item.unitPrice || 0;
      const disc = item.discountAmount || 0;
      const subtotal = qty * price;
      const discAmt = subtotal * (disc / 100);
      const total = item.totalPrice || subtotal - discAmt;

      // Kart çerçevesi
      doc.setFillColor(255, 255, 255);
      doc.setDrawColor(180, 190, 200);
      doc.setLineWidth(0.3);
      doc.roundedRect(cardX, yPos, cardWidth, cardHeight, 1.5, 1.5, "FD");

      // Başlık bar
      doc.setFillColor(41, 128, 185);
      doc.roundedRect(cardX, yPos, cardWidth, 6, 1.5, 1.5, "F");
      doc.rect(cardX, yPos + 3, cardWidth, 3, "F");

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(6.5);
      doc.setFont("DejaVuSans", "bold");
      const title = `#${index + 1}  ${item.itemName || "Ürün"}`;
      doc.text(
        title.length > 35 ? title.substring(0, 32) + "..." : title,
        cardX + 2,
        yPos + 4.2,
      );

      // İçerik alanı
      doc.setTextColor(60, 60, 60);
      doc.setFontSize(6);

      // Satır 1: Label'lar
      const y1 = yPos + 10;
      doc.setFont("DejaVuSans", "bold");
      doc.setTextColor(120, 120, 120);
      doc.text("Miktar", cardX + 2, y1);
      doc.text("B.Fiyat", cardX + 28, y1);
      doc.text("İnd.", cardX + 52, y1);
      doc.text("Toplam", cardX + cardWidth - 22, y1);

      // Satır 2: Değerler
      const y2 = yPos + 14;
      doc.setFont("DejaVuSans", "normal");
      doc.setTextColor(40, 40, 40);
      doc.text(`${qty} ${(item.unit || "ad").substring(0, 4)}`, cardX + 2, y2);
      doc.text(
        `${price.toLocaleString("tr-TR", { minimumFractionDigits: 2 })}`,
        cardX + 28,
        y2,
      );

      if (disc > 0) {
        doc.setTextColor(200, 50, 50);
        doc.text(`%${disc.toFixed(2)}`, cardX + 52, y2);
      } else {
        doc.setTextColor(150, 150, 150);
        doc.text("-", cardX + 52, y2);
      }

      doc.setTextColor(41, 128, 185);
      doc.setFont("DejaVuSans", "bold");
      doc.text(
        `${total.toLocaleString("tr-TR", { minimumFractionDigits: 2 })}`,
        cardX + cardWidth - 22,
        y2,
      );

      // Hesaplama detay kutusu (alt kısım)
      const y3 = yPos + 18;
      doc.setDrawColor(220, 225, 230);
      doc.line(cardX + 2, y3, cardX + cardWidth - 2, y3);

      doc.setFillColor(248, 250, 252);
      doc.rect(cardX + 1, y3 + 1, cardWidth - 2, 12, "F");

      // Hesaplama formülü - tek satırda tüm bilgi
      // Format: 400 adet × 61,00 ₺ = 24.400,00 ₺ − %7 (1.708,00 ₺) = 22.692,00 ₺
      const y4 = yPos + 24;
      doc.setFontSize(5);
      doc.setFont("DejaVuSans", "normal");
      doc.setTextColor(70, 70, 70);

      const unit = (item.unit || "adet").toLowerCase();
      const currSymbol = currency === "TRY" ? "₺" : currency;

      if (disc > 0) {
        // İndirimli hesaplama
        const formula1 = `${qty} ${unit} × ${price.toLocaleString("tr-TR", { minimumFractionDigits: 2 })} ${currSymbol}`;
        const formula2 = `= ${subtotal.toLocaleString("tr-TR", { minimumFractionDigits: 2 })} ${currSymbol}`;
        const formula3 = `− %${disc.toFixed(0)} (${discAmt.toLocaleString("tr-TR", { minimumFractionDigits: 2 })} ${currSymbol})`;

        doc.text(formula1, cardX + 3, y4);
        doc.text(formula2, cardX + 3, y4 + 3.5);
        doc.setTextColor(200, 50, 50);
        doc.text(formula3, cardX + 30, y4 + 3.5);

        // Son fiyat - sağ alt
        doc.setTextColor(41, 128, 185);
        doc.setFont("DejaVuSans", "bold");
        doc.setFontSize(6);
        const finalText = `= ${total.toLocaleString("tr-TR", { minimumFractionDigits: 2 })} ${currSymbol}`;
        doc.text(
          finalText,
          cardX + cardWidth - 3 - doc.getTextWidth(finalText),
          y4 + 3.5,
        );
      } else {
        // İndirimsiz hesaplama
        const formula = `${qty} ${unit} × ${price.toLocaleString("tr-TR", { minimumFractionDigits: 2 })} ${currSymbol} = ${subtotal.toLocaleString("tr-TR", { minimumFractionDigits: 2 })} ${currSymbol}`;
        doc.text(formula, cardX + 3, y4 + 1.5);

        // Toplam - sağ alt
        doc.setTextColor(41, 128, 185);
        doc.setFont("DejaVuSans", "bold");
        doc.setFontSize(6);
        const finalText = `${total.toLocaleString("tr-TR", { minimumFractionDigits: 2 })} ${currSymbol}`;
        doc.text(
          finalText,
          cardX + cardWidth - 3 - doc.getTextWidth(finalText),
          y4 + 1.5,
        );
      }

      doc.setTextColor(50, 50, 50);
    });

    yPos += cardHeight + 5;
  }

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
