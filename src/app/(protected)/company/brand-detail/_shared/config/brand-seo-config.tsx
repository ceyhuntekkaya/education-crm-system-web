import React from "react";
import type { BrandSeoConfig } from "../types";

/**
 * SEO bilgileri konfigürasyonu
 */
export const brandSeoConfig: BrandSeoConfig[] = [
  {
    label: "Meta Başlık",
    value: (brand) => (
      <div className="bg-neutral-25 rounded-8 p-12">
        <code className="text-sm text-neutral-800 bg-transparent p-0">
          {brand?.metaTitle || "Meta başlık tanımlanmamış"}
        </code>
      </div>
    ),
    isShowing: (brand) => !!brand?.metaTitle,
  },
  {
    label: "Meta Açıklama",
    value: (brand) => (
      <div className="bg-neutral-25 rounded-8 p-12">
        <p className="text-sm text-neutral-800 mb-0 line-height-relaxed">
          {brand?.metaDescription || "Meta açıklama tanımlanmamış"}
        </p>
      </div>
    ),
    isShowing: (brand) => !!brand?.metaDescription,
  },
  {
    label: "Meta Anahtar Kelimeler",
    value: (brand) => (
      <div className="bg-neutral-25 rounded-8 p-12">
        {brand?.metaKeywords ? (
          <div className="d-flex flex-wrap gap-8">
            {brand.metaKeywords.split(",").map((keyword, index) => (
              <span
                key={index}
                className="badge bg-main-100 text-main-700 px-8 py-4 text-xs fw-medium"
              >
                {keyword.trim()}
              </span>
            ))}
          </div>
        ) : (
          <span className="text-neutral-500 text-sm">
            Anahtar kelime tanımlanmamış
          </span>
        )}
      </div>
    ),
    isShowing: (brand) => !!brand?.metaKeywords,
  },
];
