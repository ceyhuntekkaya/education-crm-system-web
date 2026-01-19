"use client";

import React from "react";
import Link from "next/link";

interface QuickAction {
  title: string;
  description: string;
  icon: string;
  colorClass: "primary" | "success" | "info" | "purple" | "warning";
  href: string;
}

const quickActionsData: QuickAction[] = [
  {
    title: "Yeni Ürün Ekle",
    description: "Hızlıca yeni bir ürün ekleyin ve katalogda yayınlayın",
    icon: "ph-plus-circle",
    colorClass: "primary",
    href: "/supply/supplier/products",
  },
  {
    title: "Tekliflerimi Gör",
    description: "Gönderdiğiniz teklifleri görüntüleyin ve takip edin",
    icon: "ph-clipboard-text",
    colorClass: "purple",
    href: "/supply/supplier/quotations",
  },
  {
    title: "Mesajlar",
    description: "Müşterilerinizle iletişime geçin ve sorularını yanıtlayın",
    icon: "ph-chat-circle",
    colorClass: "warning",
    href: "/supply/supplier/messages",
  },
];

/**
 * Dashboard hızlı işlemler kartları komponenti (Supplier)
 * Yeni Ürün, Teklifler ve Mesajlar quick action kartlarını gösterir
 */
export const QuickActions: React.FC = () => {
  const getBlurClass = (colorClass: string) => {
    switch (colorClass) {
      case "primary":
        return "quick-action-blur quick-action-blur-primary";
      case "success":
        return "quick-action-blur quick-action-blur-success";
      case "info":
        return "quick-action-blur quick-action-blur-info";
      case "purple":
        return "quick-action-blur quick-action-blur-purple";
      case "warning":
        return "quick-action-blur quick-action-blur-warning";
      default:
        return "quick-action-blur quick-action-blur-primary";
    }
  };

  return (
    <div className="row">
      {quickActionsData.map((action, index) => (
        <div key={index} className="col-4">
          <Link href={action.href} className="quick-action-link">
            <div className="quick-action-card bg-white rounded-16 position-relative overflow-hidden">
              {/* Decorative blur elements */}
              <div className={getBlurClass(action.colorClass)}></div>
              <div className="quick-action-blur quick-action-blur-secondary"></div>

              {/* Content section */}
              <div className="quick-action-content">
                {/* Icon - Solda */}
                <div
                  className={`quick-action-icon-box text-white bg-${action.colorClass}-600`}
                >
                  <i className={`ph-bold ${action.icon}`}></i>
                </div>

                {/* Text content - Sağda */}
                <div className="quick-action-text-wrapper">
                  <h5
                    className={`quick-action-title text-${action.colorClass}-700`}
                  >
                    {action.title}
                  </h5>
                  <p className="quick-action-description">
                    {action.description}
                  </p>
                </div>
              </div>

              {/* Arrow indicator */}
              <div className="quick-action-arrow">
                <i className="ph-bold ph-arrow-right"></i>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};
