import React from "react";
import type { CampusConfigItem } from "../types";
import { formatPhoneNumber } from "@/utils";

/**
 * Kampüs iletişim bilgileri konfigürasyonu
 */
export const campusContactConfig: CampusConfigItem[] = [
  {
    label: "E-posta",
    value: (campus) =>
      campus?.email ? (
        <a
          href={`mailto:${campus.email}`}
          className="text-main-600 text-decoration-none d-inline-flex align-items-center gap-8"
        >
          <span className="bg-main-50 text-main-600 px-8 py-4 rounded-8 d-inline-flex align-items-center gap-4">
            <i className="ph ph-envelope"></i>
            {campus.email}
          </span>
        </a>
      ) : (
        <span className="text-neutral-500">E-posta mevcut değil</span>
      ),
    isShowing: (campus) => !!campus?.email,
  },
  {
    label: "Telefon",
    value: (campus) =>
      campus?.phone ? (
        <a
          href={`tel:${campus.phone.replace(/\D/g, "")}`}
          className="text-success-600 text-decoration-none d-inline-flex align-items-center gap-8"
        >
          <span className="bg-success-50 text-success-600 px-12 py-6 rounded-8 fw-medium d-inline-flex align-items-center gap-8">
            <i className="ph-bold ph-phone"></i>
            {formatPhoneNumber(campus.phone)}
          </span>
        </a>
      ) : (
        <span className="text-neutral-500">Telefon mevcut değil</span>
      ),
    isShowing: (campus) => !!campus?.phone,
  },
  {
    label: "Fax",
    value: (campus) =>
      campus?.fax ? (
        <span className="bg-neutral-50 text-neutral-600 px-12 py-6 rounded-8 fw-medium d-inline-flex align-items-center gap-8">
          <i className="ph-bold ph-printer"></i>
          {formatPhoneNumber(campus.fax)}
        </span>
      ) : (
        <span className="text-neutral-500">Fax mevcut değil</span>
      ),
    isShowing: (campus) => !!campus?.fax,
  },
  {
    label: "Website",
    value: (campus) =>
      campus?.websiteUrl ? (
        <a
          href={
            campus.websiteUrl.startsWith("http")
              ? campus.websiteUrl
              : `https://${campus.websiteUrl}`
          }
          target="_blank"
          rel="noopener noreferrer"
          className="text-info-600 text-decoration-none d-inline-flex align-items-center gap-8"
        >
          <span className="bg-info-50 text-info-600 px-12 py-6 rounded-8 fw-medium d-inline-flex align-items-center gap-8">
            <i className="ph-bold ph-globe"></i>
            <span className="text-truncate" style={{ maxWidth: "250px" }}>
              {campus.websiteUrl.replace(/^https?:\/\/(www\.)?/, "")}
            </span>
            <i className="ph ph-arrow-square-out text-xs"></i>
          </span>
        </a>
      ) : (
        <span className="text-neutral-500">Website mevcut değil</span>
      ),
    isShowing: (campus) => !!campus?.websiteUrl,
  },
];
