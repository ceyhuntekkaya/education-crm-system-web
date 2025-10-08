"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components";
import { SocialMediaActionButtonsProps } from "../types";

export const SocialMediaActionButtons: React.FC<
  SocialMediaActionButtonsProps
> = ({
  post,
  onViewDetails,
  onEdit,
  onToggleStatus,
  onDelete,
  onDuplicate,
  onViewPost,
  onPin,
  onFeature,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDropdownItemClick = (action?: () => void) => {
    if (action) {
      action();
    }
    setIsDropdownOpen(false);
  };

  return (
    <div className="d-flex align-items-center gap-1">
      <div title="Gönderiyi Görüntüle">
        <Button
          variant="outline"
          size="xs"
          leftIcon="ph-eye"
          onClick={() => onViewPost?.(post)}
        >
          <span className="d-none d-md-inline">Görüntüle</span>
        </Button>
      </div>

      <div className="position-relative" ref={dropdownRef}>
        <div title="Daha Fazla İşlem">
          <Button
            variant="outline"
            size="xs"
            leftIcon="ph-dots-three-vertical"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {""}
          </Button>
        </div>

        {isDropdownOpen && (
          <div
            className="position-absolute top-100 end-0 mt-1 bg-white border border-neutral-100 rounded-8 shadow-sm z-3 py-1"
            style={{ minWidth: "180px" }}
          >
            <button
              type="button"
              className="d-flex align-items-center gap-2 w-100 px-3 py-2 border-0 bg-transparent text-start hover-bg-neutral-25 transition-2"
              onClick={() =>
                handleDropdownItemClick(() => onViewDetails?.(post))
              }
            >
              <i className="ph ph-info text-sm" />
              <span className="text-sm">Detayları Görüntüle</span>
            </button>

            <button
              type="button"
              className="d-flex align-items-center gap-2 w-100 px-3 py-2 border-0 bg-transparent text-start hover-bg-neutral-25 transition-2"
              onClick={() => handleDropdownItemClick(() => onEdit?.(post))}
            >
              <i className="ph ph-pencil-simple text-sm" />
              <span className="text-sm">Düzenle</span>
            </button>

            <button
              type="button"
              className="d-flex align-items-center gap-2 w-100 px-3 py-2 border-0 bg-transparent text-start hover-bg-neutral-25 transition-2"
              onClick={() => handleDropdownItemClick(() => onDuplicate?.(post))}
            >
              <i className="ph ph-copy text-sm" />
              <span className="text-sm">Kopyala</span>
            </button>

            <hr className="my-1 border-neutral-100" />

            <button
              type="button"
              className="d-flex align-items-center gap-2 w-100 px-3 py-2 border-0 bg-transparent text-start hover-bg-neutral-25 transition-2"
              onClick={() => handleDropdownItemClick(() => onPin?.(post))}
            >
              <i
                className={`ph ${
                  post.isPinned ? "ph-push-pin-slash" : "ph-push-pin"
                } text-sm`}
              />
              <span className="text-sm">
                {post.isPinned ? "Sabitlemeyi Kaldır" : "Sabitle"}
              </span>
            </button>

            <button
              type="button"
              className="d-flex align-items-center gap-2 w-100 px-3 py-2 border-0 bg-transparent text-start hover-bg-neutral-25 transition-2"
              onClick={() => handleDropdownItemClick(() => onFeature?.(post))}
            >
              <i
                className={`ph ${
                  post.isFeatured ? "ph-star-slash" : "ph-star"
                } text-sm`}
              />
              <span className="text-sm">
                {post.isFeatured ? "Öne Çıkarmayı Kaldır" : "Öne Çıkar"}
              </span>
            </button>

            <button
              type="button"
              className="d-flex align-items-center gap-2 w-100 px-3 py-2 border-0 bg-transparent text-start hover-bg-neutral-25 transition-2"
              onClick={() =>
                handleDropdownItemClick(() => onToggleStatus?.(post))
              }
            >
              <i
                className={`ph ${
                  post.status === "PUBLISHED" ? "ph-archive" : "ph-upload"
                } text-sm`}
              />
              <span className="text-sm">
                {post.status === "PUBLISHED" ? "Arşivle" : "Yayınla"}
              </span>
            </button>

            <button
              type="button"
              className="d-flex align-items-center gap-2 w-100 px-3 py-2 border-0 bg-transparent text-start hover-bg-neutral-25 transition-2 text-danger"
              onClick={() => handleDropdownItemClick(() => onDelete?.(post))}
            >
              <i className="ph ph-trash text-sm" />
              <span className="text-sm">Sil</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
