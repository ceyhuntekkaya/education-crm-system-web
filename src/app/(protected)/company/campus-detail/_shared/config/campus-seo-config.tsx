import React from "react";
import type { CampusSeoConfig } from "../types";

/**
 * SEO bilgileri konfigürasyonu
 */
export const campusSeoConfig: CampusSeoConfig[] = [
  {
    label: "Meta Başlık",
    value: (campus) => (
      <div className="text-neutral-700">
        <code className="bg-neutral-50 px-8 py-4 rounded-4 text-sm d-inline-block">
          {campus?.metaTitle || "Meta başlık mevcut değil"}
        </code>
        {campus?.metaTitle && (
          <small className="d-block mt-1 text-neutral-500">
            {campus.metaTitle.length} / 60 karakter
          </small>
        )}
      </div>
    ),
    isShowing: (campus) => !!campus?.metaTitle,
  },
  {
    label: "Meta Açıklama",
    value: (campus) => (
      <div className="text-neutral-700">
        <p className="mb-0 line-height-relaxed">
          {campus?.metaDescription || "Meta açıklama mevcut değil"}
        </p>
        {campus?.metaDescription && (
          <small className="d-block mt-1 text-neutral-500">
            {campus.metaDescription.length} / 160 karakter
          </small>
        )}
      </div>
    ),
    isShowing: (campus) => !!campus?.metaDescription,
  },
  {
    label: "Meta Anahtar Kelimeler",
    value: (campus) => (
      <div className="d-flex flex-wrap gap-2">
        {campus?.metaKeywords ? (
          campus.metaKeywords.split(",").map((keyword, index) => (
            <span
              key={index}
              className="badge bg-success-50 text-success-600 px-8 py-4"
            >
              {keyword.trim()}
            </span>
          ))
        ) : (
          <span className="text-neutral-500">
            Meta anahtar kelime mevcut değil
          </span>
        )}
      </div>
    ),
    isShowing: (campus) => !!campus?.metaKeywords,
  },
];
