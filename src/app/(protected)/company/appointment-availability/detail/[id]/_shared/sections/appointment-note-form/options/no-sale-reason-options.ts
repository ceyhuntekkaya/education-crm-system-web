export interface NoSaleReasonOption {
  label: string;
  value: string;
}

export const noSaleReasonOptions: NoSaleReasonOption[] = [
  { label: "Rakip Ziyareti", value: "competitor_visit" },
  { label: "Fiyat Pahalı", value: "price_expensive" },
  { label: "Düşünmek İstiyorum", value: "need_to_think" },
  { label: "Eşime Sormam Lazım", value: "need_to_ask_spouse" },
  { label: "Mesafe Problemi", value: "distance_problem" },
  { label: "Zaman Uyumsuzluğu", value: "timing_issue" },
  { label: "İlgisizlik", value: "not_interested" },
  { label: "Bütçe Sorunu", value: "budget_issue" },
  { label: "Diğer", value: "other" },
];
