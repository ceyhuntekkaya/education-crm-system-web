import { useRef, useEffect, RefObject, useState, useCallback } from "react";

export interface ScrollToOptions {
  /**
   * Scroll davranışı (smooth veya auto)
   * @default "smooth"
   */
  behavior?: ScrollBehavior;

  /**
   * Scroll hizalaması (start, center, end, nearest)
   * @default "start"
   */
  block?: ScrollLogicalPosition;

  /**
   * Yatay scroll hizalaması
   * @default "nearest"
   */
  inline?: ScrollLogicalPosition;

  /**
   * Scroll gecikme süresi (ms)
   * @default 0
   */
  delay?: number;

  /**
   * Scroll öncesi çalışacak callback
   */
  onBeforeScroll?: () => void;

  /**
   * Scroll sonrası çalışacak callback
   */
  onAfterScroll?: () => void;
}

export interface UseScrollToElementOptions extends ScrollToOptions {
  /**
   * Scroll işlemini tetikleyecek bağımlılıklar
   */
  dependencies?: any[];

  /**
   * İlk render'da scroll yapılmasını engelle
   * @default false
   */
  skipFirstRender?: boolean;
}

export interface ScrollPosition {
  x: number;
  y: number;
}

export interface ScrollInfo {
  /**
   * Mevcut scroll pozisyonu
   */
  position: ScrollPosition;

  /**
   * Scroll yönü
   */
  direction: "up" | "down" | "left" | "right" | null;

  /**
   * Sayfanın en üstünde mi?
   */
  isTop: boolean;

  /**
   * Sayfanın en altında mı?
   */
  isBottom: boolean;

  /**
   * Sayfa yüksekliği
   */
  pageHeight: number;

  /**
   * Görünen alan yüksekliği
   */
  viewportHeight: number;
}

export interface UseScrollReturn<T extends HTMLElement> {
  /**
   * Scroll yapılacak elementin ref'i
   */
  ref: RefObject<T>;

  /**
   * Ref'e bağlı elemente scroll yapar
   */
  scrollToElement: (options?: ScrollToOptions) => void;

  /**
   * Sayfanın en üstüne scroll yapar
   */
  scrollToTop: (options?: ScrollToOptions) => void;

  /**
   * Sayfanın en altına scroll yapar
   */
  scrollToBottom: (options?: ScrollToOptions) => void;

  /**
   * Belirli bir pozisyona scroll yapar
   */
  scrollToPosition: (x: number, y: number, options?: ScrollToOptions) => void;

  /**
   * Belirli bir offset kadar scroll yapar
   */
  scrollBy: (x: number, y: number, options?: ScrollToOptions) => void;

  /**
   * Mevcut scroll bilgileri
   */
  scrollInfo: ScrollInfo;
}

/**
 * Genel scroll işlemleri için custom hook
 *
 * @param options - Scroll seçenekleri
 * @returns Scroll fonksiyonları ve bilgileri
 *
 * @example
 * ```tsx
 * // Element'e scroll
 * const { ref, scrollToElement } = useScroll({ dependencies: [activeTab] });
 * return <div ref={ref}>Content</div>;
 * ```
 *
 * @example
 * ```tsx
 * // Sayfa kontrolü
 * const { scrollToTop, scrollToBottom, scrollInfo } = useScroll();
 *
 * return (
 *   <div>
 *     <button onClick={() => scrollToTop()}>Yukarı</button>
 *     <button onClick={() => scrollToBottom()}>Aşağı</button>
 *     <p>Pozisyon: {scrollInfo.position.y}</p>
 *     <p>Yön: {scrollInfo.direction}</p>
 *   </div>
 * );
 * ```
 *
 * @example
 * ```tsx
 * // Gelişmiş kullanım
 * const { scrollToPosition, scrollBy, scrollInfo } = useScroll();
 *
 * return (
 *   <div>
 *     <button onClick={() => scrollToPosition(0, 500, { behavior: "smooth" })}>
 *       500px'e git
 *     </button>
 *     <button onClick={() => scrollBy(0, 100, { delay: 200 })}>
 *       100px aşağı
 *     </button>
 *     {scrollInfo.isBottom && <p>Sayfa sonuna ulaştınız</p>}
 *   </div>
 * );
 * ```
 */
