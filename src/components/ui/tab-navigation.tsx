"use client";

import React, { useState, useEffect, useRef } from "react";
import { TabItem } from "./types";

// TabNavigation component props
interface TabNavigationProps {
  tabs: TabItem[];
  navigationId?: string;
  allowMultiline?: boolean;
  size?: "xxs" | "xs" | "sm" | "md" | "lg";
  onTabChange?: (tabId: string) => void;
  iconOnly?: boolean;
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
 */
export default function TabNavigation({
  tabs,
  navigationId = "pills-tab",
  allowMultiline = true,
  size = "md",
  onTabChange,
  iconOnly = false,
}: TabNavigationProps) {
  const [activeTabId, setActiveTabId] = useState<string>(() => {
    // İlk açılışta aktif olan tab'ı bul, yoksa ilk tab'ı aktif yap
    const activeTab = tabs.find((tab) => tab.isActive);
    return activeTab ? activeTab.id : tabs[0]?.id || "";
  });

  const [isScrollable, setIsScrollable] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const tabsRef = useRef<HTMLUListElement>(null);

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

  // Drag to scroll - sadece icon-only modunda
  useEffect(() => {
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    const handleMouseDown = (e: MouseEvent) => {
      if (!iconOnly || !isScrollable) return;

      isDown = true;
      setIsDragging(true);
      startX = e.pageX - (tabsRef.current?.offsetLeft || 0);
      scrollLeft = tabsRef.current?.scrollLeft || 0;

      if (tabsRef.current) {
        tabsRef.current.style.cursor = "grabbing";
        tabsRef.current.style.userSelect = "none";
      }
    };

    const handleMouseLeave = () => {
      isDown = false;
      setIsDragging(false);
      if (tabsRef.current) {
        tabsRef.current.style.cursor = "grab";
        tabsRef.current.style.userSelect = "auto";
      }
    };

    const handleMouseUp = () => {
      isDown = false;
      setIsDragging(false);
      if (tabsRef.current) {
        tabsRef.current.style.cursor = "grab";
        tabsRef.current.style.userSelect = "auto";
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDown || !iconOnly || !tabsRef.current) return;

      e.preventDefault();
      const x = e.pageX - (tabsRef.current.offsetLeft || 0);
      const walk = (x - startX) * 1.5; // Scroll speed
      tabsRef.current.scrollLeft = scrollLeft - walk;
    };

    const tabsElement = tabsRef.current;
    if (tabsElement && iconOnly) {
      tabsElement.addEventListener("mousedown", handleMouseDown);
      tabsElement.addEventListener("mouseleave", handleMouseLeave);
      tabsElement.addEventListener("mouseup", handleMouseUp);
      tabsElement.addEventListener("mousemove", handleMouseMove);

      // Initial cursor style
      if (isScrollable) {
        tabsElement.style.cursor = "grab";
      }

      return () => {
        tabsElement.removeEventListener("mousedown", handleMouseDown);
        tabsElement.removeEventListener("mouseleave", handleMouseLeave);
        tabsElement.removeEventListener("mouseup", handleMouseUp);
        tabsElement.removeEventListener("mousemove", handleMouseMove);
        tabsElement.style.cursor = "auto";
        tabsElement.style.userSelect = "auto";
      };
    }
  }, [iconOnly, isScrollable]);

  const handleTabClick = (tabId: string) => {
    // Drag sırasında tab tıklamayı engelle
    if (isDragging) return;

    setActiveTabId(tabId);
    onTabChange?.(tabId);
  };

  // Tab'ların aktif durumunu internal state'e göre ayarla
  const processedTabs = tabs.map((tab) => ({
    ...tab,
    isActive: tab.id === activeTabId,
  }));
  const getSizeClasses = () => {
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
      // Icon-only mode için daha küçük padding'ler
      switch (size) {
        case "xxs":
          return "px-6 py-4 text-xs";
        case "xs":
          return "px-8 py-5 text-sm";
        case "sm":
          return "px-10 py-6 text-sm";
        case "lg":
          return "px-16 py-12 text-lg";
        default: // md
          return "px-12 py-8 text-md";
      }
    } else {
      // Normal mode
      switch (size) {
        case "xxs":
          return "px-8 py-4 text-xs";
        case "xs":
          return "px-10 py-5 text-sm";
        case "sm":
          return "px-12 py-6 text-sm";
        case "lg":
          return "px-20 py-12 text-lg";
        default: // md
          return "px-16 py-8 text-md";
      }
    }
  };

  return (
    <ul
      ref={tabsRef}
      className={`nav nav-pills common-tab d-flex bg-white border border-neutral-30 rounded-12 ${getSizeClasses()} ${
        iconOnly
          ? `overflow-x-auto flex-nowrap ${isScrollable ? "scrollable" : ""}`
          : allowMultiline
          ? "flex-wrap multiline"
          : "overflow-auto"
      }`}
      id={navigationId}
      role="tablist"
    >
      {processedTabs.map((tab, index) => {
        const buttonElement = (
          <button
            className={`nav-link rounded-pill bg-main-25 fw-medium text-neutral-500 d-flex align-items-center border-0 transition-all ${getButtonSizeClasses()} ${
              tab.isActive === true ? "active" : ""
            } ${
              iconOnly
                ? `tab-button-animate ${
                    tab.isActive ? "tab-full" : "tab-icon-only"
                  }`
                : "gap-8"
            }`}
            id={`${tab.id}-tab`}
            data-bs-toggle="pill"
            data-bs-target={`#${tab.id}`}
            type="button"
            role="tab"
            aria-controls={tab.id}
            aria-selected={tab.isActive === true ? "true" : "false"}
            onClick={() => handleTabClick(tab.id)}
          >
            <i
              className={`tab-icon ${
                size === "xxs"
                  ? "text-sm"
                  : size === "xs"
                  ? "text-md"
                  : size === "sm"
                  ? "text-lg"
                  : size === "lg"
                  ? "text-2xl"
                  : "text-xl" // md
              } text-main-600 d-flex ${tab.icon}`}
            />
            <span className={`text-nowrap tab-text-animate`}>
              {tab.label || tab.title}
            </span>
          </button>
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
