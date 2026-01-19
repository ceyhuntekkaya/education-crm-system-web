"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import type { SortField, SortOrder } from "../types";

/**
 * 🔄 QUOTATIONS SORT HOOK
 * Teklif sıralama işlemlerini yöneten hook
 */
export const useQuotationsSort = () => {
  // 🔄 SORTING STATE - Default "none" (sıralama yok)
  const [sortBy, setSortBy] = useState<SortField>("none");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 📋 SORT OPTIONS
  const sortOptions: { value: SortField; label: string; icon: string }[] = [
    {
      value: "none",
      label: "Seçiniz",
      icon: "ph-dots-three-outline",
    },
    {
      value: "createdAt",
      label: "Oluşturulma Tarihi",
      icon: "ph-calendar-blank",
    },
    {
      value: "totalAmount",
      label: "Toplam Tutar",
      icon: "ph-currency-circle-dollar",
    },
    { value: "validUntil", label: "Geçerlilik Tarihi", icon: "ph-clock" },
    { value: "deliveryDays", label: "Teslimat Süresi", icon: "ph-truck" },
    { value: "averageRating", label: "Ortalama Puan", icon: "ph-star" },
  ];

  const currentSortOption = sortOptions.find((opt) => opt.value === sortBy);

  // 🎯 CLICK OUTSIDE TO CLOSE DROPDOWN
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowSortDropdown(false);
      }
    };

    if (showSortDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSortDropdown]);

  /**
   * Sıralama alanını değiştir
   * Eğer aynı alan tekrar seçilirse, sıralama yönünü tersine çevir
   */
  const handleSortChange = useCallback(
    (field: SortField) => {
      if (field === sortBy) {
        // Toggle sort order
        setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
      } else {
        // Yeni alan seçildiğinde, default olarak desc yap
        setSortBy(field);
        setSortOrder("desc");
      }
    },
    [sortBy]
  );

  /**
   * Sıralama yönünü değiştir
   */
  const toggleSortOrder = useCallback(() => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  }, []);

  /**
   * Sıralama değişikliği ve dropdown kapama
   */
  const onSortChange = useCallback(
    (field: SortField) => {
      handleSortChange(field);
      setShowSortDropdown(false);
    },
    [handleSortChange]
  );

  /**
   * Dropdown toggle
   */
  const toggleSortDropdown = useCallback(() => {
    setShowSortDropdown((prev) => !prev);
  }, []);

  /**
   * Sıralamayı sıfırla (default duruma dön)
   */
  const resetSort = useCallback(() => {
    setSortBy("none");
    setSortOrder("desc");
    setShowSortDropdown(false);
  }, []);

  return {
    // State
    sortBy,
    sortOrder,
    showSortDropdown,

    // Refs
    dropdownRef,

    // Data
    sortOptions,
    currentSortOption,

    // Setters
    setSortBy,
    setSortOrder,
    setShowSortDropdown,

    // Handlers
    handleSortChange,
    toggleSortOrder,
    onSortChange,
    toggleSortDropdown,
    resetSort,
  };
};
