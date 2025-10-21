/**
 * Para formatını TL olarak formatlayan fonksiyon
 * @param amount - Formatlanacak miktar
 * @param includeSymbol - Para birimi sembolü eklensin mi (varsayılan: true)
 * @returns Formatlanmış para string'i
 */
export const formatCurrency = (
  amount: number,
  includeSymbol: boolean = true
): string => {
  const formatted = new Intl.NumberFormat("tr-TR", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);

  return includeSymbol ? `₺${formatted}` : formatted;
};

/**
 * Yıllık indirim hesaplama
 * @param monthlyPrice - Aylık fiyat
 * @param yearlyPrice - Yıllık fiyat
 * @returns İndirim yüzdesi
 */
export const calculateYearlyDiscount = (
  monthlyPrice: number,
  yearlyPrice: number
): number => {
  const yearlyMonthly = monthlyPrice * 12;
  const discount = ((yearlyMonthly - yearlyPrice) / yearlyMonthly) * 100;
  return Math.round(discount);
};

/**
 * Yıllık fiyatı hesaplama (indirim ile)
 * @param monthlyPrice - Aylık fiyat
 * @param discountPercent - İndirim yüzdesi
 * @returns Yıllık fiyat
 */
export const calculateYearlyPrice = (
  monthlyPrice: number,
  discountPercent: number
): number => {
  const yearlyPrice = monthlyPrice * 12;
  return yearlyPrice - (yearlyPrice * discountPercent) / 100;
};

/**
 * Aylık eşdeğer fiyat hesaplama
 * @param yearlyPrice - Yıllık fiyat
 * @returns Aylık eşdeğer fiyat
 */
export const getMonthlyEquivalent = (yearlyPrice: number): number => {
  return yearlyPrice / 12;
};
