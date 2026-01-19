"use client";

import React from "react";

const SupplySupplierPage: React.FC = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          {/* Page Header */}
          <div className="mb-24">
            <h4 className="mb-8">Tedarikçi Dashboard</h4>
            <p className="text-neutral-600">
              Tedarikçi portalına hoş geldiniz. Siparişlerinizi, ürünlerinizi ve
              tekliflerinizi buradan yönetebilirsiniz.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="row g-20 mb-24">
            <div className="col-xxl-3 col-sm-6">
              <div className="card p-20 border-neutral-100">
                <div className="d-flex align-items-center gap-12 mb-12">
                  <div className="w-48-px h-48-px d-flex align-items-center justify-content-center rounded-circle bg-main-600">
                    <i className="ph-bold ph-package text-white text-xl"></i>
                  </div>
                  <div>
                    <h6 className="mb-0">Toplam Ürün</h6>
                  </div>
                </div>
                <h4 className="mb-0">0</h4>
              </div>
            </div>

            <div className="col-xxl-3 col-sm-6">
              <div className="card p-20 border-neutral-100">
                <div className="d-flex align-items-center gap-12 mb-12">
                  <div className="w-48-px h-48-px d-flex align-items-center justify-content-center rounded-circle bg-purple-600">
                    <i className="ph-bold ph-clipboard-text text-white text-xl"></i>
                  </div>
                  <div>
                    <h6 className="mb-0">Aktif Teklifler</h6>
                  </div>
                </div>
                <h4 className="mb-0">0</h4>
              </div>
            </div>

            <div className="col-xxl-3 col-sm-6">
              <div className="card p-20 border-neutral-100">
                <div className="d-flex align-items-center gap-12 mb-12">
                  <div className="w-48-px h-48-px d-flex align-items-center justify-content-center rounded-circle bg-success-600">
                    <i className="ph-bold ph-shopping-cart text-white text-xl"></i>
                  </div>
                  <div>
                    <h6 className="mb-0">Tamamlanan Siparişler</h6>
                  </div>
                </div>
                <h4 className="mb-0">0</h4>
              </div>
            </div>

            <div className="col-xxl-3 col-sm-6">
              <div className="card p-20 border-neutral-100">
                <div className="d-flex align-items-center gap-12 mb-12">
                  <div className="w-48-px h-48-px d-flex align-items-center justify-content-center rounded-circle bg-warning-600">
                    <i className="ph-bold ph-chat-circle text-white text-xl"></i>
                  </div>
                  <div>
                    <h6 className="mb-0">Yeni Mesajlar</h6>
                  </div>
                </div>
                <h4 className="mb-0">0</h4>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card">
            <div className="card-header border-bottom">
              <h6 className="mb-0">Hızlı İşlemler</h6>
            </div>
            <div className="card-body">
              <div className="row g-16">
                <div className="col-md-3 col-sm-6">
                  <button className="btn btn-outline-main w-100">
                    <i className="ph-bold ph-plus me-8"></i>
                    Yeni Ürün Ekle
                  </button>
                </div>
                <div className="col-md-3 col-sm-6">
                  <button className="btn btn-outline-main w-100">
                    <i className="ph-bold ph-file-text me-8"></i>
                    Alım İlanlarını Görüntüle
                  </button>
                </div>
                <div className="col-md-3 col-sm-6">
                  <button className="btn btn-outline-main w-100">
                    <i className="ph-bold ph-clipboard-text me-8"></i>
                    Tekliflerim
                  </button>
                </div>
                <div className="col-md-3 col-sm-6">
                  <button className="btn btn-outline-main w-100">
                    <i className="ph-bold ph-chat-circle me-8"></i>
                    Mesajlar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplySupplierPage;
