import React from "react";
import type { VisibilityItemConfig } from "../types";
import { translateVisibility } from "../utils";

/**
 * Görünürlük ve erişim konfigürasyonu
 */
export const visibilityConfig: VisibilityItemConfig[] = [
  {
    label: "Görünürlük Durumu",
    value: (gallery) => {
      const visibility = gallery?.visibility;
      const badgeClass =
        visibility === "PUBLIC"
          ? "bg-success-subtle text-success"
          : visibility === "PRIVATE"
          ? "bg-danger-subtle text-danger"
          : visibility === "REGISTERED_ONLY"
          ? "bg-warning-subtle text-warning"
          : "bg-secondary-subtle text-secondary";

      const icon =
        visibility === "PUBLIC"
          ? "ph-globe"
          : visibility === "PRIVATE"
          ? "ph-lock"
          : visibility === "REGISTERED_ONLY"
          ? "ph-users"
          : "ph-question";

      return (
        <span className={`badge fw-semibold ${badgeClass}`}>
          <i className={`ph ${icon} me-1`}></i>
          {translateVisibility(gallery?.visibility)}
        </span>
      );
    },
    isShowing: (gallery) => !!gallery?.visibility,
  },
  {
    label: "Galeri Durumu",
    value: (gallery) => (
      <span
        className={`badge fw-semibold ${
          gallery?.isActive
            ? "bg-success-subtle text-success"
            : "bg-danger-subtle text-danger"
        }`}
      >
        <i
          className={`ph ${
            gallery?.isActive ? "ph-check-circle" : "ph-x-circle"
          } me-1`}
        ></i>
        {gallery?.isActive ? "Aktif" : "Pasif"}
      </span>
    ),
    isShowing: (gallery) => gallery?.isActive !== undefined,
  },
];
