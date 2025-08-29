export enum InvoiceStatus {
  DRAFT = "DRAFT", // Taslak
  SENT = "SENT", // Gönderildi
  VIEWED = "VIEWED", // Görüntülendi
  PAID = "PAID", // Ödendi
  OVERDUE = "OVERDUE", // Vadesi geçti
  CANCELED = "CANCELED", // İptal edildi
  REFUNDED = "REFUNDED", // İade edildi
  DISPUTED = "DISPUTED", // Anlaşmazlık
}
