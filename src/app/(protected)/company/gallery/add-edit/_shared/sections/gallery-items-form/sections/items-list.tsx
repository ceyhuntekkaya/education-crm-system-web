"use client";

import React from "react";
import { GalleryItemCard } from "../components";
import { GalleryItemDto } from "@/types";

interface GalleryItemsListProps {
  items: GalleryItemDto[];
  selectedItem: GalleryItemDto | null;
  onItemSelect: (item: GalleryItemDto | null) => void;
  onAddNew: () => void;
}

export const GalleryItemsList: React.FC<GalleryItemsListProps> = ({
  items,
  selectedItem,
  onItemSelect,
  onAddNew,
}) => {
  const handleItemClick = (item: GalleryItemDto) => {
    // Aynı item'a tekrar tıklanırsa seçimi kaldır
    if (selectedItem?.id === item.id) {
      onItemSelect(null);
    } else {
      onItemSelect(item);
    }
  };

  return (
    <div className="gallery-items-list">
      <div className="row g-3">
        {/* Mevcut Items */}
        {items.map((item) => (
          <div key={item.id} className="col-3">
            <GalleryItemCard
              item={item}
              isSelected={selectedItem?.id === item.id}
              onClick={handleItemClick}
            />
          </div>
        ))}

        {/* Add New Card - Her zaman göster */}
        <div className="col-3">
          <div
            className="gallery-item-card gallery-item-card--add-new bg-white rounded-12 h-100 box-shadow-sm cursor-pointer transition-all d-flex align-items-center justify-content-center"
            onClick={onAddNew}
          >
            <div className="text-center">
              <div className="gallery-item-card__add-icon mb-12">
                <i
                  className="ph ph-plus-circle"
                  style={{ fontSize: "48px" }}
                ></i>
              </div>
              <h6 className="mb-4">Yeni Ekle</h6>
              <p className="text-sm text-neutral-600 mb-0">
                Yeni medya öğesi ekleyin
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
