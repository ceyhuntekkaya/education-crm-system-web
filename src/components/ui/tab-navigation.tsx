"use client";

import React, { useState, useEffect, useRef } from "react";
import { TabItem } from "./types";
import { Icon } from "./icon";
import { Button } from "./button";
import { useResponsive } from "@/hooks";

// TabNavigation component props
interface TabNavigationProps {
  tabs: TabItem[];
  navigationId?: string;
  allowMultiline?: boolean;
  size?: "xxs" | "xs" | "sm" | "md" | "lg";
  onTabChange?: (tabId: string) => void;
  iconOnly?: boolean;
  center?: boolean;
}

/**
 * TabNavigation Component
 * Dinamik tab navigation yapısı
 *
 * @param tabs - Tab item dizisi
 * @param navigationId - Navigation container ID'si
 * @param allowMultiline - Çoklu satır desteği
 * @param size - Tab boyutu (xxs, xs, sm, md, lg)
 * @param onTabChange - Tab değişim callback fonksiyonu
 * @param iconOnly - Sadece icon göster (yazılar sadece aktif tab'da görünür)
 * @param center - İçeriği yatay olarak ortala
 */
export default function TabNavigation({
  tabs,
  navigationId = "pills-tab",
  allowMultiline = true,
  size = "md",
  onTabChange,
  iconOnly = false,
  center = false,
}: TabNavigationProps) {
  const [activeTabId, setActiveTabId] = useState<string>(() => {
    // İlk açılışta aktif olan tab'ı bul, yoksa ilk tab'ı aktif yap
    const activeTab = tabs.find((tab) => tab.isActive);
    return activeTab ? activeTab.id : tabs[0]?.id || "";
  });

  const [isScrollable, setIsScrollable] = useState(false);
  const tabsRef = useRef<HTMLUListElement>(null);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const hasDraggedRef = useRef(false);

  // Responsive hook kullanımı
  const { isMobile } = useResponsive();

  // Tabs prop'u değiştiğinde activeTabId'yi güncelle
  useEffect(() => {
    const activeTab = tabs.find((tab) => tab.isActive);
    if (activeTab) {
      setActiveTabId(activeTab.id);
    }
  }, [tabs]);

  // Scrollable durumunu kontrol et
  useEffect(() => {
    const checkScrollable = () => {
      if (tabsRef.current && iconOnly) {
        const { scrollWidth, clientWidth } = tabsRef.current;
        setIsScrollable(scrollWidth > clientWidth);
      }
    };

    checkScrollable();
    window.addEventListener("resize", checkScrollable);

    return () => window.removeEventListener("resize", checkScrollable);
  }, [tabs, iconOnly]);

  // Mouse wheel scroll - sadece icon-only modunda
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!iconOnly || !tabsRef.current || !isScrollable) return;

      e.preventDefault();
      const scrollAmount = e.deltaY * 0.5; // Smooth scroll
      tabsRef.current.scrollLeft += scrollAmount;
    };

    const tabsElement = tabsRef.current;
    if (tabsElement && iconOnly) {
      tabsElement.addEventListener("wheel", handleWheel, { passive: false });

      return () => {
        tabsElement.removeEventListener("wheel", handleWheel);
      };
    }
  }, [iconOnly, isScrollable]);

  // Drag to scroll - mouse ve touch desteği
  useEffect(() => {
    let isDown = false;
    const DRAG_THRESHOLD = 5; // 5px hareket etmeden tıklama sayılır

    const handleStart = (clientX: number) => {
      if (!iconOnly || !isScrollable) return;

      isDown = true;
      hasDraggedRef.current = false; // Reset drag flag
      startXRef.current = clientX - (tabsRef.current?.offsetLeft || 0);
      scrollLeftRef.current = tabsRef.current?.scrollLeft || 0;

      if (tabsRef.current && !isMobile) {
        tabsRef.current.style.cursor = "grabbing";
        tabsRef.current.style.userSelect = "none";
      }
    };

    const handleEnd = () => {
      isDown = false;
      // Kısa bir süre sonra drag flag'i resetle
      setTimeout(() => {
        hasDraggedRef.current = false;
      }, 100);
      if (tabsRef.current && !isMobile) {
        tabsRef.current.style.cursor = "grab";
        tabsRef.current.style.userSelect = "auto";
      }
    };

    const handleMove = (clientX: number, preventDefault = false) => {
      if (!isDown || !iconOnly || !tabsRef.current) return;

      const x = clientX - (tabsRef.current.offsetLeft || 0);
      const deltaX = Math.abs(x - startXRef.current);

      // Eğer threshold'ı geçtiyse drag olarak işaretlr
      if (deltaX > DRAG_THRESHOLD) {
        hasDraggedRef.current = true;
      }

      if (hasDraggedRef.current) {
        const walk = (x - startXRef.current) * 1.5; // Scroll speed
        tabsRef.current.scrollLeft = scrollLeftRef.current - walk;
      }
    };

    // Mouse events
    const handleMouseDown = (e: MouseEvent) => handleStart(e.pageX);
    const handleMouseUp = () => handleEnd();
    const handleMouseLeave = () => handleEnd();
    const handleMouseMove = (e: MouseEvent) => {
      if (isDown) e.preventDefault();
      handleMove(e.pageX);
    };

    // Touch events
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        handleStart(e.touches[0].clientX);
      }
    };
    const handleTouchEnd = () => handleEnd();
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        handleMove(e.touches[0].clientX, true);
      }
    };

    const tabsElement = tabsRef.current;
    if (tabsElement && iconOnly) {
      // Mouse events
      tabsElement.addEventListener("mousedown", handleMouseDown);
      tabsElement.addEventListener("mouseleave", handleMouseLeave);
      tabsElement.addEventListener("mouseup", handleMouseUp);
      tabsElement.addEventListener("mousemove", handleMouseMove);

      // Touch events
      tabsElement.addEventListener("touchstart", handleTouchStart, {
        passive: true,
      });
      tabsElement.addEventListener("touchend", handleTouchEnd, {
        passive: true,
      });
      tabsElement.addEventListener("touchmove", handleTouchMove, {
        passive: true,
      });

      // Initial cursor style
      if (isScrollable && !isMobile) {
        tabsElement.style.cursor = "grab";
      }

      return () => {
        tabsElement.removeEventListener("mousedown", handleMouseDown);
        tabsElement.removeEventListener("mouseleave", handleMouseLeave);
        tabsElement.removeEventListener("mouseup", handleMouseUp);
        tabsElement.removeEventListener("mousemove", handleMouseMove);
        tabsElement.removeEventListener("touchstart", handleTouchStart);
        tabsElement.removeEventListener("touchend", handleTouchEnd);
        tabsElement.removeEventListener("touchmove", handleTouchMove);
        tabsElement.style.cursor = "auto";
        tabsElement.style.userSelect = "auto";
      };
    }
  }, [iconOnly, isScrollable, isMobile]);

  const handleTabClick = (
    e: React.MouseEvent | React.TouchEvent,
    tabId: string
  ) => {
    // Sadece gerçekten drag yapıldıysa engelle
    if (hasDraggedRef.current) {
      e.preventDefault();
      return;
    }

    setActiveTabId(tabId);
    onTabChange?.(tabId);
  };

  // Tab'ların aktif durumunu internal state'e göre ayarla - sadece bir tab aktif olabilir
  const processedTabs = tabs.map((tab) => ({
    ...tab,
    isActive: tab.id === activeTabId,
  }));
  const getSizeClasses = () => {
    // Mobile için optimize edilmiş padding ve gap
    if (isMobile) {
      return iconOnly ? "gap-8 p-8" : "gap-6 p-6";
    }

    switch (size) {
      case "xxs":
        return "gap-4 p-4";
      case "xs":
        return "gap-6 p-6";
      case "sm":
        return "gap-8 p-8";
      case "lg":
        return "gap-20 p-20";
      default: // md
        return "gap-16 p-16";
    }
  };

  const getButtonSizeClasses = () => {
    if (iconOnly) {
      // Mobile için optimize edilmiş boyutlar (sadece icon-only inactive'ler için)
      if (isMobile) {
        return "px-10 py-8 text-sm min-w-[44px] min-h-[44px] transition-all duration-300 flex items-center justify-center";
      }

      // Icon-only mode için optimize edilmiş padding'ler
      switch (size) {
        case "xxs":
          return "px-4 py-3 text-xs min-w-fit min-h-[36px] transition-all duration-300 flex items-center justify-center";
        case "xs":
          return "px-6 py-4 text-sm min-w-fit min-h-[40px] transition-all duration-300 flex items-center justify-center";
        case "sm":
          return "px-8 py-5 text-sm min-w-fit min-h-[44px] transition-all duration-300 flex items-center justify-center";
        case "lg":
          return "px-12 py-8 text-lg min-w-fit min-h-[52px] transition-all duration-300 flex items-center justify-center";
        default: // md
          return "px-10 py-6 text-md min-w-fit min-h-[48px] transition-all duration-300 flex items-center justify-center";
      }
    } else {
      // Mobile için daha küçük padding'ler
      if (isMobile) {
        return "px-12 py-6 text-sm min-h-[44px] transition-all duration-300";
      }

      // Normal mode
      switch (size) {
        case "xxs":
          return "px-8 py-4 text-xs min-h-[36px] transition-all duration-300";
        case "xs":
          return "px-10 py-5 text-sm min-h-[40px] transition-all duration-300";
        case "sm":
          return "px-12 py-6 text-sm min-h-[44px] transition-all duration-300";
        case "lg":
          return "px-20 py-12 text-lg min-h-[52px] transition-all duration-300";
        default: // md
          return "px-16 py-8 text-md min-h-[48px] transition-all duration-300";
      }
    }
  };

  return (
    <ul
      ref={tabsRef}
      className={`nav nav-pills common-tab d-flex bg-white border border-neutral-30 rounded-12 ${getSizeClasses()} ${
        iconOnly
          ? `overflow-x-auto flex-nowrap ${isScrollable ? "scrollable" : ""} ${
              isMobile ? "mobile-scroll" : ""
            }`
          : allowMultiline
          ? "flex-wrap multiline"
          : "overflow-auto"
      } ${center && !iconOnly ? "justify-content-center" : ""}`}
      id={navigationId}
      role="tablist"
      style={{
        WebkitOverflowScrolling: "touch",
        scrollbarWidth: isMobile ? "none" : "thin",
        msOverflowStyle: isMobile ? "none" : "auto",
      }}
    >
      {processedTabs.map((tab) => {
        // Helper functions to avoid repetition
        const getIconSize = (): "sm" | "md" | "lg" => {
          return size === "xxs" || size === "xs"
            ? "sm"
            : size === "lg"
            ? "lg"
            : "md";
        };

        const getButtonSize = (): "xxs" | "xs" | "sm" | "md" => {
          return size === "xxs"
            ? "xxs"
            : size === "xs"
            ? "xs"
            : size === "lg"
            ? "md"
            : "sm";
        };

        const getCommonProps = () => ({
          onClick: (e: React.MouseEvent | React.TouchEvent) =>
            handleTabClick(e, tab.id),
          "data-bs-toggle": "pill",
          "data-bs-target": `#${tab.id}`,
          role: "tab",
        });

        const getTabStyles = (isActiveButton = false) => ({
          ...(isActiveButton && {
            "--bs-nav-pills-link-active-bg": "var(--bs-main-600)",
            "--bs-nav-pills-link-active-color": "white",
          }),
          ...(!isActiveButton && {
            position: "relative" as const,
            whiteSpace: "nowrap" as const,
          }),
        });

        // Determine which component to render
        // Icon-only modda sadece inactive'ler icon olarak gösterilir (hem mobil hem desktop)
        const shouldUseIcon = iconOnly && !tab.isActive;

        const buttonElement = shouldUseIcon ? (
          <Icon
            icon={tab.icon}
            variant="inline"
            size={getIconSize()}
            hoverText={isMobile ? undefined : tab.label || tab.title}
            className={`nav-link tab-button-animate tab-icon-only ${getButtonSizeClasses()} touch-target ${
              tab.isActive ? "active" : ""
            }`}
            aria-label={tab.label || tab.title}
            aria-selected={tab.isActive}
            animate="fade-up"
            disabled={false}
            loading={false}
            style={{
              ...getTabStyles(false),
              touchAction: "manipulation",
              WebkitTapHighlightColor: "transparent",
              transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
            {...getCommonProps()}
          />
        ) : (
          <Button
            variant={tab.isActive ? "inline" : "outline"}
            size={getButtonSize()}
            leftIcon={tab.icon}
            className={`nav-link tab-button-animate tab-full ${getButtonSizeClasses()} ${
              tab.isActive ? "active" : ""
            } touch-target`}
            aria-controls={tab.id}
            aria-selected={tab.isActive ? "true" : "false"}
            style={{
              ...getTabStyles(true),
              touchAction: "manipulation",
              WebkitTapHighlightColor: "transparent",
              transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
            {...getCommonProps()}
          >
            {tab.label || tab.title}
          </Button>
        );

        return (
          <li
            key={tab.id}
            className="nav-item flex-shrink-0"
            role="presentation"
          >
            {buttonElement}
          </li>
        );
      })}
    </ul>
  );
}
