/**
 * 📜 SCROLL UTILITIES
 * Sayfa kaydırma işlemleri için yardımcı fonksiyonlar
 */

/**
 * Sayfayı en üste kaydırır (smooth animasyon ile)
 */
export const scrollToTop = (behavior: ScrollBehavior = "smooth"): void => {
  if (typeof window !== "undefined") {
    window.scrollTo({
      top: 0,
      behavior,
    });
  }
};

/**
 * Sayfayı belirli bir Y koordinatına kaydırır
 * @param top - Kaydırılacak Y koordinatı
 * @param behavior - Kaydırma davranışı ('smooth' veya 'auto')
 */
export const scrollToPosition = (
  top: number,
  behavior: ScrollBehavior = "smooth"
): void => {
  if (typeof window !== "undefined") {
    window.scrollTo({
      top,
      behavior,
    });
  }
};

/**
 * Belirli bir elementi görünür alana kaydırır
 * @param elementId - Element ID'si
 * @param behavior - Kaydırma davranışı
 * @param block - Dikey hizalama ('start', 'center', 'end', 'nearest')
 */
export const scrollToElement = (
  elementId: string,
  behavior: ScrollBehavior = "smooth",
  block: "start" | "center" | "end" | "nearest" = "start"
): void => {
  if (typeof window !== "undefined") {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({
        behavior,
        block,
      });
    }
  }
};

/**
 * Mevcut scroll pozisyonunu döndürür
 * @returns Mevcut Y koordinatı
 */
export const getScrollPosition = (): number => {
  if (typeof window !== "undefined") {
    return window.scrollY || window.pageYOffset;
  }
  return 0;
};

/**
 * Sayfanın en üstte olup olmadığını kontrol eder
 * @param threshold - Threshold değeri (varsayılan: 0)
 * @returns Boolean
 */
export const isAtTop = (threshold: number = 0): boolean => {
  return getScrollPosition() <= threshold;
};

/**
 * Sayfanın en altta olup olmadığını kontrol eder
 * @param threshold - Threshold değeri (varsayılan: 0)
 * @returns Boolean
 */
export const isAtBottom = (threshold: number = 0): boolean => {
  if (typeof window !== "undefined") {
    const scrollPosition = window.scrollY + window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    return scrollPosition >= documentHeight - threshold;
  }
  return false;
};
