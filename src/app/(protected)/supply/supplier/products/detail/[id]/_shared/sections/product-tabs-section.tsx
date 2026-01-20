import React from "react";
import { Divider } from "@/components";
import { useScrollToElement } from "@/hooks";
import { useProductDetail } from "../context";
import { useProductsContext } from "../../../../_shared/contexts";
import { ProcessedSectionItem } from "../types";
import {
  createSections,
  processSupplierConfig,
} from "../utils/config-processor";
import { PRODUCT_SECTIONS } from "../config/section-definitions";
import { supplierInfoConfig } from "../config/supplier-info-config";

export const ProductTabsSection: React.FC = () => {
  // ProductsContext'ten data al
  const { currentProduct: product } = useProductsContext();

  // ProductDetail context'ten UI state ve supplier al
  const { supplier, activeTab, setActiveTab } = useProductDetail();
  const allSections = createSections(PRODUCT_SECTIONS, product);
  const supplierSections = supplier
    ? [
        {
          title: "Tedarikçi Bilgileri",
          titleColor: "text-info-600",
          titleIcon: "ph-bold ph-buildings",
          items: processSupplierConfig(supplierInfoConfig, supplier),
        },
      ]
    : [];
  const { ref: tabHeaderRef } = useScrollToElement({
    dependencies: [activeTab],
    skipFirstRender: true,
  });

  if (!product) return null;

  return (
    <div className="product-detail-page__tabs-container">
      {/* Tab Headers */}
      <div ref={tabHeaderRef} className="product-detail-page__tabs-header">
        <button
          className={`product-detail-page__tab-button ${
            activeTab === "details"
              ? "product-detail-page__tab-button--active"
              : ""
          }`}
          onClick={() => setActiveTab("details")}
        >
          <i className="ph-bold ph-info"></i>
          Ürün Detayları
        </button>
        {product.technicalSpecs && (
          <button
            className={`product-detail-page__tab-button ${
              activeTab === "specs"
                ? "product-detail-page__tab-button--active"
                : ""
            }`}
            onClick={() => setActiveTab("specs")}
          >
            <i className="ph-bold ph-list-bullets"></i>
            Teknik Özellikler
          </button>
        )}
        {supplier && supplierSections.length > 0 && (
          <button
            className={`product-detail-page__tab-button ${
              activeTab === "supplier"
                ? "product-detail-page__tab-button--active"
                : ""
            }`}
            onClick={() => setActiveTab("supplier")}
          >
            <i className="ph-bold ph-buildings"></i>
            Tedarikçi Bilgileri
          </button>
        )}
      </div>

      {/* Tab Content */}
      <div className="product-detail-page__tab-content">
        {activeTab === "details" && (
          <div>
            {product.description ? (
              <div className="product-detail-page__description">
                <div>
                  <h4>Açıklama</h4>
                  <Divider size="sm" />
                </div>
                <p>{product.description}</p>
              </div>
            ) : (
              <p className="product-detail-page__empty-description">
                Açıklama bulunmamaktadır.
              </p>
            )}

            {allSections.length > 0 && (
              <div className="product-detail-page__section-grid mt-32">
                {allSections.map((section, sectionIndex) => {
                  const filteredItems = section.items.filter(
                    (item: ProcessedSectionItem) => item.isShowing,
                  );
                  if (filteredItems.length === 0) return null;

                  return (
                    <div
                      key={sectionIndex}
                      className="product-detail-page__section-item"
                    >
                      <div>
                        <h4
                          className={`product-detail-page__section-title ${
                            section.titleColor || "text-main-600"
                          }`}
                        >
                          {section.titleIcon && (
                            <i className={section.titleIcon}></i>
                          )}
                          {section.title}
                        </h4>
                        <Divider size="sm" />
                      </div>
                      <div className="product-detail-page__section-items">
                        {filteredItems.map(
                          (item: ProcessedSectionItem, itemIndex: number) => (
                            <div
                              key={itemIndex}
                              className="product-detail-page__info-box"
                            >
                              <p className="product-detail-page__info-box-label">
                                {item.label}
                              </p>
                              <div className="product-detail-page__info-box-value">
                                {item.value}
                              </div>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {activeTab === "specs" && product.technicalSpecs && (
          <div className="product-detail-page__specs-container">
            <div>
              <h4>Teknik Özellikler</h4>
              <Divider size="sm" />
            </div>
            <div className="product-detail-page__specs-content">
              <pre>{product.technicalSpecs}</pre>
            </div>
          </div>
        )}

        {activeTab === "supplier" &&
          supplier &&
          supplierSections.length > 0 && (
            <div>
              {/* <h4 className="fw-semibold text-neutral-900 mb-24">
                Tedarikçi Bilgileri
              </h4> */}
              <div className="row g-3">
                {supplierSections.map((section, sectionIndex) => {
                  const filteredItems = section.items.filter(
                    (item: ProcessedSectionItem) => item.isShowing,
                  );
                  if (filteredItems.length === 0) return null;

                  return (
                    <div key={sectionIndex} className="col-12">
                      <h5
                        className={`fw-semibold mb-12 ${
                          section.titleColor || "text-main-600"
                        }`}
                      >
                        {section.titleIcon && (
                          <i className={`${section.titleIcon} me-8`}></i>
                        )}
                        {section.title}
                      </h5>
                      <Divider size="sm" />
                      <div className="product-detail-page__section-items">
                        {filteredItems.map(
                          (item: ProcessedSectionItem, itemIndex: number) => (
                            <div
                              key={itemIndex}
                              className="product-detail-page__info-box"
                            >
                              <p className="product-detail-page__info-box-label">
                                {item.label}
                              </p>
                              <div className="product-detail-page__info-box-value">
                                {item.value}
                              </div>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
      </div>
    </div>
  );
};