export function useScroll<T extends HTMLElement = HTMLDivElement>(
  options: UseScrollToElementOptions = {}
): UseScrollReturn<T> {
  const {
    behavior = "smooth",
    block = "start",
    inline = "nearest",
    dependencies = [],
    delay = 0,
    onBeforeScroll,
    onAfterScroll,
    skipFirstRender = false,
  } = options;

  const ref = useRef<T>(null);
  const isFirstRender = useRef(true);
  const [scrollInfo, setScrollInfo] = useState<ScrollInfo>({
    position: { x: 0, y: 0 },
    direction: null,
    isTop: true,
    isBottom: false,
    pageHeight: 0,
    viewportHeight: 0,
  });
  const previousScrollY = useRef(0);

  // Scroll pozisyonunu güncelle
  const updateScrollInfo = useCallback(() => {
    const currentScrollY = window.scrollY;
    const currentScrollX = window.scrollX;
    const pageHeight = document.documentElement.scrollHeight;
    const viewportHeight = window.innerHeight;
    const isTop = currentScrollY === 0;
    const isBottom = currentScrollY + viewportHeight >= pageHeight - 1;

    let direction: ScrollInfo["direction"] = null;
    if (currentScrollY > previousScrollY.current) {
      direction = "down";
    } else if (currentScrollY < previousScrollY.current) {
      direction = "up";
    }

    setScrollInfo({
      position: { x: currentScrollX, y: currentScrollY },
      direction,
      isTop,
      isBottom,
      pageHeight,
      viewportHeight,
    });

    previousScrollY.current = currentScrollY;
  }, []);

  // Scroll event listener
  useEffect(() => {
    updateScrollInfo();
    window.addEventListener("scroll", updateScrollInfo, { passive: true });
    window.addEventListener("resize", updateScrollInfo, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateScrollInfo);
      window.removeEventListener("resize", updateScrollInfo);
    };
  }, [updateScrollInfo]);

  // Scroll işlemini gerçekleştir
  const performScroll = useCallback(
    (scrollFn: () => void, opts?: ScrollToOptions) => {
      const scrollOptions = { ...options, ...opts };

      scrollOptions.onBeforeScroll?.();

      const execute = () => {
        scrollFn();
        scrollOptions.onAfterScroll?.();
      };

      if (scrollOptions.delay && scrollOptions.delay > 0) {
        setTimeout(execute, scrollOptions.delay);
      } else {
        execute();
      }
    },
    [options]
  );

  // Element'e scroll
  const scrollToElement = useCallback(
    (opts?: ScrollToOptions) => {
      if (ref.current) {
        const scrollOptions = { behavior, block, inline, ...opts };
        performScroll(() => {
          ref.current?.scrollIntoView({
            behavior: scrollOptions.behavior,
            block: scrollOptions.block,
            inline: scrollOptions.inline,
          });
        }, opts);
      }
    },
    [behavior, block, inline, performScroll]
  );

  // Sayfanın en üstüne scroll
  const scrollToTop = useCallback(
    (opts?: ScrollToOptions) => {
      const scrollOptions = { behavior, ...opts };
      performScroll(() => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: scrollOptions.behavior,
        });
      }, opts);
    },
    [behavior, performScroll]
  );

  // Sayfanın en altına scroll
  const scrollToBottom = useCallback(
    (opts?: ScrollToOptions) => {
      const scrollOptions = { behavior, ...opts };
      performScroll(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          left: 0,
          behavior: scrollOptions.behavior,
        });
      }, opts);
    },
    [behavior, performScroll]
  );

  // Belirli pozisyona scroll
  const scrollToPosition = useCallback(
    (x: number, y: number, opts?: ScrollToOptions) => {
      const scrollOptions = { behavior, ...opts };
      performScroll(() => {
        window.scrollTo({
          top: y,
          left: x,
          behavior: scrollOptions.behavior,
        });
      }, opts);
    },
    [behavior, performScroll]
  );

  // Offset kadar scroll
  const scrollBy = useCallback(
    (x: number, y: number, opts?: ScrollToOptions) => {
      const scrollOptions = { behavior, ...opts };
      performScroll(() => {
        window.scrollBy({
          top: y,
          left: x,
          behavior: scrollOptions.behavior,
        });
      }, opts);
    },
    [behavior, performScroll]
  );

  // Dependencies değiştiğinde otomatik scroll
  useEffect(() => {
    if (dependencies.length > 0) {
      // İlk render'ı atla
      if (skipFirstRender && isFirstRender.current) {
        isFirstRender.current = false;
        return;
      }
      scrollToElement();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return {
    ref,
    scrollToElement,
    scrollToTop,
    scrollToBottom,
    scrollToPosition,
    scrollBy,
    scrollInfo,
  };
}

// Geriye dönük uyumluluk için alias
export const useScrollToElement = useScroll;
