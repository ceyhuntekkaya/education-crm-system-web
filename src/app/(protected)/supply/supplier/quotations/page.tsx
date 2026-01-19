"use client";

import React from "react";

const SupplierQuotationsPage: React.FC = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          {/* Page Header */}
          <div className="d-flex justify-content-between align-items-center mb-24">
            <div>
              <h4 className="mb-8">Teklif Yönetimi</h4>
              <p className="text-neutral-600 mb-0">
                Verdiğiniz teklifleri buradan takip edebilir ve
                yönetebilirsiniz.
              </p>
            </div>
            <button className="btn btn-main">
              <i className="ph-bold ph-plus me-8"></i>
              Yeni Teklif Oluştur
            </button>
          </div>

          {/* Stats Cards */}
          <div className="row g-20 mb-24">
            <div className="col-md-3">
              <div className="card p-20 border-neutral-100">
                <div className="d-flex align-items-center gap-12 mb-8">
                  <div className="w-40-px h-40-px d-flex align-items-center justify-content-center rounded-circle bg-main-50">
                    <i className="ph-bold ph-clipboard-text text-main-600"></i>
                  </div>
                  <h6 className="mb-0">Toplam Teklif</h6>
                </div>
                <h3 className="mb-0">0</h3>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card p-20 border-neutral-100">
                <div className="d-flex align-items-center gap-12 mb-8">
                  <div className="w-40-px h-40-px d-flex align-items-center justify-content-center rounded-circle bg-warning-50">
                    <i className="ph-bold ph-clock text-warning-600"></i>
                  </div>
                  <h6 className="mb-0">Bekleyen</h6>
                </div>
                <h3 className="mb-0">0</h3>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card p-20 border-neutral-100">
                <div className="d-flex align-items-center gap-12 mb-8">
                  <div className="w-40-px h-40-px d-flex align-items-center justify-content-center rounded-circle bg-success-50">
                    <i className="ph-bold ph-check-circle text-success-600"></i>
                  </div>
                  <h6 className="mb-0">Onaylanan</h6>
                </div>
                <h3 className="mb-0">0</h3>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card p-20 border-neutral-100">
                <div className="d-flex align-items-center gap-12 mb-8">
                  <div className="w-40-px h-40-px d-flex align-items-center justify-content-center rounded-circle bg-danger-50">
                    <i className="ph-bold ph-x-circle text-danger-600"></i>
                  </div>
                  <h6 className="mb-0">Reddedilen</h6>
                </div>
                <h3 className="mb-0">0</h3>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="card">
            <div className="card-header">
              <ul className="nav nav-pills mb-0" role="tablist">
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link active"
                    data-bs-toggle="pill"
                    data-bs-target="#all-quotations"
                    type="button"
                    role="tab"
                  >
                    Tüm Teklifler
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    data-bs-toggle="pill"
                    data-bs-target="#pending-quotations"
                    type="button"
                    role="tab"
                  >
                    Bekleyenler
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    data-bs-toggle="pill"
                    data-bs-target="#approved-quotations"
                    type="button"
                    role="tab"
                  >
                    Onaylananlar
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    data-bs-toggle="pill"
                    data-bs-target="#rejected-quotations"
                    type="button"
                    role="tab"
                  >
                    Reddedilenler
                  </button>
                </li>
              </ul>
            </div>
            <div className="card-body">
              <div className="tab-content">
                <div
                  className="tab-pane fade show active"
                  id="all-quotations"
                  role="tabpanel"
                >
                  <div className="text-center py-32">
                    <i
                      className="ph ph-clipboard-text text-neutral-300"
                      style={{ fontSize: "64px" }}
                    ></i>
                    <p className="text-neutral-600 mt-16 mb-0">
                      Henüz teklif oluşturulmamış. Yeni teklif oluşturmak için
                      yukarıdaki butonu kullanın.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierQuotationsPage;
