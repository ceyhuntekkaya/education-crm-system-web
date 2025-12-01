import React from "react";
import type { CampusConfigItem } from "../types";

/**
 * Kampüs lokasyon bilgileri konfigürasyonu
 */
export const campusLocationConfig: CampusConfigItem[] = [
  // İl Bilgileri
  {
    label: "İl Adı",
    value: (campus) => (
      <span className="text-main-600 fw-semibold">
        {campus?.province?.name}
      </span>
    ),
    isShowing: (campus) =>
      !!(campus?.province?.name && campus.province.name.trim() !== ""),
  },
  {
    label: "Plaka Kodu",
    value: (campus) => (
      <span className="bg-main-50 text-main-600 px-12 py-6 rounded-8 fw-semibold d-inline-flex align-items-center gap-4">
        <i className="ph-bold ph-car text-sm"></i>
        {campus?.province?.plateCode}
      </span>
    ),
    isShowing: (campus) =>
      !!(
        campus?.province?.plateCode && campus.province.plateCode.trim() !== ""
      ),
  },
  {
    label: "Büyükşehir Durumu",
    value: (campus) => (
      <span
        className={`px-12 py-6 rounded-8 text-sm fw-medium d-inline-flex align-items-center gap-4 ${
          campus?.province?.isMetropolitan
            ? "bg-success-50 text-success-600"
            : "bg-neutral-50 text-neutral-600"
        }`}
      >
        <i
          className={`ph-bold ${
            campus?.province?.isMetropolitan ? "ph-city" : "ph-house"
          } text-sm`}
        ></i>
        {campus?.province?.isMetropolitan ? "Büyükşehir" : "İl"}
      </span>
    ),
    isShowing: (campus) =>
      typeof campus?.province?.isMetropolitan === "boolean",
  },
  {
    label: "İldeki Toplam Okul",
    value: (campus) => (
      <div className="d-flex align-items-center gap-8">
        <i className="ph-bold ph-buildings text-primary-600"></i>
        <span className="text-primary-600 fw-semibold">
          {campus?.province?.schoolCount?.toLocaleString()} okul
        </span>
      </div>
    ),
    isShowing: (campus) =>
      !!(campus?.province?.schoolCount && campus.province.schoolCount > 0),
  },
  // İlçe Bilgileri
  {
    label: "İlçe Adı",
    value: (campus) => (
      <span className="text-success-600 fw-semibold">
        {campus?.district?.name}
      </span>
    ),
    isShowing: (campus) =>
      !!(campus?.district?.name && campus.district.name.trim() !== ""),
  },
  {
    label: "İlçe Türü",
    value: (campus) => (
      <span className="bg-info-50 text-info-600 px-12 py-6 rounded-8 text-sm fw-medium d-inline-flex align-items-center gap-4">
        <i className="ph-bold ph-map-pin-area text-sm"></i>
        {campus?.district?.districtType === "MERKEZ"
          ? "Merkez İlçe"
          : campus?.district?.districtType}
      </span>
    ),
    isShowing: (campus) =>
      !!(
        campus?.district?.districtType &&
        campus.district.districtType.trim() !== ""
      ),
  },
  {
    label: "Merkez Statüsü",
    value: (campus) => (
      <span
        className={`px-12 py-6 rounded-8 text-sm fw-medium d-inline-flex align-items-center gap-4 ${
          campus?.district?.isCentral
            ? "bg-warning-50 text-warning-600"
            : "bg-neutral-50 text-neutral-600"
        }`}
      >
        <i
          className={`ph-bold ${
            campus?.district?.isCentral ? "ph-star" : "ph-circle"
          } text-sm`}
        ></i>
        {campus?.district?.isCentral ? "Merkez İlçe" : "Taşra İlçe"}
      </span>
    ),
    isShowing: (campus) => typeof campus?.district?.isCentral === "boolean",
  },
  {
    label: "İlçedeki Okul Sayısı",
    value: (campus) => (
      <div className="d-flex align-items-center gap-8">
        <i className="ph-bold ph-graduation-cap text-success-600"></i>
        <span className="text-success-600 fw-semibold">
          {campus?.district?.schoolCount?.toLocaleString()} okul
        </span>
      </div>
    ),
    isShowing: (campus) =>
      !!(campus?.district?.schoolCount && campus.district.schoolCount > 0),
  },
  {
    label: "Sosyoekonomik Seviye",
    value: (campus) => (
      <span className="bg-primary-50 text-primary-600 px-12 py-6 rounded-8 fw-semibold d-inline-flex align-items-center gap-4">
        <i className="ph-bold ph-trend-up text-sm"></i>
        {campus?.district?.socioeconomicLevel === "UPPER_MIDDLE"
          ? "Üst Orta Gelir"
          : campus?.district?.socioeconomicLevel === "HIGH"
          ? "Üst Gelir"
          : campus?.district?.socioeconomicLevel === "MIDDLE"
          ? "Orta Gelir"
          : campus?.district?.socioeconomicLevel === "LOWER_MIDDLE"
          ? "Alt Orta Gelir"
          : campus?.district?.socioeconomicLevel === "LOW"
          ? "Alt Gelir"
          : campus?.district?.socioeconomicLevel}
      </span>
    ),
    isShowing: (campus) =>
      !!(
        campus?.district?.socioeconomicLevel &&
        campus.district.socioeconomicLevel.trim() !== ""
      ),
  },
  // Ülke Bilgileri
  {
    label: "Ülke",
    value: (campus) => (
      <div className="d-flex align-items-center gap-8">
        {campus?.country?.flagEmoji && (
          <span className="text-xl">{campus.country.flagEmoji}</span>
        )}
        <span className="text-main-600 fw-semibold">
          {campus?.country?.name}
        </span>
        {campus?.country?.phoneCode && (
          <span className="text-neutral-500 text-sm">
            ({campus.country.phoneCode})
          </span>
        )}
      </div>
    ),
    isShowing: (campus) => !!campus?.country?.name,
  },
  // Adres Detayları
  {
    label: "Adres Satırı 1",
    value: (campus) => (
      <span className="text-neutral-700">
        <i className="ph ph-map-pin me-8"></i>
        {campus?.addressLine1}
      </span>
    ),
    isShowing: (campus) =>
      !!(campus?.addressLine1 && campus.addressLine1.trim() !== ""),
  },
  {
    label: "Adres Satırı 2",
    value: (campus) => (
      <span className="text-neutral-700">
        <i className="ph ph-map-pin me-8"></i>
        {campus?.addressLine2}
      </span>
    ),
    isShowing: (campus) =>
      !!(campus?.addressLine2 && campus.addressLine2.trim() !== ""),
  },
  {
    label: "Posta Kodu",
    value: (campus) => (
      <span className="bg-neutral-50 text-neutral-600 px-12 py-6 rounded-8 fw-medium d-inline-flex align-items-center gap-4">
        <i className="ph-bold ph-hash text-sm"></i>
        {campus?.postalCode}
      </span>
    ),
    isShowing: (campus) =>
      !!(campus?.postalCode && campus.postalCode.trim() !== ""),
  },
  {
    label: "Konum (Koordinatlar)",
    value: (campus) =>
      campus?.latitude &&
      campus?.longitude &&
      (campus.latitude !== 0 || campus.longitude !== 0) ? (
        <a
          href={`https://www.google.com/maps?q=${campus.latitude},${campus.longitude}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-main-600 text-decoration-none d-flex align-items-center gap-8"
        >
          <i className="ph ph-map-trifold"></i>
          <span>
            Haritada Gör ({campus.latitude.toFixed(6)},{" "}
            {campus.longitude.toFixed(6)})
          </span>
          <i className="ph ph-arrow-square-out text-xs"></i>
        </a>
      ) : (
        <span className="text-neutral-500">Konum bilgisi mevcut değil</span>
      ),
    isShowing: (campus) =>
      !!(
        campus?.latitude &&
        campus?.longitude &&
        (campus.latitude !== 0 || campus.longitude !== 0)
      ),
  },
];
