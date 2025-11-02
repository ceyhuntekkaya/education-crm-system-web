import React from "react";
import type { UserConfigItem } from "../types";

/**
 * Kullanıcı adres bilgileri konfigürasyonu
 */
export const userAddressInfoConfig: UserConfigItem[] = [
  {
    label: "Ülke",
    value: (user) => (
      <span className="text-neutral-700">
        <i className="ph ph-globe me-2"></i>
        {user?.country?.name || "Belirtilmemiş"}
      </span>
    ),
    isShowing: (user) => !!user?.country?.name,
  },
  {
    label: "İl",
    value: (user) => (
      <span className="text-neutral-700">
        <i className="ph ph-map-pin me-2"></i>
        {user?.province?.name || "Belirtilmemiş"}
      </span>
    ),
    isShowing: (user) => !!user?.province?.name,
  },
  {
    label: "İlçe",
    value: (user) => (
      <span className="text-neutral-700">
        {user?.district?.name || "Belirtilmemiş"}
      </span>
    ),
    isShowing: (user) => !!user?.district?.name,
  },
  {
    label: "Mahalle",
    value: (user) => (
      <span className="text-neutral-700">
        {user?.neighborhood?.name || "Belirtilmemiş"}
      </span>
    ),
    isShowing: (user) => !!user?.neighborhood?.name,
  },
  {
    label: "Adres Satırı 1",
    value: (user) => (
      <span className="text-neutral-700">
        {user?.addressLine1 || "Belirtilmemiş"}
      </span>
    ),
    isShowing: (user) => !!user?.addressLine1,
  },
  {
    label: "Adres Satırı 2",
    value: (user) => (
      <span className="text-neutral-700">
        {user?.addressLine2 || "Belirtilmemiş"}
      </span>
    ),
    isShowing: (user) => !!user?.addressLine2,
  },
  {
    label: "Posta Kodu",
    value: (user) => (
      <code className="bg-neutral-50 px-8 py-4 rounded-4 text-sm">
        {user?.postalCode || "Belirtilmemiş"}
      </code>
    ),
    isShowing: (user) => !!user?.postalCode,
  },
  {
    label: "Koordinatlar",
    value: (user) =>
      user?.latitude && user?.longitude ? (
        <span className="text-neutral-700">
          <i className="ph ph-map-trifold me-2"></i>
          {user.latitude.toFixed(6)}, {user.longitude.toFixed(6)}
        </span>
      ) : (
        <span className="text-neutral-500">Belirtilmemiş</span>
      ),
    isShowing: (user) => !!(user?.latitude && user?.longitude),
  },
];
