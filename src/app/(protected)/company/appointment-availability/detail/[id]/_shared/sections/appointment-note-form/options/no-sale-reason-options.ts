export interface NoSaleReasonOption {
  label: string;
  value: string;
}

export const noSaleReasonOptions: NoSaleReasonOption[] = [
  { label: "Rakip Ziyareti", value: "Rakip Ziyareti" },
  { label: "Fiyat Pahalı", value: "Fiyat Pahalı" },
  { label: "Düşünmek İstiyorum", value: "Düşünmek İstiyorum" },
  { label: "Eşime Sormam Lazım", value: "Eşime Sormam Lazım" },
  { label: "Mesafe Problemi", value: "Mesafe Problemi" },
  { label: "Zaman Uyumsuzluğu", value: "Zaman Uyumsuzluğu" },
  { label: "İlgisizlik", value: "İlgisizlik" },
  { label: "Bütçe Sorunu", value: "Bütçe Sorunu" },
  { label: "Diğer", value: "Diğer" },
];
