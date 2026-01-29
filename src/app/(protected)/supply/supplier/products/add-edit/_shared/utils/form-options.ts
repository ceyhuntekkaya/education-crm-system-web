/**
 * Form options for product add-edit form
 */

export const statusOptions = [
  { value: "ACTIVE", label: "Aktif" },
  { value: "PASSIVE", label: "Pasif" },
  { value: "OUT_OF_STOCK", label: "Stokta Yok" },
  { value: "DISCONTINUED", label: "Üretimi Durduruldu" },
];

export const stockTrackingTypeOptions = [
  { value: "UNLIMITED", label: "Sınırsız" },
  { value: "LIMITED", label: "Sınırlı" },
];

export const currencyOptions = [
  { value: "TRY", label: "TRY - Türk Lirası" },
  { value: "USD", label: "USD - Amerikan Doları" },
  { value: "EUR", label: "EUR - Euro" },
  { value: "GBP", label: "GBP - İngiliz Sterlini" },
  { value: "CHF", label: "CHF - İsviçre Frangı" },
  { value: "CAD", label: "CAD - Kanada Doları" },
  { value: "AUD", label: "AUD - Avustralya Doları" },
  { value: "JPY", label: "JPY - Japon Yeni" },
  { value: "CNY", label: "CNY - Çin Yuanı" },
  { value: "RUB", label: "RUB - Rus Rublesi" },
  { value: "SAR", label: "SAR - Suudi Arabistan Riyali" },
  { value: "AED", label: "AED - BAE Dirhemi" },
  { value: "QAR", label: "QAR - Katar Riyali" },
  { value: "KWD", label: "KWD - Kuveyt Dinarı" },
  { value: "BHD", label: "BHD - Bahreyn Dinarı" },
];

export const discountTypeOptions = [
  { value: "FIXED_AMOUNT", label: "Sabit Tutar" },
  { value: "PERCENTAGE", label: "Yüzde" },
  { value: "FREE_MONTHS", label: "Ücretsiz Ay" },
  { value: "BUY_X_GET_Y", label: "X Al Y Öde" },
  { value: "TIERED", label: "Kademeli" },
  { value: "BUNDLE", label: "Paket" },
  { value: "NO_DISCOUNT", label: "İndirim Yok" },
];
