import { useEffect } from "react";

/**
 * Sayfa başlığını dinamik olarak ayarlamak için hook
 * @param title - Sayfa başlığı
 * @param suffix - Başlık soneki (varsayılan: "Eğitim İste")
 */
export const usePageTitle = (title: string, suffix: string = "Eğitim İste") => {
  useEffect(() => {
    const fullTitle = suffix ? `${title} | ${suffix}` : title;
    document.title = fullTitle;

    // Cleanup: önceki başlığa dön (opsiyonel)
    return () => {
      // Sayfa değiştiğinde Next.js kendi yönetsin
    };
  }, [title, suffix]);
};

export default usePageTitle;
