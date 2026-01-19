"use client";

import React from "react";

const SupplierProductsPage: React.FC = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          {/* Page Header */}
          <div className="d-flex justify-content-between align-items-center mb-24">
            <div>
              <h4 className="mb-8">Ürün Yönetimi</h4>
              <p className="text-neutral-600 mb-0">
                Ürünlerinizi buradan yönetebilir, yeni ürün ekleyebilir ve
                mevcut ürünlerinizi güncelleyebilirsiniz.
              </p>
            </div>
            <button className="btn btn-main">
              <i className="ph-bold ph-plus me-8"></i>
              Yeni Ürün Ekle
            </button>
          </div>

          {/* Stats Cards */}
          <div className="row g-20 mb-24">
            <div className="col-md-4">
              <div className="card p-20 border-neutral-100">
                <div className="d-flex align-items-center gap-12 mb-8">
                  <div className="w-40-px h-40-px d-flex align-items-center justify-content-center rounded-circle bg-main-50">
                    <i className="ph-bold ph-package text-main-600"></i>
                  </div>
                  <h6 className="mb-0">Toplam Ürün</h6>
                </div>
                <h3 className="mb-0">0</h3>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card p-20 border-neutral-100">
                <div className="d-flex align-items-center gap-12 mb-8">
                  <div className="w-40-px h-40-px d-flex align-items-center justify-content-center rounded-circle bg-success-50">
                    <i className="ph-bold ph-check-circle text-success-600"></i>
                  </div>
                  <h6 className="mb-0">Aktif Ürünler</h6>
                </div>
                <h3 className="mb-0">0</h3>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card p-20 border-neutral-100">
                <div className="d-flex align-items-center gap-12 mb-8">
                  <div className="w-40-px h-40-px d-flex align-items-center justify-content-center rounded-circle bg-warning-50">
                    <i className="ph-bold ph-eye-slash text-warning-600"></i>
                  </div>
                  <h6 className="mb-0">Pasif Ürünler</h6>
                </div>
                <h3 className="mb-0">0</h3>
              </div>
            </div>
          </div>

          {/* Products Table */}
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h6 className="mb-0">Ürün Listesi</h6>
              <div className="d-flex gap-12">
                <input
                  type="search"
                  className="form-control"
                  placeholder="Ürün ara..."
                  style={{ width: "250px" }}
                />
                <button className="btn btn-outline-main">
                  <i className="ph-bold ph-funnel me-8"></i>
                  Filtrele
                </button>
              </div>
            </div>
            <div className="card-body">
              <div className="text-center py-32">
                <i
                  className="ph ph-package text-neutral-300"
                  style={{ fontSize: "64px" }}
                ></i>
                <p className="text-neutral-600 mt-16 mb-0">
                  Henüz ürün eklenmemiş. Yeni ürün eklemek için yukarıdaki
                  butonu kullanın.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierProductsPage;
