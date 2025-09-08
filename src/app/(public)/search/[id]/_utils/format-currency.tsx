/**
 * Para birimi formatlaması için yardımcı fonksiyon
 * @param amount - Formatlanacak miktar
 * @returns Türk Lirası formatında string
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
  }).format(amount);
};
