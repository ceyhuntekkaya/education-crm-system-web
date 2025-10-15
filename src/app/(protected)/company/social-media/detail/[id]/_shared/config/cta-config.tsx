import React from "react";
import type { BasicInfoItemConfig } from "../types";
import { PostDto } from "@/types";

/**
 * Post CTA (Call to Action) konfigürasyonu
 */
export const ctaConfig: BasicInfoItemConfig[] = [
  {
    label: "Harekete Geçirici Mesaj",
    value: (post) => (
      <div className="p-4 bg-gradient-primary-light rounded-12 border border-primary-100">
        <div className="d-flex align-items-start gap-3">
          <div className="flex-shrink-0">
            <div
              className="bg-primary-100 rounded-circle d-flex align-items-center justify-content-center"
              style={{ width: "40px", height: "40px" }}
            >
              <i className="ph ph-megaphone text-primary fs-5"></i>
            </div>
          </div>
          <div className="flex-grow-1">
            <div className="fw-semibold text-primary mb-2">
              <i className="ph ph-cursor-click me-1"></i>
              Harekete Geçirici Mesaj
            </div>
            <p className="mb-3 text-neutral-800 fw-medium">
              {post?.callToAction}
            </p>
            {post?.ctaUrl && (
              <a
                href={post.ctaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-sm"
              >
                <i className="ph ph-arrow-square-out me-2"></i>
                Tıklayın
              </a>
            )}
          </div>
        </div>
      </div>
    ),
    isShowing: (post) => !!post?.callToAction,
  },
  {
    label: "Dış Bağlantı",
    value: (post) => (
      <div className="d-flex align-items-center gap-3 p-3 bg-info-25 rounded-8 border border-info-100">
        <i className="ph ph-link-simple text-info fs-4"></i>
        <div className="flex-grow-1">
          <div className="fw-semibold text-info mb-1">Harici Link</div>
          <a
            href={post?.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-info text-decoration-none"
          >
            {post?.externalUrl}
          </a>
        </div>
        <a
          href={post?.externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline-info btn-sm"
        >
          <i className="ph ph-arrow-square-out me-1"></i>
          Aç
        </a>
      </div>
    ),
    isShowing: (post) => !!post?.externalUrl,
  },
];
