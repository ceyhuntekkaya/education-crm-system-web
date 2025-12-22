"use client";

import React from "react";
import { Metadata } from "next";
import { usePageTitle } from "@/hooks";

const SupplyCompanyPage: React.FC = () => {
  usePageTitle("Tedarik Yönetimi");
  return (
    <div className="container-fluid">
      {/* Page Header */}
      <div className="row mb-24">
        <div className="col-12">
          <div className="page-header">
            <h1 className="mb-8">Tedarik Yönetimi</h1>
            <p className="text-muted mb-0">
              Malzeme ve tedarik taleplerini yönetin, tedarikçilerle iletişime
              geçin.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="row g-4 mb-24">
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex align-items-center mb-12">
                <div className="w-48-px h-48-px bg-primary-50 rounded-circle d-flex align-items-center justify-content-center me-12">
                  <i className="ph-bold ph-package text-primary-600 text-xl"></i>
                </div>
                <div>
                  <h6 className="mb-0 text-neutral-600">Toplam Talep</h6>
                  <h3 className="mb-0 mt-4">1,234</h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex align-items-center mb-12">
                <div className="w-48-px h-48-px bg-warning-50 rounded-circle d-flex align-items-center justify-content-center me-12">
                  <i className="ph-bold ph-clipboard-text text-warning-600 text-xl"></i>
                </div>
                <div>
                  <h6 className="mb-0 text-neutral-600">Aktif RFQ</h6>
                  <h3 className="mb-0 mt-4">45</h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex align-items-center mb-12">
                <div className="w-48-px h-48-px bg-success-50 rounded-circle d-flex align-items-center justify-content-center me-12">
                  <i className="ph-bold ph-heart text-success-600 text-xl"></i>
                </div>
                <div>
                  <h6 className="mb-0 text-neutral-600">Favoriler</h6>
                  <h3 className="mb-0 mt-4">89</h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex align-items-center mb-12">
                <div className="w-48-px h-48-px bg-info-50 rounded-circle d-flex align-items-center justify-content-center me-12">
                  <i className="ph-bold ph-chat-circle text-info-600 text-xl"></i>
                </div>
                <div>
                  <h6 className="mb-0 text-neutral-600">Mesajlar</h6>
                  <h3 className="mb-0 mt-4">23</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Access */}
      <div className="row">
        <div className="col-12">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white border-bottom">
              <h5 className="mb-0">Hızlı Erişim</h5>
            </div>
            <div className="card-body">
              <div className="row g-3">
                <div className="col-12 col-md-6 col-lg-3">
                  <a
                    href="/supply/company/products"
                    className="d-flex align-items-center p-16 bg-neutral-25 rounded-8 text-decoration-none hover-bg-neutral-50 transition-all"
                  >
                    <i className="ph-bold ph-package text-primary-600 text-xxl me-12"></i>
                    <div>
                      <h6 className="mb-0 text-neutral-900">Ürün Arama</h6>
                      <small className="text-neutral-600">
                        Ürünleri inceleyin
                      </small>
                    </div>
                  </a>
                </div>

                <div className="col-12 col-md-6 col-lg-3">
                  <a
                    href="/supply/company/wishlist"
                    className="d-flex align-items-center p-16 bg-neutral-25 rounded-8 text-decoration-none hover-bg-neutral-50 transition-all"
                  >
                    <i className="ph-bold ph-heart text-success-600 text-xxl me-12"></i>
                    <div>
                      <h6 className="mb-0 text-neutral-900">İstek/Favoriler</h6>
                      <small className="text-neutral-600">
                        Favorilerinizi görüntüleyin
                      </small>
                    </div>
                  </a>
                </div>

                <div className="col-12 col-md-6 col-lg-3">
                  <a
                    href="/supply/company/rfqs"
                    className="d-flex align-items-center p-16 bg-neutral-25 rounded-8 text-decoration-none hover-bg-neutral-50 transition-all"
                  >
                    <i className="ph-bold ph-clipboard-text text-warning-600 text-xxl me-12"></i>
                    <div>
                      <h6 className="mb-0 text-neutral-900">RFQ Yönetimi</h6>
                      <small className="text-neutral-600">
                        Teklifleri yönetin
                      </small>
                    </div>
                  </a>
                </div>

                <div className="col-12 col-md-6 col-lg-3">
                  <a
                    href="/supply/company/messages"
                    className="d-flex align-items-center p-16 bg-neutral-25 rounded-8 text-decoration-none hover-bg-neutral-50 transition-all"
                  >
                    <i className="ph-bold ph-chat-circle text-info-600 text-xxl me-12"></i>
                    <div>
                      <h6 className="mb-0 text-neutral-900">Mesajlar</h6>
                      <small className="text-neutral-600">
                        Mesajlarınızı kontrol edin
                      </small>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplyCompanyPage;
