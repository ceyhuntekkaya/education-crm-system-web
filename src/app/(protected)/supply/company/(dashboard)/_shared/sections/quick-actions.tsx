"use client";

import React from "react";
import Link from "next/link";

interface QuickAction {
  title: string;
  description: string;
  icon: string;
  colorClass: "primary" | "success" | "info";
  href: string;
}

const quickActionsData: QuickAction[] = [
  {
    title: "Yeni Alım İlanı Oluştur",
    description:
      "Hızlıca yeni bir talep oluşturun ve tedarikçilerden teklif alın",
    icon: "ph-plus-circle",
    colorClass: "primary",
    href: "/supply/company/rfqs/add-edit/new",
  },
  {
    title: "Ürün Ara",
    description: "Katalogdaki ürünleri arayın ve sipariş verin",
    icon: "ph-magnifying-glass",
    colorClass: "success",
    href: "/supply/company/products",
  },
  {
    title: "Tedarikçileri Gör",
    description: "Onaylı tedarikçilerinizi görüntüleyin ve iletişime geçin",
    icon: "ph-users-three",
    colorClass: "info",
    href: "#",
  },
];

/**
 * Dashboard hızlı işlemler kartları komponenti
 * Yeni RFQ, Ürün Ara ve Tedarikçileri Gör quick action kartlarını gösterir
 * active-orders-card tasarımı baz alınarak oluşturulmuştur
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
