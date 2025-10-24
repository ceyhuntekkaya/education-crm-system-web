import { useState } from "react";
import { GalleryItemDto } from "@/types";

/**
 * Hook for managing gallery item selection state
 */
export const useGalleryItemSelection = () => {
  const [selectedItem, setSelectedItem] = useState<GalleryItemDto | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  // Item seçildiğinde
  const handleItemSelect = (item: GalleryItemDto | null) => {
    setSelectedItem(item);
    setIsAddingNew(false);

    // Form bölümüne scroll yap (item seçildiğinde)
    if (item) {
      setTimeout(() => {
        const formSection = document.querySelector(
          ".gallery-items-form__form-section"
        );
        if (formSection) {
          formSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  };

  // Yeni ekle butonuna basıldığında
  const handleAddNew = () => {
    setSelectedItem(null);
    setIsAddingNew(true);

    // Form bölümüne scroll yap (yeni ekleme modunda)
    setTimeout(() => {
      const formSection = document.querySelector(
        ".gallery-items-form__form-section"
      );
      if (formSection) {
        formSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  // Item card'a tıklandığında (toggle logic)
  const handleItemClick = (item: GalleryItemDto) => {
    // Aynı item'a tekrar tıklanırsa seçimi kaldır
    if (selectedItem?.id === item.id) {
      handleItemSelect(null);
    } else {
      handleItemSelect(item);
    }
  };

  return {
    selectedItem,
    isAddingNew,
    setSelectedItem,
    setIsAddingNew,
    handleItemSelect,
    handleAddNew,
    handleItemClick,
  };
};
